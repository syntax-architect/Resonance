import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Trash2, Plus, ListMusic } from 'lucide-react';
import usePlayerStore from '../store/usePlayerStore';
import usePlaylistStore from '../store/usePlaylistStore';
import { useSupabase } from '../hooks/useSupabase';
import { useAuth } from '@clerk/clerk-react';

function MusicCard({ song, delayIndex, contextQueue, onRemove }) {
  const { currentTrack, isPlaying, play, pause, setQueue } = usePlayerStore();
  const { playlists, addTrackToPlaylist } = usePlaylistStore();
  const supabaseClient = useSupabase();
  const { isSignedIn } = useAuth();
  
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  
  const isThisPlaying = currentTrack?.id === song.id && isPlaying;
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePlayClick = (e) => {
    e.preventDefault();
    if (currentTrack?.id === song.id) {
      if (isPlaying) pause();
      else play();
    } else {
      if (contextQueue) {
        const idx = contextQueue.findIndex(s => s.id === song.id);
        setQueue(contextQueue, idx !== -1 ? idx : 0);
      } else {
        setQueue([song], 0);
      }
    }
  };

  const handleAddToPlaylist = async (playlistId, e) => {
    e.preventDefault();
    e.stopPropagation();
    await addTrackToPlaylist(playlistId, song, supabaseClient);
    setShowMenu(false);
  };

  return (
    <div className={`card animate-fade-in`} style={{ animationDelay: `${0.2 + (delayIndex * 0.1)}s`, position: 'relative' }}>
      <img src={song.img} alt={song.title} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '10px', marginBottom: '16px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }} />
      <h4 style={{ fontSize: '0.95rem', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>{song.title}</h4>
      <p style={{ fontSize: '0.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
        <Link 
          to={`/artist/${encodeURIComponent(song.artist)}`} 
          onClick={(e) => e.stopPropagation()} 
          style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
          className="hover-white"
        >
          {song.artist}
        </Link>
      </p>
      
      <button 
        className="play-btn" 
        onClick={handlePlayClick}
        style={{ 
          opacity: isThisPlaying ? 1 : '', 
          transform: isThisPlaying ? 'translateY(0) scale(1)' : '' 
        }}
      >
        {isThisPlaying ? (
          <Pause size={20} fill="currentColor" />
        ) : (
          <Play size={20} fill="currentColor" style={{ marginLeft: '4px' }} />
        )}
      </button>

      {onRemove ? (
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(song); }}
          style={{ 
            position: 'absolute', top: '24px', right: '24px', 
            background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', 
            width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', cursor: 'pointer', opacity: 0.8, transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
        >
          <Trash2 size={16} />
        </button>
      ) : (
        isSignedIn && playlists.length > 0 && (
          <div style={{ position: 'absolute', top: '24px', right: '24px' }} ref={menuRef}>
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMenu(!showMenu); }}
              className="add-to-playlist-btn hover-scale"
              style={{ 
                background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', 
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', cursor: 'pointer', transition: 'all 0.2s', 
                opacity: showMenu ? 1 : 0
              }}
            >
              <Plus size={18} />
            </button>
            
            {showMenu && (
              <div 
                className="animate-fade-in"
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: 0,
                  background: '#282828',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  width: '200px',
                  padding: '4px',
                  boxShadow: '0 16px 24px rgba(0,0,0,0.3), 0 6px 8px rgba(0,0,0,0.2)',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}
              >
                <div style={{ padding: '8px 12px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '4px' }}>
                  Add to playlist
                </div>
                {playlists.map(p => (
                  <div
                    key={p.id}
                    onClick={(e) => handleAddToPlaylist(p.id, e)}
                    style={{
                      padding: '8px 12px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#e5e5e5',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '2px',
                      transition: 'all 0.2s ease'
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
                    <ListMusic size={14} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default MusicCard;
