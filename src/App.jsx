import React, { useState, useEffect, useCallback } from 'react';
import Pitch from './components/Pitch';
import Scenario from './components/Scenario';
import WorldSelect from './components/WorldSelect';
import { worlds } from './data/scenarios';
import { soundManager } from './utils/soundUtils';

// LocalStorage keys
const STORAGE_KEY = 'thinkerball_progress';

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      return {
        unlockedWorldIndex: data.unlockedWorldIndex || 0,
        bestScores: data.bestScores || {}
      };
    }
  } catch (e) {
    // ignore
  }
  return { unlockedWorldIndex: 0, bestScores: {} };
}

function saveProgress(unlockedWorldIndex, bestScores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ unlockedWorldIndex, bestScores }));
  } catch (e) {
    // ignore
  }
}

function App() {
  const savedProgress = loadProgress();
  const [unlockedWorldIndex, setUnlockedWorldIndex] = useState(savedProgress.unlockedWorldIndex);
  const [bestScores, setBestScores] = useState(savedProgress.bestScores);
  const [currentWorldIndex, setCurrentWorldIndex] = useState(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  
  // 'menu' | 'preroll' | 'decision' | 'feedback' | 'summary'
  const [phase, setPhase] = useState('menu'); 
  
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentWorld = currentWorldIndex !== null ? worlds[currentWorldIndex] : null;
  const scenario = currentWorld ? currentWorld.scenarios[currentScenarioIndex] : null;

  // Save progress whenever unlock or scores change
  useEffect(() => {
    saveProgress(unlockedWorldIndex, bestScores);
  }, [unlockedWorldIndex, bestScores]);

  const handleSelectWorld = (world, index) => {
    setCurrentWorldIndex(index);
    setCurrentScenarioIndex(0);
    setScore(0);
    setSelectedOption(null);
    setPhase('preroll');
    soundManager.init(); // Initialize on click
    soundManager.startAmbience();
    soundManager.playWhistle();
    
    setTimeout(() => {
      setPhase('decision');
      soundManager.playWhistle();
    }, 1500);
  };

  const startScenario = () => {
    setPhase('preroll');
    setSelectedOption(null);
    soundManager.playWhistle();
    
    setTimeout(() => {
      setPhase('decision');
      soundManager.playWhistle();
    }, 1500);
  };

  const handleResult = useCallback((option) => {
    setSelectedOption(option);
    setPhase('feedback');
    if (option) {
      if (option.isCorrect) {
        setScore(prev => prev + 1);
        soundManager.playSuccess();
      } else {
        soundManager.playFail();
      }
    } else {
      // Time up
      soundManager.playFail();
    }
  }, []);

  const nextScenario = () => {
    if (currentScenarioIndex < currentWorld.scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      startScenario();
    } else {
      // Calculate final score (including this scenario's result)
      const finalScore = score;
      const threshold = Math.ceil(currentWorld.scenarios.length / 2);
      
      // Save best score for this world
      const worldKey = `world_${currentWorldIndex}`;
      setBestScores(prev => {
        const current = prev[worldKey] || 0;
        if (finalScore > current) {
          return { ...prev, [worldKey]: finalScore };
        }
        return prev;
      });

      // Unlock next world if threshold met
      if (finalScore >= threshold && currentWorldIndex === unlockedWorldIndex) {
        setUnlockedWorldIndex(prev => prev + 1);
      }
      
      setPhase('summary');
    }
  };

  const backToMenu = () => {
    setPhase('menu');
    setCurrentWorldIndex(null);
  };

  // Render Menu
  if (phase === 'menu') {
    return (
      <div className="app-container" style={{ justifyContent: 'center' }} dir="rtl">
        <h1 className="title">Thinkerball ⚽🧠</h1>
        <p className="subtitle">בדוק את קבלת ההחלטות וההבנה הטקטית שלך</p>
        <WorldSelect 
          worlds={worlds} 
          unlockedWorldIndex={unlockedWorldIndex} 
          bestScores={bestScores}
          onSelectWorld={handleSelectWorld} 
        />
      </div>
    );
  }

  // Render Summary
  if (phase === 'summary') {
    const isSuccess = score >= Math.ceil(currentWorld.scenarios.length / 2);
    const bestKey = `world_${currentWorldIndex}`;
    const best = bestScores[bestKey] || 0;
    
    // Tactical Profile Logic
    let profile = "לומד את המשחק";
    const ratio = score / currentWorld.scenarios.length;
    if (ratio === 1) profile = "רב-אמן טקטי 🧠";
    else if (ratio >= 0.8) profile = "פליימייקר עילית 🪄";
    else if (ratio >= 0.6) profile = "מאמן בהתהוות 📋";
    else if (isSuccess) profile = "שחקן חכם ⚽";

    return (
      <div className="app-container" style={{ justifyContent: 'center' }} dir="rtl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card" 
          style={{ textAlign: 'center', padding: '3rem 2rem' }}
        >
          <h1 className="title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>סיכום עולם 📊</h1>
          
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '4.5rem', margin: 0, fontWeight: 900, color: isSuccess ? 'var(--accent-color)' : 'var(--danger)' }}>
              {score}/{currentWorld.scenarios.length}
            </h2>
            <div className="tactical-badge" style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
              {profile}
            </div>
          </div>

          <div style={{ margin: '2rem 0' }}>
            {best > 0 && (
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                שיא אישי בעולם זה: <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{best} נקודות</span> ⭐
              </p>
            )}
          </div>

          <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6' }}>
            {isSuccess ? 
              (score === currentWorld.scenarios.length ? 
                "ניתוח מושלם של כל הסיטואציות! אתה רואה את המגרש כמו מקצוען אמיתי. העולם הבא פתוח עבורך." : 
                "עבודה טובה מאוד! רמת ההבנה הטקטית שלך גבוהה. המשך כך כדי להגיע לשלמות.") : 
              "נראה שיש עוד מקום לשיפור בקבלת ההחלטות. אל תתייאש, חזור על התרחישים ולמד מהחצים!"}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            {isSuccess && currentWorldIndex < worlds.length - 1 && (
              <button className="primary" style={{ padding: '1.2rem' }} onClick={() => handleSelectWorld(worlds[currentWorldIndex + 1], currentWorldIndex + 1)}>
                המשך לעולם הבא ➔
              </button>
            )}
            <button className="glass-card" style={{ padding: '1rem' }} onClick={() => handleSelectWorld(currentWorld, currentWorldIndex)}>
              נסה שוב את העולם הזה 🔄
            </button>
            <button className="secondary" style={{ marginTop: '0.5rem' }} onClick={backToMenu}>חזרה לתפריט הראשי</button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Determine if we should show the arrow (only during feedback phase)
  const showArrow = phase === 'feedback' && scenario ? scenario.correctArrow : null;

  // Render Scenario
  return (
    <div className="app-container" dir="rtl">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            {currentWorld.title} - שלב {currentScenarioIndex + 1}/{currentWorld.scenarios.length}
          </span>
          <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>ניקוד: {score}</span>
        </div>
        <h2 className="title" style={{ fontSize: '1.5rem', textAlign: 'right' }}>{scenario.title}</h2>
      </div>

      <Pitch 
        initialPositions={phase === 'preroll' ? scenario.preRollPositions : scenario.initialPositions}
        arrow={showArrow}
        phase={phase}
      />

      {phase === 'preroll' && (
        <div className="glass-card" style={{ textAlign: 'center', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ color: 'var(--accent-color)', animation: 'ball-pulse 1s infinite alternate' }}>צופה במהלך... 👀</h3>
        </div>
      )}

      {phase === 'decision' && (
        <Scenario scenario={scenario} onResult={handleResult} />
      )}

      {phase === 'feedback' && (
        <div className="glass-card feedback-container">
          {selectedOption ? (
            <>
              <h3 className={`feedback-title ${selectedOption.isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
                {selectedOption.isCorrect ? "החלטה מצוינת! ✅" : "החלטה שגויה ❌"}
              </h3>
              <p className="feedback-desc">{selectedOption.feedback}</p>
            </>
          ) : (
            <>
              <h3 className="feedback-title feedback-incorrect">נגמר הזמן! ⏳</h3>
              <p className="feedback-desc">לא עשית בחירה בזמן. הביטו במגרש — החץ מראה את הפעולה הנכונה!</p>
            </>
          )}
          <button className="primary mt-4" onClick={nextScenario}>
            {currentScenarioIndex < currentWorld.scenarios.length - 1 ? "לתרחיש הבא" : "לסיכום העולם"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
