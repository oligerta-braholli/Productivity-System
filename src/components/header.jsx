import { useState } from 'react';
import '../styles/Header.css';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Personalized Productivity System</h1>
        <div className="header-actions">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="settings-btn" aria-label="Settings">
            ⚙️
          </button>
        </div>
      </div>
      <div className="welcome-section">
        <h2>Welcome, User!</h2>
        <div className="focus-tag">
          <span>Today's Focus: Deep Work</span>
        </div>
      </div>
    </header>
  );
}

export default Header; 
