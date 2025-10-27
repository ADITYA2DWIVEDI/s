import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavItem: React.FC<{ to: string; icon: string; text: string; isCollapsed: boolean; onClick: () => void; }> = ({ to, icon, text, isCollapsed, onClick }) => {
  const baseClass = 'flex items-center text-text-light hover:bg-white/10 rounded-xl transition-all duration-200';
  const linkClass = `${baseClass} ${isCollapsed ? 'justify-center w-12 h-12' : 'p-3'}`;
  const iconClass = `fa-fw ${icon} ${isCollapsed ? 'text-xl' : 'text-lg'}`;
  
  return (
    <NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => 
        `${linkClass} ${isActive ? 'bg-accent/90 text-white shadow-[0_0_15px_var(--accent-glow)]' : ''}`
      }
      title={text}
    >
      <i className={iconClass}></i>
      <span className={`ml-4 whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>{text}</span>
    </NavLink>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setCollapsed, isMobileOpen, setMobileOpen }) => {
  const sidebarClasses = `fixed top-0 left-0 h-full bg-sidebar-bg text-white z-50 transition-all duration-300 ease-in-out flex flex-col p-4 
    ${isCollapsed ? 'w-20' : 'w-64'}
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0
  `;

  const externalLinkClasses = `flex items-center text-text-light hover:bg-white/10 rounded-xl transition-all duration-200 ${isCollapsed ? 'justify-center w-12 h-12' : 'p-3'}`;
  const iconClasses = `fa-fw fas fa-graduation-cap ${isCollapsed ? 'text-xl' : 'text-lg'}`;

  const handleLinkClick = () => {
    setMobileOpen(false);
  }

  const handleCollapseClick = () => {
    setCollapsed(!isCollapsed);
    setMobileOpen(false);
  }

  return (
    <aside className={sidebarClasses}>
      <div className={`flex items-center gap-3 mb-10 h-10 ${isCollapsed ? 'justify-center' : 'justify-start pl-2'}`}>
        <i className="fas fa-biohazard text-accent text-3xl"></i>
        <span className={`text-2xl font-bold whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>SnakeEngine</span>
      </div>

      <nav className="flex-grow flex flex-col gap-2">
        <h3 className={`text-muted-light text-xs font-semibold uppercase tracking-wider mb-2 ${isCollapsed ? 'text-center' : 'px-3'}`}>Main</h3>
        <NavItem to="/" icon="fas fa-home" text="Home" isCollapsed={isCollapsed} onClick={handleLinkClick} />
        <NavItem to="/ai-studio" icon="fas fa-brain" text="AI Studio" isCollapsed={isCollapsed} onClick={handleLinkClick} />
        <a href="https://snakeengine.vercel.app" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick} className={externalLinkClasses} title="Courses">
          <i className={iconClasses}></i>
          <span className={`ml-4 whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>Courses</span>
        </a>
        
        <h3 className={`text-muted-light text-xs font-semibold uppercase tracking-wider mt-6 mb-2 ${isCollapsed ? 'text-center' : 'px-3'}`}>Admin</h3>
        <NavItem to="/login" icon="fas fa-sign-out-alt" text="Sign Out" isCollapsed={isCollapsed} onClick={handleLinkClick} />
      </nav>

      <div className="mt-auto">
        <button onClick={handleCollapseClick} className="w-full flex items-center bg-white/5 hover:bg-white/10 text-text-light p-3 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
          <i className={`fas ${isCollapsed ? 'fa-angle-right' : 'fa-angle-left'}`}></i>
          <span className={`ml-4 whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>Collapse</span>
        </button>
      </div>
    </aside>
  );
};
