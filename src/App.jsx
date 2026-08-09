import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MobileNav from './components/MobileNav';
import LanguageModal from './components/LanguageModal';
import Player from './components/Player';

// Pages
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';

function App() {
  const [isLangModalOpen, setLangModalOpen] = useState(false);

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
          </Routes>
        </main>

        {/* Global Audio Player */}
        <Player />
      </div>

      {/* Mobile Nav */}
      <MobileNav />
    </>
  );
}

export default App;
