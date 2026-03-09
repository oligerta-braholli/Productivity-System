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

  // Hämta verklig veckodata baserat på faktiska sessioner
  const getWeekData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    
    // Beräkna de senaste 7 dagarna
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i)); // Börja från 6 dagar sedan till idag
      return date;
    });
    
    const weekData = last7Days.map((date) => {
      // Hämta veckodag (Måndag = 0, Söndag = 6)
      const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
      const dayName = days[dayIndex];
      
      // Filtrera sessioner för denna specifika dag
      const daySessions = sessions.filter(session => {
        const sessionDate = new Date(session.timestamp);
        return sessionDate.toDateString() === date.toDateString();
      });
      
      // Summera varaktighet för dagen och konvertera till timmar
      const totalSeconds = daySessions.reduce((sum, s) => sum + s.duration, 0);
      const hours = totalSeconds / 3600;
      
      return {
        day: dayName,
        hours: hours
      };
    });
    
    return weekData;
  };

  const weekData = getWeekData();
  
  // Hitta max timmar för skalning
  const maxHours = Math.max(...weekData.map(d => d.hours), 1);

  return (
    <Card title="📊 Today's Stats" className="stats-card">
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
          {weekData.map((data, index) => {
            const barHeight = maxHours > 0 ? (data.hours / maxHours) * 55 : 0;
            const displayHours = data.hours.toFixed(1);
            
            // Kontrollera om detta är idag
            const isToday = index === 6; // Sista posten i arrayen är idag
            
            // Färggradient baserat på arbetade timmar
            const getBarColor = (hours) => {
              if (hours === 0) return 'rgba(255,255,255,0.3)';
              if (hours < 2) return 'linear-gradient(180deg, #e74c3c 0%, #c0392b 100%)'; // Röd - låg
              if (hours < 4) return 'linear-gradient(180deg, #f39c12 0%, #e67e22 100%)'; // Orange - medel
              if (hours < 6) return 'linear-gradient(180deg, #3498db 0%, #2980b9 100%)'; // Blå - bra
              return 'linear-gradient(180deg, #27ae60 0%, #229954 100%)'; // Grön - utmärkt
            };
            
            return (
              <div key={index} className={`chart-bar-wrapper ${isToday ? 'today' : ''}`}>
                <span className="bar-value">{displayHours}h</span>
                <div 
                  className="chart-bar" 
                  style={{ 
                    height: `${Math.max(barHeight, 3)}px`,
                    background: getBarColor(data.hours)
                  }}
                  title={`${displayHours} hours`}
                />
                <span className="chart-label">{data.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default Stats;
