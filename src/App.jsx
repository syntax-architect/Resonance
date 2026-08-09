import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useSupabase } from './hooks/useSupabase';
import useLibraryStore from './store/useLibraryStore';

// Components
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MobileNav from './components/MobileNav';
import LanguageModal from './components/LanguageModal';
import Player from './components/Player';
import QueuePanel from './components/QueuePanel';

// Pages
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Artist from './pages/Artist';

if (!import.meta.env.VITE_JAMENDO_CLIENT_ID || import.meta.env.VITE_JAMENDO_CLIENT_ID === 'your_client_id_here') {
  console.warn('VITE_JAMENDO_CLIENT_ID is missing or not configured in environment variables. Jamendo API requests will fail!');
}

function App() {
  const [isLangModalOpen, setLangModalOpen] = useState(false);
  const { isSignedIn } = useUser();
  const supabaseClient = useSupabase();
  const { fetchLikedSongs, clearLibrary } = useLibraryStore();

  useEffect(() => {
    if (isSignedIn) {
      fetchLikedSongs(supabaseClient);
    } else {
      clearLibrary();
    }
  }, [isSignedIn, supabaseClient, fetchLikedSongs, clearLibrary]);

  return (
    <>
      <div className="bg-gradient"></div>
      
      <LanguageModal isOpen={isLangModalOpen} onClose={() => setLangModalOpen(false)} />

      <div className="app-container">
        {/* Desktop Sidebar */}
        <Sidebar openLanguageModal={() => setLangModalOpen(true)} />

        {/* Main Content Area */}
        <main className="main-content glass-panel">
          <TopBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/artist/:name" element={<Artist />} />
          </Routes>
        </main>

        <QueuePanel />

        {/* Global Audio Player */}
        <Player />
      </div>

      {/* Mobile Nav */}
      <MobileNav />
    </>
  );
}

export default App;
