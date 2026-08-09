import React from 'react';
import { Home, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

function SidebarNav() {
  return (
    <div style={{ padding: '32px 24px 8px 24px', display: 'flex', flexDirection: 'column', gap: '20px', fontWeight: 500 }} className="animate-fade-in delay-1">
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }} className="hover-white">
        <Home size={24} />
        <span style={{ fontSize: '1rem' }}>Home</span>
      </Link>
      <Link to="/search" style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }} className="hover-white">
        <Search size={24} />
        <span style={{ fontSize: '1rem' }}>Search</span>
      </Link>
    </div>
  );
}

export default SidebarNav;
