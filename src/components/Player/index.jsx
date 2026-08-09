import React, { useEffect, useRef, useState } from 'react';
import { useUser, SignUpButton } from '@clerk/clerk-react';
import { useSupabase } from '../../hooks/useSupabase';
import usePlayerStore from '../../store/usePlayerStore';
import useLibraryStore from '../../store/useLibraryStore';

import PlayerInfo from './PlayerInfo';
import PlayerControls from './PlayerControls';
import PlayerVolume from './PlayerVolume';

function Player() {
  const { 
    currentTrack, isPlaying, play, pause, volume, setVolume,
    isShuffle, repeatMode, playNext, playPrev, toggleShuffle, toggleRepeat,
    isQueueOpen, toggleQueue
  } = usePlayerStore();
  const { isSignedIn, user } = useUser();
  const supabaseClient = useSupabase();
  const { likedSongs, toggleLike } = useLibraryStore();
  const audioRef = useRef(null);
  
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const lastLoggedTrackId = useRef(null);
  
  const isLiked = currentTrack && likedSongs.some(s => s.song_id === currentTrack.id);

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

  useEffect(() => {
    if (currentTrack && isPlaying && user && lastLoggedTrackId.current !== currentTrack.id) {
      lastLoggedTrackId.current = currentTrack.id;
      
      supabaseClient
        .from('play_history')
        .insert({
          user_id: user.id,
          song_id: currentTrack.id,
          song_title: currentTrack.title,
          song_artist: currentTrack.artist,
          song_img: currentTrack.img,
          song_url: currentTrack.audioUrl
        })
        .then(({ error }) => {
          if (error) console.error('Failed to log play history:', error);
        });
    }
  }, [currentTrack, isPlaying, user, supabaseClient]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (repeatMode === 'one') {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    } else {
      playNext();
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

  if (!currentTrack) {
    if (isSignedIn) return null;
    
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
      <audio 
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <PlayerInfo 
        currentTrack={currentTrack} 
        isLiked={isLiked} 
        toggleLike={toggleLike} 
        user={user} 
        supabaseClient={supabaseClient} 
      />

      <PlayerControls 
        isPlaying={isPlaying} 
        play={play} 
        pause={pause} 
        isShuffle={isShuffle} 
        repeatMode={repeatMode}
        playNext={playNext} 
        playPrev={playPrev} 
        toggleShuffle={toggleShuffle} 
        toggleRepeat={toggleRepeat}
        progress={progress} 
        duration={duration} 
        handleSeek={handleSeek} 
        formatTime={formatTime} 
      />

      <PlayerVolume 
        volume={volume} 
        setVolume={setVolume} 
        isQueueOpen={isQueueOpen} 
        toggleQueue={toggleQueue} 
      />
    </footer>
  );
}

export default Player;
