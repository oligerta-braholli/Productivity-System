import { useState } from 'react';
import useTimer from '../hooks/useTimer';
import Button from './Button';
import Card from './Card';
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
        duration: time,
        type: activeSessionType,
        timestamp: new Date().toISOString()
      });
    }
    stop();
  };


  return (
    <Card title="Timer" className="timer-card">
      <div className="timer-display">
        <div className="time-text">{formatTime(time)}</div>
      </div>

      <div className="session-type">
        <label>Session Type:</label>
        <select 
          value={activeSessionType} 
          onChange={(e) => setSessionTypeValue(e.target.value)}
          disabled={isRunning}
        >
          <option value="deep-work">Deep Work</option>
          <option value="meeting">Meeting</option>
          <option value="break">Break</option>
          <option value="learning">Learning</option>
        </select>
      </div>

      <div className="timer-controls">
        <Button 
          onClick={handleStart} 
          variant="success"
          disabled={isRunning}
        >
          Start
        </Button>
        
        <Button 
          onClick={handlePause} 
          variant="warning"
          disabled={!isRunning}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
        
        <Button 
          onClick={handleStop} 
          variant="danger"
          disabled={!isRunning && time === 0}
        >
          Stop
        </Button>
        
        <Button 
          onClick={reset} 
          variant="secondary"
          disabled={time === 0 && !isRunning}
        >
          Reset
        </Button>
      </div>

      <div className="timer-status">
        {isRunning && !isPaused && <span className="status-running">● Running</span>}
        {isPaused && <span className="status-paused">⏸ Paused</span>}
        {!isRunning && time === 0 && <span className="status-idle">Ready</span>}
      </div>
    </Card>
  );
}

export default TimerComponent;
