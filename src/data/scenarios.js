// Thinkerball V2 — Scenario Database
// Each scenario is tagged by position, difficulty, and tactical category
// Based on real-world proven tactics (Guardiola, Klopp, De Zerbi, Nagelsmann)

// ============================================================
// HELPER: Generate pre-roll by offsetting positions
// ============================================================
const generatePreRoll = (initialPos, ballOffset, teamAOffset, teamBOffset) => {
  return {
    ball: {
      top: (parseFloat(initialPos.ball.top) + ballOffset.top) + '%',
      left: (parseFloat(initialPos.ball.left) + ballOffset.left) + '%'
    },
    teamA: initialPos.teamA.map(p => ({
      ...p,
      top: p.isYou ? p.top : (parseFloat(p.top) + (teamAOffset[p.id]?.top || 0)) + '%',
      left: p.isYou ? p.left : (parseFloat(p.left) + (teamAOffset[p.id]?.left || 0)) + '%'
    })),
    teamB: initialPos.teamB.map(p => ({
      ...p,
      top: (parseFloat(p.top) + (teamBOffset[p.id]?.top || 0)) + '%',
      left: (parseFloat(p.left) + (teamBOffset[p.id]?.left || 0)) + '%'
    }))
  };
};

// ============================================================
//  STANDARD 11-player templates (reusable base formations)
// ============================================================
const blueBase = (youId, youRole, youTop, youLeft, youFacing = 0) => [
  { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 },
  { id: 'cb1', role: 'CB', top: '78%', left: '38%', facing: 0 },
  { id: 'cb2', role: 'CB', top: '78%', left: '62%', facing: 0 },
  { id: 'lb', role: 'LB', top: '68%', left: '15%', facing: 45 },
  { id: 'rb', role: 'RB', top: '68%', left: '85%', facing: 315 },
  { id: 'dm', role: 'DM', top: '62%', left: '50%', facing: 0 },
  { id: 'cm1', role: 'CM', top: '52%', left: '35%', facing: 0 },
  { id: 'cm2', role: 'CM', top: '52%', left: '65%', facing: 0 },
  { id: 'lw', role: 'LW', top: '35%', left: '15%', facing: 0 },
  { id: 'rw', role: 'RW', top: '35%', left: '85%', facing: 0 },
  { id: 'st', role: 'ST', top: '25%', left: '50%', facing: 0 }
].map(p => p.id === youId ? { ...p, role: youRole, top: youTop, left: youLeft, facing: youFacing, isYou: true } : p);

const redBase = () => [
  { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 },
  { id: 'cb1', role: 'CB', top: '18%', left: '40%', facing: 180 },
  { id: 'cb2', role: 'CB', top: '18%', left: '60%', facing: 180 },
  { id: 'lb', role: 'LB', top: '25%', left: '15%', facing: 180 },
  { id: 'rb', role: 'RB', top: '25%', left: '85%', facing: 180 },
  { id: 'dm', role: 'DM', top: '35%', left: '50%', facing: 180 },
  { id: 'cm1', role: 'CM', top: '45%', left: '35%', facing: 180 },
  { id: 'cm2', role: 'CM', top: '45%', left: '65%', facing: 180 },
  { id: 'lw', role: 'LW', top: '55%', left: '15%', facing: 180 },
  { id: 'rw', role: 'RW', top: '55%', left: '85%', facing: 180 },
  { id: 'st', role: 'ST', top: '65%', left: '50%', facing: 180 }
];

// ============================================================
//  CB SCENARIOS — Center Back (בלם)
// ============================================================

