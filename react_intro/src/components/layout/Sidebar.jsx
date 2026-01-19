import './Sidebar.css';

/**
 * Sidebar Component
 * Sidmeny för navigering mellan vyer
 * 
 * @param {Object} props - Component props
 * @param {Array<{id: string, label: string, icon?: string}>} props.items - Menypunkter
 * @param {string} props.activeItem - ID på aktiv menypunkt
 * @param {function} props.onItemClick - Callback när menypunkt klickas
 * @param {boolean} [props.isOpen=true] - Är menyn öppen
 * 
 * @example
 * <Sidebar
 *   items={[
 *     { id: 'timer', label: 'Timer', icon: '⏱️' },
 *     { id: 'history', label: 'Historik', icon: '📊' }
 *   ]}
 *   activeItem="timer"
 *   onItemClick={(id) => navigate(id)}
 * />
 */
export function Sidebar({ items = [], activeItem, onItemClick, isOpen = true }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
      <nav className="sidebar__nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={`sidebar__item ${activeItem === item.id ? 'sidebar__item--active' : ''}`}
            onClick={() => onItemClick(item.id)}
          >
            {item.icon && <span className="sidebar__icon">{item.icon}</span>}
            <span className="sidebar__label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
