import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';

function PlayerControls({
  isPlaying, play, pause, isShuffle, repeatMode, 
  playNext, playPrev, toggleShuffle, toggleRepeat,
  progress, duration, handleSeek, formatTime
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }} className="player-controls-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '8px' }} className="player-controls-buttons">
        <Shuffle size={16} color={isShuffle ? 'var(--accent-color)' : 'var(--text-secondary)'} onClick={toggleShuffle} style={{ cursor: 'pointer', transition: 'color 0.2s' }} className="hover-white hide-on-mobile-player" />
        <SkipBack size={20} color="var(--text-secondary)" onClick={playPrev} style={{ cursor: 'pointer' }} className="hover-white hide-on-mobile-player" />
        
        <button 
          onClick={() => isPlaying ? pause() : play()}
          style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
        >
          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: '2px' }} />}
        </button>
        
        <SkipForward size={20} color="var(--text-secondary)" onClick={playNext} style={{ cursor: 'pointer' }} className="hover-white hide-on-mobile-player" />
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hide-on-mobile-player">
          <Repeat size={16} color={repeatMode !== 'none' ? 'var(--accent-color)' : 'var(--text-secondary)'} onClick={toggleRepeat} style={{ cursor: 'pointer', transition: 'color 0.2s' }} className="hover-white" />
          {repeatMode === 'one' && (
            <span style={{ position: 'absolute', fontSize: '9px', fontWeight: 'bold', color: 'var(--accent-color)', pointerEvents: 'none', bottom: '-8px' }}>1</span>
          )}
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', maxWidth: '600px' }} className="hide-on-mobile-player">
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', minWidth: '35px', textAlign: 'right' }}>{formatTime(progress)}</span>
        <input 
          type="range" 
          min="0" 
          max={duration || 100} 
          value={progress} 
          onChange={handleSeek}
          style={{ flex: 1, height: '4px', appearance: 'none', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', outline: 'none', cursor: 'pointer' }}
        />
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', minWidth: '35px' }}>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default PlayerControls;
