
import { useEffect, useRef } from "react";

function toDate(dateISO, timeHHmm) {
  // dateISO: "2026-02-02", timeHHmm: "15:26"
  // blir lokal tid
  return new Date(`${dateISO}T${timeHHmm}:00`);
}

export function useTimeblockReminders({ timeBlocks, enabled, onReminder }) {
  const timersRef = useRef([]);

  useEffect(() => {
    // rensa tidigare timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (!enabled) return;

    const now = Date.now();

    timeBlocks.forEach((tb) => {
      const startDate = toDate(tb.date, tb.start);
      const remindAt = new Date(
        startDate.getTime() - (tb.remindMinutesBefore ?? 0) * 60_000
      );

      const delay = remindAt.getTime() - now;
      if (delay <= 0) return;

      const id = setTimeout(() => onReminder?.(tb), delay);
      timersRef.current.push(id);
    });

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [timeBlocks, enabled, onReminder]);
}
