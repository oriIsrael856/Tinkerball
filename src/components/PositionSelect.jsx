import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { POSITIONS } from '../data/positions';

const PositionSelect = ({ onSelectPosition, playerLevels }) => {
  const [hoveredPos, setHoveredPos] = useState(null);

  const available = POSITIONS.filter(p => p.available);
  const comingSoon = POSITIONS.filter(p => !p.available);

  return (
    <div className="position-select-screen">
      <motion.h2 
        className="screen-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        בחר את העמדה שלך
      </motion.h2>
      <p className="screen-subtitle">כל עמדה מציעה מסלול למידה שונה עם תרחישים טקטיים ייחודיים</p>

      {/* Active Positions */}
      <div className="position-grid">
        {available.map((pos, i) => {
          const posData = playerLevels?.[pos.id];
          const levelsUnlocked = posData?.unlockedLevel || 0;
          
          return (
            <motion.div
              key={pos.id}
              className="position-card available"
              onClick={() => onSelectPosition(pos.id)}
              onMouseEnter={() => setHoveredPos(pos.id)}
              onMouseLeave={() => setHoveredPos(null)}
              whileHover={{ scale: 1.04, translateY: -8 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="position-emoji">{pos.emoji}</div>
              <h3 className="position-name">{pos.name}</h3>
              <span className="position-name-en">{pos.nameEn}</span>
              
              <motion.p 
                className="position-desc"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hoveredPos === pos.id ? 'auto' : 0,
                  opacity: hoveredPos === pos.id ? 1 : 0
                }}
              >
                {pos.description}
              </motion.p>

              {levelsUnlocked > 0 && (
                <div className="position-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(levelsUnlocked * 33, 100)}%` }}></div>
                  </div>
                  <span className="progress-text">רמה {levelsUnlocked + 1}</span>
                </div>
              )}

              <div className="position-principles">
                {pos.keyPrinciples.slice(0, 2).map(p => (
                  <span key={p} className="principle-tag">{p}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Coming Soon Positions */}
      <h3 className="coming-soon-header">בקרוב...</h3>
      <div className="position-grid coming-soon-grid">
        {comingSoon.map((pos, i) => (
          <motion.div
            key={pos.id}
            className="position-card locked"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            <div className="position-emoji">{pos.emoji}</div>
            <h3 className="position-name">{pos.name}</h3>
            <span className="position-name-en">{pos.nameEn}</span>
            <div className="lock-badge">🔒</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PositionSelect;
