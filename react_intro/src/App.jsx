import { useState } from 'react';
import './App.css';
import { Header, Sidebar, MainContent } from './components/layout';
import { Card, Button, Badge } from './components/common';

/**
 * App Component
 * Huvudkomponent för FocusFlow-applikationen
 * 
 * Vecka 2 - Grundläggande UI-struktur med:
 * - Header med navigation
 * - Sidebar med menypunkter
 * - MainContent för sidinnehål
 * - Återanvändbara komponenter
 */
function App() {
  const [activeView, setActiveView] = useState('timer');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items
  const navItems = [
    { id: 'timer', label: 'Timer', icon: '⏱️' },
    { id: 'history', label: 'Historik', icon: '📊' },
    { id: 'settings', label: 'Inställningar', icon: '⚙️' },
    { id: 'about', label: 'Om', icon: 'ℹ️' },
  ];

  const handleNavigation = (viewId) => {
    setActiveView(viewId);
    setSidebarOpen(false);
  };

  // Demo content för varje vy
  const renderContent = () => {
    switch (activeView) {
      case 'timer':
        return (
          <Card title="Tidsspårning">
            <p>Timer-komponent kommer här i Vecka 3</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <Badge variant="success">Aktivt</Badge>
              <Badge variant="info">Deep Work</Badge>
            </div>
          </Card>
        );
      case 'history':
        return (
          <Card title="Arbetshistorik">
            <p>Historik och statistik kommer här i Vecka 3</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <Badge variant="neutral">8h 30m</Badge>
              <Badge variant="warning">Genomsnitt</Badge>
            </div>
          </Card>
        );
      case 'settings':
        return (
          <Card title="Inställningar">
            <p>Inställningssida kommer här i Vecka 5</p>
            <Button variant="secondary">Spara ändringar</Button>
          </Card>
        );
      case 'about':
        return (
          <Card title="Om FocusFlow">
            <p><strong>FocusFlow</strong> v1.0 - Produktivitetsverktyg</p>
            <p>Vecka 1-2: Grundläggande UI</p>
            <p>Vecka 3-4: State-hantering</p>
            <p>Vecka 5-12: Avancerade funktioner</p>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Header 
        title="FocusFlow" 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        actions={<Badge variant="success">v1.0</Badge>}
      />
      
      <div className="app__layout">
        <Sidebar 
          items={navItems}
          activeItem={activeView}
          onItemClick={handleNavigation}
          isOpen={sidebarOpen}
        />
        
        <MainContent sidebarOpen={sidebarOpen}>
          <div className="app__welcome">
            <h1>Välkommen till FocusFlow! 👋</h1>
            <p>En produktivitetsapp för optimerad arbetsdagplanering</p>
            <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '1rem' }}>
              <strong>Vecka 2 Status:</strong> ✅ Grundläggande UI-struktur implementerad
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            {renderContent()}
          </div>

          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <Card title="Funktioner">
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li>⏱️ Tidsspårning</li>
                <li>📊 Energiloggning</li>
                <li>🎯 Fokuslägen</li>
                <li>⚙️ Inställningar</li>
              </ul>
            </Card>

            <Card title="Komponenter">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Button variant="primary" size="sm">Primary Button</Button>
                <Button variant="secondary" size="sm">Secondary Button</Button>
                <Button variant="danger" size="sm" disabled>Disabled Button</Button>
              </div>
            </Card>

            <Card title="Status Badges">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </Card>
          </div>
        </MainContent>
      </div>
    </div>
  );
}

export default App;
