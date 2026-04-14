import React from 'react';
import { motion } from 'framer-motion';
import { MILESTONES, getTacticalTitle } from '../utils/playerStore';

const PlayerProfile = ({ profile, onBack }) => {
  const { stats, milestones = [] } = profile;
  const accuracy = stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0;
  const tacticalTitle = getTacticalTitle(stats);
  const avgTime = stats.avgResponseTime > 0 ? stats.avgResponseTime.toFixed(1) : '—';

  const earnedMilestones = MILESTONES.filter(m => milestones.includes(m.id));
  const unearnedMilestones = MILESTONES.filter(m => !milestones.includes(m.id));

  // Last 10 sessions for chart
  const recentHistory = (stats.history || []).slice(-10);

  return (
    <div className="profile-screen">
      <div className="profile-header">
        <button className="back-btn" onClick={onBack}>← חזרה</button>
        <h2 className="screen-title">הפרופיל הטקטי שלי</h2>
      </div>

      {/* Tactical Title Card */}
      <motion.div 
        className="profile-title-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <span className="profile-title-icon">{tacticalTitle.icon}</span>
        <h3 className="profile-title-name" style={{ color: tacticalTitle.color }}>{tacticalTitle.title}</h3>
        <p className="profile-title-sub">{stats.totalAnswered} החלטות ניתחת</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value" style={{ color: accuracy >= 70 ? '#10b981' : accuracy >= 50 ? '#f59e0b' : '#ef4444' }}>
            {accuracy}%
          </div>
          <div className="stat-label">דיוק כללי</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgTime}<span className="stat-unit">s</span></div>
          <div className="stat-label">זמן תגובה ממוצע</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.currentStreak}</div>
          <div className="stat-label">רצף נוכחי 🔥</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.bestStreak}</div>
          <div className="stat-label">שיא רצף</div>
        </div>
      </div>

      {/* Performance Chart (Simple Bar) */}
      {recentHistory.length > 0 && (
        <div className="profile-section">
          <h3 className="section-title">ביצועים אחרונים</h3>
          <div className="mini-chart">
            {recentHistory.map((session, i) => (
              <div key={i} className="chart-bar-wrapper">
                <div 
                  className="chart-bar" 
                  style={{ 
                    height: `${Math.max(session.accuracy * 100, 10)}%`,
                    background: session.accuracy >= 0.7 ? '#10b981' : session.accuracy >= 0.5 ? '#f59e0b' : '#ef4444'
                  }}
                />
                <span className="chart-label">{session.position}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Milestones */}
      <div className="profile-section">
        <h3 className="section-title">אבני דרך</h3>
        <div className="milestones-grid">
          {earnedMilestones.map(m => (
            <div key={m.id} className="milestone earned">
              <span className="milestone-icon">{m.icon}</span>
              <div>
                <div className="milestone-name">{m.name}</div>
                <div className="milestone-desc">{m.desc}</div>
              </div>
            </div>
          ))}
          {unearnedMilestones.map(m => (
            <div key={m.id} className="milestone locked">
              <span className="milestone-icon" style={{ filter: 'grayscale(1) opacity(0.3)' }}>{m.icon}</span>
              <div>
                <div className="milestone-name">{m.name}</div>
                <div className="milestone-desc">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
