// Experimental local-only Japanese vowel classifier. Not a clinical/phonetic assessment.
const targets = document.querySelectorAll('.ipa-target');
const button = document.getElementById('ipa-record');
const output = document.getElementById('ipa-output');
let target = 'a';
let busy = false;
const vowels = {
  a: { kana: 'あ', ipa: '/a/', f1: 800, f2: 1450 },
  i: { kana: 'い', ipa: '/i/', f1: 320, f2: 2250 },
  u: { kana: 'う', ipa: '/ɯ/', f1: 390, f2: 1450 },
  e: { kana: 'え', ipa: '/e/', f1: 520, f2: 1900 },
  o: { kana: 'お', ipa: '/o/', f1: 530, f2: 950 }
};
for (const el of targets) {
  el.addEventListener('click', () => {
    if (busy) return;
    target = el.dataset.vowel;
    for (const item of targets) {
      const selected = item === el;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    }
    output.textContent = `${vowels[target].kana} ${vowels[target].ipa} を約1.5秒、一定の声で発音してください。`;
  });
}

// Estimate formants from a pre-emphasized audio frame using LPC (Levinson-Durbin).
function estimateFormants(samples, sampleRate) {
  const n = samples.length;
  const signal = new Float64Array(n);
  let energy = 0;
  for (let i = 1; i < n; i++) {
    const x = (samples[i] - 0.97 * samples[i - 1]) * (0.5 - 0.5 * Math.cos(2 * Math.PI * i / (n - 1)));
    signal[i] = x;
    energy += x * x;
  }
  if (Math.sqrt(energy / n) < 0.0015) return null;
  const order = 14;
  const r = new Float64Array(order + 1);
  for (let k = 0; k <= order; k++) {
    for (let i = k; i < n; i++) r[k] += signal[i] * signal[i - k];
  }
  if (r[0] < 1e-8) return null;
  const a = new Float64Array(order + 1);
  a[0] = 1;
  let err = r[0];
  for (let k = 1; k <= order; k++) {
    let sum = r[k];
    for (let j = 1; j < k; j++) sum += a[j] * r[k - j];
    const reflection = Math.max(-0.98, Math.min(0.98, -sum / Math.max(err, 1e-12)));
    const next = a.slice();
    for (let j = 1; j < k; j++) next[j] = a[j] + reflection * a[k - j];
    next[k] = reflection;
    a.set(next);
    err *= (1 - reflection * reflection);
    if (err < 1e-12) return null;
  }
  // Peaks in LPC spectral envelope (Hz), avoiding reliance on any remote model.
  const points = [];
  for (let hz = 180; hz <= 3200; hz += 20) {
    const w = 2 * Math.PI * hz / sampleRate;
    let re = 1, im = 0;
    for (let k = 1; k <= order; k++) {
      re += a[k] * Math.cos(w * k);
      im -= a[k] * Math.sin(w * k);
    }
    points.push({ hz, strength: -10 * Math.log10(re * re + im * im + 1e-12) });
  }
  const peaks = [];
  for (let i = 2; i < points.length - 2; i++) {
    if (points[i].strength > points[i-1].strength && points[i].strength > points[i+1].strength) {
      peaks.push(points[i]);
    }
  }
  const first = peaks.find(p => p.hz >= 220 && p.hz <= 1050);
  const second = peaks.find(p => first && p.hz >= Math.max(700, first.hz + 250) && p.hz <= 3000);
  if (!first || !second) return null;
  return { f1: first.hz, f2: second.hz };
}

function median(values) {
  const sorted = values.slice().sort((a,b) => a-b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid-1] + sorted[mid])/2;
}
function classify(f1, f2) {
  return Object.entries(vowels).map(([key, v]) => ({
    key, ...v,
    distance: Math.hypot((f1-v.f1)/270, (f2-v.f2)/550)
  })).sort((a,b) => a.distance-b.distance);
}
function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

button.addEventListener('click', async () => {
  if (busy) return;
  if (!navigator.mediaDevices?.getUserMedia) {
    output.textContent = 'このブラウザではマイクの取得に対応していません。HTTPSでSafariを開いてください。';
    return;
  }
  busy = true;
  button.disabled = true;
  for (const item of targets) item.disabled = true;
  let stream, context;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
    context = new (window.AudioContext || window.webkitAudioContext)();
    await context.resume();
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0;
    source.connect(analyser);
    const buffer = new Float32Array(analyser.fftSize);
    const readings = [];
    button.textContent = '🎙️ 録音中… / Recording…';
    output.textContent = '母音を伸ばして発音してください…（約1.5秒）';
    // Discard onset and offset; use central, approximately steady-state frames.
    for (let i = 0; i < 18; i++) {
      await wait(90);
      analyser.getFloatTimeDomainData(buffer);
      if (i >= 3 && i <= 15) {
        const result = estimateFormants(buffer, context.sampleRate);
        if (result) readings.push(result);
      }
    }
    if (readings.length < 4) {
      output.textContent = '十分な母音音声を検出できませんでした。静かな場所で少し長く発音してください。';
      return;
    }
    const f1 = median(readings.map(r => r.f1));
    const f2 = median(readings.map(r => r.f2));
    const ranked = classify(f1, f2);
    const best = ranked[0];
    const match = best.key === target;
    output.replaceChildren();
    const headline = document.createElement('div');
    const strong = document.createElement('strong');
    strong.textContent = `${best.kana} ${best.ipa}`;
    headline.append('推定IPA候補：', strong);
    const detail = document.createElement('div');
    detail.textContent = `F1 約${Math.round(f1)} Hz / F2 約${Math.round(f2)} Hz`;
    const comparison = document.createElement('div');
    comparison.textContent = `選択した母音：${vowels[target].kana} ${vowels[target].ipa} ／ ${match ? '候補が一致しました' : '候補が異なりました'}`;
    const caution = document.createElement('small');
    caution.textContent = '※ 実験的な推定です。結果の一致・不一致は発音の正誤を示しません。';
    output.append(headline, detail, comparison, caution);
  } catch (error) {
    output.textContent = error?.name === 'NotAllowedError'
      ? 'マイクの使用が許可されていません。Safariのサイト設定を確認してください。'
      : '録音または分析に失敗しました。もう一度お試しください。';
  } finally {
    stream?.getTracks().forEach(track => track.stop());
    if (context) await context.close().catch(() => {});
    busy = false;
    button.disabled = false;
    button.textContent = '🎙️ 母音を分析する / Analyze vowel';
    for (const item of targets) item.disabled = false;
  }
});
