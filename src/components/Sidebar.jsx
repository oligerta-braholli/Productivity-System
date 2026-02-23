import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/timer', label: 'Timer', icon: '⏱️' },
    { path: '/history', label: 'History', icon: '📊' },
    { path: '/energy', label: 'Energy', icon: '⚡' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>logo</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
