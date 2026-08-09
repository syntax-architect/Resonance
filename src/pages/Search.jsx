import React from 'react';

function Search() {
  return (
    <div style={{ padding: '32px 24px' }} className="animate-fade-in">
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
    </div>
  );
}

export default Search;
