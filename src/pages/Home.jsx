import React, { useState, useEffect } from 'react';
import MusicCard from '../components/MusicCard';
import RecentCard from '../components/RecentCard';
import { useUser } from '@clerk/clerk-react';
import { useSupabase } from '../hooks/useSupabase';

import { fetchTrendingTracks } from '../lib/jamendo';

function Home() {
  const { isSignedIn } = useUser();
  const supabaseClient = useSupabase();
  const [greeting, setGreeting] = useState('');
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [isLoadingSongs, setIsLoadingSongs] = useState(true);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    const loadTracks = async () => {
      setIsLoadingSongs(true);
      try {
        const tracks = await fetchTrendingTracks(12);
        setTrendingSongs(tracks || []);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setTrendingSongs([]);
      } finally {
        setIsLoadingSongs(false);
      }
    };
    
    loadTracks();
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      const loadHistory = async () => {
        const { data } = await supabaseClient
          .from('play_history')
          .select('*')
          .order('played_at', { ascending: false })
          .limit(30);
          
        if (data) {
          const uniqueSongs = [];
          const seenIds = new Set();
          for (const row of data) {
            if (!seenIds.has(row.song_id)) {
              seenIds.add(row.song_id);
              uniqueSongs.push({
                id: row.song_id,
                title: row.song_title,
                artist: row.song_artist,
                img: row.song_img,
                audioUrl: row.song_url
              });
            }
            if (uniqueSongs.length >= 10) break;
          }
          setRecentlyPlayed(uniqueSongs);
        }
      };
      loadHistory();
    }
  }, [isSignedIn, supabaseClient]);

  return (
    <div style={{ padding: '32px 24px' }}>
      
      {isSignedIn && (
        <div className="animate-fade-in delay-1">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <div className="filter-pill active">All</div>
            <div className="filter-pill">Music</div>
            <div className="filter-pill">Podcasts</div>
          </div>
          
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '24px' }}>{greeting}</h2>
          
          {recentlyPlayed.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>Recently played</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
                {recentlyPlayed.map((song, idx) => (
                  <MusicCard key={song.id} song={song} delayIndex={idx} contextQueue={recentlyPlayed} />
                ))}
              </div>
            </div>
          )}
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', marginBottom: '48px' }}>
            {isLoadingSongs ? (
              Array(6).fill(0).map((_, idx) => (
                <div key={idx} style={{ height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', animation: 'pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)' }} />
              ))
            ) : trendingSongs.length > 0 ? (
              trendingSongs.slice(0, 6).map((song) => (
                <RecentCard key={song.id} item={song} contextQueue={trendingSongs} />
              ))
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No tracks available right now</p>
            )}
          </div>
        </div>
      )}

      <div className="animate-fade-in delay-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Trending songs</h2>
      </div>
      
      <div className="animate-fade-in delay-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px', marginBottom: '56px' }}>
        {isLoadingSongs ? (
          Array(12).fill(0).map((_, idx) => (
            <div key={idx} className="card" style={{ height: '220px', animation: 'pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)' }}></div>
          ))
        ) : trendingSongs.length > 0 ? (
          trendingSongs.map((song, idx) => (
            <MusicCard key={song.id} song={song} delayIndex={idx} contextQueue={trendingSongs} />
          ))
        ) : (
          <p style={{ color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>No tracks available right now</p>
        )}
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
