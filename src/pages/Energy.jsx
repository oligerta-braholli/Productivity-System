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

  const getEnergyColor = (level) => {
    if (level >= 4.5) return '#27ae60'; // Excellent - Green
    if (level >= 3.5) return '#3498db'; // Good - Blue
    if (level >= 2.5) return '#f39c12'; // OK - Orange
    if (level >= 1.5) return '#e67e22'; // Low - Dark Orange
    return '#e74c3c'; // Exhausted - Red
  };

  const avgEnergy7Days = getAverageEnergy(7);
  const avgEnergy30Days = getAverageEnergy(30);

  // Group energy logs by date and calculate daily averages
  const getChartData = (days = 14) => {
    const now = new Date();
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateString = date.toLocaleDateString('en-US');
      
      const logsForDay = energyLogs.filter(log => log.date === dateString);
      const avgLevel = logsForDay.length > 0
        ? logsForDay.reduce((sum, log) => sum + log.level, 0) / logsForDay.length
        : 0;
      
      data.push({
        date: dateString,
        shortDate: `${date.getDate()}/${date.getMonth() + 1}`,
        level: avgLevel,
        count: logsForDay.length
      });
    }
    
    return data;
  };

  const chartData = getChartData(14);

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

        <div className="energy-chart">
          <h3>Energy Trend (Last 14 Days)</h3>
          {energyLogs.length === 0 ? (
            <p className="no-chart-data">No data to display. Start logging your energy!</p>
          ) : (
            <div className="chart-container">
              <div className="chart-y-axis">
                <span>5</span>
                <span>4</span>
                <span>3</span>
                <span>2</span>
                <span>1</span>
              </div>
              <div className="chart-bars">
                {chartData.map((day, index) => (
                  <div key={index} className="chart-bar-wrapper">
                    <div className="chart-bar-container">
                      <div 
                        className={`chart-bar ${day.count > 0 ? 'has-data' : 'no-data'}`}
                        style={{ 
                          height: `${(day.level / 5) * 100}%`,
                          backgroundColor: day.count > 0 ? getEnergyColor(day.level) : '#ecf0f1'
                        }}
                        title={`${day.shortDate}: ${day.count > 0 ? day.level.toFixed(1) : 'No data'}`}
                      >
                        {day.count > 0 && (
                          <span className="bar-value">{day.level.toFixed(1)}</span>
                        )}
                      </div>
                    </div>
                    <span className="chart-label">{day.shortDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                      {new Date(log.timestamp).toLocaleString('en-US')}
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
