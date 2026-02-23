import { useState } from 'react';
import useEnergy from '../hooks/useEnergy';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/Energy.css';

function Energy() {
  const { energyLogs, logEnergy, getAverageEnergy } = useEnergy();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const energyLevels = [
    { level: 1, emoji: '😴', label: 'Exhausted' },
    { level: 2, emoji: '😐', label: 'Low' },
    { level: 3, emoji: '🙂', label: 'OK' },
    { level: 4, emoji: '😊', label: 'Good' },
    { level: 5, emoji: '🤩', label: 'Excellent' }
  ];

  const handleLogEnergy = () => {
    if (selectedLevel) {
      logEnergy(selectedLevel);
      setSelectedLevel(null);
    }
  };

  const avgEnergy7Days = getAverageEnergy(7);
  const avgEnergy30Days = getAverageEnergy(30);

  return (
    <div className="energy-page">
      <Card title="Energy Tracking" className="energy-card">
        <div className="energy-logger">
          <h3>How are you feeling?</h3>
          <div className="energy-levels">
            {energyLevels.map((item) => (
              <button
                key={item.level}
                className={`energy-btn ${selectedLevel === item.level ? 'selected' : ''}`}
                onClick={() => setSelectedLevel(item.level)}
              >
                <span className="energy-emoji">{item.emoji}</span>
                <span className="energy-label">{item.label}</span>
              </button>
            ))}
          </div>
          <Button 
            onClick={handleLogEnergy} 
            disabled={!selectedLevel}
            variant="primary"
          >
            Log Energy Level
          </Button>
        </div>

        <div className="energy-stats">
          <div className="stat-box">
            <h4>7-Day Average</h4>
            <div className="avg-energy">{avgEnergy7Days} / 5</div>
          </div>
          <div className="stat-box">
            <h4>30-Day Average</h4>
            <div className="avg-energy">{avgEnergy30Days} / 5</div>
          </div>
          <div className="stat-box">
            <h4>Total Logs</h4>
            <div className="avg-energy">{energyLogs.length}</div>
          </div>
        </div>

        <div className="energy-history">
          <h3>Recent Logs</h3>
          {energyLogs.length === 0 ? (
            <p className="no-logs">No energy logs yet</p>
          ) : (
            <div className="logs-list">
              {energyLogs
                .slice(-10)
                .reverse()
                .map((log) => (
                  <div key={log.id} className="log-item">
                    <span className="log-emoji">
                      {energyLevels[log.level - 1].emoji}
                    </span>
                    <span className="log-level">
                      Level {log.level}
                    </span>
                    <span className="log-date">
                      {new Date(log.timestamp).toLocaleString('sv-SE')}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Energy;
