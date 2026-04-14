// Position definitions for Thinkerball V2
// Starting with CB, CM, ST — rest are "Coming Soon"

export const POSITIONS = [
  {
    id: 'CB',
    name: 'בלם',
    nameEn: 'Center Back',
    emoji: '🛡️',
    description: 'הקו האחורי. קבלת החלטות תחת לחץ, תזמון תיקולים, בנייה מאחור ויצירת עליונות מספרית.',
    keyPrinciples: ['Cover & Balance', 'Delay & Jockey', 'Build-up Play', 'Communication'],
    available: true,
    fieldPosition: { top: '75%', left: '50%' }  // Position on formation visual
  },
  {
    id: 'CM',
    name: 'קשר',
    nameEn: 'Central Midfielder',
    emoji: '🧠',
    description: 'הלב של המשחק. שליטה בקצב, מציאת קווי מסירה, סיבובים תחת לחץ ומעברים בין הגנה להתקפה.',
    keyPrinciples: ['Third Man Concept', 'Body Orientation', 'Scanning', 'Progressive Passing'],
    available: true,
    fieldPosition: { top: '55%', left: '50%' }
  },
  {
    id: 'ST',
    name: 'חלוץ',
    nameEn: 'Striker',
    emoji: '⚔️',
    description: 'מנוע ההתקפה. תזמון ריצות, תנועה ללא כדור, בחירת סיום וקשר עם הקישור.',
    keyPrinciples: ['Movement Off The Ball', 'Hold vs Run', 'Finishing Decisions', 'Pressing Triggers'],
    available: true,
    fieldPosition: { top: '25%', left: '50%' }
  },
  {
    id: 'GK',
    name: 'שוער',
    nameEn: 'Goalkeeper',
    emoji: '🧤',
    description: 'השוער המודרני — הוצאת כדורים, תקשורת ומיקום.',
    keyPrinciples: [],
    available: false,
    fieldPosition: { top: '90%', left: '50%' }
  },
  {
    id: 'LB/RB',
    name: 'מגן',
    nameEn: 'Fullback',
    emoji: '🏃',
    description: 'עליות, הגנה 1-על-1 ותרומה התקפית מהאגפים.',
    keyPrinciples: [],
    available: false,
    fieldPosition: { top: '70%', left: '20%' }
  },
  {
    id: 'CDM',
    name: 'קשר אחורי',
    nameEn: 'Defensive Midfielder',
    emoji: '🔒',
    description: 'מסנן ההגנה. סגירת קווי מסירה, כיסוי בלמים, קבלת כדור תחת לחץ ומעבר מהיר הגנה-התקפה.',
    keyPrinciples: ['Screening', 'Cover Shadow', 'Half-Turn Reception', 'Transition Speed'],
    available: true,
    fieldPosition: { top: '62%', left: '50%' }
  },
  {
    id: 'CAM',
    name: 'קשר התקפי',
    nameEn: 'Attacking Midfielder',
    emoji: '🪄',
    description: 'יצירת מצבים, מסירות מפתח וכניסות לרחבה.',
    keyPrinciples: [],
    available: false,
    fieldPosition: { top: '38%', left: '50%' }
  },
  {
    id: 'WNG',
    name: 'קיצוני',
    nameEn: 'Winger',
    emoji: '💨',
    description: 'כדרור, חתכים פנימה, ומשחקי 1-על-1.',
    keyPrinciples: [],
    available: false,
    fieldPosition: { top: '35%', left: '15%' }
  }
];

export const getPosition = (id) => POSITIONS.find(p => p.id === id);
export const getAvailablePositions = () => POSITIONS.filter(p => p.available);
export const getComingSoonPositions = () => POSITIONS.filter(p => !p.available);
