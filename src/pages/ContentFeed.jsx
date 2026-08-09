import React, { useState, useEffect } from 'react';
import { fetchNewReleases } from '../lib/jamendo';
import MusicCard from '../components/MusicCard';
import { X, Info } from 'lucide-react';

function ContentFeed() {
  const [activeTab, setActiveTab] = useState('music');
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const getReleases = async () => {
      setIsLoading(true);
      try {
        const results = await fetchNewReleases(18);
        setTracks(results);
      } catch (error) {
        console.error("Failed to fetch new releases", error);
      } finally {
        setIsLoading(false);
      }
    };
    getReleases();
  }, []);

  return (
    <div className="page-padding">
      
      {showBanner && (
        <div className="animate-fade-in" style={{ 
          background: '#0d72ea', 
          color: '#fff', 
          borderRadius: '8px', 
          padding: '16px 20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '32px',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Info size={20} />
            <span>Looking for the latest from creators you follow? Check the Music or Podcast feeds on Home</span>
          </div>
          <X size={20} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-white" onClick={() => setShowBanner(false)} />
        </div>
      )}

      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>What's New</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
        The latest releases from artists, podcasts, and shows you follow.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        <button 
          onClick={() => setActiveTab('music')}
          className={`filter-pill ${activeTab === 'music' ? 'active' : ''}`}
        >
          Music
        </button>
        <button 
          onClick={() => setActiveTab('podcasts')}
          className={`filter-pill ${activeTab === 'podcasts' ? 'active' : ''}`}
        >
          Podcast & Shows
        </button>
      </div>

      {activeTab === 'podcasts' ? (
        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '64px 24px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>We don't have any updates for you yet</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.5 }}>
            When there's news, we'll post it here. Follow your favorite artists and podcasts to stay updated on them too.
          </p>
        </div>
      ) : (
        <div className="animate-fade-in delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px' }}>
          {isLoading ? (
            Array(6).fill(0).map((_, idx) => (
              <div key={idx} className="card" style={{ height: '260px', animation: 'pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)' }}></div>
            ))
          ) : tracks.length > 0 ? (
            tracks.map((song, idx) => (
              <MusicCard key={song.id} song={song} delayIndex={idx} contextQueue={tracks} />
            ))
          ) : (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No new releases found.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default ContentFeed;
