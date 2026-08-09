import React from 'react';
import { Volume2, ListMusic } from 'lucide-react';

function PlayerVolume({ volume, setVolume, isQueueOpen, toggleQueue }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', width: '30%' }} className="hide-on-mobile-player">
      <ListMusic 
        size={20} 
        color={isQueueOpen ? 'var(--accent-color)' : 'var(--text-secondary)'} 
        onClick={toggleQueue} 
        style={{ cursor: 'pointer', transition: 'color 0.2s', marginRight: '8px' }} 
        className="hover-white" 
      />
      <Volume2 size={20} color="var(--text-secondary)" />
      <input 
        type="range" 
        min="0" max="1" step="0.01" 
        value={volume} 
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        style={{ width: '100px', height: '4px', appearance: 'none', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', outline: 'none', cursor: 'pointer' }}
      />
    </div>
  );
}

export default PlayerVolume;
