import { useState, useEffect, useMemo } from 'react';
import useEnergy from '../hooks/useEnergy';
import '../styles/StatsBadges.css';

function StatsBadges({ sessions = [] }) {
  const { logEnergy } = useEnergy();
  const [showEnergyModal, setShowEnergyModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  // Read directly from localStorage to ensure fresh data
  const getCurrentEnergy = () => {
    try {
      const stored = localStorage.getItem('currentEnergy');
      return stored ? JSON.parse(stored) : 3;
    } catch {
      return 3;
    }
  };

  const getCurrentMode = () => {
    try {
      const stored = localStorage.getItem('currentMode');
      return stored ? JSON.parse(stored) : 'Idle';
    } catch {
      return 'Idle';
    }
  };

  const [currentEnergy, setCurrentEnergy] = useState(getCurrentEnergy());
  const [currentMode, setCurrentMode] = useState(getCurrentMode());

  // Calculate total time for today using useMemo
  const totalTime = useMemo(() => {
    const today = new Date().toLocaleDateString('en-US');
    const todaySessions = sessions.filter(
      session => new Date(session.timestamp).toLocaleDateString('en-US') === today
    );
    const totalSeconds = todaySessions.reduce((acc, session) => acc + session.duration, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }, [sessions]);

  // Update badges every second to reflect real-time changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEnergy(getCurrentEnergy());
      setCurrentMode(getCurrentMode());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get energy emoji
  const getEnergyEmoji = (level) => {
    const emojis = ['😴', '😐', '🙂', '😊', '🤩'];
    return emojis[level - 1] || '🙂';
  };

  // Get smart recommendation based on energy
  const getRecommendation = (energy) => {
    if (energy === 1) {
      return 'Remember: All is in your mind. You can do it!';
    } else if (energy === 2) {
      return 'Don\'t stress. One thing at a time. You\'re doing great! ✨';
    } else if (energy === 3) {
      return 'Halfway there! Keep going, champ! 💪';
    } else if (energy === 4) {
      return 'Wow! You\'re doing great — So close, keep shining! 🌟';
    } else {
      return 'Great job! See… the real power is in your mind. You did it! 🎉';
    }
  };

  // Handle energy level selection
  const handleEnergySelect = (level) => {
    logEnergy(level);
    setCurrentEnergy(level);
    setShowEnergyModal(false);
    
    // Show success notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const energyLevels = [
    { level: 1, emoji: '😴', label: 'Exhausted' },
    { level: 2, emoji: '😐', label: 'Low' },
    { level: 3, emoji: '🙂', label: 'OK' },
    { level: 4, emoji: '😊', label: 'Good' },
    { level: 5, emoji: '🤩', label: 'Excellent' }
  ];

  return (
    <>
      <div className="stats-badges">
      <div className="stat-badge">
        <div className="badge-icon">⏱️</div>
        <div className="badge-content">
          <div className="badge-label">Total Time</div>
          <div className="badge-value">{totalTime || '0h 0m'}</div>
        </div>
      </div>

      <div className="stat-badge">
        <div className="badge-icon">🎯</div>
        <div className="badge-content">
          <div className="badge-label">Focus Mode</div>
          <div className="badge-value">{currentMode}</div>
        </div>
      </div>

      <div className="stat-badge energy-badge-clickable" onClick={() => setShowEnergyModal(true)}>
        <div className="badge-icon">{getEnergyEmoji(currentEnergy)}</div>
        <div className="badge-content">
          <div className="badge-label">Energy Level</div>
          <div className="badge-value">Level {currentEnergy}</div>
        </div>
        <div className="badge-hint">Click to update</div>
      </div>

      <div className="stat-badge recommendation-badge">
        <div className="badge-icon">💡</div>
        <div className="badge-content">
          <div className="badge-label">Recommendation</div>
          <div className="badge-value">{getRecommendation(currentEnergy)}</div>
        </div>
      </div>
    </div>

    {/* Energy Selection Modal */}
    {showEnergyModal && (
      <div className="energy-modal-overlay" onClick={() => setShowEnergyModal(false)}>
        <div className="energy-modal" onClick={(e) => e.stopPropagation()}>
          <h3>How are you feeling? 💭</h3>
          <p className="modal-subtitle">Select your current energy level</p>
          <div className="energy-modal-options">
            {energyLevels.map((item) => (
              <button
                key={item.level}
                className={`energy-modal-btn ${currentEnergy === item.level ? 'current' : ''}`}
                onClick={() => handleEnergySelect(item.level)}
              >
                <span className="modal-emoji">{item.emoji}</span>
                <span className="modal-label">{item.label}</span>
                <span className="modal-level">Level {item.level}</span>
              </button>
            ))}
          </div>
          <button className="modal-close" onClick={() => setShowEnergyModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* Success Notification */}
    {showNotification && (
      <div className="energy-notification">
        <span className="notification-icon">✨</span>
        <span className="notification-text">
          Energy level updated! {getRecommendation(currentEnergy)}
        </span>
      </div>
    )}
  </>
  );
}

export default StatsBadges;
