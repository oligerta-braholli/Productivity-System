import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/History.css';

function History() {
  const [sessions, setSessions] = useLocalStorage('sessions', []);
  const [filter, setFilter] = useState('all');
  const [editingSession, setEditingSession] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', type: '' });

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
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

  const handleDelete = (sessionId) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      setSessions(sessions.filter(s => s.id !== sessionId));
    }
  };

  const handleEdit = (session) => {
    setEditingSession(session.id);
    setEditForm({
      title: session.title || '',
      type: session.type
    });
  };

  const handleSaveEdit = (sessionId) => {
    setSessions(sessions.map(s => 
      s.id === sessionId 
        ? { ...s, title: editForm.title.trim() || 'Untitled Session', type: editForm.type }
        : s
    ));
    setEditingSession(null);
  };

  const handleCancelEdit = () => {
    setEditingSession(null);
    setEditForm({ title: '', type: '' });
  };

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
            <>
              <table className="sessions-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSessions
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .map((session) => (
                      <tr key={session.id}>
                        <td className="session-title">
                          {editingSession === session.id ? (
                            <input
                              type="text"
                              value={editForm.title}
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                              className="edit-input"
                            />
                          ) : (
                            session.title || 'Untitled Session'
                          )}
                        </td>
                        <td>{formatDate(session.timestamp)}</td>
                        <td>
                          {editingSession === session.id ? (
                            <select
                              value={editForm.type}
                              onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                              className="edit-select"
                            >
                              <option value="deep-work">Deep Work</option>
                              <option value="meeting">Meeting</option>
                              <option value="break">Break</option>
                              <option value="learning">Learning</option>
                            </select>
                          ) : (
                            <span className={`session-type type-${session.type}`}>
                              {session.type}
                            </span>
                          )}
                        </td>
                        <td>{formatDuration(session.duration)}</td>
                        <td className="session-actions">
                          {editingSession === session.id ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(session.id)}
                                className="action-btn save-btn"
                                title="Save"
                              >
                                ✓
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="action-btn cancel-btn"
                                title="Cancel"
                              >
                                ✕
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(session)}
                                className="action-btn edit-btn"
                                title="Edit"
                              >
                                ✎
                              </button>
                              <button
                                onClick={() => handleDelete(session.id)}
                                className="action-btn delete-btn"
                                title="Delete"
                              >
                                🗑
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="sessions-cards">
                {filteredSessions
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map((session) => (
                    <div className="session-card" key={session.id}>
                      {editingSession === session.id ? (
                        <>
                          <div className="session-card-row session-card-title">
                            <Input
                              label="Title"
                              type="text"
                              value={editForm.title}
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            />
                          </div>
                          <div className="session-card-row">
                            <span className="session-card-label">Type</span>
                            <select
                              value={editForm.type}
                              onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                              className="edit-select-mobile"
                            >
                              <option value="deep-work">Deep Work</option>
                              <option value="meeting">Meeting</option>
                              <option value="break">Break</option>
                              <option value="learning">Learning</option>
                            </select>
                          </div>
                          <div className="session-card-actions">
                            <Button onClick={() => handleSaveEdit(session.id)} variant="success">
                              Save
                            </Button>
                            <Button onClick={handleCancelEdit} variant="secondary">
                              Cancel
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="session-card-row session-card-title">
                            <strong>{session.title || 'Untitled Session'}</strong>
                          </div>
                          <div className="session-card-row">
                            <span className="session-card-label">Date</span>
                            <span className="session-card-value">
                              {formatDate(session.timestamp)}
                            </span>
                          </div>
                          <div className="session-card-row">
                            <span className="session-card-label">Type</span>
                            <span className={`session-type type-${session.type}`}>
                              {session.type}
                            </span>
                          </div>
                          <div className="session-card-row">
                            <span className="session-card-label">Duration</span>
                            <span className="session-card-value">
                              {formatDuration(session.duration)}
                            </span>
                          </div>
                          <div className="session-card-actions">
                            <Button onClick={() => handleEdit(session)} variant="primary">
                              Edit
                            </Button>
                            <Button onClick={() => handleDelete(session.id)} variant="danger">
                              Delete
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default History;
