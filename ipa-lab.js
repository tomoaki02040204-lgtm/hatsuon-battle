// Experimental local-only Japanese vowel analysis. Not a pronunciation assessment.
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
    output.textContent = `${vowels[target].kana} ${vowels[target].ipa} を約1.5秒、自然な声で発音してください。`;
  });
}
function median(values) {
  const sorted = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function classify(f1, f2) {
  return Object.entries(vowels).map(([key, v]) => ({
    key, ...v, distance: Math.hypot((f1 - v.f1) / 270, (f2 - v.f2) / 550)
  })).sort((a, b) => a.distance - b.distance);
}
function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// Low-pass FIR filtering before resampling prevents high-frequency aliasing.
// 41-tap windowed-sinc filter, cutoff 4 kHz at the ORIGINAL sample rate.
function lowPassAndResample(samples, sampleRate, targetRate = 10000) {
  const taps = 41;
  const half = (taps - 1) / 2;
  const cutoff = Math.min(4000, 0.4 * sampleRate);
  const fc = cutoff / sampleRate;
  const weights = new Float64Array(taps);
  let total = 0;
  for (let k = 0; k < taps; k++) {
    const n = k - half;
    const sinc = n === 0 ? 2 * fc : Math.sin(2 * Math.PI * fc * n) / (Math.PI * n);
    const window = 0.54 - 0.46 * Math.cos(2 * Math.PI * k / (taps - 1));
    weights[k] = sinc * window;
    total += weights[k];
  }
  for (let k = 0; k < taps; k++) weights[k] /= total;
  const length = Math.floor(samples.length * targetRate / sampleRate);
  const result = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    const position = i * sampleRate / targetRate;
    const center = Math.floor(position);
    const fraction = position - center;
    let left = 0, right = 0;
    for (let k = 0; k < taps; k++) {
      const idx = center + k - half;
      const idx2 = idx + 1;
      left += weights[k] * samples[Math.max(0, Math.min(samples.length - 1, idx))];
      right += weights[k] * samples[Math.max(0, Math.min(samples.length - 1, idx2))];
    }
    result[i] = left * (1 - fraction) + right * fraction;
  }
  return result;
}

function estimateFormants(samples, sampleRate) {
  let sumSquares = 0;
  for (const s of samples) sumSquares += s * s;
  const rms = Math.sqrt(sumSquares / samples.length);
  if (rms < 0.002) return null;
  const down = lowPassAndResample(samples, sampleRate);
  if (down.length < 180) return null;
  const signal = new Float64Array(down.length);
  for (let i = 0; i < down.length; i++) {
    const pre = down[i] - 0.96 * (i ? down[i - 1] : 0);
    signal[i] = pre * (0.54 - 0.46 * Math.cos(2 * Math.PI * i / (down.length - 1)));
  }
  const order = 12;
  const r = new Float64Array(order + 1);
  for (let k = 0; k <= order; k++) {
    for (let i = k; i < signal.length; i++) r[k] += signal[i] * signal[i - k];
  }
  if (r[0] < 1e-10) return null;
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
    err *= 1 - reflection * reflection;
    if (err < 1e-12) return null;
  }
  const points = [];
  for (let hz = 180; hz <= 3200; hz += 20) {
    const w = 2 * Math.PI * hz / 10000;
    let re = 1, im = 0;
    for (let k = 1; k <= order; k++) {
      re += a[k] * Math.cos(w * k);
      im -= a[k] * Math.sin(w * k);
    }
    points.push({ hz, strength: -10 * Math.log10(re * re + im * im + 1e-12) });
  }
  const peaks = [];
  for (let i = 1; i < points.length - 1; i++) {
    if (points[i].strength > points[i - 1].strength && points[i].strength > points[i + 1].strength) {
      peaks.push(points[i]);
    }
  }
  // Avoid forced assignments when peaks are missing or insufficiently separated.
  const first = peaks.find(p => p.hz >= 220 && p.hz <= 1050);
  const second = peaks.find(p => first && p.hz >= Math.max(700, first.hz + 220) && p.hz <= 3000);
  if (!first || !second) return null;
  return { f1: first.hz, f2: second.hz };
}

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
    output.textContent = '母音を自然な声で伸ばしてください…（約1.5秒）';
    for (let i = 0; i < 18; i++) {
      await wait(90);
      analyser.getFloatTimeDomainData(buffer);
      if (i >= 3 && i <= 15) {
        let sum = 0;
        for (const s of buffer) sum += s * s;
        const rms = Math.sqrt(sum / buffer.length);
        peakRms = Math.max(peakRms, rms);
        if (rms >= 0.002) voicedFrames++;
        const result = estimateFormants(buffer, context.sampleRate);
        if (result) readings.push(result);
      }
    }
    if (readings.length < 5) {
      output.textContent = voicedFrames < 2
        ? `マイクの音量が小さいようです（最大RMS ${peakRms.toFixed(4)}）。自然な声で試してください。`
        : `音声は検出しましたが、安定したF1・F2の候補が不足しています（有効${readings.length}フレーム）。再試行してください。`;
      return;
    }
    const f1s = readings.map(r => r.f1);
    const f2s = readings.map(r => r.f2);
    const f1 = median(f1s), f2 = median(f2s);
    const mad1 = median(f1s.map(x => Math.abs(x - f1)));
    const mad2 = median(f2s.map(x => Math.abs(x - f2)));
    const ranked = classify(f1, f2);
    const best = ranked[0];
    const match = best.key === target;
    const unstable = mad1 > 130 || mad2 > 300;
    const ambiguous = ranked[1].distance - best.distance < 0.16;
    output.replaceChildren();
    const headline = document.createElement('div');
    const strong = document.createElement('strong');
    strong.textContent = unstable || ambiguous ? '判定保留（不確実）' : `${best.kana} ${best.ipa}`;
    headline.append('推定IPA候補：', strong);
    const detail = document.createElement('div');
    detail.textContent = `F1 約${Math.round(f1)} Hz / F2 約${Math.round(f2)} Hz（ばらつき F1±${Math.round(mad1)} / F2±${Math.round(mad2)} Hz、${readings.length}フレーム）`;
    const comparison = document.createElement('div');
    comparison.textContent = unstable || ambiguous
      ? `選択した母音：${vowels[target].kana} ${vowels[target].ipa} ／ ${unstable ? 'フレーム間の変動が大きいため判定保留' : '候補同士が近いため判定保留'}`
      : `選択した母音：${vowels[target].kana} ${vowels[target].ipa} ／ ${match ? '候補が一致しました' : '候補が異なりました'}`;
    const caution = document.createElement('small');
    caution.textContent = '※ 実験的な音響推定です。F1・F2は誤検出される場合があり、発音の正誤は判定できません。';
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
