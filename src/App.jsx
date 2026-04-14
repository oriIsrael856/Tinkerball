import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeScreen from './components/HomeScreen';
import PositionSelect from './components/PositionSelect';
import LevelSelect from './components/LevelSelect';
import PlayerProfile from './components/PlayerProfile';
import LevelSummary from './components/LevelSummary';
import Pitch from './components/Pitch';
import Scenario from './components/Scenario';
import { scenariosByPosition } from './data/scenarios';
import { getPosition } from './data/positions';
import { soundManager } from './utils/soundUtils';
import { 
  loadProfile, saveProfile, ensurePositionData, 
  recordAnswer, recordLevelComplete, getTacticalTitle 
} from './utils/playerStore';

/*
  Screens:
  - home           → mode selection
  - position       → choose playing position
  - levels         → choose difficulty level
  - preroll        → watching scenario setup
  - decision       → answering
  - feedback       → result + explanation
  - summary        → level completed
  - profile        → stats dashboard
*/

function App() {
  const [profile, setProfile] = useState(() => loadProfile());
  const [screen, setScreen] = useState('home');
  const [installPrompt, setInstallPrompt] = useState(null);

  // Capture the browser's install prompt so we can trigger it from a button
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };
  
  // Game state
  const [currentPosition, setCurrentPosition] = useState(null);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [scenarioResults, setScenarioResults] = useState([]);

  // Save profile on every change
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  // Current scenario data
  const currentLevels = currentPosition ? scenariosByPosition[currentPosition] : null;
  const currentLevel = currentLevels ? currentLevels[currentLevelIndex] : null;
  const scenario = currentLevel ? currentLevel.scenarios[currentScenarioIndex] : null;
  const pos = currentPosition ? getPosition(currentPosition) : null;

  // --- Navigation ---
  const goHome = () => { setScreen('home'); setCurrentPosition(null); };
  const goPositions = () => setScreen('position');
  const goLevels = () => setScreen('levels');
  const goProfile = () => setScreen('profile');

  const handleSelectMode = (mode) => {
    if (mode === 'player') {
      setScreen('position');
    }
    // coach mode is coming soon
  };

  const handleSelectPosition = (posId) => {
    setCurrentPosition(posId);
    setProfile(prev => ensurePositionData(prev, posId));
    setScreen('levels');
  };

  const handleSelectLevel = (levelIndex) => {
    setCurrentLevelIndex(levelIndex);
    setCurrentScenarioIndex(0);
    setScore(0);
    setSelectedOption(null);
    setResponseTime(null);
    setScenarioResults([]);
    soundManager.init();
    soundManager.startAmbience();
    soundManager.playWhistle();
    setScreen('preroll');

    setTimeout(() => {
      setScreen('decision');
      soundManager.playWhistle();
    }, 1500);
  };

  const startNextScenario = () => {
    setSelectedOption(null);
    setResponseTime(null);
    soundManager.playWhistle();
    setScreen('preroll');

    setTimeout(() => {
      setScreen('decision');
      soundManager.playWhistle();
    }, 1500);
  };

  const handleResult = useCallback((option, time) => {
    setSelectedOption(option);
    setResponseTime(time);
    setScreen('feedback');

    const isCorrect = option?.isCorrect || false;
    if (isCorrect) {
      setScore(prev => prev + 1);
      soundManager.playSuccess();
    } else {
      soundManager.playFail();
    }

    setScenarioResults(prev => [
      ...prev,
      { title: scenario?.title ?? '', isCorrect, time: time ?? null },
    ]);

    // Record in profile
    setProfile(prev => recordAnswer(prev, {
      positionId: currentPosition,
      isCorrect,
      responseTime: time || 99
    }));
  }, [currentPosition, scenario]);

  const nextScenario = () => {
    if (currentScenarioIndex < currentLevel.scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      startNextScenario();
    } else {
      // Level complete
      setProfile(prev => recordLevelComplete(prev, {
        positionId: currentPosition,
        levelIndex: currentLevelIndex,
        score,
        total: currentLevel.scenarios.length
      }));
      setScreen('summary');
    }
  };

  // --- Render based on screen ---
  const showArrow = screen === 'feedback' && scenario ? scenario.correctArrow : null;
  const phase = screen; // pass screen as phase to Pitch

  return (
    <div className="app-container" dir="rtl">
      <AnimatePresence mode="wait">
        {/* HOME */}
        {screen === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomeScreen onSelectMode={handleSelectMode} />
            {installPrompt && (
              <motion.button
                className="install-fab"
                onClick={handleInstall}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📲 הורד את האפליקציה
              </motion.button>
            )}
            {profile.stats.totalAnswered > 0 && (
              <motion.button
                className="profile-fab"
                onClick={goProfile}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                📊 הפרופיל שלי
              </motion.button>
            )}
          </motion.div>
        )}

        {/* POSITION SELECT */}
        {screen === 'position' && (
          <motion.div key="position" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <button className="back-btn top-back" onClick={goHome}>← חזרה</button>
            <PositionSelect 
              onSelectPosition={handleSelectPosition}
              playerLevels={profile.levels}
            />
          </motion.div>
        )}

        {/* LEVEL SELECT */}
        {screen === 'levels' && (
          <motion.div key="levels" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <LevelSelect
              positionId={currentPosition}
              positionData={profile.levels[currentPosition]}
              onSelectLevel={handleSelectLevel}
              onBack={goPositions}
            />
          </motion.div>
        )}

        {/* PROFILE */}
        {screen === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <PlayerProfile profile={profile} onBack={goHome} />
          </motion.div>
        )}

        {/* GAME SCREENS (preroll, decision, feedback) */}
        {(screen === 'preroll' || screen === 'decision' || screen === 'feedback') && scenario && (
          <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Header */}
            <div className="game-header">
              <div className="game-header-left">
                <span className="game-pos-badge">{pos?.emoji} {pos?.name}</span>
                <span className="game-level-badge">רמה {currentLevelIndex + 1}</span>
              </div>
              <div className="game-header-right">
                <span className="game-progress">
                  {currentScenarioIndex + 1}/{currentLevel.scenarios.length}
                </span>
                <span className="game-score">ניקוד: {score}</span>
              </div>
            </div>

            <h2 className="scenario-title">{scenario.title}</h2>

            {/* Pitch */}
            <Pitch 
              initialPositions={screen === 'preroll' ? scenario.preRollPositions : scenario.initialPositions}
              arrow={showArrow}
              phase={phase}
            />

            {/* Preroll */}
            {screen === 'preroll' && (
              <div className="glass-card" style={{ textAlign: 'center', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: 'var(--accent-color)', animation: 'ball-pulse 1s infinite alternate' }}>צופה במהלך... 👀</h3>
              </div>
            )}

            {/* Decision */}
            {screen === 'decision' && (
              <Scenario scenario={scenario} onResult={handleResult} />
            )}

            {/* Feedback */}
            {screen === 'feedback' && (
              <motion.div 
                className="glass-card feedback-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {selectedOption ? (
                  <>
                    <h3 className={`feedback-title ${selectedOption.isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
                      {selectedOption.isCorrect ? "החלטה מצוינת! ✅" : "החלטה שגויה ❌"}
                    </h3>
                    <p className="feedback-desc">{selectedOption.feedback}</p>
                    {selectedOption.principleExplained && (
                      <div className="feedback-principle">
                        <span className="principle-label">💡 עקרון טקטי:</span>
                        <p>{selectedOption.principleExplained}</p>
                      </div>
                    )}
                    {responseTime && (
                      <div className="feedback-time">
                        ⏱️ זמן תגובה: <strong>{responseTime.toFixed(1)}s</strong>
                        {responseTime < 3 && <span className="time-fast"> ⚡ מהיר!</span>}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="feedback-title feedback-incorrect">נגמר הזמן! ⏳</h3>
                    <p className="feedback-desc">לא עשית בחירה בזמן. הביטו במגרש — החץ מראה את הפעולה הנכונה!</p>
                  </>
                )}
                <button className="primary mt-4" onClick={nextScenario}>
                  {currentScenarioIndex < currentLevel.scenarios.length - 1 ? "לתרחיש הבא →" : "לסיכום הרמה 📊"}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* SUMMARY */}
        {screen === 'summary' && currentLevel && (
          <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LevelSummary
              level={currentLevel}
              levelIndex={currentLevelIndex}
              score={score}
              scenarioResults={scenarioResults}
              posName={pos?.name}
              posEmoji={pos?.emoji}
              canGoNextLevel={
                currentLevels?.length > currentLevelIndex + 1 &&
                (profile.levels[currentPosition]?.unlockedLevel ?? 0) > currentLevelIndex
              }
              onRetry={() => handleSelectLevel(currentLevelIndex)}
              onNextLevel={() => handleSelectLevel(currentLevelIndex + 1)}
              onBack={goLevels}
              onHome={goHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
