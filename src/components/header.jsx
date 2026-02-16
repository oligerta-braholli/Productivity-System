import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/Header.css';

function Header() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [focusGoal, setFocusGoal] = useLocalStorage('todaysFocus', 'Deep Work');
  const [isEditingFocus, setIsEditingFocus] = useState(false);
  const [sessions] = useLocalStorage('sessions', []);

  // Initialize dark mode on mount
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Get time-based greeting
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get formatted date
  const getFormattedDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate streak (consecutive days with sessions)
  const getStreak = () => {
    if (!sessions || sessions.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let checkDate = new Date(today);
    
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const hasSession = sessions.some(session => 
        session.endTime && session.endTime.startsWith(dateStr)
      );
      
      if (hasSession) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Get today's total hours
  const getTodayHours = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaySessions = sessions.filter(session => 
      session.endTime && session.endTime.startsWith(today)
    );
    
    const totalMinutes = todaySessions.reduce((sum, session) => {
      return sum + (session.duration || 0);
    }, 0);
    
    return (totalMinutes / 60).toFixed(1);
  };

  const handleFocusEdit = () => {
    setIsEditingFocus(!isEditingFocus);
  };

  const handleFocusChange = (e) => {
    setFocusGoal(e.target.value);
  };

  const handleFocusBlur = () => {
    setIsEditingFocus(false);
  };

  const streak = getStreak();
  const todayHours = getTodayHours();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">Productivity System</h1>
          <div className="header-stats">
            {streak > 0 && (
              <div className="stat-badge streak">
                <span className="icon">🔥</span>
                <span className="value">{streak} day{streak !== 1 ? 's' : ''}</span>
              </div>
            )}
            <div className="stat-badge hours">
              <span className="icon">⏱️</span>
              <span className="value">{todayHours}h today</span>
            </div>
            <div className="stat-badge time">
              <span className="icon">🕐</span>
              <span className="value">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
        
        <div className="header-actions">
          <Link to="/timer" className="quick-btn">
            <span>🎯</span>
          </Link>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      
      <div className="welcome-section">
        <div className="greeting">
          <h2>{getGreeting()}!</h2>
          <p className="date">{getFormattedDate()}</p>
        </div>
        
        <div className="focus-section">
          {isEditingFocus ? (
            <input
              type="text"
              className="focus-input"
              value={focusGoal}
              onChange={handleFocusChange}
              onBlur={handleFocusBlur}
              autoFocus
              maxLength={30}
            />
          ) : (
            <button className="focus-tag" onClick={handleFocusEdit}>
              <span className="focus-icon">🎯</span>
              <span>Today's Focus: {focusGoal}</span>
              <span className="edit-icon">✏️</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header; 
