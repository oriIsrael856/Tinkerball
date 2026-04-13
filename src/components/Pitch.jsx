import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/soundUtils';

const SPRITES = {
  blue: {
    front: '/assets/blue_front.png',
    back: '/assets/blue_back.png',
    side: '/assets/blue_side.png'
  },
  red: {
    front: '/assets/red_front.png',
    back: '/assets/red_back.png',
    side: '/assets/red_side.png'
  }
};

const getPlayerData = (team, facing) => {
  const angle = facing % 360;
  let sprite = 'front';
  let flip = false;

  // 0: Back, 180: Front, 90: Right, 270: Left
  if (angle > 315 || angle <= 45) {
    sprite = 'back';
  } else if (angle > 45 && angle <= 135) {
    sprite = 'side';
  } else if (angle > 135 && angle <= 225) {
    sprite = 'front';
  } else if (angle > 225 && angle <= 315) {
    sprite = 'side';
    flip = true;
  }

  return {
    src: SPRITES[team][sprite],
    transform: flip ? 'scaleX(-1)' : 'none'
  };
};

const BallSVG = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ball-3d" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#f0f0f0" />
        <stop offset="100%" stopColor="#cccccc" />
      </radialGradient>
    </defs>
    <circle cx="8" cy="7" r="6" fill="url(#ball-3d)" stroke="#888" strokeWidth="0.4"/>
    <path d="M8 2 L10 4.5 L9 7.5 L7 7.5 L6 4.5 Z" fill="#333" opacity="0.6"/>
    <ellipse cx="6.5" cy="4.5" rx="2" ry="1.5" fill="rgba(255,255,255,0.6)" transform="rotate(-20, 6.5, 4.5)"/>
  </svg>
);

const Radar = ({ ball, teamA, teamB }) => {
  return (
    <div className="radar-container">
      <div className="radar-field">
        {/* Ball */}
        <div 
          className="radar-dot ball" 
          style={{ top: ball.top, left: ball.left }}
        ></div>
        {/* Team A */}
        {teamA.map(p => (
          <div 
            key={p.id}
            className={`radar-dot blue ${p.isYou ? 'you' : ''}`}
            style={{ top: p.top, left: p.left }}
          ></div>
        ))}
        {/* Team B */}
        {teamB.map(p => (
          <div 
            key={p.id}
            className="radar-dot red"
            style={{ top: p.top, left: p.left }}
          ></div>
        ))}
      </div>
    </div>
  );
};

const VisionCone = ({ facing }) => {
  return (
    <div 
      className="vision-cone" 
      style={{ transform: `translate(-50%, -100%) rotateX(-25deg) rotateZ(${facing}deg)` }}
    ></div>
  );
};

