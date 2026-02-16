import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useTimer from '../hooks/useTimer';
import Stats from '../components/Stats';
import TimerComponent from '../components/TimerComponent';
import QuickActions from '../components/QuickActions';
import Calendar from '../components/Calendar';
import Card from '../components/Card';
import '../styles/Dashboard.css';

function Dashboard() {
  const [sessions, setSessions] = useLocalStorage('sessions', []);
  const timer = useTimer();
  const [sessionType, setSessionType] = useState('deep-work');

  const handleSessionComplete = (session) => {
    setSessions([...sessions, { ...session, id: Date.now() }]);
  };

  const handleQuickAction = (actionId) => {
    setSessionType(actionId);

    if (timer.isPaused) {
      timer.resume();
      return;
    }

    if (timer.isRunning) {
      timer.stop();
      timer.start();
      return;
    }

    timer.start();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="dashboard-left">
          <Stats sessions={sessions} />
          <TimerComponent
            onSessionComplete={handleSessionComplete}
            timer={timer}
            sessionType={sessionType}
            onSessionTypeChange={setSessionType}
          />
        </div>
        
        <div className="dashboard-right">
          <QuickActions onActionClick={handleQuickAction} />
          
          <Calendar />

          <Card title="⚡ Energy Check" className="energy-card">
            <div className="energy-selector">
              <p>How are you feeling?</p>
              <div className="emoji-grid">
                {['😴', '😐', '🙂', '😊', '🤩'].map((emoji, index) => (
                  <button 
                    key={index} 
                    className="emoji-btn"
                    onClick={() => console.log('Energy level:', index + 1)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
