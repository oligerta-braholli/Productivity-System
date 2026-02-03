let audio = null;
let unlocked = false;

export function isAlarmUnlocked() {
  return unlocked;
}

export async function unlockAlarmSound() {
  if (!audio) {
    audio = new Audio("/alarm.mp3");
    audio.preload = "auto";
    audio.volume = 1.0;
  }

  // Måste triggas via klick
  try {
    audio.muted = true;
    await audio.play();
    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
    unlocked = true;
    console.log("[sound] unlocked OK");
    return true;
  } catch (err) {
    unlocked = false;
    console.log("[sound] unlock FAILED:", err);
    return false;
  }
}

export async function playAlarmSound({ loop = false } = {}) {
  if (!audio) {
    audio = new Audio("/alarm.mp3");
    audio.preload = "auto";
    audio.volume = 1.0;
  }
  audio.loop = loop;
  audio.muted = false;
  audio.currentTime = 0;
  await audio.play();
}

export function stopAlarmSound() {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  audio.loop = false;
}
