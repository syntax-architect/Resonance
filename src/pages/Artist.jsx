import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MusicCard from '../components/MusicCard';
import { searchTracks } from '../lib/jamendo';
import { Play } from 'lucide-react';
import usePlayerStore from '../store/usePlayerStore';

function Artist() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setQueue } = usePlayerStore();

  useEffect(() => {
    const fetchArtistTracks = async () => {
      setIsLoading(true);
      try {
        const results = await searchTracks(decodedName, 30);
        const artistTracks = results.filter(t => t.artist.toLowerCase() === decodedName.toLowerCase());
        setTracks(artistTracks.length > 0 ? artistTracks : results);
      } catch (error) {
        console.error("Error fetching artist tracks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (decodedName) {
      fetchArtistTracks();
    }
  }, [decodedName]);

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      setQueue(tracks, 0);
    }
  };

  return (
    <div style={{ paddingBottom: '100px' }}>
      <div 
        className="animate-fade-in"
        style={{ 
          height: '300px', 
          background: 'linear-gradient(to bottom, rgba(56, 189, 248, 0.4), var(--bg-primary))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '32px 24px',
          position: 'relative'
        }}
      >
        <div style={{ fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ width: '24px', height: '24px', background: 'var(--accent-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '10px' }}>✓</span>
          </div>
          Verified Artist
        </div>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: '-0.04em', margin: 0, textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
          {decodedName}
        </h1>
      </div>

      <div className="page-padding">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
          <button 
            onClick={handlePlayAll}
            className="play-btn" 
            style={{ 
              position: 'relative', opacity: 1, transform: 'none', 
              width: '56px', height: '56px' 
            }}
          >
            <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }} />
          </button>
          <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 16px', borderRadius: '500px', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer' }} className="hover-white">
            Follow
          </button>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>Popular Tracks</h2>
        
        <div className="animate-fade-in delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
          {isLoading ? (
            Array(10).fill(0).map((_, idx) => (
              <div key={idx} className="card" style={{ height: '220px', animation: 'pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)' }}></div>
            ))
          ) : tracks.length > 0 ? (
            tracks.map((song, idx) => (
              <MusicCard key={song.id} song={song} delayIndex={idx} contextQueue={tracks} />
            ))
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>No tracks found for this artist.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Artist;
