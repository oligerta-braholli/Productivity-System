
export function canNotify() {
  return "Notification" in window;
}

export async function ensureNotificationPermission() {
  if (!canNotify()) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;

  const res = await Notification.requestPermission();
  return res === "granted";
}

export function showNotification(title, body) {
  if (!canNotify()) return;
  if (Notification.permission !== "granted") return;

  new Notification(title, { body });
}
