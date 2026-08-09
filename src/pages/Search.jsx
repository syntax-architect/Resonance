import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import MusicCard from '../components/MusicCard';
import { searchTracks } from '../lib/jamendo';
import useSearchStore from '../store/useSearchStore';

function Search() {
  const { query, setQuery } = useSearchStore();
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    let isCancelled = false;
    setIsSearching(true);

    const debounceTimeout = setTimeout(async () => {
      try {
        const tracks = await searchTracks(query);
        if (!isCancelled) {
          setResults(tracks || []);
        }
      } catch (error) {
        console.error("Search error:", error);
        if (!isCancelled) setResults([]);
      } finally {
        if (!isCancelled) setIsSearching(false);
      }
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(debounceTimeout);
    };
  }, [query]);

  return (
    <div style={{ padding: '32px 24px' }} className="animate-fade-in">
      <div style={{ position: 'relative', marginBottom: '32px', maxWidth: '600px' }}>
        <SearchIcon style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
        <input 
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-container"
          style={{ 
            width: '100%', 
            padding: '16px 16px 16px 48px', 
            borderRadius: '32px', 
            color: 'var(--text-primary)',
            outline: 'none',
            fontSize: '1rem'
          }}
        />
      </div>

      {query.trim().length < 2 ? (
        <>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '24px' }}>Browse all</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px' }}>
            {['Podcasts', 'Live Events', 'Made For You', 'New Releases', 'Pop', 'Hip-Hop', 'Mood', 'Workout'].map((category, idx) => (
              <div 
                key={idx} 
                className="card" 
                style={{ 
                  backgroundColor: `hsl(${idx * 40}, 60%, 40%)`, 
                  height: '180px', 
                  borderRadius: '12px',
                  overflow: 'hidden',
                  padding: '16px',
                  border: 'none',
                  animationDelay: `${0.1 + (idx * 0.05)}s`
                }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{category}</h3>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '24px' }}>Search results</h2>
          {isSearching ? (
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
               {Array(10).fill(0).map((_, idx) => (
                 <div key={idx} className="card" style={{ height: '220px', animation: 'pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)' }}></div>
               ))}
             </div>
          ) : results.length > 0 ? (
            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
              {results.map((song, idx) => (
                <MusicCard key={song.id} song={song} delayIndex={idx} contextQueue={results} />
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>No results for '{query}'</p>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
