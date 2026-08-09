import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Trash2 } from 'lucide-react';
import usePlayerStore from '../store/usePlayerStore';

function MusicCard({ song, delayIndex, contextQueue, onRemove }) {
  const { currentTrack, isPlaying, play, pause, setQueue } = usePlayerStore();
  
  const isThisPlaying = currentTrack?.id === song.id && isPlaying;
  
  const handlePlayClick = (e) => {
    e.preventDefault(); // Prevent navigating if this was wrapped in a Link later
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

  return (
    <div className={`card animate-fade-in`} style={{ animationDelay: `${0.2 + (delayIndex * 0.1)}s` }}>
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

      {onRemove && (
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
      )}
    </div>
  );
}

export default MusicCard;
