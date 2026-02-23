import { useState, useEffect } from 'react';
import useTimer from '../hooks/useTimer';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from './Button';
import '../styles/CircularTimer.css';

function CircularTimer({ onSessionComplete }) {
  const timer = useTimer();
  const [sessionType, setSessionType] = useLocalStorage('currentMode', 'Idle');
  const [sessionTitle, setSessionTitle] = useState('');

  // Update mode to Idle when timer stops
  useEffect(() => {
    if (!timer.isRunning && sessionType !== 'Idle') {
      setSessionType('Idle');
    }
  }, [timer.isRunning, sessionType, setSessionType]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const handleModeChange = (mode) => {
    setSessionType(mode);
    setSessionTitle(`${mode} Session`);
    
    if (timer.isRunning) {
      timer.stop();
    }
    timer.start();
  };

  const handleStop = () => {
    if (timer.isRunning && timer.time > 0) {
      const session = {
        title: sessionTitle || `${sessionType} Session`,
        duration: timer.time,
        timestamp: new Date().toISOString(),
        type: sessionType.toLowerCase().replace(' ', '-'),
      };
      
      if (onSessionComplete) {
        onSessionComplete(session);
      }
    }
    
    timer.stop();
    setSessionType('Idle');
    setSessionTitle('');
  };

  // Calculate progress for circular animation (60 minutes = full circle)
  const progress = Math.min((timer.time / 3600) * 360, 360);

  return (
    <div className="circular-timer-container">
      <div className="circular-timer">
        <svg className="timer-svg" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
          />
          
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${progress * 1.57} ${360 * 1.57}`}
            transform="rotate(-90 100 100)"
            className={timer.isRunning && !timer.isPaused ? 'timer-running' : ''}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="timer-content">
          <div className={`timer-display ${timer.isRunning && !timer.isPaused ? 'running' : ''}`}>
            {formatTime(timer.time)}
          </div>
          <div className="timer-status">
            {timer.isRunning ? (timer.isPaused ? 'Paused' : sessionType) : 'Ready'}
          </div>
        </div>
      </div>

      <div className="timer-controls-circular">
        {!timer.isRunning ? (
          <Button onClick={timer.start} variant="success" disabled={sessionType === 'Idle'}>
            Start
          </Button>
        ) : (
          <>
            <Button 
              onClick={timer.isPaused ? timer.resume : timer.pause} 
              variant="warning"
            >
              {timer.isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button onClick={handleStop} variant="danger">
              Stop
            </Button>
          </>
        )}
      </div>

      <div className="work-mode-buttons">
        <Button 
          onClick={() => handleModeChange('Deep Work')}
          variant={sessionType === 'Deep Work' ? 'primary' : 'secondary'}
          disabled={timer.isRunning}
        >
          🎯 Deep Work
        </Button>
        <Button 
          onClick={() => handleModeChange('Meeting')}
          variant={sessionType === 'Meeting' ? 'info' : 'secondary'}
          disabled={timer.isRunning}
        >
          👥 Meeting
        </Button>
        <Button 
          onClick={() => handleModeChange('Break')}
          variant={sessionType === 'Break' ? 'success' : 'secondary'}
          disabled={timer.isRunning}
        >
          ☕ Break
        </Button>
      </div>
    </div>
  );
}

export default CircularTimer;
