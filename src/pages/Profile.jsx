import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useSupabase } from '../hooks/useSupabase';
import usePlaylistStore from '../store/usePlaylistStore';
import MusicCard from '../components/MusicCard';
import { Link } from 'react-router-dom';
import { Library } from 'lucide-react';

function Profile() {
  const { user } = useUser();
  const supabaseClient = useSupabase();
  const { playlists } = usePlaylistStore();
  
  const [recentPlays, setRecentPlays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchHistory = async () => {
      setIsLoading(true);
      const { data, error } = await supabaseClient
        .from('play_history')
        .select('*')
        .eq('user_id', user.id)
        .order('played_at', { ascending: false })
        .limit(30);

      if (error) {
        console.error('Error fetching profile history:', error);
      } else if (data) {
        const uniqueTracks = [];
        const seenIds = new Set();
        for (const row of data) {
          if (!seenIds.has(row.song_id)) {
            seenIds.add(row.song_id);
            uniqueTracks.push({
              id: row.song_id,
              title: row.song_title,
              artist: row.song_artist,
              img: row.song_img,
              audioUrl: row.song_url
            });
            if (uniqueTracks.length >= 10) break;
          }
        }
        setRecentPlays(uniqueTracks);
      }
      setIsLoading(false);
    };

    fetchHistory();
  }, [user, supabaseClient]);

  if (!user) return null;

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Profile Header */}
      <div 
        className="animate-fade-in"
        style={{ 
          height: '340px', 
          background: 'linear-gradient(to bottom, rgba(83, 83, 83, 0.4), var(--bg-primary))',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '32px 24px',
          gap: '24px'
        }}
      >
        <div style={{ 
          width: '232px', 
          height: '232px', 
          borderRadius: '50%', 
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          flexShrink: 0
        }}>
          <img src={user.imageUrl} alt={user.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <div style={{ paddingBottom: '12px' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>Profile</div>
          <h1 style={{ fontSize: '5rem', fontWeight: 900, letterSpacing: '-0.04em', margin: 0, textShadow: '0 4px 12px rgba(0,0,0,0.5)', lineHeight: 1 }}>
            {user.fullName || 'User'}
          </h1>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{playlists.length} Public Playlists</span>
          </div>
        </div>
      </div>

      <div className="page-padding">
        
        {/* Playlists Section */}
        {playlists.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>Public Playlists</h2>
            <div className="animate-fade-in delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px' }}>
              {playlists.map((playlist, idx) => (
                <Link to={`/playlist/${playlist.id}`} key={playlist.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card hover-scale" style={{ padding: '16px', animationDelay: `${0.1 + (idx * 0.1)}s` }}>
                    <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-elevated)', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                      <Library size={48} color="var(--text-secondary)" opacity={0.5} />
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{playlist.name}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>By {user.fullName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Top Tracks / Recent Section */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>Top tracks this month</h2>
          <div className="animate-fade-in delay-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px' }}>
            {isLoading ? (
              Array(5).fill(0).map((_, idx) => (
                <div key={idx} className="card" style={{ height: '260px', animation: 'pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)' }}></div>
              ))
            ) : recentPlays.length > 0 ? (
              recentPlays.map((song, idx) => (
                <MusicCard key={`${song.id}-${idx}`} song={song} delayIndex={idx} contextQueue={recentPlays} />
              ))
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>Only visible to you</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
