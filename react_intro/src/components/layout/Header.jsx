import { useState } from 'react';
import './Header.css';
import { Button } from '../common/Button';

/**
 * Header Component
 * Övergripande header-komponent för applikationen
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Header-titel
 * @param {React.ReactNode} [props.actions] - Åtgärdsknappar i header
 * @param {function} [props.onMenuToggle] - Callback när meny-knappen klickas
 * 
 * @example
 * <Header 
 *   title="FocusFlow" 
 *   actions={<Button>Settings</Button>}
 * />
 */
export function Header({ title, actions, onMenuToggle }) {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <button 
            className="header__menu-toggle" 
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <h1 className="header__title">{title}</h1>
        </div>
        <div className="header__actions">
          {actions}
        </div>
      </div>
    </header>
  );
}

export default Header;
