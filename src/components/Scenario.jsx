import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/soundUtils';

const Scenario = ({ scenario, onResult }) => {
  const [timeLeft, setTimeLeft] = useState(scenario.timerSeconds);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  // Reset state when scenario changes
  useEffect(() => {
    setTimeLeft(scenario.timerSeconds);
    setSelectedOptionId(null);
    setIsTimeUp(false);
    setStartTime(Date.now());
  }, [scenario.id]);

  // Timer logic
  useEffect(() => {
    if (selectedOptionId || isTimeUp) return;

    const timerTimerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timerTimerId);
          setIsTimeUp(true);
          return 0;
        }
        if (prev < 2 && Math.floor(prev * 10) % 2 === 0) {
          soundManager.playTick();
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timerTimerId);
  }, [selectedOptionId, isTimeUp, scenario.id]);

  // Handle time up separately to avoid setState during render
  useEffect(() => {
    if (isTimeUp) {
      onResult(null, scenario.timerSeconds);
    }
  }, [isTimeUp, onResult, scenario.timerSeconds]);

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

  const progressPercentage = (timeLeft / scenario.timerSeconds) * 100;
  const isDanger = timeLeft < 2;

  return (
    <div className="glass-card">
      <div className="timer-bar-container">
        <div 
          className={`timer-bar ${isDanger ? 'timer-danger' : ''}`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <p className="scenario-text">{scenario.question}</p>
      
      <div className="options-container mt-4">
        {scenario.options.map((option) => (
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
