import React from 'react';
import MusicCard from '../components/MusicCard';

// Using actual royalty-free MP3 URLs so the player works!
const TRENDING_SONGS = [
  { id: 1, title: 'Lofi Chill', artist: 'Lofi Maker', img: 'https://i.scdn.co/image/ab67616d00001e02816999276d41beadffb0410f', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Electronic Vibes', artist: 'Synthy', img: 'https://i.scdn.co/image/ab67616d00001e0292cd4d96c4293f01bda60312', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Acoustic Journey', artist: 'Guitarist', img: 'https://i.scdn.co/image/ab67616d00001e024bcf8f8373b4ba9e52cbb935', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 4, title: 'Piano Serenade', artist: 'Pianist', img: 'https://i.scdn.co/image/ab67616d00001e02379bb50352ffb6cb2f207d57', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 5, title: 'Upbeat Pop', artist: 'Pop Star', img: 'https://i.scdn.co/image/ab67616d00001e02c5f1cdab2f9cb79b69208f23', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
];

function Home() {
  return (
    <div style={{ padding: '32px 24px' }}>
      <div className="animate-fade-in delay-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Trending songs</h2>
      </div>
      
      <div className="animate-fade-in delay-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px', marginBottom: '56px' }}>
        {TRENDING_SONGS.map((song, idx) => (
          <MusicCard key={song.id} song={song} delayIndex={idx} />
        ))}
      </div>

      <div className="animate-fade-in delay-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Popular artists</h2>
      </div>
      
      <div className="animate-fade-in delay-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px', marginBottom: '48px' }}>
        {[1, 2, 3, 4, 5].map((i, idx) => (
          <div key={i} className="card" style={{ animationDelay: `${0.3 + (idx * 0.1)}s` }}>
            <div style={{ width: '100%', aspectRatio: '1/1', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '50%', marginBottom: '16px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}></div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600, textAlign: 'center' }}>Artist Name</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>Artist</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
