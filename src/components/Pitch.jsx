import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/soundUtils';

// ── Sprite assets ─────────────────────────────────────────────
const SPRITES = {
  blue: { front: '/assets/blue_front.png', back: '/assets/blue_back.png', side: '/assets/blue_side.png' },
  red:  { front: '/assets/red_front.png',  back: '/assets/red_back.png',  side: '/assets/red_side.png'  },
};

// ── Relevance helpers ─────────────────────────────────────────
// A player is "relevant" (gets a full sprite) when close to the ball
// OR close to the "you" player. Everyone else becomes a small dot.
const RELEVANCE_THRESHOLD = 30; // coordinate units out of 100

function coordDist(a, b) {
  const dx = parseFloat(a.left) - parseFloat(b.left);
  const dy = parseFloat(a.top)  - parseFloat(b.top);
  return Math.sqrt(dx * dx + dy * dy);
}

function isRelevant(player, ball, youPos) {
  if (player.isYou) return true;
  const distToBall = coordDist(player, ball);
  const distToYou  = youPos ? coordDist(player, youPos) : Infinity;
  return Math.min(distToBall, distToYou) <= RELEVANCE_THRESHOLD;
}

// ── Sprite direction ──────────────────────────────────────────
function getSpriteData(team, facing) {
  const angle = (facing ?? 0) % 360;
  let sprite = 'front';
  let flip   = false;

  if      (angle > 315 || angle <= 45)  { sprite = 'back'; }
  else if (angle > 45  && angle <= 135) { sprite = 'side'; }
  else if (angle > 135 && angle <= 225) { sprite = 'front'; }
  else                                  { sprite = 'side'; flip = true; }

  return { src: SPRITES[team][sprite], transform: flip ? 'scaleX(-1)' : 'none' };
}

// ── Sub-components ────────────────────────────────────────────

const BallSVG = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ball-3d" cx="35%" cy="35%">
        <stop offset="0%"   stopColor="#ffffff" />
        <stop offset="60%"  stopColor="#f0f0f0" />
        <stop offset="100%" stopColor="#cccccc" />
      </radialGradient>
    </defs>
    <circle cx="8" cy="7" r="6" fill="url(#ball-3d)" stroke="#888" strokeWidth="0.4"/>
    <path d="M8 2 L10 4.5 L9 7.5 L7 7.5 L6 4.5 Z" fill="#333" opacity="0.6"/>
    <ellipse cx="6.5" cy="4.5" rx="2" ry="1.5" fill="rgba(255,255,255,0.6)" transform="rotate(-20, 6.5, 4.5)"/>
  </svg>
);

const Radar = ({ ball, teamA, teamB }) => (
  <div className="radar-container">
    <div className="radar-field">
      <div className="radar-dot ball" style={{ top: ball.top, left: ball.left }} />
      {teamA.map(p => (
        <div key={p.id} className={`radar-dot blue ${p.isYou ? 'you' : ''}`} style={{ top: p.top, left: p.left }} />
      ))}
      {teamB.map(p => (
        <div key={p.id} className="radar-dot red" style={{ top: p.top, left: p.left }} />
      ))}
    </div>
  </div>
);

const VisionCone = ({ facing }) => (
  <div
    className="vision-cone"
    style={{ transform: `translate(-50%, -100%) rotateX(-25deg) rotateZ(${facing}deg)` }}
  />
);

/** Small colored circle for players far from the action */
const PlayerDot = ({ team, player, transition }) => (
  <motion.div
    className={`player-dot player-dot--${team}`}
    animate={{ top: player.top, left: player.left }}
    initial={false}
    transition={transition}
    title={player.role}
  />
);

/** Full sprite for players relevant to the situation */
const PlayerSprite = ({ player, team, transition }) => {
  const { src, transform } = getSpriteData(team, player.facing ?? (team === 'red' ? 180 : 0));

  return (
    <motion.div
      className={`player-sprite ${player.isYou ? 'player-highlight' : ''}`}
      animate={{ top: player.top, left: player.left }}
      initial={false}
      transition={transition}
    >
      {player.isYou && (
        <>
          <div className="player-halo" />
          <VisionCone facing={player.facing ?? 0} />
        </>
      )}
      <img src={src} alt={player.role} className="player-img" style={{ transform }} />
      <div className="player-shadow" />
      <div className="player-role-label">
        {player.isYou ? 'אתה' : player.role}
      </div>
    </motion.div>
  );
};

// ── Main component ────────────────────────────────────────────

