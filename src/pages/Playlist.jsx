import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import usePlaylistStore from '../store/usePlaylistStore';
import { useSupabase } from '../hooks/useSupabase';
import MusicCard from '../components/MusicCard';

function Playlist() {
  const { id } = useParams();
  const supabaseClient = useSupabase();
  const { playlists, removeTrackFromPlaylist } = usePlaylistStore();
  
  const playlist = playlists.find(p => p.id === id);
  
  if (!playlist) {
    return (
      <div style={{ padding: '32px 24px', textAlign: 'center', marginTop: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Playlist not found</h2>
        <Link to="/" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>Go back home</Link>
      </div>
    );
  }

  const handleRemoveTrack = (song) => {
    removeTrackFromPlaylist(playlist.id, song.id, supabaseClient);
  };

  // Convert playlist tracks to the same shape expected by MusicCard/Player
  const tracks = (playlist.tracks || []).map(t => ({
    id: t.song_id,
    title: t.song_title,
    artist: t.song_artist,
    img: t.song_img,
    audioUrl: t.song_url
  }));

  return (
    <div className="page-padding animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <Link to="/" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} className="hover-white" />
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{playlist.name}</h1>
      </div>
      
      {tracks.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px', marginBottom: '56px' }}>
          {tracks.map((song, idx) => (
            <MusicCard 
              key={song.id} 
              song={song} 
              delayIndex={idx} 
              contextQueue={tracks} 
              onRemove={handleRemoveTrack}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '64px', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>This playlist is empty</p>
          <p style={{ fontSize: '0.9rem' }}>Go find some music to add!</p>
        </div>
      )}
    </div>
  );
}

export default Playlist;
