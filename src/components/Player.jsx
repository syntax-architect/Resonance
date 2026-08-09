import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from 'lucide-react';
import usePlayerStore from '../store/usePlayerStore';
import { useUser, SignUpButton } from '@clerk/clerk-react';

function Player() {
  const { currentTrack, isPlaying, play, pause, volume, setVolume } = usePlayerStore();
  const { isSignedIn } = useUser();
  const audioRef = useRef(null);
  
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  // If no track is playing, show the Sign up banner (the preview banner we had)
  if (!currentTrack) {
    if (isSignedIn) return null; // Hide banner entirely if logged in
    
    return (
      <footer className="preview-banner glass-panel animate-fade-in delay-2">
        <div>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', color: 'var(--accent-color)', textShadow: '0 0 12px rgba(56,189,248,0.4)' }}>Ready to dive in?</p>
          <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>Sign up to get unlimited songs and podcasts.</p>
        </div>
        <SignUpButton mode="modal">
          <button className="btn-pill-accent">Sign up free</button>
        </SignUpButton>
      </footer>
    );
  }

  return (
    <footer className="preview-banner glass-panel animate-fade-in" style={{ padding: '0 16px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '90px', marginBottom: 0 }}>
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => pause()} // Auto pause when track ends
      />

      {/* Now Playing Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '30%' }}>
        <img src={currentTrack.img} alt="cover" style={{ width: '56px', height: '56px', borderRadius: '4px', objectFit: 'cover' }} />
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{currentTrack.title}</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{currentTrack.artist}</p>
        </div>
        <Heart size={16} color="var(--text-secondary)" style={{ marginLeft: '8px', cursor: 'pointer' }} />
      </div>

      {/* Player Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '8px' }}>
          <Shuffle size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
          <SkipBack size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
          
          <button 
            onClick={() => isPlaying ? pause() : play()}
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: '2px' }} />}
          </button>
          
          <SkipForward size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
          <Repeat size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', maxWidth: '600px' }}>
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

      {/* Volume Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', width: '30%' }}>
        <Volume2 size={20} color="var(--text-secondary)" />
        <input 
          type="range" 
          min="0" max="1" step="0.01" 
          value={volume} 
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{ width: '100px', height: '4px', appearance: 'none', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', outline: 'none', cursor: 'pointer' }}
        />
      </div>
    </footer>
  );
}

export default Player;
