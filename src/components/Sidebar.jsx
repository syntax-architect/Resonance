import React from 'react';
import { Home, Search, Library, Plus, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

function Sidebar({ openLanguageModal }) {
  return (
    <aside className="sidebar glass-panel animate-fade-in">
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
      
      <div className="sidebar-header animate-fade-in delay-1" style={{ marginTop: '16px' }}>
        <Link to="/library" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
          <Library size={24} />
          <span style={{ fontSize: '1rem' }}>Your Library</span>
        </Link>
        <Plus size={20} className="hover-white" style={{ cursor: 'pointer' }} />
      </div>
      
      <div className="animate-fade-in delay-2 sidebar-scroll-area">
        <div className="sidebar-action-box">
          <h4>Create your first playlist</h4>
          <p>It's easy, we'll help you</p>
          <button className="btn-pill-accent" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>Create playlist</button>
        </div>
      </div>
      
      <div style={{ padding: '0 24px 32px' }} className="animate-fade-in delay-3">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.75rem', marginBottom: '32px' }}>
          <span className="hover-white" style={{ cursor: 'pointer' }}>Legal</span>
          <span className="hover-white" style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span className="hover-white" style={{ cursor: 'pointer' }}>Cookies</span>
          <span className="hover-white" style={{ cursor: 'pointer' }}>Accessibility</span>
        </div>
        <button 
          className="hover-white" 
          onClick={openLanguageModal}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '8px 16px', borderRadius: '32px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s ease', backdropFilter: 'blur(8px)' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
          <Globe size={16} /> English
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
