import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/soundUtils';

const READING_SECONDS  = 60;
const DECISION_SECONDS = 40;

const Scenario = ({ scenario, onResult }) => {
  const [phase, setPhase]                   = useState('reading'); // 'reading' | 'decision'
  const [readingLeft, setReadingLeft]       = useState(READING_SECONDS);
  const [decisionLeft, setDecisionLeft]     = useState(DECISION_SECONDS);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isTimeUp, setIsTimeUp]             = useState(false);
  const [startTime, setStartTime]           = useState(null); // starts when decision phase begins

  // Reset on new scenario
  useEffect(() => {
    setPhase('reading');
    setReadingLeft(READING_SECONDS);
    setDecisionLeft(DECISION_SECONDS);
    setSelectedOptionId(null);
    setIsTimeUp(false);
    setStartTime(null);
  }, [scenario.id]);

  // Reading countdown
  useEffect(() => {
    if (phase !== 'reading') return;

    const id = setInterval(() => {
      setReadingLeft(prev => {
        if (prev <= 0.1) {
          clearInterval(id);
          setPhase('decision');
          setStartTime(Date.now());
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(id);
  }, [phase, scenario.id]);

  // Decision countdown
  useEffect(() => {
    if (phase !== 'decision' || selectedOptionId || isTimeUp) return;

    const id = setInterval(() => {
      setDecisionLeft(prev => {
        if (prev <= 0.1) {
          clearInterval(id);
          setIsTimeUp(true);
          return 0;
        }
        if (prev < 4 && Math.floor(prev * 10) % 2 === 0) {
          soundManager.playTick();
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(id);
  }, [phase, selectedOptionId, isTimeUp, scenario.id]);

  // Time up → report no answer
  useEffect(() => {
    if (isTimeUp) onResult(null, DECISION_SECONDS);
  }, [isTimeUp, onResult]);

  const handleOptionClick = (option) => {
    if (selectedOptionId || isTimeUp || phase === 'reading') return;
    const elapsed = (Date.now() - startTime) / 1000;
    setSelectedOptionId(option.id);
    onResult(option, elapsed);
  };

  const getButtonClass = (option) => {
    if (!selectedOptionId && !isTimeUp) return '';
    if (option.isCorrect) return 'correct';
    if (selectedOptionId === option.id && !option.isCorrect) return 'incorrect';
    return '';
  };

  return (
    <div className="glass-card">
      {phase === 'reading' ? (
        /* ── Reading phase ── */
        <div className="reading-phase">
          <div className="reading-timer-row">
            <span className="reading-label">⏱ זמן קריאה</span>
            <span className="reading-countdown">{Math.ceil(readingLeft)}s</span>
          </div>
          <div className="timer-bar-container">
            <div
              className="timer-bar timer-reading"
              style={{ width: `${(readingLeft / READING_SECONDS) * 100}%` }}
            />
          </div>
          <p className="scenario-text">{scenario.question}</p>
          <p className="reading-hint">נתח את המגרש — האפשרויות יופיעו בעוד {Math.ceil(readingLeft)} שניות</p>
        </div>
      ) : (
        /* ── Decision phase ── */
        <AnimatePresence>
          <motion.div
            key="decision"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="reading-timer-row">
              <span className="reading-label">⚡ זמן החלטה</span>
              <span className={`reading-countdown ${decisionLeft < 10 ? 'timer-danger-text' : ''}`}>
                {Math.ceil(decisionLeft)}s
              </span>
            </div>
            <div className="timer-bar-container">
              <div
                className={`timer-bar ${decisionLeft < 10 ? 'timer-danger' : ''}`}
                style={{ width: `${(decisionLeft / DECISION_SECONDS) * 100}%` }}
              />
            </div>
            <p className="scenario-text">{scenario.question}</p>
            <div className="options-container mt-4">
              {scenario.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className={getButtonClass(option)}
                  disabled={selectedOptionId !== null || isTimeUp}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Scenario;
