import React from 'react';
import { motion } from 'framer-motion';
import { getPosition } from '../data/positions';
import { getLevelCount, scenariosByPosition } from '../data/scenarios';

const LevelSelect = ({ positionId, positionData, onSelectLevel, onBack }) => {
  const pos = getPosition(positionId);
  const levels = scenariosByPosition[positionId] || [];
  const unlockedLevel = positionData?.unlockedLevel || 0;

  return (
    <div className="level-select-screen">
      <div className="level-header">
        <button className="back-btn" onClick={onBack}>← חזרה</button>
        <div className="level-header-info">
          <span className="level-pos-emoji">{pos?.emoji}</span>
          <div>
            <h2 className="screen-title" style={{ margin: 0, textAlign: 'right' }}>{pos?.name} — מסלול למידה</h2>
            <p className="screen-subtitle" style={{ margin: 0 }}>{pos?.nameEn}</p>
          </div>
        </div>
      </div>

      <div className="level-path">
        {levels.map((level, index) => {
          const isUnlocked = index <= unlockedLevel;
          const isActive = index === unlockedLevel;
          const bestScore = positionData?.bestScores?.[`level_${index}`] || 0;
          const total = level.scenarios.length;
          
          let stars = 0;
          if (bestScore > 0) {
            const ratio = bestScore / total;
            if (ratio === 1) stars = 3;
            else if (ratio >= 0.7) stars = 2;
            else stars = 1;
          }

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <div className={`level-connector ${isUnlocked ? 'unlocked' : ''}`}>
                  <div className="connector-line"></div>
                </div>
              )}
              
              <motion.div
                className={`level-node ${isUnlocked ? 'unlocked' : 'locked'} ${isActive ? 'active' : ''}`}
                onClick={() => isUnlocked && onSelectLevel(index)}
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="level-number">
                  {isUnlocked ? index + 1 : '🔒'}
                </div>
                <div className="level-info">
                  <h3 className="level-name">{level.levelName}</h3>
                  <p className="level-desc">{level.levelDescription}</p>
                  <span className="level-count">{total} תרחישים</span>
                </div>
                
                {isUnlocked && (
                  <div className="level-stars">
                    {[1, 2, 3].map(s => (
                      <span key={s} className={`star ${s <= stars ? 'filled' : ''}`}>★</span>
                    ))}
                    {bestScore > 0 && (
                      <span className="level-best">{bestScore}/{total}</span>
                    )}
                  </div>
                )}

                {isActive && (
                  <div className="level-active-badge">הרמה הנוכחית</div>
                )}
              </motion.div>
            </React.Fragment>
          );
        })}

        {/* Future levels indicator */}
        <div className="level-connector locked">
          <div className="connector-line"></div>
        </div>
        <div className="level-node locked future">
          <div className="level-number">🔒</div>
          <div className="level-info">
            <h3 className="level-name">רמות נוספות בקרוב...</h3>
            <p className="level-desc">תוכן חדש מתווסף בהמשך</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
