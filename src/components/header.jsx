import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/Header.css';


function Header() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('');

  // Fetch user name from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

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

  const getFormattedTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };


 
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">Work Flow</h1>
          <p className="header-subtitle">Plan your day with focus</p>
        </div>
        
        <div className="header-actions">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            {isDarkMode ? '🌙' : '☀️'}  
          </button>
        </div>
      </div>
      
      <div className="welcome-section">
        <div className="greeting">
          <h2>{getGreeting()} {userName ? userName.replace(/^"|"$/g, '') : ''}!</h2>
          <p className="date">{getFormattedDate()} • {getFormattedTime()}</p>
        </div>
      </div>

      <div className="header-accent" aria-hidden="true" />
    </header>
  );
}

export default Header; 
