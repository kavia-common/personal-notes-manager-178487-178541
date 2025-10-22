import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NavBar - Top navigation bar showing app title and actions.
 */
export interface NavBarProps {
  onNew: () => void;
  onToggleSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onNew, onToggleSidebar }) => {
  return (
    <nav className="navbar" aria-label="Top navigation">
      <div className="navbar-inner">
        <div className="brand" role="img" aria-label="Ocean Professional brand">
          <div className="brand-logo" />
          <div className="brand-title">Ocean Notes</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn btn-secondary"
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
          >
            ☰
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <button
            className="btn"
            onClick={onNew}
            aria-label="Create a new note (Ctrl/Cmd+N)"
            title="New note (Ctrl/Cmd+N)"
          >
            ＋ New Note
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
