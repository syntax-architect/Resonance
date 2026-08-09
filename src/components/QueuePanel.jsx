import React, { useState } from 'react';
import usePlayerStore from '../store/usePlayerStore';
import { X, GripVertical, Play } from 'lucide-react';

function QueuePanel() {
  const { isQueueOpen, toggleQueue, queue, currentIndex, playFromQueue, reorderQueue } = usePlayerStore();
  const [draggedIdx, setDraggedIdx] = useState(null);

  // Still render it so the CSS transition works, just hide it via transform
  
  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
    // Slight delay so the drag image doesn't snap back immediately
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedIdx(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetIdx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    
    // Map the relative targetIdx back to the absolute queue index
    reorderQueue(draggedIdx, targetIdx);
    setDraggedIdx(null);
  };
  
  // We only show the upcoming queue including the current track
  const upcomingQueue = queue.slice(currentIndex >= 0 ? currentIndex : 0).map((track, i) => ({
    track,
    absoluteIndex: (currentIndex >= 0 ? currentIndex : 0) + i
  }));

  return (
    <div 
      className="glass-panel queue-panel"
      style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        bottom: '106px', // above player
        width: '350px',
        transform: isQueueOpen ? 'translateX(0)' : 'translateX(120%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
        visibility: isQueueOpen || queue.length > 0 ? 'visible' : 'hidden'
      }}
    >
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Queue</h2>
        <X size={20} color="var(--text-secondary)" onClick={toggleQueue} style={{ cursor: 'pointer' }} className="hover-white" />
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }} className="sidebar-scroll-area">
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-secondary)' }}>Now Playing</h3>
        {upcomingQueue.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <QueueItem 
              item={upcomingQueue[0]} 
              isCurrent={true} 
              onPlay={() => {}} // already playing
            />
          </div>
        )}
        
        {upcomingQueue.length > 1 && (
          <>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-secondary)' }}>Next In Queue</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {upcomingQueue.slice(1).map((item) => (
                <QueueItem 
                  key={`${item.track.id}-${item.absoluteIndex}`}
                  item={item} 
                  isCurrent={false}
                  onPlay={() => playFromQueue(item.absoluteIndex)}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, item.absoluteIndex)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, item.absoluteIndex)}
                />
              ))}
            </div>
          </>
        )}
        
        {upcomingQueue.length === 0 && (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '32px' }}>Queue is empty.</p>
        )}
      </div>
    </div>
  );
}

function QueueItem({ item, isCurrent, onPlay, draggable, onDragStart, onDragEnd, onDragOver, onDrop }) {
  const [isHovered, setIsHovered] = useState(false);
  const { track } = item;
  
  return (
    <div 
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        padding: '8px', 
        borderRadius: '8px',
        background: isHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
        cursor: draggable ? 'grab' : 'default',
        transition: 'background 0.2s'
      }}
    >
      <div 
        style={{ width: '48px', height: '48px', position: 'relative', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}
      >
        <img src={track.img} alt={track.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {isHovered && !isCurrent && (
          <div 
            onClick={(e) => { e.stopPropagation(); onPlay(); }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <Play size={20} fill="#fff" />
          </div>
        )}
      </div>
      
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 500, color: isCurrent ? 'var(--accent-color)' : '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.artist}</div>
      </div>
      
      {draggable && (
        <div style={{ color: 'var(--text-secondary)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s', cursor: 'grab' }}>
          <GripVertical size={16} />
        </div>
      )}
    </div>
  );
}

export default QueuePanel;
