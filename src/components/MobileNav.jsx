import React from 'react';
import { Home, Search, Library, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function MobileNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="mobile-tab-bar animate-fade-in delay-3">
      <Link to="/" className={`mobile-tab-item ${path === '/' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
        <Home size={24} />
        <span>Home</span>
      </Link>
      <Link to="/search" className={`mobile-tab-item ${path.startsWith('/search') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
        <Search size={24} />
        <span>Search</span>
      </Link>
      <Link to="/library" className={`mobile-tab-item ${path.startsWith('/library') || path.startsWith('/playlist') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
        <Library size={24} />
        <span>Library</span>
      </Link>
      <a href="https://spotify.com/premium" target="_blank" rel="noopener noreferrer" className="mobile-tab-item" style={{ textDecoration: 'none' }}>
        <Sparkles size={24} />
        <span>Premium</span>
      </a>
    </nav>
  );
}

export default MobileNav;
