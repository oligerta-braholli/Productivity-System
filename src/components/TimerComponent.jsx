import { useState } from 'react';
import useTimer from '../hooks/useTimer';
import Button from './Button';
import Card from './Card';
import Input from './Input';
import '../styles/Timer.css';

function TimerComponent({
  onSessionComplete,
  timer,
  sessionType: controlledSessionType,
  onSessionTypeChange
}) {
  const internalTimer = useTimer();
  const { time, isRunning, isPaused, start, pause, resume, stop, reset, formatTime } = timer ?? internalTimer;
  const [sessionType, setSessionType] = useState('deep-work');
  const [sessionTitle, setSessionTitle] = useState('');
  const activeSessionType = controlledSessionType ?? sessionType;
  const setSessionTypeValue = onSessionTypeChange ?? setSessionType;

  const handleStart = () => {
    start();
  };

  const handlePause = () => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  const handleStop = () => {
    if (time > 0 && onSessionComplete) {
      onSessionComplete({
        title: sessionTitle.trim() || 'Untitled Session',
        duration: time,
        type: activeSessionType,
        timestamp: new Date().toISOString()
      });
    }
    stop();
    setSessionTitle(''); // Reset title after stopping
  };


  return (
    <Card className="timer-card">
      <div className="timer-display">
        <div className={`time-text ${isRunning && !isPaused ? 'running' : ''}`}>{formatTime(time)}</div> 
      </div>
    </Card>
  );
}

export default TimerComponent;
