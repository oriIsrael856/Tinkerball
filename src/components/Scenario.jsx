import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/soundUtils';

const TIMER_SECONDS = 100; // 60s reading + 40s decision, options visible throughout

const Scenario = ({ scenario, onResult }) => {
  const [timeLeft, setTimeLeft]             = useState(TIMER_SECONDS);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isTimeUp, setIsTimeUp]             = useState(false);
  const [startTime]                         = useState(Date.now());

  // Reset on new scenario
  useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
    setSelectedOptionId(null);
    setIsTimeUp(false);
  }, [scenario.id]);

  // Countdown
  useEffect(() => {
    if (selectedOptionId || isTimeUp) return;

    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          clearInterval(id);
          setIsTimeUp(true);
          return 0;
        }
        if (prev < 10 && Math.floor(prev * 10) % 2 === 0) {
          soundManager.playTick();
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(id);
  }, [selectedOptionId, isTimeUp, scenario.id]);

  useEffect(() => {
    if (isTimeUp) onResult(null, TIMER_SECONDS);
  }, [isTimeUp, onResult]);

  const handleOptionClick = (option) => {
    if (selectedOptionId || isTimeUp) return;
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

  const progressPercentage = (timeLeft / TIMER_SECONDS) * 100;
  const isDanger = timeLeft < 10;

  return (
    <div className="glass-card">
      <div className="timer-bar-container">
        <div
          className={`timer-bar ${isDanger ? 'timer-danger' : ''}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="reading-timer-row">
        <span className="reading-label">⏱ זמן נותר</span>
        <span className={`reading-countdown ${isDanger ? 'timer-danger-text' : ''}`}>
          {Math.ceil(timeLeft)}s
        </span>
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
    </div>
  );
};

export default Scenario;
