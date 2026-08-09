import React from 'react';
import { Play, Pause } from 'lucide-react';
import usePlayerStore from '../store/usePlayerStore';

function RecentCard({ item, contextQueue }) {
  const { currentTrack, isPlaying, play, pause, setQueue } = usePlayerStore();
  
  const isThisPlaying = currentTrack?.id === item.id && isPlaying;
  
  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (currentTrack?.id === item.id) {
      if (isPlaying) pause();
      else play();
    } else {
      if (contextQueue) {
        const idx = contextQueue.findIndex(s => s.id === item.id);
        setQueue(contextQueue, idx !== -1 ? idx : 0);
      } else {
        setQueue([item], 0);
      }
    }
  };

  return (
    <div className="recent-card animate-fade-in" onClick={handlePlayClick}>
      <img src={item.img} alt={item.title} />
      <span>{item.title}</span>
      <button 
        className="play-btn" 
        onClick={handlePlayClick}
        style={{ 
          opacity: isThisPlaying ? 1 : '', 
          transform: isThisPlaying ? 'scale(1)' : '' 
        }}
      >
        {isThisPlaying ? (
          <Pause size={18} fill="currentColor" />
        ) : (
          <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />
        )}
      </button>
    </div>
  );
}

export default RecentCard;
