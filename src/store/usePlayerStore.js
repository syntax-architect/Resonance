import { create } from 'zustand';

const usePlayerStore = create((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.5,
  
  queue: [],
  currentIndex: -1,
  isShuffle: false,
  repeatMode: 'none', // 'none' | 'all' | 'one'
  
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setVolume: (volume) => set({ volume }),
  
  setQueue: (queueList, startIndex = 0) => {
    if (!queueList || queueList.length === 0) return;
    set({
      queue: queueList,
      currentIndex: startIndex,
      currentTrack: queueList[startIndex],
      isPlaying: true
    });
  },

  playNext: () => {
    const { queue, currentIndex, isShuffle, repeatMode } = get();
    if (queue.length === 0) return;

    let nextIndex;
    if (isShuffle) {
      if (queue.length === 1) nextIndex = 0;
      else {
        do {
          nextIndex = Math.floor(Math.random() * queue.length);
        } while (nextIndex === currentIndex);
      }
    } else {
      nextIndex = currentIndex + 1;
    }

    if (nextIndex >= queue.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        set({ isPlaying: false });
        return;
      }
    }

    set({
      currentIndex: nextIndex,
      currentTrack: queue[nextIndex],
      isPlaying: true
    });
  },

  playPrev: () => {
    const { queue, currentIndex } = get();
    if (queue.length === 0) return;

    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }

    set({
      currentIndex: prevIndex,
      currentTrack: queue[prevIndex],
      isPlaying: true
    });
  },

  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  
  toggleRepeat: () => set((state) => {
    const modes = ['none', 'all', 'one'];
    const nextMode = modes[(modes.indexOf(state.repeatMode) + 1) % modes.length];
    return { repeatMode: nextMode };
  }),
}));

export default usePlayerStore;
