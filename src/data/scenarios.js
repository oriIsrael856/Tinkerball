// Helper function to create pre-roll by tweaking initial positions
// This moves the ball from a specific offset and slightly shifts pressing opponents
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

const defTransition = {
  id: 3,
  title: "מעבר להגנה (Defensive Transition)",
  question: "איבדתם כדור הרגע. אתה קשר התקפי (CAM). היריב מסודר למתפרצת והבלמים שלך גבוהים. מיקומך קרוב מאד למוביל הכדור. מה עליך לעשות?",
  timerSeconds: 90,
  initialPositions: {
    ball: { top: '35%', left: '50%' },
    teamA: [
      { id: 'cam', role: 'CAM', top: '38%', left: '48%', isYou: true, facing: 330 }, 
      { id: 'cm1', role: 'CM', top: '42%', left: '40%', facing: 350 },
      { id: 'cm2', role: 'CM', top: '45%', left: '60%', facing: 10 },
      { id: 'rw', role: 'RW', top: '30%', left: '85%', facing: 0 },
      { id: 'lw', role: 'LW', top: '28%', left: '12%', facing: 0 },
      { id: 'st', role: 'ST', top: '20%', left: '50%', facing: 0 },
      { id: 'cb1', role: 'CB', top: '65%', left: '40%', facing: 0 },
      { id: 'cb2', role: 'CB', top: '65%', left: '60%', facing: 0 },
      { id: 'lb', role: 'LB', top: '55%', left: '15%', facing: 45 },
      { id: 'rb', role: 'RB', top: '55%', left: '85%', facing: 315 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'dm', role: 'DM', top: '35%', left: '50%', facing: 200 }, 
      { id: 'lw', role: 'LW', top: '25%', left: '15%', facing: 210 }, 
      { id: 'rw', role: 'RW', top: '25%', left: '85%', facing: 150 }, 
      { id: 'cam', role: 'CAM', top: '45%', left: '50%', facing: 180 }, 
      { id: 'st', role: 'ST', top: '40%', left: '70%', facing: 220 }, 
      { id: 'cm', role: 'CM', top: '35%', left: '30%', facing: 160 }, 
      { id: 'lb', role: 'LB', top: '20%', left: '10%', facing: 180 },
      { id: 'rb', role: 'RB', top: '20%', left: '90%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '15%', left: '40%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '15%', left: '60%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: "לסגת חזרה להגנה כדי לעזור לבלמים ולפרק התקפה מאחור.",
      isCorrect: false,
      feedback: "הנסיגה מאפשרת ליריב להרים ראש, לארגן מתפרצת ולשלוח כדור עומק קטלני מול ההגנה הגבוהה שלנו."
    },
    {
      id: 'b',
      text: "להפעיל לחץ מיידי אגרסיבי (Counter-press) על מוביל הכדור.",
      isCorrect: true,
      feedback: "חוק ה-5 שניות - מאחר שאתה קרוב לכדור, הלחץ צריך להיות מופעל מיד עם האיבוד כדי למנוע את המסירה הראשונה ולהרוויח אותו חזרה."
    },
    {
      id: 'c',
      text: "לסגור קו מסירה לאחד משחקני הכנף ולהישאר עומד.",
      isCorrect: false,
      feedback: "לא מספיק אקטיבי. מוביל הכדור פנוי לארגן התקפה ולכדרר לשטחים ריקים."
    }
  ],
  correctArrow: {
    type: 'press',
    label: 'Counter-Press!',
    from: { top: '38%', left: '48%' },
    to: { top: '35%', left: '50%' }
  }
};
defTransition.preRollPositions = generatePreRoll(defTransition.initialPositions, 
  {top: -10, left: 5}, {cam: {top: -5, left: -5}}, {dm: {top: -8, left: 3}}
);

const delayGame = {
  id: 8,
  title: "השהיית מתפרצת (Delaying a Counter)",
  question: "אתה בלם יחיד (CB) אחרון על קו החצי. ליריב מתפרצת של שני תוקפים שמגיעים מהירים אליך.",
  timerSeconds: 90,
  initialPositions: {
    ball: { top: '35%', left: '45%' }, 
    teamB: [
      { id: 'st', role: 'ST', top: '35%', left: '45%', facing: 180 }, 
      { id: 'rw', role: 'RW', top: '30%', left: '70%', facing: 210 }, 
      { id: 'cam', role: 'CAM', top: '20%', left: '50%', facing: 180 }, 
      { id: 'lw', role: 'LW', top: '25%', left: '20%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '15%', left: '40%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '15%', left: '60%', facing: 180 },
      { id: 'dm', role: 'DM', top: '10%', left: '50%', facing: 180 },
      { id: 'cb1', role: 'CB', top: '5%', left: '40%', facing: 180 },
      { id: 'cb2', role: 'CB', top: '5%', left: '60%', facing: 180 },
      { id: 'lb', role: 'LB', top: '10%', left: '20%', facing: 180 },
      { id: 'gk', role: 'GK', top: '2%', left: '50%', facing: 180 } 
    ],
    teamA: [
      { id: 'cb1', role: 'CB', top: '55%', left: '55%', isYou: true, facing: 340 }, 
      { id: 'dm', role: 'DM', top: '22%', left: '47%', facing: 180 }, 
      { id: 'cb2', role: 'CB', top: '17%', left: '37%', facing: 180 }, 
      { id: 'lb', role: 'LB', top: '20%', left: '20%', facing: 130 },
      { id: 'rb', role: 'RB', top: '20%', left: '80%', facing: 240 },
      { id: 'cm1', role: 'CM', top: '10%', left: '30%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '10%', left: '70%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '5%', left: '50%', facing: 180 },
      { id: 'lw', role: 'LW', top: '15%', left: '15%', facing: 130 },
      { id: 'rw', role: 'RW', top: '15%', left: '85%', facing: 230 },
      { id: 'gk', role: 'GK', top: '90%', left: '50%', facing: 0 } 
    ]
  },
  options: [
    {
      id: 'a',
      text: "לזנק על השחקן עם הכדור בתיקול אגרסיבי כדי לגדוע את ההתקפה באבחה אחת.",
      isCorrect: false,
      feedback: "תיקול מול שניים זה הימור גרוע. הוא מתחמק במסירה לחבר, שמוצא חופש בדרך אל השוער."
    },
    {
      id: 'b',
      text: "לעמוד צמוד לקיצוני שרץ מאחוריו כדי לנטרל את אופציית המסירה במלואה.",
      isCorrect: false,
      feedback: "אם תסגור את המוסר הפוטנציאלי, מוביל הכדור פשוט ייקח את השטח עד לשוער, מצב של יתרון ליריב."
    },
    {
      id: 'c',
      text: "לסגת אחורה אט אט לחצאי זווית שסוגרת מסירה פנימית אך קונה זמן (Delay).",
      isCorrect: true,
      feedback: "מושלם! כלי ההגנה האולטימטיבי מול שניים. הנסיגה חוסמת את הבעיטה מהערוץ המרכזי וקונה זמן עד שתגבורת הקשרים תחור חזרה."
    }
  ],
  correctArrow: {
    type: 'move',
    label: 'Delay!',
    from: { top: '55%', left: '55%' },
    to: { top: '65%', left: '50%' }
  }
};
delayGame.preRollPositions = generatePreRoll(delayGame.initialPositions,
  {top: -20, left: 0}, {}, {st: {top: -20, left: 0}, rw: {top: -20, left: 0}}
);

const gameMgmt = {
  id: 10,
  title: "ניהול משחק בדקות סיום (Game Management)",
  question: "דקה 92. תוצאה 1-0 לכם. הכדור משוחק אליך ליד קו הקרן היריב. אין סיוע התקפי איתך אבל 2 מגינים גברתנים בולמים מעבר.",
  timerSeconds: 90,
  initialPositions: {
    ball: { top: '10%', left: '90%' },
    teamA: [
      { id: 'cm1', role: 'CM', top: '10%', left: '90%', isYou: true, facing: 270 }, 
      { id: 'st', role: 'ST', top: '40%', left: '50%', facing: 0 }, 
      { id: 'rw', role: 'RW', top: '45%', left: '70%', facing: 315 },
      { id: 'lw', role: 'LW', top: '45%', left: '30%', facing: 45 },
      { id: 'cam', role: 'CAM', top: '52%', left: '48%', facing: 0 },
      { id: 'cm2', role: 'CM', top: '55%', left: '40%', facing: 0 },
      { id: 'dm', role: 'DM', top: '65%', left: '50%', facing: 0 },
      { id: 'lb', role: 'LB', top: '70%', left: '25%', facing: 45 },
      { id: 'rb', role: 'RB', top: '70%', left: '75%', facing: 315 },
      { id: 'cb1', role: 'CB', top: '80%', left: '50%', facing: 0 },
      { id: 'gk', role: 'GK', top: '95%', left: '50%', facing: 0 }
    ],
    teamB: [
      { id: 'cb1', role: 'CB', top: '15%', left: '80%', facing: 135 }, 
      { id: 'lb', role: 'LB', top: '15%', left: '95%', facing: 120 }, 
      { id: 'cb2', role: 'CB', top: '15%', left: '45%', facing: 180 },
      { id: 'rb', role: 'RB', top: '20%', left: '20%', facing: 180 },
      { id: 'dm', role: 'DM', top: '30%', left: '50%', facing: 180 },
      { id: 'cm1', role: 'CM', top: '40%', left: '40%', facing: 180 },
      { id: 'cm2', role: 'CM', top: '40%', left: '60%', facing: 180 },
      { id: 'cam', role: 'CAM', top: '50%', left: '50%', facing: 180 },
      { id: 'lw', role: 'LW', top: '60%', left: '30%', facing: 180 },
      { id: 'rw', role: 'RW', top: '60%', left: '70%', facing: 180 },
      { id: 'gk', role: 'GK', top: '5%', left: '50%', facing: 180 }
    ]
  },
  options: [
    {
      id: 'a',
      text: "להגן על הכדור עם הגב בפינת דגל הקרן כדי לבזבז זמן.",
      isCorrect: true,
      feedback: "ניהול משחק נבון. החזקת כדור פיזית עד לשריקה מנטרלת את הסיכון במלואו."
    },
    {
      id: 'b',
      text: "להרים הכדור לאוויר הרחבה - מתוך אמונה שעזרה תגיע.",
      isCorrect: false,
      feedback: "הגבהה לכתובת לא ידועה, בעיקר לשוער, מזמינה עקיצה כמעט ודאית מנגד."
    },
    {
      id: 'c',
      text: "לחדור בדרבל בין השני המגינים לעבר השער.",
      isCorrect: false,
      feedback: "ביטחון עצמי בלי סיוע משטח מת תוביל לאיבוד שובר גב שנותן התקפה אדירה לשנייה."
    }
  ],
  correctArrow: {
    type: 'hold',
    label: 'Shield Ball!',
    from: { top: '10%', left: '90%' },
    to: { top: '10%', left: '90%' }
  }
};
gameMgmt.preRollPositions = generatePreRoll(gameMgmt.initialPositions, {top: 15, left: -20}, {}, {cb1: {top: 20, left: -20}});

const buildUp = {
  id: 1,
  title: "בניית התקפה תחת לחץ (Build-up)",
  question: "אתה בלם (CB). היריב לוחץ אותך. המגן הפנוי (RB) מבקש כדור באגף, אך יש כנף יריב שיכול לסגור אותו מהר. מה תעשה?",
  timerSeconds: 90,
  initialPositions: {
    ball: { top: '85%', left: '50%' },
    teamA: [
      { id: 'cb1', role: 'CB', top: '85%', left: '50%', isYou: true }, 
      { id: 'cb2', role: 'CB', top: '85%', left: '30%' },
      { id: 'gk', role: 'GK', top: '95%', left: '40%' },
      { id: 'lb', role: 'LB', top: '70%', left: '15%' },
      { id: 'rb', role: 'RB', top: '70%', left: '85%' },
      { id: 'dm', role: 'DM', top: '65%', left: '40%' },
      { id: 'cm1', role: 'CM', top: '55%', left: '30%' },
      { id: 'cm2', role: 'CM', top: '55%', left: '60%' },
      { id: 'lw', role: 'LW', top: '40%', left: '15%' },
      { id: 'rw', role: 'RW', top: '40%', left: '85%' },
      { id: 'st', role: 'ST', top: '35%', left: '50%' }
    ],
    teamB: [
      { id: 'st', role: 'ST', top: '78%', left: '48%' }, 
      { id: 'rw', role: 'RW', top: '60%', left: '25%' }, 
      { id: 'lw', role: 'LW', top: '65%', left: '80%' }, 
      { id: 'cam', role: 'CAM', top: '62%', left: '42%' }, 
      { id: 'cm1', role: 'CM', top: '50%', left: '35%' },
      { id: 'cm2', role: 'CM', top: '50%', left: '65%' },
      { id: 'lb', role: 'LB', top: '35%', left: '15%' },
      { id: 'rb', role: 'RB', top: '35%', left: '85%' },
      { id: 'cb1', role: 'CB', top: '25%', left: '40%' },
      { id: 'cb2', role: 'CB', top: '25%', left: '60%' },
      { id: 'gk', role: 'GK', top: '5%', left: '50%' }
    ]
  },
  options: [
    {
      id: 'a',
      text: "לשלוח כדור באוויר לעבר החלוץ המרכזי.",
      isCorrect: false,
      feedback: "כדור ארוך תחת לחץ יאבד בקלות כנגד צמד בלמים רעננים."
    },
    {
      id: 'b',
      text: "מסירה ישירה למגן שבאגף הימני (RB).",
      isCorrect: false,
      feedback: "מסיעת פיתיון (Pressing trap) שתגרור לחץ מסיבי של הקיצוני."
    },
    {
      id: 'c',
      text: "החלפת צד דרך השטח האחורי במסירה שקטה לשוער (GK).",
      isCorrect: true,
      feedback: "מומלץ על ידי גוורדיולה ודה-זרבי. החלפת משחק דרך שוער משנה את כיוון הלחץ לאזור נקי במגרש."
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Pass to GK',
    from: { top: '85%', left: '50%' },
    to: { top: '95%', left: '40%' }
  }
};
buildUp.preRollPositions = generatePreRoll(buildUp.initialPositions, {top: 10, left: -20}, {}, {st: {top: -15, left: -10}});

const pivotPlay = {
  id: 5,
  title: "קבלת כדור עם הגב (Pivot Play)",
  question: "בלם המסר לך כדור אל בין קווי הלחץ כקשר אחורי (DM). אתה עם הגב למגרש וקשר התקפי נושף בעורפך. הבלם והמגן פתוחים מאחור.",
  timerSeconds: 90,
  initialPositions: {
    ball: { top: '65%', left: '50%' }, 
    teamA: [
      { id: 'dm', role: 'DM', top: '65%', left: '50%', isYou: true }, 
      { id: 'cb1', role: 'CB', top: '80%', left: '35%' }, 
      { id: 'cb2', role: 'CB', top: '80%', left: '65%' },
      { id: 'lb', role: 'LB', top: '60%', left: '15%' },
      { id: 'rb', role: 'RB', top: '60%', left: '85%' },
      { id: 'cm1', role: 'CM', top: '50%', left: '35%' },
      { id: 'cm2', role: 'CM', top: '50%', left: '65%' },
      { id: 'lw', role: 'LW', top: '35%', left: '20%' },
      { id: 'rw', role: 'RW', top: '35%', left: '80%' },
      { id: 'st', role: 'ST', top: '25%', left: '50%' },
      { id: 'gk', role: 'GK', top: '90%', left: '50%' }
    ],
    teamB: [
      { id: 'cam', role: 'CAM', top: '61%', left: '50%' }, 
      { id: 'st', role: 'ST', top: '70%', left: '40%' }, 
      { id: 'lw', role: 'LW', top: '55%', left: '80%' }, 
      { id: 'rw', role: 'RW', top: '55%', left: '20%' }, 
      { id: 'cm1', role: 'CM', top: '45%', left: '40%' },
      { id: 'cm2', role: 'CM', top: '45%', left: '60%' },
      { id: 'lb', role: 'LB', top: '30%', left: '15%' },
      { id: 'rb', role: 'RB', top: '30%', left: '85%' },
      { id: 'cb1', role: 'CB', top: '20%', left: '40%' },
      { id: 'cb2', role: 'CB', top: '20%', left: '60%' },
      { id: 'gk', role: 'GK', top: '5%', left: '50%' }
    ]
  },
  options: [
    {
      id: 'a',
      text: "להסתובב מהר כדי לפרוץ מול השער שלהם.",
      isCorrect: false,
      feedback: "השתלטות וסיבוב אל מול עורק לחץ מובילה לאיבוד וודאי."
    },
    {
      id: 'b',
      text: "להחזיר מסירה בנגיעה (One-touch) לבלם או למגן הפתוח.",
      isCorrect: true,
      feedback: "דינמיקת 'שחקן שלישי'. השחקן שכבר מופנה למגרש זקוק לכדור כדי לנתב אותו קדימה בעקיפות הלחץ."
    },
    {
      id: 'c',
      text: "לשמור על הכדור עם הגוף ולסחוט עבירה.",
      isCorrect: false,
      feedback: "ממית את יתרון מעבר שבירת קווי מגרש. שופטים נותנים פחות קרדיט היום למיגון סרק."
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'One-Touch!',
    from: { top: '65%', left: '50%' },
    to: { top: '80%', left: '35%' }
  }
};
pivotPlay.preRollPositions = generatePreRoll(pivotPlay.initialPositions, {top: 15, left: -15}, {}, {cam: {top: -10, left: 0}});

const highPress = {
  id: 4,
  title: "יציאה ללחץ גבוה (High Press)",
  question: "אתה חלוץ (ST). הבלם מקבל כדור. הבלם השני פנוי. איך ללחוץ נכון את מוביל הכדור?",
  timerSeconds: 90,
  initialPositions: {
    ball: { top: '15%', left: '40%' },
    teamA: [
      { id: 'st', role: 'ST', top: '30%', left: '45%', isYou: true }, 
      { id: 'lw', role: 'LW', top: '35%', left: '25%' },
      { id: 'rw', role: 'RW', top: '35%', left: '75%' },
      { id: 'cam', role: 'CAM', top: '45%', left: '50%' },
      { id: 'cm1', role: 'CM', top: '55%', left: '35%' },
      { id: 'cm2', role: 'CM', top: '55%', left: '65%' },
      { id: 'lb', role: 'LB', top: '65%', left: '20%' },
      { id: 'rb', role: 'RB', top: '65%', left: '80%' },
      { id: 'cb1', role: 'CB', top: '75%', left: '40%' },
      { id: 'cb2', role: 'CB', top: '75%', left: '60%' },
      { id: 'gk', role: 'GK', top: '90%', left: '50%' }
    ],
    teamB: [
      { id: 'cb1', role: 'CB', top: '15%', left: '40%' }, 
      { id: 'cb2', role: 'CB', top: '15%', left: '60%' }, 
      { id: 'lb', role: 'LB', top: '25%', left: '15%' },
      { id: 'rb', role: 'RB', top: '25%', left: '85%' },
      { id: 'dm', role: 'DM', top: '30%', left: '50%' },
      { id: 'cm1', role: 'CM', top: '40%', left: '30%' },
      { id: 'cm2', role: 'CM', top: '40%', left: '70%' },
      { id: 'lw', role: 'LW', top: '60%', left: '15%' },
      { id: 'rw', role: 'RW', top: '60%', left: '85%' },
      { id: 'st', role: 'ST', top: '65%', left: '50%' },
      { id: 'gk', role: 'GK', top: '8%', left: '50%' } 
    ]
  },
  options: [
    {
      id: 'a',
      text: "ספרינט בקו ישר לאיים עליו מיד פיזית.",
      isCorrect: false,
      feedback: "המסירה הפשוטה לבלם השני עוקפת את הלחץ כליל."
    },
    {
      id: 'b',
      text: "ריצה בצורת קשת (Curve) החוסמת בגופך את מסלול הושטת כדור לבלם המקביל.",
      isCorrect: true,
      feedback: "טכניקת Cover Shadow המפורסמת מחסלים אופציה נוחה ומכוונים את היריב ללחץ או חזרה בלתי תכליתית."
    },
    {
      id: 'c',
      text: "היערכות עמידה לקו האמצע והמתנה למהלך שלו.",
      isCorrect: false,
      feedback: "זה נותן ליריב טווח נשימה לשילוט על משחק ולמשוך אליו שחקנים מיותרים באזור שאינו מאוים."
    }
  ],
  correctArrow: {
    type: 'run',
    label: 'Cover Shadow',
    from: { top: '30%', left: '45%' },
    to: { top: '18%', left: '50%' }
  }
};
highPress.preRollPositions = generatePreRoll(highPress.initialPositions, {top: -5, left: 15}, {}, {cb1: {top: -5, left: 10}});

const counterAttack = {
  id: 2,
  title: "התקפה מתפרצת (Counter-Attack)",
  question: "אתה קיצוני ימני (RW). המגן שלך עולה בפריצה תומכת. רק 2 בלמים מרכזיים נותרו. איזה החלטה תייצר יותר מצבים?",
  timerSeconds: 90,
  initialPositions: {
    ball: { top: '45%', left: '85%' },
    teamA: [
      { id: 'rw', role: 'RW', top: '45%', left: '85%', isYou: true }, 
      { id: 'st', role: 'ST', top: '35%', left: '50%' }, 
      { id: 'rb', role: 'RB', top: '55%', left: '90%' }, 
      { id: 'cam', role: 'CAM', top: '50%', left: '60%' },
      { id: 'lw', role: 'LW', top: '50%', left: '20%' },
      { id: 'cm1', role: 'CM', top: '60%', left: '40%' },
      { id: 'cm2', role: 'CM', top: '65%', left: '55%' },
      { id: 'cb1', role: 'CB', top: '80%', left: '40%' },
      { id: 'cb2', role: 'CB', top: '80%', left: '60%' },
      { id: 'lb', role: 'LB', top: '75%', left: '20%' },
      { id: 'gk', role: 'GK', top: '95%', left: '50%' }
    ],
    teamB: [
      { id: 'cb1', role: 'CB', top: '25%', left: '40%' }, 
      { id: 'cb2', role: 'CB', top: '30%', left: '60%' }, 
      { id: 'dm', role: 'DM', top: '50%', left: '45%' }, 
      { id: 'lb', role: 'LB', top: '40%', left: '10%' }, 
      { id: 'rb', role: 'RB', top: '65%', left: '80%' }, 
      { id: 'cm1', role: 'CM', top: '55%', left: '30%' },
      { id: 'cam', role: 'CAM', top: '70%', left: '50%' },
      { id: 'lw', role: 'LW', top: '75%', left: '85%' },
      { id: 'rw', role: 'RW', top: '80%', left: '15%' },
      { id: 'st', role: 'ST', top: '85%', left: '50%' },
      { id: 'gk', role: 'GK', top: '8%', left: '50%' }
    ]
  },
  options: [
    {
      id: 'a',
      text: "לפרוץ ולדרבל לחלק החיצון ולבעוט מסף הרחבה.",
      isCorrect: false,
      feedback: "הוצאה לזווית קשה מקטנת סיכופית של הבקעה. תמיד עדיף לרכז לאמצע."
    },
    {
      id: 'b',
      text: "להטיס כדור רוחב אל הרחבה עבור החלוץ.",
      isCorrect: false,
      feedback: "ליריב 2 בלמים ערוכים. הרמה קלאסית נופלת שם תדיר."
    },
    {
      id: 'c',
      text: "לחתוך שמאלה לאמצע ה-Half Space על מנת למשוך בלם להפקיר את החלוץ.",
      isCorrect: true,
      feedback: "שבירתו הסכיזופרנית של סדר היריב דרך ריכוז ללב הרחבה מותיר לו שבריר לבחור בך או בחלוץ. תוצאת מפתח לכבוש שערים."
    }
  ],
  correctArrow: {
    type: 'dribble',
    label: 'Cut Inside',
    from: { top: '45%', left: '85%' },
    to: { top: '35%', left: '60%' }
  }
};
counterAttack.preRollPositions = generatePreRoll(counterAttack.initialPositions, {top: 15, left: -20}, {}, {cb1: {top: -5, left: -5}});

const patience = {
  id: 6,
  title: "סבלנות בשליש האחרון (Final Third)",
  question: "קצה הרחבה. אתה קשר עליון (CAM). יריב מתאבד עם הגנה כבדה. המגן מעבה בעקיפה מעולה.",
  timerSeconds: 90,
  initialPositions: {
    ball: { top: '30%', left: '45%' },
    teamA: [
      { id: 'cam', role: 'CAM', top: '30%', left: '45%', isYou: true }, 
      { id: 'lb', role: 'LB', top: '25%', left: '15%' }, 
      { id: 'st', role: 'ST', top: '20%', left: '50%' },
      { id: 'rw', role: 'RW', top: '25%', left: '85%' },
      { id: 'cm1', role: 'CM', top: '45%', left: '35%' },
      { id: 'cm2', role: 'CM', top: '45%', left: '60%' },
      { id: 'dm', role: 'DM', top: '55%', left: '50%' },
      { id: 'rb', role: 'RB', top: '50%', left: '85%' },
      { id: 'cb1', role: 'CB', top: '65%', left: '40%' },
      { id: 'cb2', role: 'CB', top: '65%', left: '60%' },
      { id: 'gk', role: 'GK', top: '90%', left: '50%' }
    ],
    teamB: [
      { id: 'cb1', role: 'CB', top: '22%', left: '42%' }, 
      { id: 'cb2', role: 'CB', top: '22%', left: '58%' }, 
      { id: 'rb', role: 'RB', top: '25%', left: '25%' }, 
      { id: 'lb', role: 'LB', top: '25%', left: '75%' }, 
      { id: 'dm1', role: 'DM', top: '35%', left: '40%' }, 
      { id: 'dm2', role: 'DM', top: '35%', left: '55%' },
      { id: 'rm', role: 'RM', top: '45%', left: '20%' },
      { id: 'lm', role: 'LM', top: '45%', left: '80%' },
      { id: 'cam', role: 'CAM', top: '55%', left: '50%' },
      { id: 'st', role: 'ST', top: '60%', left: '50%' },
      { id: 'gk', role: 'GK', top: '8%', left: '50%' }
    ]
  },
  options: [
    {
      id: 'a',
      text: "להיכנס ולהבעיר כבישה אל הכוח של היריבים.",
      isCorrect: false,
      feedback: "האחוזים לפגוע מזעריים משטחים בהם מותקנים חיישני כוח נגדך (כל הבלמים)."
    },
    {
      id: 'b',
      text: "לזכות במסירת השהייה למגן שעוקף.",
      isCorrect: true,
      feedback: "סבלנות מייצרת פריסה: Overlap מאפשר כניסה פנויה שתוליד חדירה לעורקו."
    },
    {
      id: 'c',
      text: "להטיס נגיחה מושלכת מרחבת דריסתם.",
      isCorrect: false,
      feedback: "ליריב שחקני גובה והכרעת הרמות מגישה מים לכך במקום לטרוף משחק חכם."
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Overlap Pass',
    from: { top: '30%', left: '45%' },
    to: { top: '25%', left: '15%' }
  }
};
patience.preRollPositions = generatePreRoll(patience.initialPositions, {top: 10, left: 10}, {lb: {top: 15, left: -5}}, {rb: {top: 0, left: 5}});

const switchPlay = {
  id: 7,
  title: "החלפת אגף לשבירת בידוד (Switch of Play)",
  question: "אתה קשר (CM). ימין מתפקע ממסה בעוד שמאל מתפנה כשאנו נושאים בלם יתום רחוק באופק (LW שלנו ניצב פנוי). מה העמדה?",
  timerSeconds: 90,
  initialPositions: {
    ball: { top: '55%', left: '75%' }, 
    teamA: [
      { id: 'cm', role: 'CM', top: '55%', left: '75%', isYou: true },
      { id: 'rw', role: 'RW', top: '45%', left: '85%' },
      { id: 'rb', role: 'RB', top: '60%', left: '88%' },
      { id: 'cam', role: 'CAM', top: '50%', left: '70%' }, 
      { id: 'lw', role: 'LW', top: '40%', left: '15%' }, 
      { id: 'lb', role: 'LB', top: '65%', left: '20%' },
      { id: 'cm2', role: 'CM', top: '60%', left: '45%' },
      { id: 'cb1', role: 'CB', top: '75%', left: '40%' },
      { id: 'cb2', role: 'CB', top: '75%', left: '60%' },
      { id: 'st', role: 'ST', top: '35%', left: '50%' },
      { id: 'gk', role: 'GK', top: '90%', left: '50%' }
    ],
    teamB: [
      { id: 'lb', role: 'LB', top: '40%', left: '80%' }, 
      { id: 'lm', role: 'LM', top: '50%', left: '70%' },
      { id: 'dm1', role: 'DM', top: '55%', left: '65%' },
      { id: 'cb1', role: 'CB', top: '45%', left: '60%' },
      { id: 'dm2', role: 'DM', top: '65%', left: '75%' },
      { id: 'rb', role: 'RB', top: '35%', left: '25%' }, 
      { id: 'cb2', role: 'CB', top: '40%', left: '45%' },
      { id: 'rm', role: 'RM', top: '60%', left: '30%' },
      { id: 'cam', role: 'CAM', top: '70%', left: '50%' },
      { id: 'st', role: 'ST', top: '80%', left: '50%' },
      { id: 'gk', role: 'GK', top: '8%', left: '50%' }
    ]
  },
  options: [
    {
      id: 'a',
      text: "מסירה מבוקעת של משחקי קווי קצר לריצוף במלל ההמולה מימין.",
      isCorrect: false,
      feedback: "מרחב קצר ומלא המולה הוא מלכודת משנה התקפית קלה להיתפש."
    },
    {
      id: 'b',
      text: "לדקור החלפה לקיצוני הרחוק באגף הנותר מבידוד.",
      isCorrect: true,
      feedback: "Overload to Isolate! איגפנו אותם בצד אחד בכדי לרופף שחקן טריקסטרי עם יכולת כיבוש בצד החשוף לחלוטין."
    },
    {
      id: 'c',
      text: "ספרינט וכדרור לניעוץ החומה מורכבת של המוסד ההגנתי פנימה לשער.",
      isCorrect: false,
      feedback: "השתרשות דריסת שחקנים כשהאגף המקביל מצופה מתנה משמיים תחרץ הפסד קרוב תמיד."
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Switch!',
    from: { top: '55%', left: '75%' },
    to: { top: '40%', left: '15%' }
  }
};
switchPlay.preRollPositions = generatePreRoll(switchPlay.initialPositions, {top: 10, left: 5}, {}, {dm1: {top: 5, left: -5}});

const gkDist = {
  id: 9,
  title: "הוצאת כדור מהירה (GK Distribution)",
  question: "כשוערנו (GK) משימת הבלמת הקרן הושלמה. בזמן היות רובל השחקנים שלנו בחזית, קיצוני אדיר דואה בכנפו ורק שחקן שלהם במחצית הדרך להפציע.",
  timerSeconds: 90,
  initialPositions: {
    ball: { top: '90%', left: '50%' }, 
    teamA: [
      { id: 'gk', role: 'GK', top: '90%', left: '50%', isYou: true }, 
      { id: 'rw', role: 'RW', top: '45%', left: '80%' }, 
      { id: 'cb1', role: 'CB', top: '80%', left: '40%' },
      { id: 'cb2', role: 'CB', top: '80%', left: '60%' },
      { id: 'lb', role: 'LB', top: '85%', left: '30%' },
      { id: 'rb', role: 'RB', top: '85%', left: '70%' },
      { id: 'dm', role: 'DM', top: '75%', left: '50%' },
      { id: 'cm1', role: 'CM', top: '70%', left: '40%' },
      { id: 'cm2', role: 'CM', top: '70%', left: '60%' },
      { id: 'lw', role: 'LW', top: '65%', left: '20%' },
      { id: 'st', role: 'ST', top: '60%', left: '50%' }
    ],
    teamB: [
      { id: 'cb1', role: 'CB', top: '85%', left: '45%' }, 
      { id: 'cb2', role: 'CB', top: '85%', left: '55%' },
      { id: 'st', role: 'ST', top: '88%', left: '40%' },
      { id: 'cm1', role: 'CM', top: '88%', left: '60%' },
      { id: 'cm2', role: 'CM', top: '82%', left: '50%' },
      { id: 'cam', role: 'CAM', top: '80%', left: '35%' },
      { id: 'lw', role: 'LW', top: '75%', left: '45%' },
      { id: 'rw', role: 'RW', top: '75%', left: '55%' },
      { id: 'rb', role: 'RB', top: '70%', left: '65%' },
      { id: 'lb', role: 'LB', top: '40%', left: '20%' }, 
      { id: 'gk', role: 'GK', top: '5%', left: '50%' }
    ]
  },
  options: [
    {
      id: 'a',
      text: "להשליך חיבוק לרצפת הפלדת ולהעיב השהייה.",
      isCorrect: false,
      feedback: "נינוחות אסטרטגית מיותרת פלש למהלך ששווה כל משחק שלם של אימון."
    },
    {
      id: 'b',
      text: "שיגור חי של כדור כיוונית ישרה לקיצוני המפוצל למתרץ חלוציות נגד שערו של הנדיין.",
      isCorrect: true,
      feedback: "יופי של בחירה. השוער המודרני הינו הברומטר של המתפרצות כשהוא יודע לתצפת כדורי פריצה ישיר."
    },
    {
      id: 'c',
      text: "גלגול לבלם המקרי הקוטף בכיכר העגומה ולפספס פריצה.",
      isCorrect: false,
      feedback: "פעולת החמצה שגונזת סולידריות כושר אקוטי לסיום מתפרצת כפוייה לחיסולם."
    }
  ],
  correctArrow: {
    type: 'pass',
    label: 'Launch!',
    from: { top: '90%', left: '50%' },
    to: { top: '45%', left: '80%' }
  }
};
gkDist.preRollPositions = generatePreRoll(gkDist.initialPositions, {top: -5, left: -5}, {rw: {top: 15, left: 0}}, {cb1: {top: -5, left: -5}});

export const worlds = [
  {
    id: 1,
    title: "יסודות ההגנה 🛡️",
    description: "תרחישי בלימה, מעברים, והשהייה קריטית",
    scenarios: [defTransition, delayGame, gameMgmt]
  },
  {
    id: 2,
    title: "ניהול משחק מהקישור 🧠",
    description: "בניית מהלכים, חמיקה מלחץ ויצירת יתרון תחת אש",
    scenarios: [buildUp, pivotPlay, highPress]
  },
  {
    id: 3,
    title: "הקסם בשליש האחרון ⚔️",
    description: "פריצות ימניות עקיפות, משחקי בידוד חזיתי והשגת שערים",
    scenarios: [counterAttack, patience, switchPlay, gkDist]
  }
];
