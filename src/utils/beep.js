
let audioCtx = null;

export function initBeep() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export async function unlockBeep() {
  const ctx = initBeep();
  if (ctx.state === "suspended") {
    await ctx.resume(); // måste ske via klick
  }
  return ctx.state === "running";
}

export function playBeep({ durationMs = 800, frequency = 880 } = {}) {
  const ctx = initBeep();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = frequency;

  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + durationMs / 1000);
}
export function playContinuousBeep({ durationMs = 10000, frequency = 880 } = {}) {
  const ctx = initBeep();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = frequency;

  // mjuk start/stop så det inte klickar
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);

  const stopAt = ctx.currentTime + durationMs / 1000;
  gain.gain.exponentialRampToValueAtTime(0.0001, stopAt - 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(stopAt);
}
