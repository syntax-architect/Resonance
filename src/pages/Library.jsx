import React from 'react';
import useLibraryStore from '../store/useLibraryStore';
import MusicCard from '../components/MusicCard';
import { useUser, SignInButton } from '@clerk/clerk-react';

function Library() {
  const { likedSongs, isLoading } = useLibraryStore();
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div style={{ padding: '64px 24px', textAlign: 'center' }} className="animate-fade-in">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Log in to see your Library</h2>
        <SignInButton mode="modal">
          <button className="btn-pill-accent">Log In</button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="page-padding animate-fade-in">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '24px' }}>Liked Songs</h2>
      
      {isLoading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Loading your library...</p>
      ) : likedSongs.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>You haven't liked any songs yet. Go find some music!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
          {likedSongs.map((like, i) => {
            const song = {
              id: like.song_id,
              title: like.song_title,
              artist: like.song_artist,
              img: like.song_img,
              audioUrl: like.song_url
            };
            
            // Build the queue array for this context
            const queueList = likedSongs.map(l => ({
              id: l.song_id,
              title: l.song_title,
              artist: l.song_artist,
              img: l.song_img,
              audioUrl: l.song_url
            }));
            
            return <MusicCard key={like.id} song={song} delayIndex={i} contextQueue={queueList} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Library;
