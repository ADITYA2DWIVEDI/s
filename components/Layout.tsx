import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false); // Close mobile menu on resize to desktop
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mainContentClasses = `flex-grow transition-all duration-300 ease-in-out ${
    isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
  }`;

  return (
    <div className="flex min-h-screen bg-transparent text-text-dark relative">
       {/* Mobile Menu Button */}
       <button 
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-sidebar-bg/80 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        aria-label="Open navigation menu"
       >
         <i className="fas fa-bars"></i>
       </button>

      {/* Backdrop Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setCollapsed={setSidebarCollapsed}
        isMobileOpen={isMobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />
      <main className={mainContentClasses}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
