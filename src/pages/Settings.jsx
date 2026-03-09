import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/Settings.css';

function Settings() {
  // Användarprofil
  const [userName, setUserName] = useLocalStorage('userName', '');
  const [dailyGoal, setDailyGoal] = useLocalStorage('dailyGoal', 8);
  
  // Tema
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  
  // Timerlängder (i minuter)
  const [deepWorkDuration, setDeepWorkDuration] = useLocalStorage('deepWorkDuration', 90);
  const [meetingDuration, setMeetingDuration] = useLocalStorage('meetingDuration', 30);
  const [breakDuration, setBreakDuration] = useLocalStorage('breakDuration', 15);
  
  // Notifikationer
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('notificationsEnabled', false);
  
  // Lokal state för redigering
  const [tempUserName, setTempUserName] = useState(userName);
  const [tempDailyGoal, setTempDailyGoal] = useState(dailyGoal);
  const [tempDeepWork, setTempDeepWork] = useState(deepWorkDuration);
  const [tempMeeting, setTempMeeting] = useState(meetingDuration);
  const [tempBreak, setTempBreak] = useState(breakDuration);

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const handleSaveProfile = () => {
    setUserName(tempUserName);
    setDailyGoal(Number(tempDailyGoal));
    alert('Profile saved successfully!');
  };

  const handleSaveTimerPreferences = () => {
    setDeepWorkDuration(Number(tempDeepWork));
    setMeetingDuration(Number(tempMeeting));
    setBreakDuration(Number(tempBreak));
    alert('Timer preferences saved successfully!');
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear ALL data? This action cannot be undone!')) {
      localStorage.clear();
      alert('All data has been cleared. The page will reload.');
      window.location.reload();
    }
  };

  const handleExportData = () => {
    const data = {
      sessions: JSON.parse(localStorage.getItem('sessions') || '[]'),
      energyLogs: JSON.parse(localStorage.getItem('energyLogs') || '[]'),
      timeBlocks: JSON.parse(localStorage.getItem('timeBlocks') || '[]'),
      settings: {
        userName,
        dailyGoal,
        darkMode,
        deepWorkDuration,
        meetingDuration,
        breakDuration,
        notificationsEnabled
      },
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `productivity-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="settings-page">
      {/* Profilinställningar */}
      <Card title="👤 Profile Settings" className="settings-card">
        <div className="settings-section">
          <Input
            label="Your Name"
            type="text"
            value={tempUserName}
            onChange={(e) => setTempUserName(e.target.value)}
            placeholder="Enter your name"
          />
          
          <Input
            label="Daily Goal (hours)"
            type="number"
            value={tempDailyGoal}
            onChange={(e) => setTempDailyGoal(e.target.value)}
            min="1"
            max="24"
          />
          
          <Button onClick={handleSaveProfile} variant="primary">
            Save Profile
          </Button>
        </div>
      </Card>

      {/* Utseendeinställningar */}
      <Card title="🎨 Appearance" className="settings-card">
        <div className="settings-section">
          <div className="setting-item">
            <div className="setting-info">
              <label className="setting-label">Dark Mode</label>
              <p className="setting-description">Toggle between light and dark theme</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={handleThemeToggle}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </Card>

      {/* Timerinställningar */}
      <Card title="⏱️ Timer Preferences" className="settings-card">
        <div className="settings-section">
          <Input
            label="Deep Work Duration (minutes)"
            type="number"
            value={tempDeepWork}
            onChange={(e) => setTempDeepWork(e.target.value)}
            min="15"
            max="180"
          />
          
          <Input
            label="Meeting Duration (minutes)"
            type="number"
            value={tempMeeting}
            onChange={(e) => setTempMeeting(e.target.value)}
            min="5"
            max="120"
          />
          
          <Input
            label="Break Duration (minutes)"
            type="number"
            value={tempBreak}
            onChange={(e) => setTempBreak(e.target.value)}
            min="5"
            max="60"
          />
          
          <Button onClick={handleSaveTimerPreferences} variant="primary">
            Save Timer Preferences
          </Button>
        </div>
      </Card>

      {/* Notifikationer */}
      <Card title="🔔 Notifications" className="settings-card">
        <div className="settings-section">
          <div className="setting-item">
            <div className="setting-info">
              <label className="setting-label">Enable Notifications</label>
              <p className="setting-description">Get reminders when timer ends</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </Card>

      {/* Datahantering */}
      <Card title="💾 Data Management" className="settings-card">
        <div className="settings-section">
          <div className="data-actions">
            <Button onClick={handleExportData} variant="info">
              📥 Export Data
            </Button>
            
            <Button onClick={handleClearAllData} variant="danger">
              🗑️ Clear All Data
            </Button>
          </div>
          
          <p className="data-info">
            Export your data to save a backup, or clear all data to start fresh.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Settings;
