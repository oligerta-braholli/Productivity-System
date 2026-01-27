import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import TimerComponent from '../components/TimerComponent';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/TimerPage.css';

function TimerPage() {
  const [sessions, setSessions] = useLocalStorage('sessions', []);
  const [workStart, setWorkStart] = useState('08:00');
  const [workEnd, setWorkEnd] = useState('17:00');
  const [breaks, setBreaks] = useLocalStorage('breaks', []);
  const [newBreakStart, setNewBreakStart] = useState('');
  const [newBreakEnd, setNewBreakEnd] = useState('');
  const [breakDescription, setBreakDescription] = useState('');

  const handleSessionComplete = (session) => {
    setSessions([...sessions, { ...session, id: Date.now() }]);
  };

  const handleAddBreak = (e) => {
    e.preventDefault();
    if (newBreakStart && newBreakEnd) {
      const newBreak = {
        id: Date.now(),
        start: newBreakStart,
        end: newBreakEnd,
        description: breakDescription,
        date: new Date().toLocaleDateString('sv-SE')
      };
      setBreaks([...breaks, newBreak]);
      setNewBreakStart('');
      setNewBreakEnd('');
      setBreakDescription('');
    }
  };

  const todaysBreaks = breaks.filter(
    b => b.date === new Date().toLocaleDateString('sv-SE')
  );

  return (
    <div className="timer-page">
      <div className="timer-grid">
        <div className="timer-main">
          <TimerComponent onSessionComplete={handleSessionComplete} />
          
          <Card title="Arbetsdag" className="workday-card">
            <form className="workday-form">
              <div className="time-inputs">
                <Input
                  label="Start"
                  type="time"
                  value={workStart}
                  onChange={(e) => setWorkStart(e.target.value)}
                />
                <Input
                  label="Slut"
                  type="time"
                  value={workEnd}
                  onChange={(e) => setWorkEnd(e.target.value)}
                />
              </div>
            </form>
          </Card>
        </div>

        <div className="timer-sidebar">
          <Card title="Pauser" className="breaks-card">
            <form onSubmit={handleAddBreak} className="break-form">
              <Input
                label="Start tid"
                type="time"
                value={newBreakStart}
                onChange={(e) => setNewBreakStart(e.target.value)}
                required
              />
              <Input
                label="Slut tid"
                type="time"
                value={newBreakEnd}
                onChange={(e) => setNewBreakEnd(e.target.value)}
                required
              />
              <Input
                label="Beskrivning"
                type="text"
                value={breakDescription}
                onChange={(e) => setBreakDescription(e.target.value)}
                placeholder="t.ex. Kaffepaus"
              />
              <Button type="submit" variant="primary">
                Lägg till paus
              </Button>
            </form>

            <div className="breaks-list">
              <h4>Dagens pauser:</h4>
              {todaysBreaks.length === 0 ? (
                <p className="no-breaks">Inga pauser inlagda</p>
              ) : (
                <ul>
                  {todaysBreaks.map((break_) => (
                    <li key={break_.id} className="break-item">
                      <span className="break-time">
                        {break_.start} - {break_.end}
                      </span>
                      {break_.description && (
                        <span className="break-desc">{break_.description}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>

          <Card title="Rekommendationer" className="recommendations-card">
            <div className="recommendations">
              <div className="recommendation-item">
                <span className="rec-icon">💡</span>
                <p>Ta en paus var 90:e minut</p>
              </div>
              <div className="recommendation-item">
                <span className="rec-icon">🧘</span>
                <p>Stretcha under pauser</p>
              </div>
              <div className="recommendation-item">
                <span className="rec-icon">💧</span>
                <p>Kom ihåg att dricka vatten</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TimerPage;
