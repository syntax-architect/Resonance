import React from 'react';
import { Home, Search, Library, Plus, Globe, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import useLibraryStore from '../store/useLibraryStore';

function Sidebar({ openLanguageModal }) {
  const { isSignedIn } = useUser();
  const { likedSongs } = useLibraryStore();

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
      
      <div className="animate-fade-in delay-2 sidebar-scroll-area" style={{ flex: 1 }}>
        {isSignedIn ? (
          <div style={{ padding: '0 16px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <div className="filter-pill active">Playlists</div>
              <div className="filter-pill">Artists</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Link to="/library" style={{ textDecoration: 'none' }}>
                <div className="sidebar-list-item">
                  <div style={{ width: '48px', height: '48px', borderRadius: '4px', background: 'linear-gradient(135deg, #450af5, #c4efd9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={20} fill="#fff" color="#fff" />
                  </div>
                  <div>
                    <div className="title">Liked Songs</div>
                    <div className="subtitle">Playlist • {likedSongs.length} songs</div>
                  </div>
                </div>
              </Link>
              
              {/* Mock additional playlists to show a dense UI */}
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="sidebar-list-item">
                  <div style={{ width: '48px', height: '48px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}></div>
                  <div>
                    <div className="title">My Playlist #{i}</div>
                    <div className="subtitle">Playlist • You</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="sidebar-action-box">
            <h4>Create your first playlist</h4>
            <p>It's easy, we'll help you</p>
            <button className="btn-pill-accent" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>Create playlist</button>
          </div>
        )}
      </div>
      
      {!isSignedIn && (
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
      )}
    </aside>
  );
}

export default Sidebar;
