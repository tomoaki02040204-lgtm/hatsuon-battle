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
  // Downsample to 10 kHz before LPC. At 44.1/48 kHz, order-14 LPC
  // often has too few resonances in the speech band to identify F1/F2.
  const targetRate = 10000;
  const length = Math.floor(samples.length * targetRate / sampleRate);
  if (length < 180) return null;
  const signal = new Float64Array(length);
  let sumSquares = 0;
  for (let i = 0; i < samples.length; i++) sumSquares += samples[i] * samples[i];
  const rms = Math.sqrt(sumSquares / samples.length);
  if (rms < 0.002) return null;
  for (let i = 0; i < length; i++) {
    const position = i * sampleRate / targetRate;
    const index = Math.floor(position);
    const fraction = position - index;
    const raw = samples[index] * (1 - fraction) + samples[Math.min(index + 1, samples.length - 1)] * fraction;
    const previousPosition = Math.max(0, position - sampleRate / targetRate);
    const pi = Math.floor(previousPosition);
    const pf = previousPosition - pi;
    const previous = samples[pi] * (1 - pf) + samples[Math.min(pi + 1, samples.length - 1)] * pf;
    signal[i] = (raw - 0.96 * previous) * (0.54 - 0.46 * Math.cos(2 * Math.PI * i / (length - 1)));
  }
  const order = 12;
  const r = new Float64Array(order + 1);
  for (let k = 0; k <= order; k++) {
    for (let i = k; i < length; i++) r[k] += signal[i] * signal[i-k];
  }
  if (r[0] < 1e-10) return null;
  const a = new Float64Array(order + 1);
  a[0] = 1;
  let err = r[0];
  for (let k = 1; k <= order; k++) {
    let sum = r[k];
    for (let j = 1; j < k; j++) sum += a[j] * r[k-j];
    const reflection = Math.max(-0.98, Math.min(0.98, -sum / Math.max(err, 1e-12)));
    const next = a.slice();
    for (let j = 1; j < k; j++) next[j] = a[j] + reflection * a[k-j];
    next[k] = reflection;
    a.set(next);
    err *= (1 - reflection * reflection);
    if (err < 1e-12) return null;
  }
  const points = [];
  for (let hz = 180; hz <= 3200; hz += 20) {
    const w = 2 * Math.PI * hz / targetRate;
    let re = 1, im = 0;
    for (let k = 1; k <= order; k++) {
      re += a[k] * Math.cos(w*k);
      im -= a[k] * Math.sin(w*k);
    }
    points.push({ hz, strength: -10 * Math.log10(re*re + im*im + 1e-12) });
  }
  const peaks = [];
  for (let i = 1; i < points.length - 1; i++) {
    if (points[i].strength > points[i-1].strength && points[i].strength > points[i+1].strength) peaks.push(points[i]);
  }
  const first = peaks.find(p => p.hz >= 220 && p.hz <= 1050);
  const second = peaks.find(p => first && p.hz >= Math.max(700, first.hz + 220) && p.hz <= 3000);
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
    let voicedFrames = 0;
    let peakRms = 0;
    button.textContent = '🎙️ 録音中… / Recording…';
    output.textContent = '母音を伸ばして発音してください…（約1.5秒）';
    // Discard onset and offset; use central, approximately steady-state frames.
    for (let i = 0; i < 18; i++) {
      await wait(90);
      analyser.getFloatTimeDomainData(buffer);
      if (i >= 3 && i <= 15) {
        let sum = 0;
        for (let j = 0; j < buffer.length; j++) sum += buffer[j] * buffer[j];
        const rms = Math.sqrt(sum / buffer.length);
        peakRms = Math.max(peakRms, rms);
        if (rms >= 0.002) voicedFrames++;
        const result = estimateFormants(buffer, context.sampleRate);
        if (result) readings.push(result);
      }
    }
    if (readings.length < 2) {
      output.textContent = voicedFrames < 2
        ? `マイクの音量が小さいようです（最大RMS ${peakRms.toFixed(4)}）。マイクに近づいて1.5秒ほど母音を伸ばしてください。`
        : `音声は検出しましたが、F1・F2を推定できませんでした（音声フレーム${voicedFrames}件、推定成功${readings.length}件）。静かな場所で試してください。`;
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
