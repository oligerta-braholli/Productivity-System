import { useState, useEffect, useMemo } from 'react';
import useEnergy from '../hooks/useEnergy';
import '../styles/StatsBadges.css';

function StatsBadges({ sessions = [] }) {
  const { logEnergy } = useEnergy();
  const [showEnergyModal, setShowEnergyModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  // Läs direkt från localStorage för att säkerställa färsk data
  const getCurrentEnergy = () => {
    try {
      const stored = localStorage.getItem('currentEnergy');
      return stored ? JSON.parse(stored) : 3;
    } catch {
      return 3;
    }
  };

  // Hämtar nuvarande fokusläge från localStorage
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

  // Beräknar total tid för idag med useMemo
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

  // Uppdaterar badges varje sekund för att visa realtidsändringar
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEnergy(getCurrentEnergy());
      setCurrentMode(getCurrentMode());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Hämtar emoji för energinivå
  const getEnergyEmoji = (level) => {
    const emojis = ['😴', '😐', '🙂', '😊', '🤩'];
    return emojis[level - 1] || '🙂';
  };

  // Hämtar smart rekommendation baserat på energinivå
  const getRecommendation = (energy) => {
    if (energy === 1) {
      return 'You can do it. Keep going!';
    } else if (energy === 2) {
      return 'Don\'t stress. One thing at a time. You\'re doing great! ✨';
    } else if (energy === 3) {
      return 'Halfway there! Keep going, champ! 💪';
    } else if (energy === 4) {
      return 'Wow! You\'re doing great — So close, keep shining! 🌟';
    } else {
      return 'Great job! You did it! 🎉';
    }
  };

  // Hanterar val av energinivå
  const handleEnergySelect = (level) => {
    logEnergy(level);
    setCurrentEnergy(level);
    setShowEnergyModal(false);
    // Visar en notifikation vid lyckad uppdatering
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Lista över möjliga energinivåer
  const energyLevels = [
    { level: 1, emoji: '😴', label: 'Exhausted' },
    { level: 2, emoji: '😐', label: 'Low' },
    { level: 3, emoji: '🙂', label: 'OK' },
    { level: 4, emoji: '😊', label: 'Good' },
    { level: 5, emoji: '🤩', label: 'Excellent' }
  ];

  // Funktion för att hämta nästa rekommenderade aktivitet baserat på timer-status
  const getNextUpText = () => {
    const mode = getCurrentMode();
    if (mode === 'Deep Work' || mode === 'Meeting' || mode === 'Learning') {
      return 'Break for 10 min';
    } else if (mode === 'Break') {
      return 'Resume work session';
    } else {
      return 'Start your focus session';
    }
  };

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
        <div className="badge-icon">🔔</div>
        <div className="badge-content">
          <div className="badge-label">Next Up</div>
          <div className="badge-value">{getNextUpText()}</div>
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

    {/* Energival-modal */}
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

    {/* Lyckad notifikation */}
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
