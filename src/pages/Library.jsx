import React from 'react';
import { Play } from 'lucide-react';
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
    <div style={{ padding: '32px 24px' }} className="animate-fade-in">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '24px' }}>Liked Songs</h2>
      
      {isLoading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Loading your library...</p>
      ) : likedSongs.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>You haven't liked any songs yet. Go find some music!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
          {likedSongs.map((like, i) => {
            // Map Supabase columns to MusicCard format
            const song = {
              id: like.song_id,
              title: like.song_title,
              artist: like.song_artist,
              img: like.song_img,
              audioUrl: like.song_url
            };
            return <MusicCard key={like.id} song={song} delayIndex={i} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Library;
