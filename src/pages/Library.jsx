import React from 'react';
import { Play } from 'lucide-react';

function Library() {
  return (
    <div style={{ padding: '32px 24px' }} className="animate-fade-in">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '24px' }}>Your Library</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
        
        {/* Liked Songs Mock */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #450af5, #c4efd9)', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '200px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Liked Songs</h3>
          <p style={{ fontSize: '0.9rem', color: '#fff', opacity: 0.8 }}>120 liked songs</p>
          <button className="play-btn">
            <Play size={20} fill="currentColor" style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* Empty Placeholder Playlists */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="card" style={{ height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginBottom: '16px' }}></div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>My Playlist #{i}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>By User</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
