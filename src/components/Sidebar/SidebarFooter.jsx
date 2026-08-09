import React from 'react';
import { Globe } from 'lucide-react';

function SidebarFooter({ isSignedIn, openLanguageModal }) {
  if (isSignedIn) return null;

  return (
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
  );
}

export default SidebarFooter;
