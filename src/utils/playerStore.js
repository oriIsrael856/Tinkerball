// Thinkerball V2 — Advanced Persistence Layer
// Handles all player data storage in LocalStorage

const STORAGE_KEY = 'thinkerball_v2';

const DEFAULT_PROFILE = {
  selectedPosition: null,
  levels: {},       // { 'CB': { unlockedLevel: 0, bestScores: {} }, ... }
  stats: {
    totalCorrect: 0,
    totalAnswered: 0,
    avgResponseTime: 0,
    responseTimes: [],  // last 50 response times for rolling average
    currentStreak: 0,
    bestStreak: 0,
    sessionsPlayed: 0,
    history: []         // { date, position, accuracy, avgTime }
  },
  milestones: []
};

// Milestone definitions
export const MILESTONES = [
  { id: 'first_correct', name: 'צעד ראשון', desc: 'תשובה נכונה ראשונה', icon: '🌟', check: (s) => s.totalCorrect >= 1 },
  { id: 'ten_correct', name: 'מתחיל להבין', desc: '10 תשובות נכונות', icon: '💡', check: (s) => s.totalCorrect >= 10 },
  { id: 'fifty_correct', name: 'מבין משחק', desc: '50 תשובות נכונות', icon: '🏅', check: (s) => s.totalCorrect >= 50 },
  { id: 'streak_3', name: 'רצף קטן', desc: 'רצף של 3 הצלחות', icon: '🔥', check: (s) => s.bestStreak >= 3 },
  { id: 'streak_5', name: 'על גל', desc: 'רצף של 5 הצלחות', icon: '🔥🔥', check: (s) => s.bestStreak >= 5 },
  { id: 'streak_10', name: 'בלתי ניתן לעצירה', desc: 'רצף של 10 הצלחות', icon: '🔥🔥🔥', check: (s) => s.bestStreak >= 10 },
  { id: 'speed_demon', name: 'מהיר כברק', desc: 'זמן תגובה ממוצע מתחת ל-3 שניות', icon: '⚡', check: (s) => s.avgResponseTime > 0 && s.avgResponseTime < 3 },
  { id: 'level_perfect', name: 'מושלם', desc: 'סיום רמה ב-100%', icon: '👑', check: () => false }, // checked separately
];

export function loadProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      return { ...DEFAULT_PROFILE, ...data, stats: { ...DEFAULT_PROFILE.stats, ...data.stats } };
    }
  } catch (e) {
    console.warn('Failed to load profile:', e);
  }
  return { ...DEFAULT_PROFILE };
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Failed to save profile:', e);
  }
}

// Initialize position data if it doesn't exist
export function ensurePositionData(profile, positionId) {
  if (!profile.levels[positionId]) {
    profile.levels[positionId] = {
      unlockedLevel: 0,
      bestScores: {}
    };
  }
  return profile;
}

// Record a single answer result
export function recordAnswer(profile, { positionId, isCorrect, responseTime }) {
  const stats = { ...profile.stats };
  
  stats.totalAnswered += 1;
  if (isCorrect) {
    stats.totalCorrect += 1;
    stats.currentStreak += 1;
    if (stats.currentStreak > stats.bestStreak) {
      stats.bestStreak = stats.currentStreak;
    }
  } else {
    stats.currentStreak = 0;
  }

  // Rolling average of response times (keep last 50)
  stats.responseTimes = [...(stats.responseTimes || []), responseTime].slice(-50);
  stats.avgResponseTime = stats.responseTimes.reduce((a, b) => a + b, 0) / stats.responseTimes.length;

  // Check for new milestones
  const newMilestones = [...(profile.milestones || [])];
  MILESTONES.forEach(m => {
    if (!newMilestones.includes(m.id) && m.check(stats)) {
      newMilestones.push(m.id);
    }
  });

  return { ...profile, stats, milestones: newMilestones };
}

// Record a completed level
export function recordLevelComplete(profile, { positionId, levelIndex, score, total }) {
  const levels = { ...profile.levels };
  const posData = { ...(levels[positionId] || { unlockedLevel: 0, bestScores: {} }) };
  
  // Update best score
  const levelKey = `level_${levelIndex}`;
  const currentBest = posData.bestScores[levelKey] || 0;
  if (score > currentBest) {
    posData.bestScores[levelKey] = score;
  }

  // Unlock next level if passed (50%+)
  const threshold = Math.ceil(total / 2);
  if (score >= threshold && levelIndex === posData.unlockedLevel) {
    posData.unlockedLevel += 1;
  }

  // Check perfect milestone
  const milestones = [...(profile.milestones || [])];
  if (score === total && !milestones.includes('level_perfect')) {
    milestones.push('level_perfect');
  }

  levels[positionId] = posData;

  // Record session in history
  const stats = { ...profile.stats };
  stats.sessionsPlayed += 1;
  stats.history = [
    ...(stats.history || []),
    {
      date: new Date().toISOString().split('T')[0],
      position: positionId,
      accuracy: score / total,
      avgTime: profile.stats.avgResponseTime
    }
  ].slice(-100); // Keep last 100 sessions

  return { ...profile, levels, stats, milestones };
}

// Get tactical title based on stats
export function getTacticalTitle(stats) {
  const accuracy = stats.totalAnswered > 0 ? stats.totalCorrect / stats.totalAnswered : 0;
  
  if (accuracy >= 0.9 && stats.totalAnswered >= 30) return { title: 'רב-אמן טקטי', icon: '🧠', color: '#f59e0b' };
  if (accuracy >= 0.8 && stats.totalAnswered >= 20) return { title: 'פליימייקר עילית', icon: '🪄', color: '#8b5cf6' };
  if (accuracy >= 0.7 && stats.totalAnswered >= 10) return { title: 'שחקן חכם', icon: '⚽', color: '#10b981' };
  if (accuracy >= 0.5) return { title: 'לומד את המשחק', icon: '📚', color: '#3b82f6' };
  return { title: 'טירון', icon: '🌱', color: '#6b7280' };
}
