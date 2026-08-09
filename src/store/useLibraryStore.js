import { create } from 'zustand';

const useLibraryStore = create((set, get) => ({
  likedSongs: [],
  isLoading: false,
  
  toggleLike: async (song, supabaseClient, userId) => {
    if (!userId) return false; // Must be logged in
    
    const currentLikes = get().likedSongs;
    const isLiked = currentLikes.some(s => s.song_id === song.id);
    
    if (isLiked) {
      // Optimistic update
      set({ likedSongs: currentLikes.filter(s => s.song_id !== song.id) });
      
      // DB call
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('song_id', song.id)
        .eq('user_id', userId);
        
      if (error) {
        console.error("Error unliking:", error);
        set({ likedSongs: currentLikes }); // Revert
      }
    } else {
      const newLike = {
        user_id: userId,
        song_id: song.id,
        song_title: song.title,
        song_artist: song.artist,
        song_img: song.coverUrl,
        song_url: song.audioUrl
      };
      
      // Optimistic update
      set({ likedSongs: [...currentLikes, newLike] });
      
      // DB call
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert([newLike]);
        
      if (error) {
        console.error("Error liking:", error);
        set({ likedSongs: currentLikes }); // Revert
      }
    }
  },
  
  fetchLikedSongs: async (supabaseClient) => {
    set({ isLoading: true });
    const { data, error } = await supabaseClient
      .from('liked_songs')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching likes:", error);
    } else if (data) {
      set({ likedSongs: data });
    }
    set({ isLoading: false });
  },

  clearLibrary: () => set({ likedSongs: [] })
}));

export default useLibraryStore;
