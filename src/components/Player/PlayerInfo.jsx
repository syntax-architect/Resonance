import React from 'react';
import { Heart } from 'lucide-react';
import { SignInButton } from '@clerk/clerk-react';

function PlayerInfo({ currentTrack, isLiked, toggleLike, user, supabaseClient }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '30%' }}>
      <img src={currentTrack.img} alt="cover" style={{ width: '56px', height: '56px', borderRadius: '4px', objectFit: 'cover' }} />
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{currentTrack.title}</div>
        <div style={{ fontSize: '0.75rem', color: '#b3b3b3' }}>{currentTrack.artist}</div>
        {currentTrack.license && (
          <a 
            href={currentTrack.license} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', marginTop: '4px' }}
            className="hover-white"
          >
            CC Licensed
          </a>
        )}
      </div>
      <div style={{ marginLeft: '16px' }}>
        {user ? (
          <Heart 
            size={20} 
            fill={isLiked ? "var(--accent-color)" : "none"} 
            color={isLiked ? "var(--accent-color)" : "#b3b3b3"} 
            onClick={() => toggleLike(currentTrack, supabaseClient, user.id)}
            style={{ cursor: 'pointer', transition: 'all 0.2s' }} 
            className="hover-accent"
          />
        ) : (
          <SignInButton mode="modal">
            <Heart size={20} color="#b3b3b3" style={{ cursor: 'pointer' }} className="hover-white" />
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export default PlayerInfo;
