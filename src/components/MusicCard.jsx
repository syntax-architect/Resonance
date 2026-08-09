import React from 'react';
import { Play, Pause } from 'lucide-react';
import usePlayerStore from '../store/usePlayerStore';

function MusicCard({ song, delayIndex }) {
  const { currentTrack, isPlaying, play, pause, setTrack } = usePlayerStore();
  
  const isThisPlaying = currentTrack?.id === song.id && isPlaying;
  
  const handlePlayClick = (e) => {
    e.preventDefault(); // Prevent navigating if this was wrapped in a Link later
    if (currentTrack?.id === song.id) {
      if (isPlaying) pause();
      else play();
    } else {
      setTrack(song);
    }
  };

  return (
    <div className={`card animate-fade-in`} style={{ animationDelay: `${0.2 + (delayIndex * 0.1)}s` }}>
      <img src={song.img} alt={song.title} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '10px', marginBottom: '16px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }} />
      <h4 style={{ fontSize: '0.95rem', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>{song.title}</h4>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>{song.artist}</p>
      
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
    </div>
  );
}

export default MusicCard;
