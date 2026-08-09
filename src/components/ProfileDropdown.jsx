import React, { useState, useRef, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MenuItem({ children, onClick, icon, borderBottom }) {
  return (
    <div 
      onClick={onClick}
      style={{
        padding: '12px 12px',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#e5e5e5',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '2px',
        borderBottom: borderBottom ? '1px solid rgba(255,255,255,0.1)' : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.color = '#fff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = '#e5e5e5';
      }}
    >
      <span>{children}</span>
      {icon && <span style={{ color: 'inherit', opacity: 0.7 }}>{icon}</span>}
    </div>
  );
}

function ProfileDropdown() {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleAction = (action) => {
    setIsOpen(false);
    action();
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          border: '4px solid rgba(0,0,0,0.2)', 
          padding: 0, 
          cursor: 'pointer',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-elevated)',
          transition: 'transform 0.2s'
        }}
        className="hover-scale"
        title={user.fullName}
      >
        <img src={user.imageUrl} alt={user.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </button>

      {isOpen && (
        <div 
          className="animate-fade-in"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            background: '#282828',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '4px',
            width: '220px',
            padding: '4px',
            boxShadow: '0 16px 24px rgba(0,0,0,0.3), 0 6px 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <MenuItem onClick={() => handleAction(() => openUserProfile())} icon={<ExternalLink size={14} />}>Account</MenuItem>
          <MenuItem onClick={() => handleAction(() => navigate('/profile'))}>Profile</MenuItem>
          <MenuItem onClick={() => handleAction(() => navigate('/'))}>Recents</MenuItem>
          <MenuItem onClick={() => handleAction(() => window.open('https://support.jamendo.com', '_blank'))} icon={<ExternalLink size={14} />}>Support</MenuItem>
          <MenuItem onClick={() => handleAction(() => window.open('https://github.com', '_blank'))} icon={<ExternalLink size={14} />}>Download</MenuItem>
          <MenuItem onClick={() => handleAction(() => openUserProfile())}>Settings</MenuItem>
          
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '4px 8px' }} />
          
          <MenuItem onClick={() => handleAction(() => signOut())}>Log out</MenuItem>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
