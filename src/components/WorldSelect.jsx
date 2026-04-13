import React from 'react';
import { motion } from 'framer-motion';

const WorldSelect = ({ worlds, unlockedWorldIndex, bestScores, onSelectWorld }) => {
  return (
    <div className="world-select-container">
      {worlds.map((world, index) => {
        const isLocked = index > unlockedWorldIndex;
        const worldKey = `world_${index}`;
        const score = bestScores?.[worldKey] || 0;
        const total = world.scenarios.length;
        
        // Calculate stars (0 to 3)
        let stars = 0;
        if (score > 0) {
          const ratio = score / total;
          if (ratio === 1) stars = 3;
          else if (ratio >= 0.6) stars = 2;
          else stars = 1;
        }

        return (
          <motion.div
            key={world.id}
            className={`world-card ${isLocked ? 'locked' : ''}`}
            onClick={() => !isLocked && onSelectWorld(world, index)}
            whileHover={!isLocked ? { scale: 1.02, translateY: -5 } : {}}
            whileTap={!isLocked ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {isLocked && <div className="lock-badge">🔒 נעול</div>}
            
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <div className="world-icon" style={{ fontSize: '2.5rem' }}>
                {world.title.split(' ').pop()}
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="world-title" style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                  {world.title.replace(/[^\u0000-\u007F\u0590-\u05FF ]/g, '')}
                </h3>
                <p className="world-desc" style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {world.description}
                </p>
                
                {!isLocked && (
                  <div className="star-rating">
                    {[1, 2, 3].map(s => (
                      <span key={s} className={`star ${s <= stars ? 'filled' : ''}`}>
                        ★
                      </span>
                    ))}
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '10px', alignSelf: 'center' }}>
                      {score}/{total}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div style={{ 
              position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
              background: `radial-gradient(circle at center, ${index === 0 ? 'rgba(16, 185, 129, 0.08)' : index === 1 ? 'rgba(59, 130, 246, 0.08)' : 'rgba(239, 68, 68, 0.08)'} 0%, transparent 50%)`,
              pointerEvents: 'none',
              zIndex: 0
            }}></div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WorldSelect;
