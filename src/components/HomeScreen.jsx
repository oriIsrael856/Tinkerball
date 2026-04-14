import React from 'react';
import { motion } from 'framer-motion';

const HomeScreen = ({ onSelectMode }) => {
  return (
    <div className="home-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="home-header"
      >
        <h1 className="home-logo">⚽ Thinkerball</h1>
        <p className="home-tagline">שפר את קבלת ההחלטות שלך על המגרש</p>
      </motion.div>

      <div className="mode-cards">
        <motion.div
          className="mode-card player-mode"
          onClick={() => onSelectMode('player')}
          whileHover={{ scale: 1.03, translateY: -5 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mode-icon">🎮</div>
          <h2 className="mode-title">מצב שחקן</h2>
          <p className="mode-desc">בחר את העמדה שלך והתחל מסלול למידה טקטי מותאם אישית. שפר דיוק, מהירות תגובה וחשיבה על המגרש.</p>
          <div className="mode-features">
            <span className="mode-feature">📊 מעקב התקדמות</span>
            <span className="mode-feature">⏱️ מדידת זמן תגובה</span>
            <span className="mode-feature">🏆 רמות ואתגרים</span>
          </div>
          <div className="mode-cta">התחל לשחק →</div>
        </motion.div>

        <motion.div
          className="mode-card coach-mode locked"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="lock-overlay">
            <span className="lock-icon-big">🔒</span>
            <span className="coming-soon-text">Coming Soon</span>
          </div>
          <div className="mode-icon">📋</div>
          <h2 className="mode-title">מצב מאמן</h2>
          <p className="mode-desc">הגדר את הפילוסופיה שלך, בנה סשנים טקטיים, וקבל דוחות ביצועים מפורטים על השחקנים.</p>
          <div className="mode-features">
            <span className="mode-feature">🧠 AI מותאם אישית</span>
            <span className="mode-feature">📈 דוחות ביצועים</span>
            <span className="mode-feature">⚙️ בניית סשנים</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeScreen;