const Pitch = ({ initialPositions, arrow, phase }) => {
  const [isBallMoving, setIsBallMoving] = useState(false);
  const [prevBallPos,  setPrevBallPos]  = useState(null);

  useEffect(() => {
    if (!initialPositions?.ball) return;
    const { ball } = initialPositions;
    if (prevBallPos && (prevBallPos.top !== ball.top || prevBallPos.left !== ball.left)) {
      setIsBallMoving(true);
      soundManager.playKick();
      const t = setTimeout(() => setIsBallMoving(false), 300);
      return () => clearTimeout(t);
    }
    setPrevBallPos(ball);
  }, [initialPositions?.ball]);

  if (!initialPositions) return null;

  const { ball, teamA, teamB } = initialPositions;
  const isFocusMode = phase === 'decision';

  const playerTransition = { type: 'spring', damping: 20, stiffness: 80, mass: 1 };
  const ballTransition   = { type: 'spring', damping: 15, stiffness: 120 };

  // ── Feedback animation: move ball / player to correct position ──
  let finalBallPos  = ball;
  let finalTeamAPos = teamA;
  let finalTeamBPos = teamB;

  if (phase === 'feedback' && arrow) {
    if (arrow.type === 'pass') {
      finalBallPos = arrow.to;
    } else if (['run', 'press', 'move'].includes(arrow.type)) {
      const move = p => (p.top === arrow.from.top && p.left === arrow.from.left) ? { ...p, ...arrow.to } : p;
      finalTeamAPos = teamA.map(move);
      finalTeamBPos = teamB.map(move);
    } else if (arrow.type === 'dribble') {
      finalBallPos  = arrow.to;
      const move = p => (p.top === arrow.from.top && p.left === arrow.from.left) ? { ...p, ...arrow.to } : p;
      finalTeamAPos = teamA.map(move);
    }
  }

  // Relevance is calculated from the INITIAL ball position (not the animated one)
  const youPlayer = teamA.find(p => p.isYou) ?? null;

  const isHoldArrow = arrow && arrow.from.top === arrow.to.top && arrow.from.left === arrow.to.left;

  return (
    <motion.div
      className={`pitch-container ${isFocusMode ? 'focus-mode' : ''}`}
      animate={{ scale: isFocusMode ? 1.05 : 1, rotateX: isFocusMode ? 30 : 25 }}
      transition={{ duration: 0.8 }}
    >
      {/* Field markings */}
      <div className="pitch-half-line" />
      <div className="pitch-center-circle" />
      <div className="pitch-center-dot" />
      <div className="pitch-penalty-area-top" />
      <div className="pitch-6yard-top" />
      <div className="pitch-penalty-area-bottom" />
      <div className="pitch-6yard-bottom" />
      <div className="pitch-penalty-arc-top" />
      <div className="pitch-penalty-arc-bottom" />
      <div className="pitch-corner-tl" />
      <div className="pitch-corner-tr" />
      <div className="pitch-corner-bl" />
      <div className="pitch-corner-br" />
      <div className="pitch-penalty-spot-top" />
      <div className="pitch-penalty-spot-bottom" />
      <div className="pitch-goal-top" />
      <div className="pitch-goal-bottom" />

      {/* Team A — blue */}
      {finalTeamAPos.map(player =>
        isRelevant(player, ball, youPlayer)
          ? <PlayerSprite key={`a-${player.id}`} player={player} team="blue" transition={playerTransition} />
          : <PlayerDot    key={`a-${player.id}`} player={player} team="blue" transition={playerTransition} />
      )}

      {/* Team B — red */}
      {finalTeamBPos.map(player =>
        isRelevant(player, ball, youPlayer)
          ? <PlayerSprite key={`b-${player.id}`} player={player} team="red"  transition={playerTransition} />
          : <PlayerDot    key={`b-${player.id}`} player={player} team="red"  transition={playerTransition} />
      )}

      {/* Ball */}
      <motion.div
        className={`ball-wrapper ${isBallMoving ? 'ball-moving' : ''}`}
        animate={{ top: finalBallPos.top, left: finalBallPos.left }}
        initial={false}
        transition={ballTransition}
      >
        <BallSVG />
        <div className="ball-shadow" />
        <div className="ball-glow" />
      </motion.div>

      {/* Radar */}
      <Radar ball={ball} teamA={teamA} teamB={teamB} />

      {/* Tactical arrow */}
      <AnimatePresence>
        {arrow && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5, pointerEvents: 'none' }}
          >
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
              </marker>
            </defs>
            {!isHoldArrow && (
              <motion.line
                x1={parseFloat(arrow.from.left)} y1={parseFloat(arrow.from.top)}
                x2={parseFloat(arrow.to.left)}   y2={parseFloat(arrow.to.top)}
                stroke="#10b981" strokeWidth="0.8" markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            )}
            <motion.text
              x={parseFloat(arrow.to.left)}
              y={parseFloat(arrow.to.top) - 2}
              textAnchor="middle" fill="white" fontSize="3.5" fontWeight="900"
            >
              {arrow.label}
            </motion.text>
          </svg>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Pitch;