const Pitch = ({ initialPositions, arrow, phase }) => {
  const [isBallMoving, setIsBallMoving] = useState(false);
  const [prevBallPos, setPrevBallPos] = useState(null);

  useEffect(() => {
    if (initialPositions?.ball) {
      if (prevBallPos && (prevBallPos.top !== initialPositions.ball.top || prevBallPos.left !== initialPositions.ball.left)) {
        setIsBallMoving(true);
        soundManager.playKick();
        const timer = setTimeout(() => setIsBallMoving(false), 300);
        return () => clearTimeout(timer);
      }
      setPrevBallPos(initialPositions.ball);
    }
  }, [initialPositions?.ball]);

  if (!initialPositions) return null;

  const { ball, teamA, teamB } = initialPositions;
  const isFocusMode = phase === 'decision';

  const playerTransition = {
    type: "spring",
    damping: 20,
    stiffness: 80,
    mass: 1
  };
  
  const ballTransition = {
    type: "spring",
    damping: 15,
    stiffness: 120,
  };

  const isHoldArrow = arrow && arrow.from.top === arrow.to.top && arrow.from.left === arrow.to.left;

  // Replay Logic: Update positions of ball and players based on the correct move during feedback
  let finalBallPos = ball;
  let finalTeamAPos = teamA;
  let finalTeamBPos = teamB;

  if (phase === 'feedback' && arrow) {
    if (arrow.type === 'pass') {
      finalBallPos = arrow.to;
    } else if (arrow.type === 'run' || arrow.type === 'press' || arrow.type === 'move') {
      finalTeamAPos = teamA.map(p => 
        (p.top === arrow.from.top && p.left === arrow.from.left) ? { ...p, ...arrow.to } : p
      );
      finalTeamBPos = teamB.map(p => 
        (p.top === arrow.from.top && p.left === arrow.from.left) ? { ...p, ...arrow.to } : p
      );
    } else if (arrow.type === 'dribble') {
      finalBallPos = arrow.to;
      finalTeamAPos = teamA.map(p => 
        (p.top === arrow.from.top && p.left === arrow.from.left) ? { ...p, ...arrow.to } : p
      );
      finalTeamBPos = teamB.map(p => 
        (p.top === arrow.from.top && p.left === arrow.from.left) ? { ...p, ...arrow.to } : p
      );
    }
  }

  const idleAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
      className={`pitch-container ${isFocusMode ? 'focus-mode' : ''}`}
      animate={{ 
        scale: isFocusMode ? 1.05 : 1,
        rotateX: isFocusMode ? 30 : 25
      }}
      transition={{ duration: 0.8 }}
    >
      {/* Field Markings */}
      <div className="pitch-half-line"></div>
      <div className="pitch-center-circle"></div>
      <div className="pitch-center-dot"></div>
      <div className="pitch-penalty-area-top"></div>
      <div className="pitch-6yard-top"></div>
      <div className="pitch-penalty-area-bottom"></div>
      <div className="pitch-6yard-bottom"></div>
      <div className="pitch-penalty-arc-top"></div>
      <div className="pitch-penalty-arc-bottom"></div>
      <div className="pitch-corner-tl"></div>
      <div className="pitch-corner-tr"></div>
      <div className="pitch-corner-bl"></div>
      <div className="pitch-corner-br"></div>
      <div className="pitch-penalty-spot-top"></div>
      <div className="pitch-penalty-spot-bottom"></div>
      <div className="pitch-goal-top"></div>
      <div className="pitch-goal-bottom"></div>

      {/* Team A (Blue) */}
      {finalTeamAPos.map((player) => {
        const spriteData = getPlayerData('blue', player.facing ?? 0);
        return (
          <motion.div 
            key={`a-${player.id}`} 
            className={`player-sprite ${player.isYou ? 'player-highlight' : ''}`}
            animate={{ 
              top: player.top, 
              left: player.left,
              scale: player.isYou ? [1, 1.05, 1] : [1, 1.02, 1]
            }}
            initial={false}
            transition={{
              ...playerTransition,
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {player.isYou && <VisionCone facing={player.facing ?? 0} />}
            <img 
              src={spriteData.src} 
              alt={player.role} 
              className="player-img" 
              style={{ transform: spriteData.transform }}
            />
            <div className="player-shadow"></div>
            <div style={{ 
              position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '10px', padding: '1px 4px', borderRadius: '4px',
              fontWeight: 'bold', pointerEvents: 'none', border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {player.role}
            </div>
          </motion.div>
        );
      })}

      {/* Team B (Red) */}
      {finalTeamBPos.map((player) => {
        const spriteData = getPlayerData('red', player.facing ?? 180);
        return (
          <motion.div 
            key={`b-${player.id}`} 
            className="player-sprite"
            animate={{ 
              top: player.top, 
              left: player.left,
              scale: [1, 1.02, 1]
            }}
            initial={false}
            transition={{
              ...playerTransition,
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img 
              src={spriteData.src} 
              alt={player.role} 
              className="player-img" 
              style={{ transform: spriteData.transform }}
            />
            <div className="player-shadow"></div>
            <div style={{ 
              position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '10px', padding: '1px 4px', borderRadius: '4px',
              fontWeight: 'bold', pointerEvents: 'none', border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {player.role}
            </div>
          </motion.div>
        );
      })}

      {/* Ball */}
      <motion.div 
        className={`ball-wrapper ${isBallMoving ? 'ball-moving' : ''}`}
        animate={{ top: finalBallPos.top, left: finalBallPos.left }}
        initial={false}
        transition={ballTransition}
      >
        <BallSVG />
        <div className="ball-shadow"></div>
        <div className="ball-glow"></div>
      </motion.div>

      {/* Tactical Radar */}
      <Radar ball={ball} teamA={teamA} teamB={teamB} />

      {/* Arrow Overlay (remains flat on pitch) */}
      <AnimatePresence>
        {arrow && (
          <svg 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5, pointerEvents: 'none' }}
          >
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill={'#10b981'} />
              </marker>
            </defs>
            {!isHoldArrow && (
              <motion.line
                x1={parseFloat(arrow.from.left)}
                y1={parseFloat(arrow.from.top)}
                x2={parseFloat(arrow.to.left)}
                y2={parseFloat(arrow.to.top)}
                stroke={'#10b981'}
                strokeWidth="0.8"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            )}
            <motion.text
              x={parseFloat(arrow.to.left)}
              y={parseFloat(arrow.to.top) - 2}
              textAnchor="middle"
              fill="white"
              fontSize="3.5"
              fontWeight="900"
              style={{ textShadow: '0 0 3px rgba(0,0,0,0.8)' }}
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
