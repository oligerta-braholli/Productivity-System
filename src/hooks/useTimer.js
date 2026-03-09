import { useState, useEffect, useRef } from 'react';

function useTimer() {
  // Läs initialstatus från localStorage
  const getInitial = (key, fallback) => {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : fallback;
  };

  const [time, setTime] = useState(() => getInitial('timer_time', 0));
  const [isRunning, setIsRunning] = useState(() => getInitial('timer_isRunning', false));
  const [isPaused, setIsPaused] = useState(() => getInitial('timer_isPaused', false));
  const intervalRef = useRef(null);

  // Spara status i localStorage varje gång det ändras
  useEffect(() => {
    localStorage.setItem('timer_time', JSON.stringify(time));
  }, [time]);
  useEffect(() => {
    localStorage.setItem('timer_isRunning', JSON.stringify(isRunning));
  }, [isRunning]);
  useEffect(() => {
    localStorage.setItem('timer_isPaused', JSON.stringify(isPaused));
  }, [isPaused]);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const start = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pause = () => {
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
  };

  const stop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  // Formatera tid till HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return {
    time,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    stop,
    reset,
    formatTime
  };
}

export default useTimer;
