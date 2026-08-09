import { create } from 'zustand';

const usePlayerStore = create((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.5,
  
  queue: [],
  currentIndex: -1,
  isShuffle: false,
  repeatMode: 'none', // 'none' | 'all' | 'one'
  isQueueOpen: false,
  
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
  
  toggleQueue: () => set((state) => ({ isQueueOpen: !state.isQueueOpen })),
  
  playFromQueue: (index) => {
    const { queue } = get();
    if (index >= 0 && index < queue.length) {
      set({ currentIndex: index, currentTrack: queue[index], isPlaying: true });
    }
  },
  
  reorderQueue: (oldIndex, newIndex) => {
    const { queue, currentIndex } = get();
    const newQueue = [...queue];
    const [movedItem] = newQueue.splice(oldIndex, 1);
    newQueue.splice(newIndex, 0, movedItem);
    
    let newCurrentIndex = currentIndex;
    if (oldIndex === currentIndex) {
      newCurrentIndex = newIndex;
    } else if (oldIndex < currentIndex && newIndex >= currentIndex) {
      newCurrentIndex--;
    } else if (oldIndex > currentIndex && newIndex <= currentIndex) {
      newCurrentIndex++;
    }
    
    set({ queue: newQueue, currentIndex: newCurrentIndex });
  },
}));

export default usePlayerStore;
