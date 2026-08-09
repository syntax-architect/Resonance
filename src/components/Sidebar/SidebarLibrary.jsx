import React, { useState, useEffect } from 'react';
import { Library, Plus, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import useLibraryStore from '../../store/useLibraryStore';
import usePlaylistStore from '../../store/usePlaylistStore';
import { useSupabase } from '../../hooks/useSupabase';

function SidebarLibrary({ isSignedIn, user }) {
  const supabaseClient = useSupabase();
  const { likedSongs } = useLibraryStore();
  const { playlists, fetchPlaylists, createPlaylist } = usePlaylistStore();
  
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    if (isSignedIn) {
      fetchPlaylists(supabaseClient);
    }
  }, [isSignedIn, supabaseClient, fetchPlaylists]);

  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim() && user) {
      await createPlaylist(newPlaylistName.trim(), supabaseClient, user.id);
    }
    setNewPlaylistName('');
    setIsCreating(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCreatePlaylist();
    if (e.key === 'Escape') {
      setIsCreating(false);
      setNewPlaylistName('');
    }
  };

  return (
    <>
      <div className="sidebar-header animate-fade-in delay-1" style={{ marginTop: '16px' }}>
        <Link to="/library" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
          <Library size={24} />
          <span style={{ fontSize: '1rem' }}>Your Library</span>
        </Link>
        {isSignedIn && <Plus size={20} className="hover-white" style={{ cursor: 'pointer' }} onClick={() => setIsCreating(true)} />}
      </div>
      
      <div className="animate-fade-in delay-2 sidebar-scroll-area" style={{ flex: 1 }}>
        {isSignedIn ? (
          <div style={{ padding: '0 16px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <div className="filter-pill active">Playlists</div>
              <div className="filter-pill">Artists</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Link to="/library" style={{ textDecoration: 'none' }}>
                <div className="sidebar-list-item">
                  <div style={{ width: '48px', height: '48px', borderRadius: '4px', background: 'linear-gradient(135deg, #450af5, #c4efd9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={20} fill="#fff" color="#fff" />
                  </div>
                  <div>
                    <div className="title">Liked Songs</div>
                    <div className="subtitle">Playlist • {likedSongs.length} songs</div>
                  </div>
                </div>
              </Link>
              
              {isCreating && (
                <div className="sidebar-list-item" style={{ padding: '8px', cursor: 'default' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={20} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input 
                      autoFocus
                      type="text" 
                      value={newPlaylistName}
                      onChange={e => setNewPlaylistName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={handleCreatePlaylist}
                      placeholder="My Playlist #1"
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--accent-color)', color: '#fff', outline: 'none', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>
              )}
              
              {playlists.map(playlist => (
                <Link key={playlist.id} to={`/playlist/${playlist.id}`} style={{ textDecoration: 'none' }}>
                  <div className="sidebar-list-item">
                    <div style={{ width: '48px', height: '48px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Library size={20} color="#b3b3b3" />
                    </div>
                    <div>
                      <div className="title">{playlist.name}</div>
                      <div className="subtitle">Playlist • {playlist.tracks ? playlist.tracks.length : 0} songs</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="sidebar-action-box">
            <h4>Create your first playlist</h4>
            <p>It's easy, we'll help you</p>
            <button className="btn-pill-accent" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>Create playlist</button>
          </div>
        )}
      </div>
    </>
  );
}

export default SidebarLibrary;
