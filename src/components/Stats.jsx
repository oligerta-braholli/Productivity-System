  import Card from './Card';
import '../styles/Stats.css';

function Stats({ sessions = [] }) {
  // Beräkna total tid
  const totalTime = sessions.reduce((acc, session) => acc + session.duration, 0);
  
  // Beräkna antal sessioner
  const sessionCount = sessions.length;

  // Beräkna genomsnittlig energi (om tillgänglig)
  const avgEnergy = sessions.length > 0 
    ? (sessions.reduce((acc, s) => acc + (s.energy || 3), 0) / sessions.length).toFixed(1)
    : '0.0';

  // Formatera tid
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Hämta veckans data för graf (senaste 7 dagarna)
  const getWeekData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekData = days.map(day => ({
      day,
      hours: Math.floor(Math.random() * 6) // Placeholder data
    }));
    return weekData;
  };

  const weekData = getWeekData();

  return (
    <Card title="Today's Stats" className="stats-card">
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Total Time:</span>
          <span className="stat-value">{formatTime(totalTime)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Sessions:</span>
          <span className="stat-value">{sessionCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Avg Energy:</span>
          <span className="stat-value">
            {avgEnergy} {'⭐'.repeat(Math.round(parseFloat(avgEnergy)))}
          </span>
        </div>
      </div>

      <div className="week-chart">
        <h4>This Week</h4>
        <div className="chart-bars">
          {weekData.map((data, index) => (
            <div key={index} className="chart-bar-wrapper">
              <div 
                className="chart-bar" 
                style={{ height: `${data.hours * 20}px` }}
              />
              <span className="chart-label">{data.day}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default Stats;
