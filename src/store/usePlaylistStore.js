import { create } from 'zustand';

const usePlaylistStore = create((set, get) => ({
  playlists: [],
  isLoading: false,
  
  fetchPlaylists: async (supabaseClient) => {
    set({ isLoading: true });
    // Fetch playlists and their nested tracks
    const { data, error } = await supabaseClient
      .from('playlists')
      .select('*, playlist_tracks(*)')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching playlists:", error);
    } else if (data) {
      // Map playlist_tracks to tracks, ensuring they are sorted by added_at
      const mappedPlaylists = data.map(p => ({
        ...p,
        tracks: (p.playlist_tracks || []).sort((a, b) => new Date(a.added_at) - new Date(b.added_at))
      }));
      set({ playlists: mappedPlaylists });
    }
    set({ isLoading: false });
  },

  createPlaylist: async (name, supabaseClient, userId) => {
    if (!userId) return;
    
    // Create optimistic ID
    const tempId = crypto.randomUUID();
    const newPlaylist = {
      id: tempId,
      user_id: userId,
      name,
      tracks: []
    };
    
    // Optimistic update
    const currentPlaylists = get().playlists;
    set({ playlists: [newPlaylist, ...currentPlaylists] });
    
    // DB call
    const { data, error } = await supabaseClient
      .from('playlists')
      .insert([{ user_id: userId, name }])
      .select();
      
    if (error) {
      console.error("Error creating playlist:", error);
      set({ playlists: currentPlaylists }); // Revert
    } else if (data && data[0]) {
      // Update with real ID
      const realPlaylist = { ...data[0], tracks: [] };
      set({ 
        playlists: [
          realPlaylist,
          ...currentPlaylists.filter(p => p.id !== tempId)
        ]
      });
    }
  },

  deletePlaylist: async (playlistId, supabaseClient) => {
    const currentPlaylists = get().playlists;
    
    // Optimistic update
    set({ playlists: currentPlaylists.filter(p => p.id !== playlistId) });
    
    // DB call
    const { error } = await supabaseClient
      .from('playlists')
      .delete()
      .eq('id', playlistId);
      
    if (error) {
      console.error("Error deleting playlist:", error);
      set({ playlists: currentPlaylists }); // Revert
    }
  },

  addTrackToPlaylist: async (playlistId, song, supabaseClient) => {
    const currentPlaylists = get().playlists;
    const playlist = currentPlaylists.find(p => p.id === playlistId);
    if (!playlist) return;
    
    // Check if already in playlist
    if (playlist.tracks.some(t => t.song_id === song.id)) return;
    
    const newTrack = {
      playlist_id: playlistId,
      song_id: song.id,
      song_title: song.title,
      song_artist: song.artist,
      song_img: song.img,
      song_url: song.audioUrl,
      added_at: new Date().toISOString()
    };
    
    // Optimistic update
    const updatedPlaylists = currentPlaylists.map(p => {
      if (p.id === playlistId) {
        return { ...p, tracks: [...p.tracks, newTrack] };
      }
      return p;
    });
    set({ playlists: updatedPlaylists });
    
    // DB call
    const { error } = await supabaseClient
      .from('playlist_tracks')
      .insert([newTrack]);
      
    if (error) {
      console.error("Error adding track to playlist:", error);
      set({ playlists: currentPlaylists }); // Revert
    }
  },

  removeTrackFromPlaylist: async (playlistId, songId, supabaseClient) => {
    const currentPlaylists = get().playlists;
    
    // Optimistic update
    const updatedPlaylists = currentPlaylists.map(p => {
      if (p.id === playlistId) {
        return { ...p, tracks: p.tracks.filter(t => t.song_id !== songId) };
      }
      return p;
    });
    set({ playlists: updatedPlaylists });
    
    // DB call
    const { error } = await supabaseClient
      .from('playlist_tracks')
      .delete()
      .eq('playlist_id', playlistId)
      .eq('song_id', songId);
      
    if (error) {
      console.error("Error removing track from playlist:", error);
      set({ playlists: currentPlaylists }); // Revert
    }
  },

  clearPlaylists: () => set({ playlists: [] })
}));

export default usePlaylistStore;
