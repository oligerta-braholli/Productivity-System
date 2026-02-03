

import { useCallback, useMemo, useState,  useRef } from "react";
import Card from "./Card";
import useLocalStorage from "../hooks/useLocalStorage";
import "../styles/Calendar.css";

import { useTimeblockReminders } from "../hooks/useTimeblockReminders";
import { unlockBeep, playBeep } from "../utils/beep";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

const alarmIntervalRef = useRef(null);
const alarmStopTimeoutRef = useRef(null);

  const [timeBlocks, setTimeBlocks] = useLocalStorage("timeBlocks", []);
  const [newBlockStart, setNewBlockStart] = useState("");
  const [newBlockEnd, setNewBlockEnd] = useState("");
  const [newBlockTitle, setNewBlockTitle] = useState("");

  // Alarm inställningar
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [remindSecondsBefore, setRemindSecondsBefore] = useState(12);

function stopAlarmLoop() {
  if (alarmIntervalRef.current) {
    clearInterval(alarmIntervalRef.current);
    alarmIntervalRef.current = null;
  }
  if (alarmStopTimeoutRef.current) {
    clearTimeout(alarmStopTimeoutRef.current);
    alarmStopTimeoutRef.current = null;
  }
}

function startAlarmLoop({ intervalMs = 900, totalMs = 15000  } = {}) {
  // stoppa ev. gammalt alarm först
  stopAlarmLoop();

  // pip direkt
  playBeep({ durationMs: 250, frequency: 880 });

  // sen pip flera gånger
  alarmIntervalRef.current = setInterval(() => {
    playBeep({ durationMs: 250, frequency: 880 });
  }, intervalMs);

  // auto-stop efter totalMs (t.ex. 15 sek)
  alarmStopTimeoutRef.current = setTimeout(() => {
    stopAlarmLoop();
  }, totalMs);
}


  // ===== Kalender-funktioner =====
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const dayNames = ["M", "T", "O", "T", "F", "L", "S"];

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDate = (day) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleDayClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const renderCalendarDays = () => {
    const days = [];

    // tomma rutor innan månaden startar (mån = 0 i vår vy)
    const startDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday(day) ? "today" : ""} ${isSelectedDate(day) ? "selected" : ""}`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // ===== Tidsblock =====
  const selectedDateISO = selectedDate.toISOString().split("T")[0];

  const selectedBlocks = useMemo(() => {
    return timeBlocks.filter((b) => b.date === selectedDateISO);
  }, [timeBlocks, selectedDateISO]);

  const handleAddTimeBlock = (e) => {
    e.preventDefault();

    if (!newBlockStart || !newBlockEnd || !newBlockTitle) return;

    const newBlock = {
      id: Date.now(),
      date: selectedDateISO,
      start: newBlockStart,
      end: newBlockEnd,
      title: newBlockTitle,
      remindSecondsBefore: Number(remindSecondsBefore) || 1,
    };

    setTimeBlocks([...timeBlocks, newBlock]);

    setNewBlockStart("");
    setNewBlockEnd("");
    setNewBlockTitle("");
  };

  const deleteTimeBlock = (id) => {
    setTimeBlocks(timeBlocks.filter((block) => block.id !== id));
  };

  // ===== Alarm: toggle =====
  async function toggleAlarm() {
    if (alarmEnabled) {
      setAlarmEnabled(false);

 stopAlarmLoop(); // ✅ stoppa pipet direkt

      return;
    }

    // Måste klickas för att ljud ska funka senare
    const ok = await unlockBeep();
    if (!ok) {
      alert("Kunde inte aktivera ljud. Kolla att fliken inte är mute och prova igen.");
      return;
    }

    // Liten test-signal
    playBeep({ durationMs: 15000, frequency: 880 });

    setAlarmEnabled(true);
  }

  // ===== Reminders: schemalägg bara för vald dag =====
  const futureBlocksForSelectedDay = useMemo(() => {
    const now = Date.now();

    return selectedBlocks.filter((tb) => {
      const startMs = new Date(`${tb.date}T${tb.start}:00`).getTime();
      const remindAtMs = startMs - (tb.remindSecondsBefore ?? 1) * 1000;
      return remindAtMs > now;
    });
  }, [selectedBlocks]);

  const onReminder = useCallback((tb) => {
    // Spela alarm endast om alarm är på
    if (!alarmEnabled) return;


      const endAt = Date.now() + 10000; // 10 sek
  const interval = setInterval(() => {
    playBeep({ durationMs: 200, frequency: 880 });
    if (Date.now() >= endAt) clearInterval(interval);
  }, 700);

   //playContinuousBeep({ durationMs: 10000, frequency: 880 });
     // ✅ pipar flera gånger i 15 sek (ändra totalMs om du vill)
 // startAlarmLoop({ intervalMs: 900, totalMs: 15000 });

    console.log("ALARM:", tb.title);
  }, [alarmEnabled]);

  useTimeblockReminders({
    timeBlocks: futureBlocksForSelectedDay,
    enabled: alarmEnabled,
    onReminder,
  });

  // ===== UI =====
  return (
    <Card title="Kalender & Tidsblock" className="calendar-card">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)} className="month-nav">←</button>

        <h3>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>

        <button onClick={toggleAlarm} className="month-nav" title="Alarm på/av">
          {alarmEnabled ? "🔔" : "🔕"}
        </button>

        <button onClick={() => changeMonth(1)} className="month-nav">→</button>
      </div>

      <div className="calendar-weekdays">
        {dayNames.map((day) => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-days">
        {renderCalendarDays()}
      </div>

      <div className="time-blocks-section">
        <h4>
          Tidsblock för {selectedDate.toLocaleDateString("sv-SE", { day: "numeric", month: "long" })}
        </h4>

        <form onSubmit={handleAddTimeBlock} className="add-block-form">
          <input
            type="time"
            value={newBlockStart}
            onChange={(e) => setNewBlockStart(e.target.value)}
            required
            placeholder="Start"
          />

          <input
            type="time"
            value={newBlockEnd}
            onChange={(e) => setNewBlockEnd(e.target.value)}
            required
            placeholder="Slut"
          />

          <input
            type="text"
            value={newBlockTitle}
            onChange={(e) => setNewBlockTitle(e.target.value)}
            required
            placeholder="Aktivitet..."
          />

          <input
            type="number"
            min="0"
            value={remindSecondsBefore}
            onChange={(e) => setRemindSecondsBefore(e.target.value)}
            placeholder="sek innan"
            title="Påminnelse (sekunder innan)"
          />

          <button type="submit" className="add-block-btn">+</button>
        </form>

        <div className="time-blocks-list">
          {selectedBlocks.length === 0 ? (
            <p className="no-blocks">Inga tidsblock för denna dag</p>
          ) : (
            selectedBlocks.map((block) => (
              <div key={block.id} className="time-block-item">
                <div className="block-time">{block.start} - {block.end}</div>
                <div className="block-title">{block.title}</div>
                <button
                  onClick={() => deleteTimeBlock(block.id)}
                  className="delete-block-btn"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}

export default Calendar;
