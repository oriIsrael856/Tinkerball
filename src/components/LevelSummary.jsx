import React from 'react';
import { motion } from 'framer-motion';

// ── helpers ──────────────────────────────────────────────────

function calcStars(score, total) {
  const ratio = score / total;
  if (ratio === 1)    return 3;
  if (ratio >= 0.7)   return 2;
  if (ratio >= 0.5)   return 1;
  return 0;
}

function summaryMessage(score, total) {
  const ratio = score / total;
  if (ratio === 1)    return 'ניתוח מושלם! אתה רואה את המגרש כמו מקצוען.';
  if (ratio >= 0.7)   return 'עבודה טובה! יש עוד טיפה לשפר — נסה שוב לכוכב שלישי.';
  if (ratio >= 0.5)   return 'עברת את הרמה. חזור ולמד מהעקרונות כדי לשפר.';
  return 'צריך עוד תרגול. חזור על הרמה ולמד את העקרונות הטקטיים.';
}

// ── component ─────────────────────────────────────────────────

/**
 * @param {object}   level            — נתוני הרמה הנוכחית
 * @param {number}   levelIndex       — אינדקס הרמה (0-based)
 * @param {number}   score            — כמה תשובות נכונות
 * @param {Array}    scenarioResults  — [{ title, isCorrect, time }]
 * @param {string}   posName          — שם העמדה בעברית
 * @param {string}   posEmoji         — אמוג'י העמדה
 * @param {boolean}  canGoNextLevel   — האם הרמה הבאה קיימת ופתוחה
 * @param {Function} onRetry
 * @param {Function} onNextLevel
 * @param {Function} onBack
 * @param {Function} onHome
 */
const LevelSummary = ({
  level,
  levelIndex,
  score,
  scenarioResults,
  posName,
  posEmoji,
  canGoNextLevel,
  onRetry,
  onNextLevel,
  onBack,
  onHome,
}) => {
  const total = level.scenarios.length;
  const passed = score >= Math.ceil(total / 2);
  const stars  = calcStars(score, total);

  return (
    <div className="summary-screen">
      <motion.div
        className="glass-card summary-card"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* ── header ── */}
        <div className="summary-header">
          <span className="summary-pos-badge">{posEmoji} {posName}</span>
          <h1 className="summary-title">סיכום רמה {levelIndex + 1}</h1>
        </div>

        {/* ── stars ── */}
        <div className="summary-stars">
          {[1, 2, 3].map((s) => (
            <motion.span
              key={s}
              className={`summary-star ${s <= stars ? 'filled' : ''}`}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 + s * 0.12, type: 'spring', stiffness: 260, damping: 18 }}
            >
              ★
            </motion.span>
          ))}
        </div>

        {/* ── score ── */}
        <div className="summary-score">
          <span
            className="summary-score-num"
            style={{ color: passed ? 'var(--accent-color)' : 'var(--danger)' }}
          >
            {score}/{total}
          </span>
        </div>

        {/* ── per-scenario breakdown ── */}
        {scenarioResults.length > 0 && (
          <div className="summary-breakdown">
            {scenarioResults.map((result, i) => (
              <motion.div
                key={i}
                className={`summary-row ${result.isCorrect ? 'correct' : 'incorrect'}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.07 }}
              >
                <span className="summary-row-num">{i + 1}</span>
                <span className="summary-row-title">{result.title}</span>
                <span className="summary-row-icon">{result.isCorrect ? '✅' : '❌'}</span>
                <span className="summary-row-time">
                  {result.time != null ? `${result.time.toFixed(1)}s` : '—'}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── message ── */}
        <p className="summary-msg">{summaryMessage(score, total)}</p>

        {/* ── actions ── */}
        <div className="summary-actions">
          {passed && canGoNextLevel && (
            <button className="primary" onClick={onNextLevel}>
              הרמה הבאה →
            </button>
          )}
          <button className="primary" onClick={onRetry}>🔄 נסה שוב</button>
          <button
            className="glass-card"
            style={{ padding: '0.8rem', cursor: 'pointer' }}
            onClick={onBack}
          >
            📋 חזרה לרמות
          </button>
          <button className="secondary" onClick={onHome}>🏠 תפריט ראשי</button>
        </div>
      </motion.div>
    </div>
  );
};

export default LevelSummary;
