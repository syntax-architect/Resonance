import { create } from 'zustand';

const usePlayerStore = create((set) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.5,
  
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setVolume: (volume) => set({ volume }),
  setTrack: (track) => set({ currentTrack: track, isPlaying: true }),
}));

export default usePlayerStore;
