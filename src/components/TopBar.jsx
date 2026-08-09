import React from 'react';
import { ArrowLeft, ArrowRight, Search, Download, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import useSearchStore from '../store/useSearchStore';

function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { query, setQuery } = useSearchStore();
  
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(4px)', flexShrink: 0 }} className="desktop-only"><ArrowLeft size={20} /></button>
        <button onClick={() => navigate(1)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(4px)', flexShrink: 0 }} className="desktop-only"><ArrowRight size={20} /></button>
        
        <div className="mobile-header-brand" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Resonance
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px', position: 'relative', width: '100%', maxWidth: '360px' }}>
          <div className="search-container" style={{ borderRadius: '500px', display: 'flex', alignItems: 'center', padding: '12px 20px', width: '100%' }}>
            <Search size={20} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
            <input 
              type="text" 
              placeholder="What do you want to play?" 
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (location.pathname !== '/search') {
                  navigate('/search');
                }
              }}
              style={{ background: 'transparent', border: 'none', color: '#fff', marginLeft: '12px', fontSize: '0.95rem', outline: 'none', width: '100%', fontFamily: 'inherit' }} 
            />
          </div>
        </div>
      </div>
      
      <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.95rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
        <SignedOut>
          <span style={{ cursor: 'pointer' }} className="hover-white hide-on-tablet">Premium</span>
          <span style={{ cursor: 'pointer' }} className="hover-white hide-on-tablet">Support</span>
          <span style={{ cursor: 'pointer' }} className="hover-white hide-on-tablet">Download</span>
          <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 -8px' }} className="hide-on-tablet" />
        </SignedOut>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} className="hover-white hide-on-mobile">
          <Download size={18} /> Install App
        </div>
        
        <SignedIn>
          <div className="animate-fade" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '16px' }}>
            <Bell size={20} className="hover-white" style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
            <UserButton />
          </div>
        </SignedIn>
        
        <SignedOut>
          <SignUpButton mode="modal">
            <span style={{ cursor: 'pointer', color: 'var(--text-primary)', textShadow: '0 0 12px rgba(255,255,255,0.2)' }}>Sign up</span>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="btn-pill-accent">Log in</button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}

export default TopBar;