// --- LEVEL 1: BASICS ---
const cb_l1_s1 = {
  id: 'cb-l1-01',
  position: ['CB'],
  difficulty: 1,
  category: 'build-up',
  tacticalPrinciple: 'Build-up Through GK',
  title: 'בניית התקפה תחת לחץ',
  question: 'אתה בלם (CB) עם הכדור. החלוץ היריב לוחץ אותך מלפנים וחוסם את הקשר האחורי. המגן הימני (RB) מבקש כדור אך כנף שמאלי יריב מתחיל לנעול אותו. מה תעשה?',
  timerSeconds: 8,
  initialPositions: {
    ball: { top: '80%', left: '40%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '80%', left: '40%', isYou: true, facing: 0 },
      { id: 'cb2', role: 'CB', top: '80%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '68%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '68%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '65%', left: '45%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '55%', left: '32%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '55%', left: '60%', facing: 0 },
      { id: 'lw', role: 'LW', top: '38%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '38%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '28%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '75%', left: '42%', facing: 200 },
      { id: 'rw', role: 'RW', top: '62%', left: '22%', facing: 180 },
      { id: 'lw', role: 'LW', top: '64%', left: '80%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '60%', left: '48%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '48%', left: '35%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '48%', left: '65%', facing: 180 },
      { id: 'lb', role: 'LB', top: '32%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '32%', left: '85%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '22%', left: '40%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '22%', left: '60%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'להעיף את הכדור ארוך לעבר החלוץ.',
      isCorrect: false,
      feedback: 'כדור אוויר תחת לחץ נגד צמד בלמים מוכנים — אחוזי ההצלחה נמוכים מאוד. זה מוותר על החזקה ומזמין לחץ חוזר.',
      principleExplained: 'בפוזישנל פליי, כדור ארוך הוא מוצא אחרון ולא ראשון.'
    },
    {
      id: 'b',
      text: 'מסירה ישירה למגן הימני (RB).',
      isCorrect: false,
      feedback: 'הכנף היריב כבר סוגר עליו — זו מלכודת לחץ (Pressing Trap) שתיצור אובדן מסוכן באגף.',
      principleExplained: 'תמיד תקרא את תנועת היריב לפני שמוסרים. אם שחקן "פתוח" אך יריב נוסע אליו — הוא לכוד.'
    },
    {
      id: 'c',
      text: 'החזרה לשוער (GK) להחלפת כיוון הבנייה.',
      isCorrect: true,
      feedback: 'מהלך קלאסי של גוורדיולה ודה-זרבי. השוער מקבל את הכדור באזור ללא לחץ ויכול לבנות לצד השני דרך הבלם השני או המגן השמאלי — שינוי כיוון הלחץ במלואו.',
      principleExplained: 'עקרון "החלפת המשחק דרך השוער" (GK as outlet) — כשהלחץ מצד אחד, העבר לצד השני.'
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'GK Outlet',
    from: { top: '80%', left: '40%' },
    to: { top: '92%', left: '50%' }
  }
};
cb_l1_s1.preRollPositions = generatePreRoll(cb_l1_s1.initialPositions, { top: 5, left: -10 }, {}, { st: { top: -10, left: -5 } });

const cb_l1_s2 = {
  id: 'cb-l1-02',
  position: ['CB'],
  difficulty: 1,
  category: 'defending-counter',
  tacticalPrinciple: 'Delay & Jockey',
  title: 'השהיית התקפה מתפרצת (2 על 1)',
  question: 'אתה הבלם האחרון (CB). שני תוקפים יריבים רצים לעבר השער שלך במתפרצת. אתה לבד — חברים חוזרים מאחור. מה תעשה?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '45%', left: '48%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '60%', left: '50%', isYou: true, facing: 350 },
      { id: 'cb2', role: 'CB', top: '30%', left: '30%', facing: 180 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '35%', left: '15%', facing: 160 },
      { id: 'rb', role: 'RB', top: '35%', left: '85%', facing: 200 },
      { id: 'dm', role: 'DM', top: '40%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '30%', left: '40%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '30%', left: '65%', facing: 180 },
      { id: 'lw', role: 'LW', top: '20%', left: '20%', facing: 180 },
      { id: 'rw', role: 'RW', top: '20%', left: '80%', facing: 180 },
      { id: 'st', role: 'ST', top: '15%', left: '50%', facing: 180 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '45%', left: '48%', facing: 180 },
      { id: 'rw', role: 'RW', top: '42%', left: '65%', facing: 200 },
      { id: 'cam', role: 'CAM', top: '30%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '25%', left: '40%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '25%', left: '60%', facing: 180 },
      { id: 'dm', role: 'DM', top: '20%', left: '50%', facing: 180 },
      { id: 'lw', role: 'LW', top: '35%', left: '15%', facing: 180 },
      { id: 'lb', role: 'LB', top: '15%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '15%', left: '85%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '10%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לזנק בתיקול אגרסיבי על מוביל הכדור.',
      isCorrect: false,
      feedback: 'תיקול 1-על-2 הוא הימור. אם הוא מוסר לחבר שלו, אתה שוכב על הרצפה והדרך לשער חופשית.',
      principleExplained: 'כלל הברזל: מול עודף מספרי — לעולם אל תתקל. תשהה.'
    },
    {
      id: 'b',
      text: 'לסגת אחורה באלכסון — לחסום את הערוץ המרכזי ולקנות זמן.',
      isCorrect: true,
      feedback: 'מושלם! טכניקת Delay & Jockey — אתה סוגר את הזווית לשער, מכריח את התוקף לצד, וקונה זמן יקר לחברים שחוזרים. זו ההחלטה של כל בלם עילית.',
      principleExplained: 'עקרון "השהייה" (Delay): מול עודף — סגור ערוץ מרכזי, דחוף לצד, חכה לתגבורת.'
    },
    {
      id: 'c',
      text: 'לכסות את הכנף היריב ולהשאיר את מוביל הכדור לשוער.',
      isCorrect: false,
      feedback: 'אם תסגור את השחקן השני, מוביל הכדור מקבל מסלול חופשי לשער. השוער לא יכול לכסות זווית כזו.',
      principleExplained: 'תמיד איים על הכדור ראשון — אל תתן למוביל חופש פעולה מלא.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Delay!',
    from: { top: '60%', left: '50%' },
    to: { top: '68%', left: '48%' }
  }
};
cb_l1_s2.preRollPositions = generatePreRoll(cb_l1_s2.initialPositions, { top: -15, left: 0 }, {}, { st: { top: -15, left: 0 }, rw: { top: -15, left: 0 } });

const cb_l1_s3 = {
  id: 'cb-l1-03',
  position: ['CB'],
  difficulty: 1,
  category: 'stepping-up',
  tacticalPrinciple: 'Cover & Balance',
  title: 'לצאת או להישאר? (Step Up)',
  question: 'אתה בלם ימני (CB). הקשר ההתקפי היריב (#10) מקבל כדור "בין הקווים" (בין ההגנה לקישור). הבלם השני שלך נמצא ומכסה. האם לצאת ללחוץ עליו?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '55%', left: '52%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '72%', left: '55%', isYou: true, facing: 350 },
      { id: 'cb2', role: 'CB', top: '74%', left: '38%', facing: 0 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '65%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '65%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '58%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '50%', left: '30%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '50%', left: '68%', facing: 0 },
      { id: 'lw', role: 'LW', top: '35%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '35%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '25%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'cam', role: 'CAM', top: '55%', left: '52%', facing: 180 },
      { id: 'st', role: 'ST', top: '68%', left: '60%', facing: 210 },
      { id: 'lw', role: 'LW', top: '58%', left: '80%', facing: 180 },
      { id: 'rw', role: 'RW', top: '58%', left: '20%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '45%', left: '40%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '45%', left: '62%', facing: 180 },
      { id: 'dm', role: 'DM', top: '35%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '85%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '18%', left: '42%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לצאת ללחוץ את ה-#10 כדי לא לתת לו להסתובב.',
      isCorrect: true,
      feedback: 'מצוין! הבלם השני מכסה אותך (Cover), אז אתה חופשי לצאת. אם תתן ל-#10 להסתובב עם הכדור פנים למגרש — הוא מול ההגנה שלך ללא חציצה.',
      principleExplained: 'עקרון Cover & Balance: אם יש כיסוי — צא! אם אין — תישאר. תמיד תסתכל על הפרטנר שלך לפני שמחליטים.'
    },
    {
      id: 'b',
      text: 'להישאר על הקו ולחסום את השטח מאחור.',
      isCorrect: false,
      feedback: 'יש לך כיסוי מהבלם השני. ההמתנה תאפשר ל-#10 להסתובב, להרים ראש ולבחור את המהלך הבא. הוא יראה את כל המגרש.',
      principleExplained: 'אל תתן למישהו "בין הקווים" זמן — זה האזור הכי מסוכן במגרש.'
    },
    {
      id: 'c',
      text: 'לצעוק לקשר האחורי (DM) שיתמודד במקומך.',
      isCorrect: false,
      feedback: 'הקשר האחורי כבר מאחורי ה-#10 — הוא לא יכול להגיע בזמן. אתה הכי קרוב והכי מתאים לפעולה.',
      principleExplained: 'הבלם הוא "הקו הראשון של ההחלטה" — אם אתה הכי קרוב, אתה אחראי.'
    }
  ],
  correctArrow: {
    type: 'press',
    label: 'Step Up!',
    from: { top: '72%', left: '55%' },
    to: { top: '58%', left: '52%' }
  }
};
cb_l1_s3.preRollPositions = generatePreRoll(cb_l1_s3.initialPositions, { top: -5, left: 5 }, {}, { cam: { top: -5, left: 3 } });

const cb_l1_s4 = {
  id: 'cb-l1-04',
  position: ['CB'],
  difficulty: 1,
  category: 'communication',
  tacticalPrinciple: 'Offside Trap',
  title: 'ניהול קו (Defensive Line)',
  question: 'אתה בלם (CB). הקשר היריב מחזיק בכדור באמצע המגרש. החלוץ היריב מתכונן לריצת עומק. הבלם השני שלך עומד 3 מטרים יותר עמוק ממך. מה תעשה?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '45%', left: '40%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '68%', left: '55%', isYou: true, facing: 350 },
      { id: 'cb2', role: 'CB', top: '73%', left: '38%', facing: 0 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '65%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '65%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '55%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '48%', left: '30%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '48%', left: '65%', facing: 0 },
      { id: 'lw', role: 'LW', top: '35%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '35%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '25%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'cm1', role: 'CM', top: '45%', left: '40%', facing: 180 },
      { id: 'st', role: 'ST', top: '66%', left: '62%', facing: 200 },
      { id: 'rw', role: 'RW', top: '55%', left: '20%', facing: 180 },
      { id: 'lw', role: 'LW', top: '55%', left: '80%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '50%', left: '55%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '40%', left: '60%', facing: 180 },
      { id: 'dm', role: 'DM', top: '32%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '25%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '25%', left: '85%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '15%', left: '42%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לצעוק "קו!" ולעלות כדי ליישר את הקו עם הבלם השני.',
      isCorrect: false,
      feedback: 'אתה גבוה יותר — אם תעלה עוד, תשחרר את החלוץ לריצה מאחוריך. ליישר קו עם השני שם שקרוב יותר לשער.',
      principleExplained: 'יישור קו הולך לכיוון של השחקן הגבוה יותר (הקרוב ליריב), לא ההפך.'
    },
    {
      id: 'b',
      text: 'לצעוק "דרופ!" ולבקש מהבלם השני לעלות לגובה שלך.',
      isCorrect: true,
      feedback: 'נכון! עקרון ניהול הקו: הבלם הגבוה יותר (אתה) קובע את הגובה, והשאר מתיישרים. קו ישר = מלכודת נבדל אפקטיבית.',
      principleExplained: 'תקשורת היא הכלי #1 של הבלם. קו הגנה מיושר = מלכודת נבדל. קו שבור = שערים ביריעה.'
    },
    {
      id: 'c',
      text: 'לרדת לגובה הבלם השני כדי להיות מוכנים לעומק.',
      isCorrect: false,
      feedback: 'אם שניכם נסוגים, אתם נותנים לחלוץ שטח להתניע ולהגיע במהירות. בנוסף, מלכודת הנבדל לא עובדת.',
      principleExplained: 'קו הגנה עמוק מדי = שטח ליריב בין הקווים. קו גבוה ומיושר = לחץ ושליטה.'
    }
  ],
  correctArrow: {
    type: 'hold',
    label: 'Hold Line!',
    from: { top: '68%', left: '55%' },
    to: { top: '68%', left: '55%' }
  }
};
cb_l1_s4.preRollPositions = generatePreRoll(cb_l1_s4.initialPositions, { top: -5, left: -8 }, {}, { cm1: { top: -8, left: 0 } });

const cb_l1_s5 = {
  id: 'cb-l1-05',
  position: ['CB'],
  difficulty: 1,
  category: 'build-up',
  tacticalPrinciple: 'Carrying into Midfield',
  title: 'נשיאת כדור לקישור (Progressive Carry)',
  question: 'אתה בלם (CB). הכדור אצלך ואף אחד לא לוחץ. הקשר האחורי (DM) מוכפל ואין לו מרחב. אבל יש שטח ריק ענק בין הקווים לפניך. מה תעשה?',
  timerSeconds: 8,
  initialPositions: {
    ball: { top: '78%', left: '45%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '78%', left: '45%', isYou: true, facing: 0 },
      { id: 'cb2', role: 'CB', top: '78%', left: '65%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '65%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '65%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '62%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '52%', left: '32%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '52%', left: '62%', facing: 0 },
      { id: 'lw', role: 'LW', top: '35%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '35%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '25%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '55%', left: '50%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '60%', left: '48%', facing: 180 },
      { id: 'rw', role: 'RW', top: '50%', left: '20%', facing: 180 },
      { id: 'lw', role: 'LW', top: '50%', left: '80%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '42%', left: '35%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '42%', left: '65%', facing: 180 },
      { id: 'dm', role: 'DM', top: '32%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '22%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '22%', left: '85%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '15%', left: '42%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'מסירה בטוחה לבלם השני.',
      isCorrect: false,
      feedback: 'בטוח, אבל לא מתקדם. הבלם השני נמצא באותו מצב כמוך — המשחק לא מתפתח. ההזדמנות לשבור קו לחץ הלכה.',
      principleExplained: 'מסירה צדדית בלי מטרה = "מסירה סתם". בלם מודרני מחפש פתרון קדימה.'
    },
    {
      id: 'b',
      text: 'לכדרר קדימה לתוך השטח הריק ולשבור את קו הלחץ.',
      isCorrect: true,
      feedback: 'ממש כמו ון דייק או רובן דיאס! כשיש שטח ואף אחד לא לוחץ, נשיאת כדור לקישור "מושכת" יריב ופותחת קווי מסירה שלא היו קודם.',
      principleExplained: 'עקרון "Progressive Carry": כשהלחץ רחוק ויש שטח — עלה עם הכדור וצור עליונות מספרית באמצע.'
    },
    {
      id: 'c',
      text: 'ניסיון מסירת עומק ישירות לחלוץ.',
      isCorrect: false,
      feedback: 'מסירה ארוכה ממרחק כזה נגד שני בלמים מוכנים — סיכויים נמוכים. כשיש שטח ריק לפניך, קודם נשל ואז תמצא פתרון טוב יותר.',
      principleExplained: 'אל תדלג על שלבים. קודם תתקדם, ואז ממרחב טוב יותר — תמצא מסירה חכמה.'
    }
  ],
  correctArrow: {
    type: 'dribble',
    label: 'Carry Forward',
    from: { top: '78%', left: '45%' },
    to: { top: '62%', left: '45%' }
  }
};
cb_l1_s5.preRollPositions = generatePreRoll(cb_l1_s5.initialPositions, { top: 5, left: -5 }, {}, {});


// ============================================================
//  CM SCENARIOS — Central Midfielder (קשר)
// ============================================================

const cm_l1_s1 = {
  id: 'cm-l1-01',
  position: ['CM'],
  difficulty: 1,
  category: 'receiving-under-pressure',
  tacticalPrinciple: 'Body Orientation (Open Body)',
  title: 'קבלת כדור עם כיוון גוף נכון',
  question: 'אתה קשר (CM). הבלם מוסר אליך. יריב מתקרב מאחורייך. לפניך שטח פתוח. איך תקבל את הכדור?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '65%', left: '45%' },
    teamA: [
      { id: 'cm1', role: 'CM', top: '55%', left: '42%', isYou: true, facing: 180 },
      { id: 'cb1', role: 'CB', top: '78%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '78%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '65%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '65%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '62%', left: '52%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '52%', left: '65%', facing: 0 },
      { id: 'lw', role: 'LW', top: '35%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '35%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '25%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'cam', role: 'CAM', top: '52%', left: '45%', facing: 180 },
      { id: 'st', role: 'ST', top: '70%', left: '48%', facing: 200 },
      { id: 'cm1', role: 'CM', top: '45%', left: '35%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '45%', left: '62%', facing: 180 },
      { id: 'rw', role: 'RW', top: '55%', left: '20%', facing: 180 },
      { id: 'lw', role: 'LW', top: '55%', left: '80%', facing: 180 },
      { id: 'dm', role: 'DM', top: '35%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '25%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '25%', left: '85%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '18%', left: '42%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לקבל עם הפנים לבלם (גב למגרש) ולסובב.',
      isCorrect: false,
      feedback: 'קבלה עם הגב ליריב בלחץ — מתכון לאובדן. הוא כבר מעליך עוד לפני שתסתובב.',
      principleExplained: 'הגב ליריב = עיוורון. אתה לא יודע מה קורה מאחוריך ולא יכול לקבל החלטה חכמה.'
    },
    {
      id: 'b',
      text: 'להחזיר בנגיעה אחת לבלם (One-Touch).',
      isCorrect: false,
      feedback: 'אפשרות בטוחה, אבל מבזבזת את ההזדמנות. יש שטח לפניך — למה לחזור אחורה?',
      principleExplained: 'נגיעה אחת אחורה = פתרון לחץ, לא פתרון משחק. השתמש בה כשאין ברירה.'
    },
    {
      id: 'c',
      text: 'לפתוח גוף ("חצי סיבוב") כשמקבלים — כך שהנגיעה הראשונה לוקחת אותך קדימה.',
      isCorrect: true,
      feedback: 'מעולה! זו טכניקת ה-Open Body של שאבי, איניאסטה, ותוני קרוס. הגוף פתוח = ראייה של כל המגרש ברגע הקבלה, והנגיעה הראשונה כבר שוברת את הלחץ.',
      principleExplained: 'עקרון "Body Orientation": תמיד תקבל כדור כשהגוף שלך פתוח לכיוון שאתה רוצה לשחק אליו. זה מקצר החלטות בשנייה ויותר.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Open Body',
    from: { top: '55%', left: '42%' },
    to: { top: '48%', left: '45%' }
  }
};
cm_l1_s1.preRollPositions = generatePreRoll(cm_l1_s1.initialPositions, { top: 10, left: -3 }, {}, { cam: { top: -5, left: 0 } });

const cm_l1_s2 = {
  id: 'cm-l1-02',
  position: ['CM'],
  difficulty: 1,
  category: 'third-man',
  tacticalPrinciple: 'Third Man Concept',
  title: 'קונספט השחקן השלישי',
  question: 'אתה קשר (CM). הבלם מוסר לקשר האחורי (DM), שמקבל עם הגב תחת לחץ. אתה פנוי באזור. מה תעשה?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '62%', left: '48%' },
    teamA: [
      { id: 'cm1', role: 'CM', top: '52%', left: '62%', isYou: true, facing: 270 },
      { id: 'dm', role: 'DM', top: '62%', left: '48%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '78%', left: '38%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '78%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '65%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '65%', left: '88%', facing: 315 },
      { id: 'cm2', role: 'CM', top: '52%', left: '35%', facing: 0 },
      { id: 'lw', role: 'LW', top: '35%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '35%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '25%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'cam', role: 'CAM', top: '58%', left: '50%', facing: 180 },
      { id: 'st', role: 'ST', top: '72%', left: '45%', facing: 200 },
      { id: 'cm1', role: 'CM', top: '48%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '48%', left: '60%', facing: 180 },
      { id: 'rw', role: 'RW', top: '55%', left: '20%', facing: 180 },
      { id: 'lw', role: 'LW', top: '55%', left: '80%', facing: 180 },
      { id: 'dm', role: 'DM', top: '35%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '25%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '25%', left: '85%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '18%', left: '42%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לחכות במקום ולראות מה ה-DM עושה.',
      isCorrect: false,
      feedback: 'אם תחכה — ה-DM תחת לחץ ייאלץ להחזיר אחורה. המשחק חוזר לנקודת ההתחלה ואתה לא עזרת.',
      principleExplained: 'בכדורגל, לעמוד חושב אומר לפספס. תנועה ללא כדור היא 90% מהמשחק.'
    },
    {
      id: 'b',
      text: 'להתקרב ל-DM ולבקש את הכדור ברגל.',
      isCorrect: true,
      feedback: 'מושלם! זה "קונספט השחקן השלישי": הבלם (1) מוסר ל-DM (2), ואתה (3) מציע את עצמך כפתרון ההמשך. ה-DM מחזיר לך בנגיעה אחת, ואתה כבר פנוי פנים למגרש.',
      principleExplained: 'Third Man Concept: אל תחכה שהכדור יגיע אליך ישירות — תהיה "השחקן השלישי" שמקבל מההמשך של המסירה. זה שובר את הלחץ.'
    },
    {
      id: 'c',
      text: 'לרוץ קדימה לעומק כדי ליצור אופציית מסירה ארוכה.',
      isCorrect: false,
      feedback: 'אתה רץ מהכדור. ה-DM עם הגב ותחת לחץ — הוא לא יכול לשלוח לך כדור арוך. הוא צריך אופציה קצרה, עכשיו.',
      principleExplained: 'קרא את מצב חברך: אם הוא תחת לחץ, הוא צריך פתרון קרוב, לא רחוק.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: '3rd Man Run',
    from: { top: '52%', left: '62%' },
    to: { top: '58%', left: '52%' }
  }
};
cm_l1_s2.preRollPositions = generatePreRoll(cm_l1_s2.initialPositions, { top: 12, left: -5 }, {}, { cam: { top: -8, left: 2 } });

const cm_l1_s3 = {
  id: 'cm-l1-03',
  position: ['CM'],
  difficulty: 1,
  category: 'scanning',
  tacticalPrinciple: 'Switch of Play',
  title: 'החלפת אגף בזמן הנכון',
  question: 'אתה קשר (CM) עם הכדור בצד ימין. הצד ימין עמוס — 4 יריבים סביבך. אבל הקיצוני השמאלי (LW) שלך עומד לבד לגמרי בצד השמאלי. מה תעשה?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '52%', left: '75%' },
    teamA: [
      { id: 'cm1', role: 'CM', top: '52%', left: '75%', isYou: true, facing: 270 },
      { id: 'rw', role: 'RW', top: '42%', left: '88%', facing: 0 },
      { id: 'rb', role: 'RB', top: '60%', left: '85%', facing: 315 },
      { id: 'cam', role: 'CAM', top: '48%', left: '68%', facing: 0 },
      { id: 'lw', role: 'LW', top: '38%', left: '12%', facing: 0 },
      { id: 'lb', role: 'LB', top: '60%', left: '15%', facing: 45 },
      { id: 'cm2', role: 'CM', top: '55%', left: '45%', facing: 0 },
      { id: 'dm', role: 'DM', top: '62%', left: '50%', facing: 0 },
      { id: 'cb1', role: 'CB', top: '75%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '75%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 },
      { id: 'st', role: 'ST', top: '30%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'lb', role: 'LB', top: '38%', left: '80%', facing: 180 },
      { id: 'lm', role: 'LM', top: '48%', left: '72%', facing: 180 },
      { id: 'dm', role: 'DM', top: '52%', left: '65%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '50%', left: '55%', facing: 180 },
      { id: 'rb', role: 'RB', top: '32%', left: '22%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '25%', left: '45%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '25%', left: '62%', facing: 180 },
      { id: 'rm', role: 'RM', top: '55%', left: '30%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '60%', left: '50%', facing: 180 },
      { id: 'st', role: 'ST', top: '70%', left: '50%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'מסירה קצרה לקישור הקרוב להמשך בנייה.',
      isCorrect: false,
      feedback: 'הצד ימין עמוס. כל מסירה קצרה כאן תיתקל בקיר. אתה ממשיך לשחק לתוך הצפיפות.',
      principleExplained: 'כשצד אחד עמוס — אל תמשיך לשחק שם. "Overload to Isolate".'
    },
    {
      id: 'b',
      text: 'לנסות לכדרר דרך היריבים.',
      isCorrect: false,
      feedback: '4 יריבים סביבך — אין סיכוי. גם אם תצליח לעבור אחד, יש עוד שלושה. זו החלטה אגואיסטית.',
      principleExplained: 'אל תשחק "על הראש". אם יש 4 מולך ו-0 מול ה-LW — הפתרון ברור.'
    },
    {
      id: 'c',
      text: 'מסירה ארוכה ומדויקת אל הקיצוני השמאלי (LW) החופשי.',
      isCorrect: true,
      feedback: 'ממש כמו קרוס! החלפת אגף (Switch of Play) היא אחד הכלים הטקטיים הכי עוצמתיים במשחק. יצרתם עודף בצד אחד כדי לשחרר שחקן בצד השני — "Overload to Isolate".',
      principleExplained: 'עקרון "Overload to Isolate": תמשוך את היריב לצד אחד ואז תעביר לצד השני. ה-LW מקבל 1-על-1 או חופש מוחלט.'
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Switch!',
    from: { top: '52%', left: '75%' },
    to: { top: '38%', left: '12%' }
  }
};
cm_l1_s3.preRollPositions = generatePreRoll(cm_l1_s3.initialPositions, { top: 8, left: 5 }, {}, { dm: { top: 5, left: -3 } });

const cm_l1_s4 = {
  id: 'cm-l1-04',
  position: ['CM'],
  difficulty: 1,
  category: 'defensive-transition',
  tacticalPrinciple: 'Counter-Press (Gegenpressing)',
  title: 'מעבר הגנתי — לחיצה מיידית',
  question: 'אתה קשר (CM). רגע איבדת את הכדור לקשר יריב שנמצא 2 מטרים ממך. ההגנה שלנו עדיין גבוהה. מה תעשה?',
  timerSeconds: 5,
  initialPositions: {
    ball: { top: '48%', left: '45%' },
    teamA: [
      { id: 'cm1', role: 'CM', top: '50%', left: '43%', isYou: true, facing: 340 },
      { id: 'cm2', role: 'CM', top: '52%', left: '60%', facing: 0 },
      { id: 'dm', role: 'DM', top: '58%', left: '50%', facing: 0 },
      { id: 'cb1', role: 'CB', top: '70%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '70%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '62%', left: '15%', facing: 45 },
      { id: 'rb', role: 'RB', top: '62%', left: '85%', facing: 315 },
      { id: 'lw', role: 'LW', top: '38%', left: '18%', facing: 0 },
      { id: 'rw', role: 'RW', top: '38%', left: '82%', facing: 0 },
      { id: 'st', role: 'ST', top: '28%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'cm1', role: 'CM', top: '48%', left: '45%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '45%', left: '60%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '55%', left: '52%', facing: 180 },
      { id: 'st', role: 'ST', top: '65%', left: '50%', facing: 200 },
      { id: 'rw', role: 'RW', top: '50%', left: '20%', facing: 180 },
      { id: 'lw', role: 'LW', top: '50%', left: '80%', facing: 180 },
      { id: 'dm', role: 'DM', top: '35%', left: '48%', facing: 180 },
      { id: 'lb', role: 'LB', top: '25%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '25%', left: '85%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '18%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לחזור מיד לעמדה הגנתית ולהתארגן.',
      isCorrect: false,
      feedback: 'אם תסוג, אתה נותן ליריב לבנות. ההגנה שלנו גבוהה ולא מוגנת — הם יש להם כדור + שטח.',
      principleExplained: 'נסיגה אחרי אובדן מול הגנה גבוהה = מתכון לקונטר מסוכן.'
    },
    {
      id: 'b',
      text: 'ללחוץ מיידית (תוך 5 שניות) על מוביל הכדור!',
      isCorrect: true,
      feedback: 'זה בדיוק ה-Gegenpressing של קלופ! "חוק 5 השניות" — הרגע שאיבדת, אתה הכי קרוב לכדור. לחץ עכשיו = סיכוי גבוה להחזיר את הכדור, ואם לא — לאט את ההתקפה שלהם.',
      principleExplained: 'Gegenpressing: הרגע הכי טוב להחזיר כדור הוא מיד אחרי האובדן. היריב עדיין לא מאורגן ואתה הכי קרוב.'
    },
    {
      id: 'c',
      text: 'לסגור קו מסירה חשוב ולחכות.',
      isCorrect: false,
      feedback: 'פאסיבי מדי. סגירת קו מסירה אחד לא מונעת בנייה — הם ימצאו פתרון אחר. הלחץ המיידי הוא הכי אפקטיבי.',
      principleExplained: 'אחרי אובדן: אגרסיביות > פאסיביות. תמיד.'
    }
  ],
  correctArrow: {
    type: 'press',
    label: 'Press!',
    from: { top: '50%', left: '43%' },
    to: { top: '48%', left: '45%' }
  }
};
cm_l1_s4.preRollPositions = generatePreRoll(cm_l1_s4.initialPositions, { top: -3, left: 3 }, {}, {});

const cm_l1_s5 = {
  id: 'cm-l1-05',
  position: ['CM'],
  difficulty: 1,
  category: 'progressive-passing',
  tacticalPrinciple: 'Line-Breaking Pass',
  title: 'מסירה שוברת קו (Progressive Pass)',
  question: 'אתה קשר (CM) עם הכדור. שני אפשרויות: מסירה בטוחה לבלם שמאחוריך, או מסירה קדימה לקשר ההתקפי (CAM) שנמצא "בין הקווים" מול 2 יריבים אבל פנוי לנגיעה. מה תבחר?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '55%', left: '48%' },
    teamA: [
      { id: 'cm1', role: 'CM', top: '55%', left: '48%', isYou: true, facing: 0 },
      { id: 'cam', role: 'CAM', top: '42%', left: '52%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '55%', left: '65%', facing: 0 },
      { id: 'dm', role: 'DM', top: '62%', left: '50%', facing: 0 },
      { id: 'cb1', role: 'CB', top: '75%', left: '38%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '75%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '62%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '62%', left: '88%', facing: 315 },
      { id: 'lw', role: 'LW', top: '32%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '32%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '22%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '68%', left: '50%', facing: 200 },
      { id: 'cm1', role: 'CM', top: '48%', left: '40%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '48%', left: '58%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '55%', left: '55%', facing: 180 },
      { id: 'rw', role: 'RW', top: '52%', left: '20%', facing: 180 },
      { id: 'lw', role: 'LW', top: '52%', left: '80%', facing: 180 },
      { id: 'dm', role: 'DM', top: '38%', left: '48%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '85%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '20%', left: '42%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'מסירה בטוחה לבלם (CB) מאחוריך.',
      isCorrect: false,
      feedback: 'בטוח אבל לא מקדם. הבלם יקבל את אותו מצב שאתה בו, או גרוע מזה — ירד ללחץ. המשחק חוזר אחורה.',
      principleExplained: 'מסירה אחורה כשיש אפשרות קדימה = בזבוז הזדמנות. הפונקציה של קשר היא לקדם את המשחק.'
    },
    {
      id: 'b',
      text: 'מסירה שוברת קו (Line-Breaking) ל-CAM.',
      isCorrect: true,
      feedback: 'מעולה! מסירה שוברת קו היא אחד הכלים הכי חשובים של קשר מודרני. ברגע שהכדור "חודר" את קו הקישור של היריב, הם צריכים להסתובב ולרוץ אחורה. זה יוצר יתרון עצום.',
      principleExplained: 'Line-Breaking Pass: מסירה שעוברת בין שני יריבים ל"בין הקווים" שלהם. זה שובר את מבנה ההגנה ומכריח אותם לרוץ לכיוון השער שלהם.'
    },
    {
      id: 'c',
      text: 'מסירה רוחבית לקשר השני (CM).',
      isCorrect: false,
      feedback: 'מסירה רוחבית לא פותרת כלום — אותו גובה, אותו מצב. זה רק מעביר את הבעיה.',
      principleExplained: 'מסירות רוחביות לגיטימיות כשמחפשים שינוי זווית, אבל לא כשיש אפשרות לשבור קו.'
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Line Break!',
    from: { top: '55%', left: '48%' },
    to: { top: '42%', left: '52%' }
  }
};
cm_l1_s5.preRollPositions = generatePreRoll(cm_l1_s5.initialPositions, { top: 5, left: -5 }, {}, { st: { top: -8, left: 2 } });


// ============================================================
//  ST SCENARIOS — Striker (חלוץ)
// ============================================================

const st_l1_s1 = {
  id: 'st-l1-01',
  position: ['ST'],
  difficulty: 1,
  category: 'movement',
  tacticalPrinciple: 'Playing on the Shoulder',
  title: 'ריצה על הכתף (Shoulder Run)',
  question: 'אתה חלוץ (ST). הקשר שלך מרים ראש ויש לו מרחב. אתה עומד ליד הבלם היריב. לאן תנוע?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '52%', left: '45%' },
    teamA: [
      { id: 'st', role: 'ST', top: '30%', left: '48%', isYou: true, facing: 0 },
      { id: 'cm1', role: 'CM', top: '52%', left: '45%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '52%', left: '62%', facing: 0 },
      { id: 'cam', role: 'CAM', top: '42%', left: '55%', facing: 0 },
      { id: 'dm', role: 'DM', top: '60%', left: '50%', facing: 0 },
      { id: 'lw', role: 'LW', top: '35%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '35%', left: '85%', facing: 0 },
      { id: 'lb', role: 'LB', top: '62%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '62%', left: '88%', facing: 315 },
      { id: 'cb1', role: 'CB', top: '75%', left: '40%', facing: 0 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'cb1', role: 'CB', top: '28%', left: '45%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '28%', left: '60%', facing: 180 },
      { id: 'lb', role: 'LB', top: '30%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '30%', left: '85%', facing: 180 },
      { id: 'dm', role: 'DM', top: '40%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '48%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '48%', left: '62%', facing: 180 },
      { id: 'lw', role: 'LW', top: '60%', left: '15%', facing: 180 },
      { id: 'rw', role: 'RW', top: '60%', left: '85%', facing: 180 },
      { id: 'st', role: 'ST', top: '68%', left: '50%', facing: 200 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לרדת לקבל כדור ברגל (Drop Deep).',
      isCorrect: false,
      feedback: 'הקשר שלך מרים ראש ויש לו מרחב — הוא מחפש מסירת עומק! אם תרד, אתה מבטל את ההזדמנות ליצור 1-על-1 מול השוער.',
      principleExplained: 'כשהמוסר חופשי ומרים ראש = הוא מחפש ריצה קדימה, לא קבלה.'
    },
    {
      id: 'b',
      text: 'ריצה באלכסון לערוץ (בין הבלם למגן) — על "כתף" הבלם.',
      isCorrect: true,
      feedback: 'מושלם! ריצה על "כתף" הבלם (Shoulder Run) היא הנשק הקטלני ביותר של חלוץ. אתה רץ באלכסון לערוץ (בין CB ל-FB) — הבלם לא יכול לראות אותך ואת הכדור בו-זמנית. ממש כמו הלנד, מבפה, ליוונדובסקי.',
      principleExplained: 'Playing on the Shoulder: עמוד על "נקודת העיוורון" של הבלם — המקום שבו הוא חייב לבחור בין לצפות בך או בכדור. ריצה באלכסון שוברת את הקו.'
    },
    {
      id: 'c',
      text: 'לרוץ ישר קדימה לכיוון השער.',
      isCorrect: false,
      feedback: 'ריצה ישרה (Flat Run) — קל לבלם לעקוב אחריך כי הוא לא צריך להסתובב. בנוסף, אתה כנראה נבדל.',
      principleExplained: 'ריצות באלכסון > ריצות ישרות. אלכסון יוצר "דילמה" לבלם, ישרה — קלה לכיסוי.'
    }
  ],
  correctArrow: {
    type: 'run',
    label: 'Shoulder Run',
    from: { top: '30%', left: '48%' },
    to: { top: '22%', left: '35%' }
  }
};
st_l1_s1.preRollPositions = generatePreRoll(st_l1_s1.initialPositions, { top: 8, left: -3 }, {}, {});

const st_l1_s2 = {
  id: 'st-l1-02',
  position: ['ST'],
  difficulty: 1,
  category: 'link-up',
  tacticalPrinciple: 'Hold vs. Run Decision',
  title: 'לרדת או לרוץ? (Hold vs. Run)',
  question: 'אתה חלוץ (ST). הקשר שלך מקבל כדור תחת לחץ כבד — ראשו למטה. הבלם היריב צמוד לך מאחור. מה תעשה?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '50%', left: '42%' },
    teamA: [
      { id: 'st', role: 'ST', top: '28%', left: '50%', isYou: true, facing: 180 },
      { id: 'cm1', role: 'CM', top: '50%', left: '42%', facing: 340 },
      { id: 'cm2', role: 'CM', top: '52%', left: '62%', facing: 0 },
      { id: 'cam', role: 'CAM', top: '40%', left: '55%', facing: 0 },
      { id: 'dm', role: 'DM', top: '60%', left: '50%', facing: 0 },
      { id: 'lw', role: 'LW', top: '35%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '35%', left: '85%', facing: 0 },
      { id: 'lb', role: 'LB', top: '62%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '62%', left: '88%', facing: 315 },
      { id: 'cb1', role: 'CB', top: '75%', left: '40%', facing: 0 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'cb1', role: 'CB', top: '26%', left: '48%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '24%', left: '62%', facing: 180 },
      { id: 'dm', role: 'DM', top: '42%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '48%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '48%', left: '62%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '85%', facing: 180 },
      { id: 'lw', role: 'LW', top: '58%', left: '18%', facing: 180 },
      { id: 'rw', role: 'RW', top: '58%', left: '82%', facing: 180 },
      { id: 'st', role: 'ST', top: '68%', left: '50%', facing: 200 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לרוץ לעומק מאחורי הבלמים.',
      isCorrect: false,
      feedback: 'הקשר שלך תחת לחץ כבד וראשו למטה — הוא לא יכול לשגר לך כדור. אתה רץ לחלל ריק ולא מעזר.',
      principleExplained: 'תקרא את המוסר: ראש למטה + לחץ = צריך אופציה קצרה וקרובה, לא ריצה מרוחקת.'
    },
    {
      id: 'b',
      text: 'לרדת לקבל כדור ברגל — להפוך לאאוטלט קרוב.',
      isCorrect: true,
      feedback: 'בדיוק! כשחברך ותחת לחץ, התפקיד שלך הוא להיות "אאוטלט" — פתרון בטוח וקרוב. תרד, תקבל עם הגב, ותשחרר בנגיעה לחבר שפנוי. חלוצים כמו בנזמה, פירמינו וקיין היו אמנים בזה.',
      principleExplained: 'Hold: כשהמוסר תחת לחץ, תרד קרוב. Run: כשהמוסר חופשי, רוץ לעומק. זה הכלל הפשוט ביותר וההכי חשוב.'
    },
    {
      id: 'c',
      text: 'להישאר במקום ולחכות.',
      isCorrect: false,
      feedback: 'שום דבר לא קורה אם אתה עומד. הקשר תחת לחץ ומאבד עוד שנייה. אתה חייב לעזור.',
      principleExplained: 'חלוץ שעומד = חלוץ שלא קיים. תנועה ללא כדור היא חובה תמידית.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Drop Deep',
    from: { top: '28%', left: '50%' },
    to: { top: '38%', left: '48%' }
  }
};
st_l1_s2.preRollPositions = generatePreRoll(st_l1_s2.initialPositions, { top: 5, left: -5 }, {}, {});

const st_l1_s3 = {
  id: 'st-l1-03',
  position: ['ST'],
  difficulty: 1,
  category: 'pressing',
  tacticalPrinciple: 'Cover Shadow (Pressing as ST)',
  title: 'לחץ חלוץ — Cover Shadow',
  question: 'אתה חלוץ (ST). הבלם היריב מקבל כדור מהשוער. הבלם השני עומד 10 מטרים משמאלו. לאן תרוץ כדי ללחוץ נכון?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '15%', left: '42%' },
    teamA: [
      { id: 'st', role: 'ST', top: '30%', left: '50%', isYou: true, facing: 350 },
      { id: 'lw', role: 'LW', top: '35%', left: '20%', facing: 0 },
      { id: 'rw', role: 'RW', top: '35%', left: '80%', facing: 0 },
      { id: 'cam', role: 'CAM', top: '42%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '50%', left: '35%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '50%', left: '65%', facing: 0 },
      { id: 'dm', role: 'DM', top: '58%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '62%', left: '15%', facing: 45 },
      { id: 'rb', role: 'RB', top: '62%', left: '85%', facing: 315 },
      { id: 'cb1', role: 'CB', top: '72%', left: '40%', facing: 0 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'cb1', role: 'CB', top: '15%', left: '42%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '15%', left: '58%', facing: 180 },
      { id: 'lb', role: 'LB', top: '22%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '22%', left: '85%', facing: 180 },
      { id: 'dm', role: 'DM', top: '30%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '38%', left: '35%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '38%', left: '65%', facing: 180 },
      { id: 'lw', role: 'LW', top: '55%', left: '15%', facing: 180 },
      { id: 'rw', role: 'RW', top: '55%', left: '85%', facing: 180 },
      { id: 'st', role: 'ST', top: '62%', left: '50%', facing: 200 },
      { id: 'gk', role: 'GK', top: '8%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'ספרינט ישר על הבלם עם הכדור.',
      isCorrect: false,
      feedback: 'ריצה ישר = הבלם מוסר בקלות לשותף שלו. אתה מבזבז אנרגיה ולחץ ללא תועלת.',
      principleExplained: 'לחץ ישר ללא חסימת קו מסירה הוא לחץ ריק.'
    },
    {
      id: 'b',
      text: 'ריצה בקשת שחוסמת בגופך את קו המסירה לבלם השני.',
      isCorrect: true,
      feedback: 'ממש כמו פירמינו של ליברפול! Cover Shadow: אתה רץ בקשת כך שהגוף שלך "מצל" על קו המסירה לבלם השני. זה מכריח את מוביל הכדור לשחק קדימה, לאגף, או אחורה — כל האפשרויות גרועות לו.',
      principleExplained: 'Cover Shadow: תרוץ כך שמוביל הכדור "לא רואה" את האפשרות הבטוחה ביותר שלו. קו הריצה הוא הנשק — לא המהירות.'
    },
    {
      id: 'c',
      text: 'לחכות ולחסום את הקשר האחורי שלהם.',
      isCorrect: false,
      feedback: 'ה-DM שלהם רחוק. אתה מוותר על לחץ על הכדור ונותן לבלמים לבנות בשקט.',
      principleExplained: 'לחץ יעיל מתחיל מלמעלה — מהחלוץ. אם אתה לא לוחץ, כל השאר לא יכולים.'
    }
  ],
  correctArrow: {
    type: 'run',
    label: 'Cover Shadow',
    from: { top: '30%', left: '50%' },
    to: { top: '18%', left: '50%' }
  }
};
st_l1_s3.preRollPositions = generatePreRoll(st_l1_s3.initialPositions, { top: -5, left: 8 }, {}, { cb1: { top: -5, left: 5 } });

const st_l1_s4 = {
  id: 'st-l1-04',
  position: ['ST'],
  difficulty: 1,
  category: 'finishing',
  tacticalPrinciple: 'Double Movement (Check-Spin)',
  title: 'תנועה כפולה (Check & Spin)',
  question: 'אתה חלוץ (ST). הקיצוני שלך מכדרר לקו הסיום ומכין הרמה. אתה ברחבה עם בלם דבוק עליך. איך תשחרר את עצמך?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '18%', left: '85%' },
    teamA: [
      { id: 'st', role: 'ST', top: '22%', left: '52%', isYou: true, facing: 90 },
      { id: 'rw', role: 'RW', top: '18%', left: '85%', facing: 270 },
      { id: 'cam', role: 'CAM', top: '28%', left: '60%', facing: 0 },
      { id: 'lw', role: 'LW', top: '25%', left: '18%', facing: 45 },
      { id: 'cm1', role: 'CM', top: '42%', left: '35%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '42%', left: '62%', facing: 0 },
      { id: 'dm', role: 'DM', top: '55%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '45%', left: '15%', facing: 45 },
      { id: 'rb', role: 'RB', top: '35%', left: '88%', facing: 315 },
      { id: 'cb1', role: 'CB', top: '68%', left: '42%', facing: 0 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'cb1', role: 'CB', top: '20%', left: '50%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '18%', left: '62%', facing: 180 },
      { id: 'lb', role: 'LB', top: '22%', left: '78%', facing: 180 },
      { id: 'rb', role: 'RB', top: '22%', left: '22%', facing: 180 },
      { id: 'dm', role: 'DM', top: '32%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '40%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '40%', left: '62%', facing: 180 },
      { id: 'lw', role: 'LW', top: '55%', left: '15%', facing: 180 },
      { id: 'rw', role: 'RW', top: '55%', left: '85%', facing: 180 },
      { id: 'st', role: 'ST', top: '65%', left: '50%', facing: 200 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'להישאר עומד בדריסת העמוד הקרוב (Near Post).',
      isCorrect: false,
      feedback: 'עמידה סטטית = קל לבלם לכסות אותך. הוא כבר מותאם למיקום שלך ויגיע ראשון לכל הרמה.',
      principleExplained: 'חלוץ סטטי = חלוץ שנמסר. תנועה היא מה שיוצרת את הפער.'
    },
    {
      id: 'b',
      text: 'לנוע קצר לכיוון הכדור (Check) ואז מיד לפרוץ לעמוד הרחוק (Spin).',
      isCorrect: true,
      feedback: 'נפלא! תנועה כפולה (Double Movement / Check-Spin): קודם אתה מושך את הבלם קדימה (Check), ואז ברגע שהוא מגיב — אתה מתפוצץ לכיוון ההפוך. הוא נתפס על הרגל הלא נכונה. זה הנשק הסודי של אינזאגי, ון ניסטלרוי, והלנד.',
      principleExplained: 'Double Movement: צור תנועת "פיתיון" ואז שנה כיוון. הבלם מגיב לכדור הראשון ומאבד אותך בשני.'
    },
    {
      id: 'c',
      text: 'לרוץ החוצה מהרחבה לקבל כדור ברגל.',
      isCorrect: false,
      feedback: 'הקיצוני מכין הרמה — הוא צריך אותך ברחבה! אם תצא, אין מי שיסיים. זה שינוי של תפקיד שפוגע בצוות.',
      principleExplained: 'כשיש הרמה — מקומך של החלוץ הוא ברחבה. תמיד.'
    }
  ],
  correctArrow: {
    type: 'run',
    label: 'Check & Spin!',
    from: { top: '22%', left: '52%' },
    to: { top: '15%', left: '42%' }
  }
};
st_l1_s4.preRollPositions = generatePreRoll(st_l1_s4.initialPositions, { top: 5, left: -10 }, {}, {});

const st_l1_s5 = {
  id: 'st-l1-05',
  position: ['ST'],
  difficulty: 1,
  category: 'smart-movement',
  tacticalPrinciple: 'Creating Space for Others',
  title: 'ריצה שיוצרת מקום לאחרים',
  question: 'אתה חלוץ (ST). הקשר ההתקפי (CAM) שלך מכדרר קדימה עם שטח. שני הבלמים צמודים אליך. האם הפעולה הטובה ביותר תמיד היא "לחפש את הכדור"?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '38%', left: '48%' },
    teamA: [
      { id: 'st', role: 'ST', top: '25%', left: '50%', isYou: true, facing: 0 },
      { id: 'cam', role: 'CAM', top: '38%', left: '48%', facing: 0 },
      { id: 'lw', role: 'LW', top: '30%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '30%', left: '85%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '50%', left: '35%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '50%', left: '65%', facing: 0 },
      { id: 'dm', role: 'DM', top: '58%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '55%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '55%', left: '88%', facing: 315 },
      { id: 'cb1', role: 'CB', top: '72%', left: '42%', facing: 0 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'cb1', role: 'CB', top: '23%', left: '45%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '23%', left: '55%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '85%', facing: 180 },
      { id: 'dm', role: 'DM', top: '35%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '42%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '42%', left: '62%', facing: 180 },
      { id: 'lw', role: 'LW', top: '55%', left: '18%', facing: 180 },
      { id: 'rw', role: 'RW', top: '55%', left: '82%', facing: 180 },
      { id: 'st', role: 'ST', top: '65%', left: '50%', facing: 200 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לרדת לקבל כדור מה-CAM.',
      isCorrect: false,
      feedback: 'אם תרד — אתה מושך את הבלמים איתך, אבל לאן? החלל שהם עזבו לא מנוצל על ידי אף אחד.',
      principleExplained: 'ירידה חייבת להיות עם מטרה: או לקבל ולשחרר, או לפתוח מקום מאחור לריצת חבר.'
    },
    {
      id: 'b',
      text: 'ריצה עמוקה לכיוון השער — למשוך את 2 הבלמים איתך וליצור שטח ענק ל-CAM.',
      isCorrect: true,
      feedback: 'גאוני! לפעמים התנועה הכי חכמה היא כזו שבה לא נוגעים בכדור כלל. ריצה עמוקה "מוחקת" את שני הבלמים ופותחמ שטח ענק ל-CAM להיכנס ולבעוט. ברונו פרנאנדס, דה ברוינה — הם חיים מהריצות האלו של החלוצים.',
      principleExplained: 'Creating Space for Others: הריצה הכי חכמה היא לא תמיד לקבל כדור — אלא ליצור מקום לחבר שיכול לנצל אותו.'
    },
    {
      id: 'c',
      text: 'להישאר במקום כדי לשמור על מיקום מרכזי.',
      isCorrect: false,
      feedback: 'שני בלמים צמודים + חלוץ סטטי = שום סכנה. אתה חייב ליצור דינמיקה.',
      principleExplained: 'חלוץ שלא זז הוא חלוץ שלא תורם. תנועה תמיד — גם אם הכדור לא מגיע.'
    }
  ],
  correctArrow: {
    type: 'run',
    label: 'Decoy Run',
    from: { top: '25%', left: '50%' },
    to: { top: '12%', left: '55%' }
  }
};
st_l1_s5.preRollPositions = generatePreRoll(st_l1_s5.initialPositions, { top: 5, left: -3 }, {}, {});


// ============================================================
//  CB SCENARIOS — Level 2 (לחץ והגנה מתקדמת)
// ============================================================

const cb_l2_s1 = {
  id: 'cb-l2-01',
  position: ['CB'],
  difficulty: 2,
  category: 'cover',
  tacticalPrinciple: 'Cover When DM Steps',
  title: 'ה-DM יצא — מי מכסה?',
  question: 'הקשר האחורי שלנו (DM) יצא ללחוץ על הכדור. נוצר חלל מרכזי מאחוריו. החלוץ היריב מתחיל לנוע לתוך החלל הזה. מה תעשה?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '52%', left: '50%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '74%', left: '42%', isYou: true, facing: 350 },
      { id: 'cb2', role: 'CB', top: '74%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '65%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '65%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '52%', left: '50%', facing: 350 },
      { id: 'cm1', role: 'CM', top: '56%', left: '32%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '56%', left: '68%', facing: 0 },
      { id: 'lw', role: 'LW', top: '38%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '38%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '28%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '62%', left: '50%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '52%', left: '50%', facing: 180 },
      { id: 'rw', role: 'RW', top: '58%', left: '22%', facing: 180 },
      { id: 'lw', role: 'LW', top: '58%', left: '78%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '44%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '44%', left: '62%', facing: 180 },
      { id: 'dm', role: 'DM', top: '38%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '18%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לצאת קדימה ולכפול עם ה-DM על הכדור.',
      isCorrect: false,
      feedback: 'כפל לחץ עם ה-DM ישאיר את שני מרכזי ההגנה גבוה — החלוץ היריב יקבל כדור במרחב ריק לגמרי מאחוריכם.',
      principleExplained: 'כשאחד לוחץ, האחר מכסה. לעולם לא שניים יוצאים יחד בלי כיסוי.'
    },
    {
      id: 'b',
      text: 'לצנוח פנימה ולכסות את החלל שנוצר אחרי ה-DM.',
      isCorrect: true,
      feedback: 'נכון! "Cover Movement" — כש-DM יוצא, ה-CB הקרוב מתקדם מעט פנימה וסוגר את החלל. הבלם השני נשאר רחוק ומכסה את החלוץ מהצד.',
      principleExplained: 'Cover Movement: כש-DM עולה ללחץ, ה-CB ממלא את החלל שנוצר — תנועה יזומה לפני שהמסירה מגיעה.'
    },
    {
      id: 'c',
      text: 'להישאר במקום ולסמוך על ה-DM שיחזור.',
      isCorrect: false,
      feedback: 'ה-DM עסוק בלחיצה ולא יחזור בזמן. אם החלוץ מקבל כדור בין הקווים — אתה רחוק מדי.',
      principleExplained: 'הגנה טובה היא פרואקטיבית. אל תחכה לבעיה — סגור חלל לפני שהמסירה מגיעה.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Cover!',
    from: { top: '74%', left: '42%' },
    to: { top: '65%', left: '50%' }
  }
};
cb_l2_s1.preRollPositions = generatePreRoll(cb_l2_s1.initialPositions, { top: -8, left: 0 }, {}, { st: { top: -8, left: 2 } });

const cb_l2_s2 = {
  id: 'cb-l2-02',
  position: ['CB'],
  difficulty: 2,
  category: 'aerial-coordination',
  tacticalPrinciple: 'GK-CB Communication',
  title: 'כדור גבוה — שוער או בלם?',
  question: 'כדור גבוה מגיע לאזורך. השוער שלך יוצא וצועק "שלי!". בו-זמנית, החלוץ היריב מנסה לזכות בכדור. מה תעשה?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '60%', left: '48%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '72%', left: '46%', isYou: true, facing: 350 },
      { id: 'cb2', role: 'CB', top: '74%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '80%', left: '50%', facing: 350 },
      { id: 'lb', role: 'LB', top: '68%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '68%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '62%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '54%', left: '35%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '54%', left: '65%', facing: 0 },
      { id: 'lw', role: 'LW', top: '38%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '38%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '28%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '62%', left: '46%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '52%', left: '50%', facing: 180 },
      { id: 'rw', role: 'RW', top: '56%', left: '22%', facing: 180 },
      { id: 'lw', role: 'LW', top: '56%', left: '78%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '44%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '44%', left: '62%', facing: 180 },
      { id: 'dm', role: 'DM', top: '36%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '18%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לקפוץ לכדור בכל מקרה — עדיף אני מנקה מאשר הסיכון שהשוער יפספס.',
      isCorrect: false,
      feedback: 'התנגשות שוער-בלם היא אחת הטעויות הכי קטלניות בכדורגל. שוער שצועק "שלי!" קיבל את הכדור — עזוב לו.',
      principleExplained: 'קוד תקשורת שוער: כשהשוער קורא, כל שחקן שדה מפנה את הדרך — ללא יוצא מן הכלל.'
    },
    {
      id: 'b',
      text: 'להיסוג ולחסום את החלוץ היריב כדי שהשוער יטפל בכדור.',
      isCorrect: true,
      feedback: 'מצוין! השוער לוקח את הכדור, ואתה מגן עליו מהחלוץ היריב. חלוקת תפקידים מושלמת.',
      principleExplained: 'GK-CB Split Role: שוער לוקח כדור גבוה + בלם חוסם את התוקף. זה מה שמאפשר לשוערים לצאת בביטחון.'
    },
    {
      id: 'c',
      text: 'לצעוק "שלי!" חזרה ולהתחרות עם השוער על הכדור.',
      isCorrect: false,
      feedback: 'כאוס מוחלט. שני שחקנים שלך מתנגשים — ועזבת את החלוץ חופשי.',
      principleExplained: 'היררכיה ברורה: השוער שולט באזורו — לא מתחרים עליו.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Block attacker!',
    from: { top: '72%', left: '46%' },
    to: { top: '65%', left: '46%' }
  }
};
cb_l2_s2.preRollPositions = generatePreRoll(cb_l2_s2.initialPositions, { top: -12, left: 0 }, {}, { st: { top: -12, left: 0 } });

const cb_l2_s3 = {
  id: 'cb-l2-03',
  position: ['CB'],
  difficulty: 2,
  category: '1v1-defending',
  tacticalPrinciple: '1v1 Delay Technique',
  title: 'חלוץ פורץ אליך במהירות',
  question: 'חלוץ יריב מהיר פורץ אליך ישירות עם הכדור. הוא בשליטה מלאה. יש לך כיסוי מאחוריך. מה ההחלטה הנכונה?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '55%', left: '50%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '68%', left: '50%', isYou: true, facing: 350 },
      { id: 'cb2', role: 'CB', top: '76%', left: '40%', facing: 0 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '72%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '72%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '60%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '52%', left: '35%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '52%', left: '65%', facing: 180 },
      { id: 'lw', role: 'LW', top: '38%', left: '15%', facing: 180 },
      { id: 'rw', role: 'RW', top: '38%', left: '85%', facing: 180 },
      { id: 'st', role: 'ST', top: '28%', left: '50%', facing: 180 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '55%', left: '50%', facing: 180 },
      { id: 'rw', role: 'RW', top: '58%', left: '68%', facing: 180 },
      { id: 'lw', role: 'LW', top: '58%', left: '32%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '46%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '40%', left: '36%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '40%', left: '64%', facing: 180 },
      { id: 'dm', role: 'DM', top: '33%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '26%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '26%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '17%', left: '42%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לזנק בתיקול מיידי לפני שיתקרב יותר.',
      isCorrect: false,
      feedback: 'תיקול על חלוץ בשליטה מלאה = סיכון גבוה. אם הוא מנתר — נשאר לך רק השוער. המהמרים האלה יוצרים בעיות גדולות.',
      principleExplained: 'אל תתקל כשהתוקף בשליטה מלאה ורגוע. המתן למומנט החולשה שלו — מגע ארוך, פנייה, הסתה.'
    },
    {
      id: 'b',
      text: 'לנסוג אחורה, לשמור מרחק של 1-2 מטר, לכוון אותו לצד החלש.',
      isCorrect: true,
      feedback: 'כל הכבוד! Delay & Jockey — תדחה, תישאר על הרגליים, תכוון אותו לצד הפחות מסוכן. אתה קונה זמן לכיסוי שיגיע מאחוריך.',
      principleExplained: 'Delay Technique: שמור מרחק, עשה צעדים אחורה, כוון לצד. לעולם אל תתן לו לפסוע בחופשיות.'
    },
    {
      id: 'c',
      text: 'לסגת עמוק לאזור השוער ולהמתין שם.',
      isCorrect: false,
      feedback: 'סגייה עמוקה מדי נותנת לחלוץ מרחב ענק לירות מחוץ לרחבה. השוער חשוף.',
      principleExplained: 'אל תסוג יותר מדי — שמור על מרחק מבוקר. הלחץ על הכדור חייב להיות מתמיד.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Jockey!',
    from: { top: '68%', left: '50%' },
    to: { top: '74%', left: '54%' }
  }
};
cb_l2_s3.preRollPositions = generatePreRoll(cb_l2_s3.initialPositions, { top: -10, left: 0 }, {}, { st: { top: -10, left: 0 } });

const cb_l2_s4 = {
  id: 'cb-l2-04',
  position: ['CB'],
  difficulty: 2,
  category: 'build-up-pressure',
  tacticalPrinciple: 'Playing Out Under High Press',
  title: 'לחץ גבוה — לנקות או לצאת?',
  question: 'הכדור אצל השוער שלנו. היריב לוחץ עם 3 שחקנים גבוה מאוד. אתה (CB) פתוח בצד שמאל ומבקש את הכדור. הקשר האחורי ירד גם הוא לעזור. מה כדאי לעשות?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '92%', left: '50%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '84%', left: '32%', isYou: true, facing: 180 },
      { id: 'cb2', role: 'CB', top: '84%', left: '65%', facing: 180 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '75%', left: '10%', facing: 45 },
      { id: 'rb', role: 'RB', top: '75%', left: '90%', facing: 315 },
      { id: 'dm', role: 'DM', top: '82%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '68%', left: '35%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '68%', left: '65%', facing: 0 },
      { id: 'lw', role: 'LW', top: '50%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '50%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '38%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '88%', left: '52%', facing: 180 },
      { id: 'rw', role: 'RW', top: '84%', left: '68%', facing: 180 },
      { id: 'lw', role: 'LW', top: '84%', left: '32%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '76%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '68%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '68%', left: '62%', facing: 180 },
      { id: 'dm', role: 'DM', top: '60%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '50%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '50%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '28%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'להוריח לשוער לבעוט ארוך — להיפטר מהלחץ.',
      isCorrect: false,
      feedback: 'כדור ארוך לאוויר מוותר על הכדור ב-70% מהמקרים — ואתה מזמין לחץ חוזר מיד. זו לא פתרון, זו דחיית בעיה.',
      principleExplained: 'Build-Up Philosophy: גם תחת לחץ, מטרת כל צוות מאורגן היא לשמור על הכדור ולצאת מהלחץ דרך מסירות — לא לנקות.'
    },
    {
      id: 'b',
      text: 'לרדת קצת כדי לתת לשוער קו מסירה ברור, ולצאת ממנו לאגף פתוח.',
      isCorrect: true,
      feedback: 'מצוין! אתה יורד לתת לשוער מסירה קצרה בטוחה. עם הכדור אצלך, האגף כולו פתוח והלחץ נשבר. כך מוצאים מהלחץ הגבוה.',
      principleExplained: 'CB as Outlet: הבלם יורד ליצור קו מסירה לשוער, ואז שולח לאגף ממנו הלחץ לא הגיע — Break the Press.'
    },
    {
      id: 'c',
      text: 'לרוץ קדימה ולמתוח את ההגנה היריבה.',
      isCorrect: false,
      feedback: 'ריצה קדימה של בלם בתוך לחץ גבוה = עוזב את השוער לגמרי וחושף את עצמו לתפיסה מסוכנת.',
      principleExplained: 'בשלב הבנייה, הבלם מספק קו מסירה — לא ריצות קדימה.'
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Short to CB!',
    from: { top: '92%', left: '50%' },
    to: { top: '84%', left: '32%' }
  }
};
cb_l2_s4.preRollPositions = generatePreRoll(cb_l2_s4.initialPositions, { top: 0, left: 0 }, {}, { st: { top: 5, left: 2 }, rw: { top: 5, left: 3 }, lw: { top: 5, left: -3 } });

const cb_l2_s5 = {
  id: 'cb-l2-05',
  position: ['CB'],
  difficulty: 2,
  category: 'set-piece',
  tacticalPrinciple: 'Zonal Marking at Corners',
  title: 'פינה יריבה — סימון אזורי',
  question: 'הצוות שלנו משחק סימון אזורי בפינות. מגיע שחקן יריב גבוה לאזור שלך ומנסה לדחוף אותך ממנו לפני הבעיטה. מה תעשה?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '95%', left: '5%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '82%', left: '42%', isYou: true, facing: 315 },
      { id: 'cb2', role: 'CB', top: '82%', left: '58%', facing: 225 },
      { id: 'gk', role: 'GK', top: '93%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '78%', left: '20%', facing: 315 },
      { id: 'rb', role: 'RB', top: '78%', left: '75%', facing: 225 },
      { id: 'dm', role: 'DM', top: '75%', left: '50%', facing: 315 },
      { id: 'cm1', role: 'CM', top: '70%', left: '33%', facing: 315 },
      { id: 'cm2', role: 'CM', top: '70%', left: '67%', facing: 225 },
      { id: 'lw', role: 'LW', top: '55%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '55%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '40%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '80%', left: '44%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '80%', left: '55%', facing: 225 },
      { id: 'rw', role: 'RW', top: '78%', left: '30%', facing: 180 },
      { id: 'lw', role: 'LW', top: '78%', left: '65%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '72%', left: '40%', facing: 225 },
      { id: 'cm2', role: 'CM', top: '72%', left: '60%', facing: 225 },
      { id: 'dm', role: 'DM', top: '65%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '55%', left: '20%', facing: 180 },
      { id: 'rb', role: 'RB', top: '55%', left: '80%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '30%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לעזוב את האזור ולסמן אותו אישית כי הוא מסוכן.',
      isCorrect: false,
      feedback: 'עזיבת האזור שלך פורצת את כל קו הסימון האזורי! עכשיו יש חלל פתוח בדיוק במקום שכולם מצפים שיהיה מכוסה.',
      principleExplained: 'בסימון אזורי, כל שחקן אחראי על מרחב — לא על שחקן. עזיבת אזור = קריסה של כל המערכת.'
    },
    {
      id: 'b',
      text: 'להחזיק את האזור שלך בתוקף ולהיות מוכן לצאת לכדור ברגע שהוא נבעט.',
      isCorrect: true,
      feedback: 'בדיוק נכון! בסימון אזורי, אתה מחזיק מרחב ולא מרדף אחרי שחקן. כשהכדור נבעט, אתה הראשון לכדור — לא הוא.',
      principleExplained: 'Zonal Marking: אחזיק את האזור שלך עד לרגע הבעיטה, ואז צא לכדור בנחישות — זה היתרון שלך.'
    },
    {
      id: 'c',
      text: 'לסגת לקו השער כדי להיות בטוח יותר.',
      isCorrect: false,
      feedback: 'סגייה לקו השער מותירה את האזור ריק ומאפשרת לשחקן היריב לקבל את הכדור ממש מחוץ לרחבה.',
      principleExplained: 'סימון אזורי דורש נוכחות פעילה — לא בריחה לקו השער.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Hold zone!',
    from: { top: '82%', left: '42%' },
    to: { top: '80%', left: '44%' }
  }
};
cb_l2_s5.preRollPositions = generatePreRoll(cb_l2_s5.initialPositions, { top: 0, left: 0 }, {}, {});


// ============================================================
//  CM SCENARIOS — Level 2 (קישור מתקדם)
// ============================================================

const cm_l2_s1 = {
  id: 'cm-l2-01',
  position: ['CM'],
  difficulty: 2,
  category: 'counter-press',
  tacticalPrinciple: 'Gegenpressing — 6-Second Rule',
  title: 'הפסדנו כדור — לחץ מיידי!',
  question: 'הצוות שלנו הפסיד כדור במרכז המגרש. ה-CM היריב קיבל אותו ועדיין לא סידר את עצמו. יש לך 6 שניות לפני שהוא מתארגן. מה אתה עושה?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '52%', left: '50%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '76%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '76%', left: '60%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '68%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '68%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '62%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '52%', left: '36%', isYou: true, facing: 0 },
      { id: 'cm2', role: 'CM', top: '52%', left: '64%', facing: 0 },
      { id: 'lw', role: 'LW', top: '36%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '36%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '26%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '36%', left: '50%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '46%', left: '50%', facing: 180 },
      { id: 'rw', role: 'RW', top: '42%', left: '22%', facing: 180 },
      { id: 'lw', role: 'LW', top: '42%', left: '78%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '52%', left: '50%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '50%', left: '64%', facing: 180 },
      { id: 'dm', role: 'DM', top: '38%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '18%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לרוץ מיד ללחוץ על ה-CM היריב לפני שהוא מתארגן.',
      isCorrect: true,
      feedback: 'Gegenpressing! כלוף, דה ברוינה, מוסאלה — כולם לוחצים מיד בשניות הראשונות לאחר אובדן. לפעמים הכי קל להחזיר כדור זה מיד אחרי שהפסדת אותו.',
      principleExplained: 'חוק 6 השניות של קלוף: מיד אחרי אובדן כדור, הצוות לוחץ בעוצמה — הסיכוי הגבוה ביותר להחזיר.'
    },
    {
      id: 'b',
      text: 'לחזור לעמדת ההגנה שלי ולסגור את הצוות.',
      isCorrect: false,
      feedback: 'נסיגה מיידית מאפשרת לצוות היריב להתארגן, לסדר את עצמם ולהתקדם בנחת. מחמצת את חלון ה-Gegenpressing.',
      principleExplained: 'ניתן לחזור אחרי שחלון ה-Gegenpressing סגר — לא לפני שניסית.'
    },
    {
      id: 'c',
      text: 'לרוץ קדימה ולהיות מוכן לקאונטר מהיר אם נחזיר.',
      isCorrect: false,
      feedback: 'ריצה קדימה בזמן שכולם לוחצים היא מפסידה — תישאר רחוק מדי לקבל ואין לך אחד שייתן לך כדור.',
      principleExplained: 'Gegenpressing דורש שכולם לוחצים יחד — לא אחד רץ קדימה.'
    }
  ],
  correctArrow: {
    type: 'press',
    label: 'Gegenpressing!',
    from: { top: '52%', left: '36%' },
    to: { top: '52%', left: '50%' }
  }
};
cm_l2_s1.preRollPositions = generatePreRoll(cm_l2_s1.initialPositions, { top: 5, left: 0 }, {}, {});

const cm_l2_s2 = {
  id: 'cm-l2-02',
  position: ['CM'],
  difficulty: 2,
  category: 'progressive-carry',
  tacticalPrinciple: 'Progressive Carry — Reading the Gap',
  title: 'חלל נפתח — לדרבל קדימה?',
  question: 'אתה קשר (CM) עם הכדור. הסתכלת וראית שיש חלל פתוח לפניך — ה-DM היריב יצא ולא חזר. שני הבלמים שלהם נסוגו. האם לדרבל קדימה?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '55%', left: '45%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '76%', left: '38%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '76%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '66%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '66%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '64%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '55%', left: '45%', isYou: true, facing: 350 },
      { id: 'cm2', role: 'CM', top: '54%', left: '65%', facing: 0 },
      { id: 'lw', role: 'LW', top: '38%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '38%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '28%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '30%', left: '50%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '40%', left: '48%', facing: 180 },
      { id: 'rw', role: 'RW', top: '42%', left: '20%', facing: 180 },
      { id: 'lw', role: 'LW', top: '42%', left: '78%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '50%', left: '62%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '55%', left: '68%', facing: 180 },
      { id: 'dm', role: 'DM', top: '46%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '22%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '22%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '15%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לדרבל קדימה בביטחון דרך החלל שנפתח.',
      isCorrect: true,
      feedback: 'כשחלל נפתח בפניך, דרבל קדימה! זה בדיוק מה שעושים ברוזוביץ, קאנטה, לוקאס. "Progressive Carry" — כל מטר שמרווח הוא יתרון טקטי.',
      principleExplained: 'Progressive Carry: כשחלל פתוח לפניך — תפוס אותו. דרבל קדימה מחייב שניים לעצור אותך ומשחרר שחקנים אחרים.'
    },
    {
      id: 'b',
      text: 'למסור לצד ולשמר את הכדור בבטחה.',
      isCorrect: false,
      feedback: 'מסירה צידית כשיש חלל קדמי פתוח היא הזדמנות מבוזבזת. הצוות לא יתקדם.',
      principleExplained: 'בזמן שאתה מוסר לצד, ה-DM היריב חוזר לסגור את החלל. ההזדמנות נסגרת.'
    },
    {
      id: 'c',
      text: 'לחכות שהחלוץ יעשה ריצה לפני שנעביר.',
      isCorrect: false,
      feedback: 'אתה מחכה? ה-DM חוזר, החלל נסגר, וכל ההזדמנות אבדה. זמן תגובה הוא הכל.',
      principleExplained: 'קרא את המגרש מהר ופעל. אם חלל פתוח — תנוע לתוכו, אל תחכה.'
    }
  ],
  correctArrow: {
    type: 'dribble',
    label: 'Carry forward!',
    from: { top: '55%', left: '45%' },
    to: { top: '43%', left: '47%' }
  }
};
cm_l2_s2.preRollPositions = generatePreRoll(cm_l2_s2.initialPositions, { top: 5, left: 0 }, {}, { dm: { top: -8, left: 0 } });

const cm_l2_s3 = {
  id: 'cm-l2-03',
  position: ['CM'],
  difficulty: 2,
  category: 'escape-pressure',
  tacticalPrinciple: 'Escaping Double Press',
  title: 'לחץ כפול — הדרך החוצה',
  question: 'קיבלת כדור ומיד שני יריבים לוחצים אותך משני צדדים. אתה מכוסה מלפנים. אי אפשר להסתובב. הבלם השמאלי שלנו פתוח מאחוריך. מה תעשה?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '58%', left: '50%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '78%', left: '36%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '78%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '70%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '70%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '66%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '58%', left: '50%', isYou: true, facing: 0 },
      { id: 'cm2', role: 'CM', top: '56%', left: '68%', facing: 0 },
      { id: 'lw', role: 'LW', top: '40%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '40%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '28%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '35%', left: '50%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '50%', left: '50%', facing: 180 },
      { id: 'rw', role: 'RW', top: '56%', left: '38%', facing: 180 },
      { id: 'lw', role: 'LW', top: '56%', left: '62%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '58%', left: '40%', facing: 90 },
      { id: 'cm2', role: 'CM', top: '58%', left: '60%', facing: 270 },
      { id: 'dm', role: 'DM', top: '46%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '18%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לנסות לדרבל דרך שניהם.',
      isCorrect: false,
      feedback: 'לחץ כפול מתואם = דרבל ממנו הוא מהלך גבוה סיכון. 90% מהמקרים — אובדן כדור במיקום מסוכן.',
      principleExplained: 'מלכודת לחץ כפול מתוכננת בדיוק כדי שתנסה לדרבל. זה הפח שלהם.'
    },
    {
      id: 'b',
      text: 'להחזיר מסירה מהירה לבלם השמאלי שפתוח מאחוריך.',
      isCorrect: true,
      feedback: 'נכון! מסירה אחורה מהירה לבלם הפתוח. הלחץ הכפול השאיר אותו פנוי — נצל את זה. זה Escape Route.',
      principleExplained: 'Escape Route: כשנלחצים כפול, תמיד יש שחקן פתוח מאחורה. מסירה אחת נכונה שוברת את הלחץ.'
    },
    {
      id: 'c',
      text: 'להאריך קדימה לחלוץ.',
      isCorrect: false,
      feedback: 'תחת לחץ כפול, מסירה ארוכה קדימה = מסירה לא מדויקת שתיפסק בקלות.',
      principleExplained: 'בלחץ כפול, הפתרון הוא פשוט — אחורה, לא קדימה.'
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Escape back!',
    from: { top: '58%', left: '50%' },
    to: { top: '78%', left: '36%' }
  }
};
cm_l2_s3.preRollPositions = generatePreRoll(cm_l2_s3.initialPositions, { top: 5, left: 0 }, {}, {});

const cm_l2_s4 = {
  id: 'cm-l2-04',
  position: ['CM'],
  difficulty: 2,
  category: 'switch-play',
  tacticalPrinciple: 'Switching Sides to Break Press',
  title: 'הכדור תקוע בצד — לשנות!',
  question: 'הצוות שלנו מחזיק בכדור בצד ימין. היריב הטה לשם 6 שחקנים. הקיצוני השמאלי שלנו לגמרי חופשי. אתה במרכז. מה תעשה?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '50%', left: '80%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '76%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '76%', left: '60%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '62%', left: '10%', facing: 45 },
      { id: 'rb', role: 'RB', top: '56%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '62%', left: '65%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '52%', left: '52%', isYou: true, facing: 90 },
      { id: 'cm2', role: 'CM', top: '50%', left: '72%', facing: 90 },
      { id: 'lw', role: 'LW', top: '35%', left: '12%', facing: 0 },
      { id: 'rw', role: 'RW', top: '42%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '28%', left: '55%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '30%', left: '50%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '42%', left: '58%', facing: 270 },
      { id: 'rw', role: 'RW', top: '48%', left: '35%', facing: 180 },
      { id: 'lw', role: 'LW', top: '46%', left: '70%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '52%', left: '60%', facing: 270 },
      { id: 'cm2', role: 'CM', top: '54%', left: '75%', facing: 270 },
      { id: 'dm', role: 'DM', top: '46%', left: '66%', facing: 270 },
      { id: 'lb', role: 'LB', top: '30%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '30%', left: '82%', facing: 270 },
      { id: 'cb1', role: 'CB', top: '20%', left: '42%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לקחת מסירה ולמשיך לנסות לפרוץ בצד ימין.',
      isCorrect: false,
      feedback: '6 שחקנים יריבים בצד ימין — זה הכי צפוף ומסוכן. להמשיך שם זו עיוורת טקטית.',
      principleExplained: 'תמיד לזהות לאן הלחץ הולך — ולשחק לכיוון ההפוך.'
    },
    {
      id: 'b',
      text: 'לקבל כדור ולשלוח מסירה ארוכה לקיצוני השמאלי החופשי.',
      isCorrect: true,
      feedback: 'מושלם! שינוי כיוון מהיר ומדויק — הקיצוני השמאלי מקבל כדור במרחב פתוח, 1 על 1 עם המגן. כך שוברים לחץ מאורגן.',
      principleExplained: 'Switching Play: שלח את הכדור לאגף הנגדי — מהר ומדויק. כל שחקן יריב שרץ עכשיו לכסות הוא שחקן שאבד.'
    },
    {
      id: 'c',
      text: 'להחזיר לבלם ולפתוח מהתחלה.',
      isCorrect: false,
      feedback: 'החזרה לבלם בסדר, אבל אתה מאבד את מיקומך ואת הקיצוני החופשי שעוד רגע יסגר.',
      principleExplained: 'הזדמנות לשינוי כיוון מיידי עדיפה על פיתוח מחדש.'
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Switch sides!',
    from: { top: '52%', left: '52%' },
    to: { top: '35%', left: '12%' }
  }
};
cm_l2_s4.preRollPositions = generatePreRoll(cm_l2_s4.initialPositions, { top: 3, left: -5 }, {}, {});

const cm_l2_s5 = {
  id: 'cm-l2-05',
  position: ['CM'],
  difficulty: 2,
  category: 'positioning',
  tacticalPrinciple: 'Supporting Angles — Triangle',
  title: 'כיוון גוף לתמיכה בבלם',
  question: 'הכדור אצל הבלם השמאלי שלנו. הוא תחת לחץ קל. אתה (CM) בוחר מאיפה לתמוך. איזה מיקום ייתן לו את קו המסירה הכי נוח?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '76%', left: '35%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '76%', left: '35%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '78%', left: '60%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '68%', left: '10%', facing: 45 },
      { id: 'rb', role: 'RB', top: '68%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '65%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '60%', left: '40%', isYou: true, facing: 200 },
      { id: 'cm2', role: 'CM', top: '58%', left: '65%', facing: 0 },
      { id: 'lw', role: 'LW', top: '42%', left: '14%', facing: 0 },
      { id: 'rw', role: 'RW', top: '42%', left: '86%', facing: 0 },
      { id: 'st', role: 'ST', top: '30%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '32%', left: '50%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '48%', left: '48%', facing: 180 },
      { id: 'rw', role: 'RW', top: '52%', left: '22%', facing: 180 },
      { id: 'lw', role: 'LW', top: '52%', left: '78%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '60%', left: '52%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '62%', left: '68%', facing: 180 },
      { id: 'dm', role: 'DM', top: '54%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '30%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '30%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '20%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לעמוד ישירות מאחורי הבלם — קרוב ותמיד זמין.',
      isCorrect: false,
      feedback: 'עמידה ישירות מאחורי יוצרת קו מסירה שהיריב יחסום בקלות. גם השדה שלך מוגבל — אי אפשר לראות את כל האפשרויות.',
      principleExplained: 'קו מסירה ישיר קל לסגירה. תמיד תעמוד בזווית.'
    },
    {
      id: 'b',
      text: 'לעמוד בזווית של 45° לצדו — גוף פתוח לשדה.',
      isCorrect: true,
      feedback: 'בדיוק! זווית 45° נותנת לבלם קו מסירה ברור, וגוף פתוח שלך מאפשר לך לראות את כל המגרש עם הכדור — בדיוק כמו שקאנטה וקרוס עומדים.',
      principleExplained: 'Supporting Angle: עמוד תמיד בזווית — לא ישיר מאחורה. גוף פתוח = ראיית שדה מלאה + קו מסירה שקשה לסגור.'
    },
    {
      id: 'c',
      text: 'לרוץ קדימה לאזור ההתקפה כדי להיות מוכן לקאונטר.',
      isCorrect: false,
      feedback: 'ריצה קדימה מרחיקה אותך מהבלם שצריך עזרה עכשיו. אין לך קו מסירה ואתה מבודד.',
      principleExplained: 'תמיכה בבלם היא עדיפות ראשונה — לפני כל מחשבה התקפית.'
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Angled support!',
    from: { top: '76%', left: '35%' },
    to: { top: '60%', left: '40%' }
  }
};
cm_l2_s5.preRollPositions = generatePreRoll(cm_l2_s5.initialPositions, { top: 3, left: 5 }, {}, {});


// ============================================================
//  ST SCENARIOS — Level 2 (חלוץ מתקדם)
// ============================================================

const st_l2_s1 = {
  id: 'st-l2-01',
  position: ['ST'],
  difficulty: 2,
  category: 'finishing',
  tacticalPrinciple: '1v1 Finishing Decision',
  title: '1 על 1 עם השוער — מה לבחור?',
  question: 'אתה פורץ 1 על 1 עם השוער. הוא רץ לקראתך ונמצא 5 מטר ממך. הוא נמוך. מה ההחלטה הכי נכונה?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '18%', left: '50%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '75%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '75%', left: '60%', facing: 0 },
      { id: 'gk', role: 'GK', top: '88%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '68%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '68%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '62%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '52%', left: '35%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '52%', left: '65%', facing: 0 },
      { id: 'lw', role: 'LW', top: '30%', left: '16%', facing: 0 },
      { id: 'rw', role: 'RW', top: '30%', left: '84%', facing: 0 },
      { id: 'st', role: 'ST', top: '18%', left: '50%', isYou: true, facing: 0 }
    ],
    teamB: [
      { id: 'gk', role: 'GK', top: '8%', left: '50%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '16%', left: '42%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '16%', left: '58%', facing: 180 },
      { id: 'lb', role: 'LB', top: '24%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '24%', left: '82%', facing: 180 },
      { id: 'dm', role: 'DM', top: '36%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '46%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '46%', left: '62%', facing: 180 },
      { id: 'lw', role: 'LW', top: '42%', left: '20%', facing: 180 },
      { id: 'rw', role: 'RW', top: '42%', left: '80%', facing: 180 },
      { id: 'st', role: 'ST', top: '55%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לירות חזק לפינה.',
      isCorrect: false,
      feedback: 'השוער רץ לקראתך ומצמצם זוויות — יריה חזקה לפינה עשויה להיחסם כי הוא כבר על הקו שלך.',
      principleExplained: 'כשהשוער יוצא — צ\'יפ מעליו הוא הבחירה הנכונה. יריה חזקה לפינה תעבוד רק אם יש לך זמן.'
    },
    {
      id: 'b',
      text: 'לצ\'יפ בעדינות מעל השוער הרץ.',
      isCorrect: true,
      feedback: 'מושלם! שוער שרץ לקראתך = \'chip\' מעליו. זה בדיוק מה שעשה לואן טאלס, רוני, בכל הגמרים הגדולים. ביצוע קר-דם שמנצל את המומנטום של השוער.',
      principleExplained: '1v1 Rule: שוער יוצא לקראתך = chip. הוא כבר לא על קו השער ולא יכול לחזור. שלח אותו מעליו.'
    },
    {
      id: 'c',
      text: 'לקחת עוד נגיעה כדי להכניס לרשת בשלווה.',
      isCorrect: false,
      feedback: 'נגיעה נוספת עם שוער שרץ = הוא יגיע אליך לפני שתגמור. הוא ינצח אותך בסיום.',
      principleExplained: 'עם שוער רץ, הזמן הוא נגדך. פעל עכשיו.'
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Chip!',
    from: { top: '18%', left: '50%' },
    to: { top: '5%', left: '50%' }
  }
};
st_l2_s1.preRollPositions = generatePreRoll(st_l2_s1.initialPositions, { top: 8, left: 0 }, {}, { gk: { top: 8, left: 0 } });

const st_l2_s2 = {
  id: 'st-l2-02',
  position: ['ST'],
  difficulty: 2,
  category: 'pressing',
  tacticalPrinciple: 'Pressing Trigger Recognition (ST)',
  title: 'ללחוץ על הבלם — מתי?',
  question: 'הבלם היריב קיבל כדור. הוא רגוע, מפנה גב לשדה שלנו, ומוכן לבנות. הצוות שלנו לא בלחץ גבוה כרגע. האם לרוץ ללחוץ עליו לבד?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '20%', left: '40%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '75%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '75%', left: '60%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '68%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '68%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '60%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '50%', left: '36%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '50%', left: '64%', facing: 0 },
      { id: 'lw', role: 'LW', top: '34%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '34%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '28%', left: '50%', isYou: true, facing: 0 }
    ],
    teamB: [
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '20%', left: '40%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '20%', left: '60%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '85%', facing: 180 },
      { id: 'dm', role: 'DM', top: '36%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '46%', left: '36%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '46%', left: '64%', facing: 180 },
      { id: 'lw', role: 'LW', top: '52%', left: '18%', facing: 180 },
      { id: 'rw', role: 'RW', top: '52%', left: '82%', facing: 180 },
      { id: 'st', role: 'ST', top: '60%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לרוץ ללחוץ על הבלם מיד — להפשיל אותו תחת לחץ.',
      isCorrect: false,
      feedback: 'לחץ יחידני על בלם רגוע = הוא יעקוף אותך בקלות ואתה מבוזבז בהליכה חזרה. זה מחליש את הצוות שלנו.',
      principleExplained: 'לחץ של ST לבד ללא trigger = זבל. הבלם ישחק אותך בקלות.'
    },
    {
      id: 'b',
      text: 'להחזיק עמדה ולחכות ל-Trigger — מגע גרוע, פנייה לאחור, או כדור לשוער.',
      isCorrect: true,
      feedback: 'נכון! Pressing trigger הוא הרגע שהלחץ הגיוני — מגע גרוע, שוער מקבל, כניסה בלחץ. לפני זה, אתה מחזיק עמדה וגורם לו \'לבזבז\' מסירות.',
      principleExplained: 'Pressing Trigger: לחץ רק כשיש הזדמנות ממשית — טעות, שוער, פנייה גרועה. לחץ ללא trigger = אנרגיה מבוזבזת.'
    },
    {
      id: 'c',
      text: 'לרדת עמוק ולהצטמצם עם הצוות.',
      isCorrect: false,
      feedback: 'ירידה עמוקה מדי של החלוץ לוקחת ממנו את האיום הקדמי ונותנת לבלמים נוחות מלאה.',
      principleExplained: 'ChALOtz חייב להישאר מאיים גם כשמחכים. ירידה עמוקה = הגנה מוותרת.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Wait for trigger!',
    from: { top: '28%', left: '50%' },
    to: { top: '26%', left: '50%' }
  }
};
st_l2_s2.preRollPositions = generatePreRoll(st_l2_s2.initialPositions, { top: 5, left: 3 }, {}, {});

const st_l2_s3 = {
  id: 'st-l2-03',
  position: ['ST'],
  difficulty: 2,
  category: 'hold-up',
  tacticalPrinciple: 'Hold-Up Play Under Pressure',
  title: 'גב לשער — להחזיק או לשחרר?',
  question: 'קיבלת כדור ארוך עם גב לשער. שני בלמים לוחצים אותך מאחור. הקשר שלנו רץ לתמוך. האם להחזיק עד שיגיע?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '22%', left: '50%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '75%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '75%', left: '60%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '68%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '68%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '60%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '38%', left: '36%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '50%', left: '64%', facing: 0 },
      { id: 'lw', role: 'LW', top: '28%', left: '16%', facing: 0 },
      { id: 'rw', role: 'RW', top: '28%', left: '84%', facing: 0 },
      { id: 'st', role: 'ST', top: '22%', left: '50%', isYou: true, facing: 180 }
    ],
    teamB: [
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '16%', left: '44%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '16%', left: '56%', facing: 0 },
      { id: 'lb', role: 'LB', top: '26%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '26%', left: '82%', facing: 180 },
      { id: 'dm', role: 'DM', top: '36%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '46%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '46%', left: '62%', facing: 180 },
      { id: 'lw', role: 'LW', top: '54%', left: '20%', facing: 180 },
      { id: 'rw', role: 'RW', top: '54%', left: '80%', facing: 180 },
      { id: 'st', role: 'ST', top: '62%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לנסות להסתובב ולפנות לשער.',
      isCorrect: false,
      feedback: 'שני בלמים צמודים + ניסיון פנייה = אובדן כדור כמעט מובטח. גם אם תסתובב — אתה מעיף עצמך לסכנה.',
      principleExplained: 'Hold-up Play: לעולם לא תנסה לפנות כשיש שני בלמים על הגב שלך. זה הרגע ל-HOLD.'
    },
    {
      id: 'b',
      text: 'להחזיק את הכדור בגוף ולהמתין לקשר שיגיע לתמוך.',
      isCorrect: true,
      feedback: 'בדיוק! Ibrahimovic, Drogba, Lukaku — כולם מאסטרים ב-Hold Up Play. אתה מחזיק את הכדור בגוף, מגן עליו, וכשהקשר מגיע — משחרר ומשנה כיוון.',
      principleExplained: 'Hold-Up Play: גוף רחב, כדור ב-"far foot", ספוג את הלחץ, וחכה לתמיכה. זה הנשק של כל חלוץ גדול.'
    },
    {
      id: 'c',
      text: 'להחזיר אחורה לקשר האחורי שלנו.',
      isCorrect: false,
      feedback: 'החזרה ארוכה לאחור תחת לחץ = ריצה מסוכנת שעלולה ליירט, ואתה מאבד את מיקומך התקפי.',
      principleExplained: 'כשקשר קרוב לתמוך — המתן לו. החזרה ארוכה היא ה-LAST RESORT.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Hold it!',
    from: { top: '22%', left: '50%' },
    to: { top: '22%', left: '50%' }
  }
};
st_l2_s3.preRollPositions = generatePreRoll(st_l2_s3.initialPositions, { top: -8, left: 0 }, {}, {});

const st_l2_s4 = {
  id: 'st-l2-04',
  position: ['ST'],
  difficulty: 2,
  category: 'movement',
  tacticalPrinciple: 'Timed Diagonal Run',
  title: 'ריצה אלכסונית — מתי?',
  question: 'הכדור אצל הקשר שלנו בצד שמאל. הוא עדיין מקבל את הכדור ולא פנוי. הבלם הימני שלהם מסתכל אחורה לרגע. נפתח חלל אלכסוני לימין. מה אתה עושה?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '48%', left: '32%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '75%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '75%', left: '60%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '68%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '68%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '60%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '48%', left: '32%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '50%', left: '64%', facing: 0 },
      { id: 'lw', role: 'LW', top: '35%', left: '14%', facing: 0 },
      { id: 'rw', role: 'RW', top: '35%', left: '86%', facing: 0 },
      { id: 'st', role: 'ST', top: '24%', left: '50%', isYou: true, facing: 0 }
    ],
    teamB: [
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '17%', left: '40%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '17%', left: '60%', facing: 90 },
      { id: 'lb', role: 'LB', top: '26%', left: '15%', facing: 180 },
      { id: 'rb', role: 'RB', top: '26%', left: '85%', facing: 270 },
      { id: 'dm', role: 'DM', top: '36%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '46%', left: '36%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '46%', left: '64%', facing: 180 },
      { id: 'lw', role: 'LW', top: '52%', left: '20%', facing: 180 },
      { id: 'rw', role: 'RW', top: '52%', left: '80%', facing: 180 },
      { id: 'st', role: 'ST', top: '60%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לרוץ עכשיו — הבלם מסיח דעת, חלון פתוח.',
      isCorrect: false,
      feedback: 'הקשר עדיין לא פנוי לראות ולשלוח. ריצה עכשיו = אתה תגיע לחלל לפני הכדור ותחכה — ותיסגר.',
      principleExplained: 'ריצה מוקדמת מדי = אתה מגיע לחלל לבד ומחכה. הבלם יחזור לכסות.'
    },
    {
      id: 'b',
      text: 'לחכות עד שהקשר יקבל את הכדור ויפנה — ואז לרוץ.',
      isCorrect: true,
      feedback: 'תזמון מושלם! כשהקשר פנה ועיניו בשדה — אז אתה מתחיל את הריצה. הוא רואה אותך, הבלם עדיין מסתובב חזרה, והכדור מגיע בדיוק לחלל.',
      principleExplained: 'Timed Run: תזמן את הריצה לרגע שהמוסר פנוי לשלוח — לא מוקדם יותר. כך הריצה מגיעה עם הכדור.'
    },
    {
      id: 'c',
      text: 'לרדת לרגלים ולבקש מסירה ישירה.',
      isCorrect: false,
      feedback: 'ירידה לרגלים ממחקת את החלל האלכסוני ומקרבת אותך לשני הבלמים.',
      principleExplained: 'כשחלל עמוק פתוח — אל תרד לרגלים. נצל את הריצה.'
    }
  ],
  correctArrow: {
    type: 'run',
    label: 'Timed diagonal!',
    from: { top: '24%', left: '50%' },
    to: { top: '14%', left: '65%' }
  }
};
st_l2_s4.preRollPositions = generatePreRoll(st_l2_s4.initialPositions, { top: 5, left: 0 }, {}, {});

const st_l2_s5 = {
  id: 'st-l2-05',
  position: ['ST'],
  difficulty: 2,
  category: 'offside',
  tacticalPrinciple: 'Offside Line Awareness',
  title: 'קו נבדל — להישאר בגבול',
  question: 'הבלם שלנו עומד לבעוט כדור ארוך לאחורי ההגנה. אתה שווה לבלם האחרון היריב. הכדור עדיין לא נבעט. מה תעשה?',
  timerSeconds: 6,
  initialPositions: {
    ball: { top: '78%', left: '42%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '78%', left: '42%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '78%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '70%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '70%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '62%', left: '50%', facing: 0 },
      { id: 'cm1', role: 'CM', top: '52%', left: '36%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '52%', left: '64%', facing: 0 },
      { id: 'lw', role: 'LW', top: '36%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '36%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '22%', left: '50%', isYou: true, facing: 0 }
    ],
    teamB: [
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '22%', left: '44%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '22%', left: '58%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '82%', facing: 180 },
      { id: 'dm', role: 'DM', top: '38%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '48%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '48%', left: '62%', facing: 180 },
      { id: 'lw', role: 'LW', top: '56%', left: '20%', facing: 180 },
      { id: 'rw', role: 'RW', top: '56%', left: '80%', facing: 180 },
      { id: 'st', role: 'ST', top: '64%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לרוץ קדימה עוד לפני שהכדור נבעט — להיות ראשון לכדור.',
      isCorrect: false,
      feedback: 'ריצה לפני הבעיטה = נבדל. כשהכדור ייבעט, אתה כבר לפני הבלם האחרון. השופט יסמן.',
      principleExplained: 'כלל נבדל: המיקום נבחן ברגע שהכדור נבעט — לא לפני. לרוץ לפני הבעיטה = נבדל.'
    },
    {
      id: 'b',
      text: 'להישאר שווה עם הבלם האחרון עד הבעיטה — ואז לרוץ.',
      isCorrect: true,
      feedback: 'תזמון מדויק! שמור על יישור עם הבלם האחרון עד לרגע הבעיטה — ואז תפרוץ במלוא המהירות. הנה איך מנצחים את קו הנבדל.',
      principleExplained: 'Offside Awareness: הישאר שווה עד הבעיטה, ורק אז תרוץ. פשוט, יעיל, ותמיד עובד.'
    },
    {
      id: 'c',
      text: 'לרדת אחורה קצת — להיות בטוח שלא נבדל.',
      isCorrect: false,
      feedback: 'ירידה קצרה מאבדת את היתרון שלך. כשהכדור ייבעט, אתה תגיע מאחור ולא תנצח את הבלמים בריצה.',
      principleExplained: 'ירידה מיותרת = אתה מוותר על יתרון המיקום. שמור שווה, אל תירד.'
    }
  ],
  correctArrow: {
    type: 'run',
    label: 'On the ball!',
    from: { top: '22%', left: '50%' },
    to: { top: '10%', left: '52%' }
  }
};
st_l2_s5.preRollPositions = generatePreRoll(st_l2_s5.initialPositions, { top: 5, left: -3 }, {}, {});


// ============================================================
//  CDM SCENARIOS — Level 1 (יסודות הקשר האחורי)
// ============================================================

const cdm_l1_s1 = {
  id: 'cdm-l1-01',
  position: ['CDM'],
  difficulty: 1,
  category: 'positioning',
  tacticalPrinciple: 'Screening — Blocking Passing Lanes',
  title: 'היכן לעמוד? — מסנן ההגנה',
  question: 'הקשר היריב מחזיק את הכדור ומחפש מסירה לחלוץ שלהם שנמצא בין הקווים. אתה (קשר אחורי) יכול לבחור היכן לעמוד. מה הבחירה הנכונה?',
  timerSeconds: 8,
  initialPositions: {
    ball: { top: '46%', left: '50%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '76%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '76%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '68%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '68%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '60%', left: '50%', isYou: true, facing: 350 },
      { id: 'cm1', role: 'CM', top: '52%', left: '35%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '52%', left: '65%', facing: 0 },
      { id: 'lw', role: 'LW', top: '36%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '36%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '26%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '56%', left: '50%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '46%', left: '50%', facing: 180 },
      { id: 'rw', role: 'RW', top: '44%', left: '22%', facing: 180 },
      { id: 'lw', role: 'LW', top: '44%', left: '78%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '38%', left: '36%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '38%', left: '64%', facing: 180 },
      { id: 'dm', role: 'DM', top: '32%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '24%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '24%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '14%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לרוץ ישירות ללחוץ על מחזיק הכדור.',
      isCorrect: false,
      feedback: 'לחץ ישיר על הקשר היריב עוזב את המרכז חשוף. הוא יפקח מסירה קלה לחלוץ שבין הקווים — שאתה כבר לא שם לסמן.',
      principleExplained: 'תפקיד ה-CDM הוא ראשית לסגור קווי מסירה — לא לרוץ ללחוץ ולהשאיר חלל מאחוריו.'
    },
    {
      id: 'b',
      text: 'לעמוד בין הקשר היריב לחלוץ שלהם — לחסום את קו המסירה.',
      isCorrect: true,
      feedback: 'מצוין! Cover Shadow — אתה עומד בדיוק בצל (shadow) של קו המסירה בין הקשר לחלוץ. הקשר לא רואה מסירה נקייה. זה תפקידו הבסיסי של ה-CDM.',
      principleExplained: 'Screening: עמוד בין הכדור לשחקן שאתה רוצה לנתק. זה מה שעושים קאנטה, פאביניו, ורדי ב-CDM.'
    },
    {
      id: 'c',
      text: 'לסגת לצמוד לבלמים שלנו.',
      isCorrect: false,
      feedback: 'סגייה לבלמים משאירה חלל ענק בין הקווים — בדיוק שם שהחלוץ היריב רוצה לקבל כדור.',
      principleExplained: 'ה-CDM צריך לכסות את "No Man\'s Land" — האזור בין ההגנה לקישור. לא לשקוע לתוך ההגנה.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Screen lane!',
    from: { top: '60%', left: '50%' },
    to: { top: '54%', left: '50%' }
  }
};
cdm_l1_s1.preRollPositions = generatePreRoll(cdm_l1_s1.initialPositions, { top: 5, left: 0 }, {}, {});

const cdm_l1_s2 = {
  id: 'cdm-l1-02',
  position: ['CDM'],
  difficulty: 1,
  category: 'defending',
  tacticalPrinciple: 'Tackle vs. Delay — Reading Intent',
  title: 'לתקל או לדחות?',
  question: 'קשר יריב נוסע לעברך עם הכדור בשליטה מלאה. הוא 3 מטר ממך. אין לך תגבורת קרובה. מה אתה עושה?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '50%', left: '50%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '74%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '74%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '66%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '66%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '56%', left: '50%', isYou: true, facing: 350 },
      { id: 'cm1', role: 'CM', top: '54%', left: '34%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '54%', left: '66%', facing: 180 },
      { id: 'lw', role: 'LW', top: '38%', left: '15%', facing: 180 },
      { id: 'rw', role: 'RW', top: '38%', left: '85%', facing: 180 },
      { id: 'st', role: 'ST', top: '28%', left: '50%', facing: 180 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '35%', left: '50%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '44%', left: '50%', facing: 180 },
      { id: 'rw', role: 'RW', top: '46%', left: '24%', facing: 180 },
      { id: 'lw', role: 'LW', top: '46%', left: '76%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '50%', left: '50%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '50%', left: '64%', facing: 180 },
      { id: 'dm', role: 'DM', top: '40%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '18%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לתקל מיד — לגנוב את הכדור לפני שיפתח.',
      isCorrect: false,
      feedback: 'תיקול על שחקן בשליטה מלאה ללא תגבורת = 50/50 בטוב. אם הוא מנתר — אתה מחוץ ל פלייגריאונד וכל ההגנה חשופה.',
      principleExplained: 'CDM לא תוקל כשיריב בשליטה מלאה ואין תגבורת. קודם דחה, המתן לתגבורת או לטעות שלו.'
    },
    {
      id: 'b',
      text: 'לעמוד על הרגליים, לדחות ולכוון אותו לצד פחות מסוכן.',
      isCorrect: true,
      feedback: 'נכון! Jockey & Contain — אתה דוחה אותו לצד, קונה זמן לתגבורת, ומחכה לטעות. CDM שמחזיק קו הגנה חזק.',
      principleExplained: 'Contain Principle: ה-CDM בולם מהירות, לא בהכרח גונב. "Contain until support arrives."'
    },
    {
      id: 'c',
      text: 'לסגת עמוק כדי לא להיחלף.',
      isCorrect: false,
      feedback: 'סגייה עמוקה מדי ב-CDM = נותנת לקשר היריב חופש לירות מרחוק או למסור לחלוץ בין הקווים.',
      principleExplained: 'CDM לא בורח — הוא מחזיק קו, בולם, ומחכה להזדמנות.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Contain!',
    from: { top: '56%', left: '50%' },
    to: { top: '60%', left: '54%' }
  }
};
cdm_l1_s2.preRollPositions = generatePreRoll(cdm_l1_s2.initialPositions, { top: -8, left: 0 }, {}, { cam: { top: -8, left: 0 } });

const cdm_l1_s3 = {
  id: 'cdm-l1-03',
  position: ['CDM'],
  difficulty: 1,
  category: 'receiving',
  tacticalPrinciple: 'Open Body Position — Half-Turn',
  title: 'קבלת כדור — כיוון גוף נכון',
  question: 'הבלם השמאלי שלנו עומד למסור לך. הקשר ההתקפי היריב לוחץ מאחוריך. אתה יודע שהמגן הימני שלנו פתוח. כיצד תכין את גוף שלך לקבלת הכדור?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '78%', left: '35%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '78%', left: '35%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '78%', left: '62%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '68%', left: '10%', facing: 45 },
      { id: 'rb', role: 'RB', top: '68%', left: '90%', facing: 315 },
      { id: 'dm', role: 'DM', top: '66%', left: '50%', isYou: true, facing: 200 },
      { id: 'cm1', role: 'CM', top: '56%', left: '36%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '56%', left: '65%', facing: 0 },
      { id: 'lw', role: 'LW', top: '40%', left: '14%', facing: 0 },
      { id: 'rw', role: 'RW', top: '40%', left: '86%', facing: 0 },
      { id: 'st', role: 'ST', top: '28%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '36%', left: '50%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '60%', left: '52%', facing: 180 },
      { id: 'rw', role: 'RW', top: '56%', left: '22%', facing: 180 },
      { id: 'lw', role: 'LW', top: '56%', left: '78%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '48%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '48%', left: '62%', facing: 180 },
      { id: 'dm', role: 'DM', top: '40%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '18%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לפנות גב לכדור ולקבל עם "חצי-סיבוב" כדי לראות את המגרש.',
      isCorrect: false,
      feedback: 'גב מוחלט לכדור תחת לחץ = קשה לנגיעה ראשונה ואתה עיוור. הלוחץ מאחוריך ינצל זאת.',
      principleExplained: 'גב מוחלט הוא המיקום הכי גרוע לקבלת כדור ב-CDM.'
    },
    {
      id: 'b',
      text: 'לפתוח את הגוף בזווית — כך שתוכל לראות גם את הכדור וגם את המגן הימני.',
      isCorrect: true,
      feedback: 'מושלם! Open Body / Half-Turn — אתה מקבל את הכדור כשהגוף פתוח, וברגע שהוא נוגע ברגל — אתה כבר רואה את המגן הימני הפתוח ושולח.',
      principleExplained: 'Half-Turn Reception: פתח את הגוף לפני קבלת הכדור. כך תגובה ראשונה כוללת ראיית שדה מלאה — בלי לבזבז נגיעה.'
    },
    {
      id: 'c',
      text: 'לפנות פנים לכדור ישירות.',
      isCorrect: false,
      feedback: 'פנייה ישירה נותנת לך נגיעה ראשונה אבל את גבך לכל שאר המגרש. אתה חייב להסתובב שוב — זמן יקר אבוד.',
      principleExplained: 'נגיעה ראשונה טובה + ראיית שדה = half-turn. פנייה ישירה = נגיעה ראשונה בלבד.'
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Open body!',
    from: { top: '78%', left: '35%' },
    to: { top: '66%', left: '50%' }
  }
};
cdm_l1_s3.preRollPositions = generatePreRoll(cdm_l1_s3.initialPositions, { top: 3, left: 5 }, {}, {});

const cdm_l1_s4 = {
  id: 'cdm-l1-04',
  position: ['CDM'],
  difficulty: 1,
  category: 'cover',
  tacticalPrinciple: 'CDM Cover When CB Steps',
  title: 'הבלם יצא — מי מכסה?',
  question: 'הבלם הימני שלנו צעד קדימה ללחוץ על כנף יריב שנסע פנימה. נוצר חלל מאחוריו. החלוץ היריב בין הקווים רואה את החלל ומנסה לקבל שם. מה תעשה?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '62%', left: '72%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '74%', left: '42%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '62%', left: '70%', facing: 315 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '66%', left: '12%', facing: 45 },
      { id: 'rb', role: 'RB', top: '66%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '62%', left: '52%', isYou: true, facing: 315 },
      { id: 'cm1', role: 'CM', top: '54%', left: '36%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '52%', left: '64%', facing: 0 },
      { id: 'lw', role: 'LW', top: '38%', left: '15%', facing: 0 },
      { id: 'rw', role: 'RW', top: '38%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '28%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '70%', left: '62%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '55%', left: '55%', facing: 180 },
      { id: 'rw', role: 'RW', top: '62%', left: '72%', facing: 180 },
      { id: 'lw', role: 'LW', top: '50%', left: '22%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '44%', left: '38%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '44%', left: '62%', facing: 180 },
      { id: 'dm', role: 'DM', top: '36%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '26%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '26%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '16%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'להמשיך בעמדתי — הבלם יחזור.',
      isCorrect: false,
      feedback: 'הבלם עסוק בלחיצה ולא יחזור בזמן. החלוץ יקבל כדור בחלל פתוח ויפנה לשער.',
      principleExplained: 'ה-CDM הוא ה"ביטוח" של הבלמים. כשאחד יוצא — ה-CDM ממלא.'
    },
    {
      id: 'b',
      text: 'לרדת ולכסות את החלל שנוצר אחרי הבלם הימני.',
      isCorrect: true,
      feedback: 'בדיוק! CDM Cover Shadow — אתה ממלא את החלל שנוצר אחרי הבלם שיצא. כשהחלוץ היריב מקבל, אתה שם. זה השימוש המושלם ב-CDM.',
      principleExplained: 'CDM Fill: כשבלם יוצא, ה-CDM ממלא. כשה-CDM יוצא, הבלם ממלא. מערכת כיסוי הדדית.'
    },
    {
      id: 'c',
      text: 'גם ללחוץ על הכנף עם הבלם.',
      isCorrect: false,
      feedback: 'לחץ כפול על הכנף ישאיר את המרכז לגמרי פתוח — החלוץ יקבל כדור ללא סימון.',
      principleExplained: 'CDM לעולם לא מצטרף ללחץ כפול באגף. הוא שומר על המרכז.'
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Fill the gap!',
    from: { top: '62%', left: '52%' },
    to: { top: '70%', left: '62%' }
  }
};
cdm_l1_s4.preRollPositions = generatePreRoll(cdm_l1_s4.initialPositions, { top: -5, left: 5 }, {}, { rw: { top: -5, left: 5 } });

const cdm_l1_s5 = {
  id: 'cdm-l1-05',
  position: ['CDM'],
  difficulty: 1,
  category: 'transition',
  tacticalPrinciple: 'Transition Speed — First Action After Win',
  title: 'ניצחנו בכדור — מה ראשון?',
  question: 'יירטת מסירה של היריב במרכז המגרש. שחקן שלנו רץ בצד שמאל לחלל פתוח. אבל יריב קרוב לחץ עליך מיד. מה הצעד הראשון שלך?',
  timerSeconds: 7,
  initialPositions: {
    ball: { top: '54%', left: '50%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '76%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '76%', left: '60%', facing: 0 },
      { id: 'gk', role: 'GK', top: '92%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '40%', left: '12%', facing: 0 },
      { id: 'rb', role: 'RB', top: '68%', left: '88%', facing: 315 },
      { id: 'dm', role: 'DM', top: '54%', left: '50%', isYou: true, facing: 0 },
      { id: 'cm1', role: 'CM', top: '46%', left: '35%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '50%', left: '64%', facing: 0 },
      { id: 'lw', role: 'LW', top: '30%', left: '14%', facing: 0 },
      { id: 'rw', role: 'RW', top: '36%', left: '85%', facing: 0 },
      { id: 'st', role: 'ST', top: '24%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '36%', left: '50%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '46%', left: '52%', facing: 180 },
      { id: 'rw', role: 'RW', top: '48%', left: '24%', facing: 90 },
      { id: 'lw', role: 'LW', top: '48%', left: '75%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '54%', left: '60%', facing: 90 },
      { id: 'cm2', role: 'CM', top: '50%', left: '38%', facing: 180 },
      { id: 'dm', role: 'DM', top: '40%', left: '50%', facing: 180 },
      { id: 'lb', role: 'LB', top: '28%', left: '18%', facing: 180 },
      { id: 'rb', role: 'RB', top: '28%', left: '82%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '18%', left: '40%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: 'לשלוח מסירה מהירה לשחקן הרץ בשמאל.',
      isCorrect: true,
      feedback: 'מעולה! מעבר מהגנה להתקפה ב-1 מגע. השחקן הרץ מקבל במרחב, הצוות מתקדם, ואתה עברת מיד לאחר ניצחון בכדור — כמו פאביניו.',
      principleExplained: 'Transition Speed: מיד אחרי ניצחון בכדור — 1 מגע לאחד הפתוח. ה-CDM שמשחק מהר מ-CDM שמשחק בטוח.'
    },
    {
      id: 'b',
      text: 'לשלוט בכדור ולהרים ראש כדי לבחור.',
      isCorrect: false,
      feedback: 'עם יריב 2 מטר ממך, שנייה אחת של "הרמת ראש" = לחץ מיידי ואובדן כדור.',
      principleExplained: 'CDM צריך לדעת לאן לשלוח לפני שהוא מקבל. Scanning לפני הקבלה — לא אחריה.'
    },
    {
      id: 'c',
      text: 'לדרבל קדימה כדי לקנות שטח.',
      isCorrect: false,
      feedback: 'CDM שמדרבל קדימה מחשיף את עצמו לאובדן בעמדה מסוכנת — וסוגר את האופציה של השחקן הרץ.',
      principleExplained: 'CDM לא דורבל — CDM מסדר. זרוק לפתוח ועבור לעמדה.'
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Quick transition!',
    from: { top: '54%', left: '50%' },
    to: { top: '30%', left: '14%' }
  }
};
cdm_l1_s5.preRollPositions = generatePreRoll(cdm_l1_s5.initialPositions, { top: 5, left: -3 }, {}, {});


// ============================================================
//  EXPORT: Organized by Position → Level → Scenarios
// ============================================================
export const scenariosByPosition = {
  CB: [
    {
      levelName: 'יסודות ההגנה',
      levelDescription: 'בנייה מאחור, השהייה, קו הגנה ותקשורת',
      scenarios: [cb_l1_s1, cb_l1_s2, cb_l1_s3, cb_l1_s4, cb_l1_s5]
    },
    {
      levelName: 'לחץ והגנה מתקדמת',
      levelDescription: 'כיסוי כשה-DM יוצא, תיאום שוער, 1 על 1, לחץ גבוה וסט-פיס',
      scenarios: [cb_l2_s1, cb_l2_s2, cb_l2_s3, cb_l2_s4, cb_l2_s5]
    }
  ],
  CM: [
    {
      levelName: 'יסודות הקישור',
      levelDescription: 'כיוון גוף, שחקן שלישי, החלפת אגף ולחיצה',
      scenarios: [cm_l1_s1, cm_l1_s2, cm_l1_s3, cm_l1_s4, cm_l1_s5]
    },
    {
      levelName: 'קישור מתקדם',
      levelDescription: 'גגנפרסינג, דרבל פרוגרסיבי, לחץ כפול, החלפת צד ותמיכה בזוויות',
      scenarios: [cm_l2_s1, cm_l2_s2, cm_l2_s3, cm_l2_s4, cm_l2_s5]
    }
  ],
  ST: [
    {
      levelName: 'יסודות ההתקפה',
      levelDescription: 'ריצות כתף, Hold vs Run, Cover Shadow ותנועה חכמה',
      scenarios: [st_l1_s1, st_l1_s2, st_l1_s3, st_l1_s4, st_l1_s5]
    },
    {
      levelName: 'חלוץ מתקדם',
      levelDescription: '1 על 1 עם שוער, לחיצה חכמה, Hold-Up, ריצה תזמונית וקו נבדל',
      scenarios: [st_l2_s1, st_l2_s2, st_l2_s3, st_l2_s4, st_l2_s5]
    }
  ],
  CDM: [
    {
      levelName: 'יסודות הקשר האחורי',
      levelDescription: 'סינון קווי מסירה, עיכוב, קבלת כדור, כיסוי בלם ומעבר מהיר',
      scenarios: [cdm_l1_s1, cdm_l1_s2, cdm_l1_s3, cdm_l1_s4, cdm_l1_s5]
    }
  ]
};

// Helper to get scenarios for a position and level
export const getScenariosForLevel = (positionId, levelIndex) => {
  const posLevels = scenariosByPosition[positionId];
  if (!posLevels || !posLevels[levelIndex]) return null;
  return posLevels[levelIndex];
};

export const getLevelCount = (positionId) => {
  return scenariosByPosition[positionId]?.length || 0;
};

// Legacy export for backward compatibility
export const worlds = [
  {
    id: 1,
    title: "יסודות ההגנה 🛡️",
    description: "תרחישי בלימה, מעברים, והשהייה קריטית",
    scenarios: [cb_l1_s1, cb_l1_s2, cb_l1_s3]
  },
  {
    id: 2,
    title: "ניהול משחק מהקישור 🧠",
    description: "בניית מהלכים, חמיקה מלחץ ויצירת יתרון",
    scenarios: [cm_l1_s1, cm_l1_s2, cm_l1_s3]
  },
  {
    id: 3,
    title: "הקסם בשליש האחרון ⚔️",
    description: "ריצות, תנועה חכמה והגעה לסיום",
    scenarios: [st_l1_s1, st_l1_s2, st_l1_s3]
  }
];
