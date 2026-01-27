import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import '../styles/History.css';

function History() {
  const [sessions] = useLocalStorage('sessions', []);
  const [filter, setFilter] = useState('all');

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('sv-SE', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredSessions = filter === 'all' 
    ? sessions 
    : sessions.filter(s => s.type === filter);

  const totalTime = filteredSessions.reduce((acc, s) => acc + s.duration, 0);

  return (
    <div className="history-page">
      <Card title="Session History" className="history-card">
        <div className="history-header">
          <div className="history-stats">
            <div className="stat">
              <span className="stat-label">Total Sessions:</span>
              <span className="stat-value">{filteredSessions.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Time:</span>
              <span className="stat-value">{formatDuration(totalTime)}</span>
            </div>
          </div>

          <div className="history-filters">
            <label>Filter:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Sessions</option>
              <option value="deep-work">Deep Work</option>
              <option value="meeting">Meetings</option>
              <option value="break">Breaks</option>
              <option value="learning">Learning</option>
            </select>
          </div>
        </div>

        <div className="sessions-list">
          {filteredSessions.length === 0 ? (
            <p className="no-sessions">No sessions found</p>
          ) : (
            <table className="sessions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map((session) => (
                    <tr key={session.id}>
                      <td>{formatDate(session.timestamp)}</td>
                      <td>
                        <span className={`session-type type-${session.type}`}>
                          {session.type}
                        </span>
                      </td>
                      <td>{formatDuration(session.duration)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}

export default History;
