import React from 'react';
import { Home, Search, Library } from 'lucide-react';
import { Link } from 'react-router-dom';

function MobileNav() {
  return (
    <nav className="mobile-tab-bar animate-fade-in delay-3">
      <Link to="/" className="mobile-tab-item active" style={{ textDecoration: 'none' }}>
        <Home size={24} />
        <span>Home</span>
      </Link>
      <Link to="/search" className="mobile-tab-item" style={{ textDecoration: 'none' }}>
        <Search size={24} />
        <span>Search</span>
      </Link>
      <Link to="/library" className="mobile-tab-item" style={{ textDecoration: 'none' }}>
        <Library size={24} />
        <span>Library</span>
      </Link>
    </nav>
  );
}

export default MobileNav;
