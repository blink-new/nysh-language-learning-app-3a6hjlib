export interface Question {
  id: string;
  type: 'multiple-choice' | 'translation' | 'listening' | 'sentence-building' | 'audio-match' | 'alphabet-sound';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  audio?: string;
  audioUrl?: string;
  words?: string[]; // For sentence building
  correctOrder?: number[]; // For sentence building
  letter?: string; // For alphabet lessons
  sound?: string; // For alphabet lessons
}

export interface StoryContent {
  title: string;
  text: string;
  translation?: string;
  audioText: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'alphabet' | 'regular' | 'story' | 'grammar' | 'culture';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  description?: string;
  story?: StoryContent; // For story lessons
  questions: Question[];
  culturalNote?: string;
}

export const lessonData: { [key: string]: Lesson } = {
  '1': {
    id: '1',
    title: 'Persian Alphabet - Part 1 (ا to ت)',
    type: 'alphabet',
    level: 'A1',
    description: 'Learn the first 6 letters of the Persian alphabet and their sounds',
    questions: [
      {
        id: '1',
        type: 'alphabet-sound',
        question: 'This is the letter "ا" (Alef). It makes the "a" sound like in "father".',
        letter: 'ا',
        sound: 'a',
        correctAnswer: 'a',
        explanation: 'ا (Alef) is the first letter of the Persian alphabet and makes the "a" sound.',
        options: ['a', 'e', 'i', 'o']
      },
      {
        id: '2',
        type: 'alphabet-sound',
        question: 'This is the letter "ب" (Be). It makes the "b" sound like in "book".',
        letter: 'ب',
        sound: 'b',
        correctAnswer: 'b',
        explanation: 'ب (Be) makes the "b" sound, just like in English.',
        options: ['b', 'p', 'd', 't']
      },
      {
        id: '3',
        type: 'alphabet-sound',
        question: 'This is the letter "پ" (Pe). It makes the "p" sound like in "pen".',
        letter: 'پ',
        sound: 'p',
        correctAnswer: 'p',
        explanation: 'پ (Pe) is unique to Persian and makes the "p" sound.',
        options: ['b', 'p', 'f', 'v']
      },
      {
        id: '4',
        type: 'alphabet-sound',
        question: 'This is the letter "ت" (Te). It makes the "t" sound like in "top".',
        letter: 'ت',
        sound: 't',
        correctAnswer: 't',
        explanation: 'ت (Te) makes the "t" sound.',
        options: ['t', 'd', 's', 'z']
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'Which letter makes the "p" sound?',
        options: ['ب', 'پ', 'ت', 'ا'],
        correctAnswer: 'پ',
        explanation: 'پ (Pe) is the letter that makes the "p" sound in Persian.'
      },
      {
        id: '6',
        type: 'multiple-choice',
        question: 'Which letter comes first in the Persian alphabet?',
        options: ['ب', 'ت', 'ا', 'پ'],
        correctAnswer: 'ا',
        explanation: 'ا (Alef) is the first letter of the Persian alphabet.'
      }
    ],
    culturalNote: 'Persian is written from right to left, and letters connect to each other in most cases. The alphabet has 32 letters!'
  },

  '2': {
    id: '2',
    title: 'Persian Alphabet - Part 2 (ث to ح)',
    type: 'alphabet',
    level: 'A1',
    description: 'Continue learning the Persian alphabet with the next set of letters',
    questions: [
      {
        id: '1',
        type: 'alphabet-sound',
        question: 'This is the letter "ث" (Se). It makes the "s" sound like in "sun".',
        letter: 'ث',
        sound: 's',
        correctAnswer: 's',
        explanation: 'ث (Se) makes the "s" sound in Persian.',
        options: ['s', 'z', 'sh', 'th']
      },
      {
        id: '2',
        type: 'alphabet-sound',
        question: 'This is the letter "ج" (Jim). It makes the "j" sound like in "jump".',
        letter: 'ج',
        sound: 'j',
        correctAnswer: 'j',
        explanation: 'ج (Jim) makes the "j" sound.',
        options: ['j', 'ch', 'g', 'k']
      },
      {
        id: '3',
        type: 'alphabet-sound',
        question: 'This is the letter "چ" (Che). It makes the "ch" sound like in "chair".',
        letter: 'چ',
        sound: 'ch',
        correctAnswer: 'ch',
        explanation: 'چ (Che) is unique to Persian and makes the "ch" sound.',
        options: ['j', 'ch', 'sh', 'zh']
      },
      {
        id: '4',
        type: 'alphabet-sound',
        question: 'This is the letter "ح" (He). It makes a soft "h" sound.',
        letter: 'ح',
        sound: 'h',
        correctAnswer: 'h',
        explanation: 'ح (He) makes a soft "h" sound from the throat.',
        options: ['h', 'kh', 'gh', 'a']
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'Which letter makes the "ch" sound?',
        options: ['ج', 'چ', 'ح', 'ث'],
        correctAnswer: 'چ',
        explanation: 'چ (Che) makes the "ch" sound and is unique to Persian.'
      },
      {
        id: '6',
        type: 'multiple-choice',
        question: 'How many letters are in the complete Persian alphabet?',
        options: ['26', '28', '32', '36'],
        correctAnswer: '32',
        explanation: 'The Persian alphabet has 32 letters in total.'
      }
    ],
    culturalNote: 'Some Persian letters like چ (che) and پ (pe) don\'t exist in Arabic, making Persian unique!'
  },

  '3': {
    id: '3',
    title: 'Basic Greetings',
    type: 'regular',
    level: 'A1',
    description: 'Learn essential greetings in Farsi',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Farsi?',
        options: ['سلام', 'خداحافظ', 'ممنون', 'بله'],
        correctAnswer: 'سلام',
        explanation: 'سلام (salaam) is the most common way to say hello in Farsi!'
      },
      {
        id: '2',
        type: 'audio-match',
        question: 'Listen and select the correct greeting:',
        options: ['صبح بخیر', 'شب بخیر', 'ظهر بخیر', 'عصر بخیر'],
        correctAnswer: 'صبح بخیر',
        explanation: 'صبح بخیر (sobh bekheir) means "good morning" in Farsi.'
      },
      {
        id: '3',
        type: 'sentence-building',
        question: 'Build the sentence: "Good morning, how are you?"',
        words: ['صبح', 'بخیر', 'حال', 'شما', 'چطور', 'است'],
        correctOrder: [0, 1, 4, 2, 3, 5],
        correctAnswer: 'صبح بخیر، حال شما چطور است؟',
        explanation: 'This is a polite way to greet someone in the morning.'
      },
      {
        id: '4',
        type: 'multiple-choice',
        question: 'What does "خداحافظ" mean?',
        options: ['Hello', 'Thank you', 'Goodbye', 'Please'],
        correctAnswer: 'Goodbye',
        explanation: 'خداحافظ (khodahafez) means "goodbye" - literally "God protect you".'
      },
      {
        id: '5',
        type: 'translation',
        question: 'How do you say "Thank you" in Farsi?',
        options: ['ممنون', 'خواهش می‌کنم', 'ببخشید', 'سلام'],
        correctAnswer: 'ممنون',
        explanation: 'ممنون (mamnoon) is the most common way to say thank you.'
      }
    ],
    culturalNote: 'In Persian culture, greetings are very important and show respect. Always greet elders first!'
  },

  '4': {
    id: '4',
    title: 'The Tale of Rostam',
    type: 'story',
    level: 'A1',
    description: 'A simplified version of the famous Persian hero story',
    story: {
      title: 'رستم قهرمان',
      text: 'رستم قهرمان بزرگ ایران بود. او خیلی قوی و شجاع بود. رستم اسب زیبایی داشت به نام رخش. رخش اسب باهوش و وفاداری بود. رستم و رخش با هم ماجراهای زیادی داشتند. آنها همیشه مردم را کمک می‌کردند.',
      translation: 'Rostam was a great hero of Iran. He was very strong and brave. Rostam had a beautiful horse named Rakhsh. Rakhsh was a smart and loyal horse. Rostam and Rakhsh had many adventures together. They always helped people.',
      audioText: 'رستم قهرمان بزرگ ایران بود. او خیلی قوی و شجاع بود.'
    },
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'Rostam was a famous Persian...',
        options: ['hero', 'king', 'poet', 'merchant'],
        correctAnswer: 'hero',
        explanation: 'رستم (Rostam) is the greatest hero in Persian mythology from the Shahnameh.'
      },
      {
        id: '2',
        type: 'sentence-building',
        question: 'Build: "Rostam was very strong"',
        words: ['رستم', 'خیلی', 'قوی', 'بود'],
        correctOrder: [0, 1, 2, 3],
        correctAnswer: 'رستم خیلی قوی بود',
        explanation: 'This describes Rostam\'s legendary strength.'
      },
      {
        id: '3',
        type: 'multiple-choice',
        question: 'What was the name of Rostam\'s horse?',
        options: ['Rakhsh', 'Shabdiz', 'Gol-par', 'Samand'],
        correctAnswer: 'Rakhsh',
        explanation: 'رخش (Rakhsh) was Rostam\'s legendary horse, known for its intelligence and loyalty.'
      },
      {
        id: '4',
        type: 'translation',
        question: 'What does "قهرمان" mean?',
        options: ['Hero', 'Horse', 'Story', 'Strong'],
        correctAnswer: 'Hero',
        explanation: 'قهرمان (ghahraman) means hero in Farsi.'
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'According to the story, what did Rostam and Rakhsh always do?',
        options: ['Help people', 'Fight wars', 'Travel alone', 'Sleep'],
        correctAnswer: 'Help people',
        explanation: 'The story says they always helped people (همیشه مردم را کمک می‌کردند).'
      }
    ],
    culturalNote: 'The Shahnameh (Book of Kings) by Ferdowsi is Iran\'s national epic, containing stories like Rostam that every Persian child knows.'
  },

  '5': {
    id: '5',
    title: 'Present Tense Verbs',
    type: 'grammar',
    level: 'A1',
    description: 'Master the present tense in Farsi',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'How do you say "I am" in Farsi?',
        options: ['من هستم', 'تو هستی', 'او است', 'ما هستیم'],
        correctAnswer: 'من هستم',
        explanation: 'من هستم (man hastam) means "I am" in Farsi.'
      },
      {
        id: '2',
        type: 'sentence-building',
        question: 'Build: "You are happy"',
        words: ['تو', 'خوشحال', 'هستی'],
        correctOrder: [0, 2, 1],
        correctAnswer: 'تو هستی خوشحال',
        explanation: 'In Farsi, the verb usually comes before the adjective.'
      },
      {
        id: '3',
        type: 'translation',
        question: 'Complete: "She is..." = "او ..."',
        options: ['است', 'هستم', 'هستی', 'هستند'],
        correctAnswer: 'است',
        explanation: 'او است (oo ast) means "she/he is" in Farsi.'
      },
      {
        id: '4',
        type: 'multiple-choice',
        question: 'What is the present tense of "to go" for "I"?',
        options: ['می‌روم', 'می‌روی', 'می‌رود', 'می‌رویم'],
        correctAnswer: 'می‌روم',
        explanation: 'می‌روم (miram) means "I go" in present tense.'
      },
      {
        id: '5',
        type: 'audio-match',
        question: 'Listen to "We are":',
        options: ['ما هستیم', 'شما هستید', 'آنها هستند', 'من هستم'],
        correctAnswer: 'ما هستیم',
        explanation: 'ما هستیم (ma hastim) means "we are".'
      }
    ],
    culturalNote: 'Farsi verbs change their endings based on who is doing the action, similar to Spanish or French.'
  },

  '6': {
    id: '6',
    title: 'Persian New Year Story',
    type: 'story',
    level: 'A2',
    description: 'Learn about Nowruz, the Persian New Year celebration',
    story: {
      title: 'نوروز - سال نو ایرانی',
      text: 'نوروز بزرگترین جشن ایرانی است. نوروز در اولین روز بهار جشن گرفته می‌شود. خانواده‌ها دور هم جمع می‌شوند و هفت سین می‌چینند. هفت سین میزی است با هفت چیز که با حرف "س" شروع می‌شود. مردم لباس نو می‌پوشند و به دیدار یکدیگر می‌روند. نوروز سیزده روز طول می‌کشد.',
      translation: 'Nowruz is the biggest Iranian celebration. Nowruz is celebrated on the first day of spring. Families gather together and set up Haft-Sin. Haft-Sin is a table with seven things that start with the letter "S". People wear new clothes and visit each other. Nowruz lasts thirteen days.',
      audioText: 'نوروز بزرگترین جشن ایرانی است. نوروز در اولین روز بهار جشن گرفته می‌شود.'
    },
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'When is Persian New Year celebrated?',
        options: ['Spring equinox', 'January 1st', 'Summer solstice', 'Winter solstice'],
        correctAnswer: 'Spring equinox',
        explanation: 'نوروز (Nowruz) is celebrated on the spring equinox, around March 20th.'
      },
      {
        id: '2',
        type: 'sentence-building',
        question: 'Build: "Happy New Year"',
        words: ['نوروز', 'مبارک', 'سال', 'نو'],
        correctOrder: [2, 3, 1],
        correctAnswer: 'سال نو مبارک',
        explanation: 'سال نو مبارک is how you wish someone a happy new year.'
      },
      {
        id: '3',
        type: 'translation',
        question: 'What does "هفت سین" mean?',
        options: ['Seven S\'s', 'New Year', 'Spring', 'Family'],
        correctAnswer: 'Seven S\'s',
        explanation: 'هفت سین (Haft-Sin) is the traditional table setting with seven items starting with "س".'
      },
      {
        id: '4',
        type: 'multiple-choice',
        question: 'How long does Nowruz celebration last?',
        options: ['13 days', '7 days', '3 days', '1 day'],
        correctAnswer: '13 days',
        explanation: 'Nowruz celebrations last 13 days, ending with Sizdeh Bedar (13th day outdoors).'
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'According to the story, what do families do during Nowruz?',
        options: ['Gather together and set up Haft-Sin', 'Go to work', 'Stay alone', 'Sleep all day'],
        correctAnswer: 'Gather together and set up Haft-Sin',
        explanation: 'The story mentions families gather and set up Haft-Sin (خانواده‌ها دور هم جمع می‌شوند و هفت سین می‌چینند).'
      }
    ],
    culturalNote: 'Nowruz is over 3,000 years old and is celebrated by over 300 million people worldwide, not just in Iran!'
  },

  '7': {
    id: '7',
    title: 'Family and Relationships',
    type: 'regular',
    level: 'A1',
    description: 'Learn family terms and relationships',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'How do you say "mother" in Farsi?',
        options: ['مادر', 'پدر', 'برادر', 'خواهر'],
        correctAnswer: 'مادر',
        explanation: 'مادر (madar) means mother. Also commonly called مامان (maman).'
      },
      {
        id: '2',
        type: 'sentence-building',
        question: 'Build: "My father is kind"',
        words: ['پدر', 'من', 'مهربان', 'است'],
        correctOrder: [1, 0, 2, 3],
        correctAnswer: 'پدر من مهربان است',
        explanation: 'In Farsi, possessive pronouns come after the noun.'
      },
      {
        id: '3',
        type: 'audio-match',
        question: 'Listen to the word for "brother":',
        options: ['برادر', 'خواهر', 'پسر', 'دختر'],
        correctAnswer: 'برادر',
        explanation: 'برادر (baradar) means brother.'
      },
      {
        id: '4',
        type: 'translation',
        question: 'What does "خانواده" mean?',
        options: ['Family', 'House', 'Love', 'Children'],
        correctAnswer: 'Family',
        explanation: 'خانواده (khanevadeh) means family.'
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'How do you say "grandmother"?',
        options: ['مادربزرگ', 'پدربزرگ', 'عمو', 'خاله'],
        correctAnswer: 'مادربزرگ',
        explanation: 'مادربزرگ (madar bozorg) literally means "big mother".'
      }
    ],
    culturalNote: 'Persian families are typically very close-knit. Extended family relationships are very important in Iranian culture.'
  },

  '8': {
    id: '8',
    title: 'The Legend of Simorgh',
    type: 'story',
    level: 'A2',
    description: 'Learn about the mythical Persian bird through this ancient tale',
    story: {
      title: 'افسانه سیمرغ',
      text: 'سیمرغ پرنده‌ای افسانه‌ای در فرهنگ ایرانی است. سیمرغ بر قله کوه قاف زندگی می‌کند. این پرنده بزرگ و زیبا است و پرهای رنگارنگ دارد. سیمرغ خیلی حکیم و مهربان است. او به مسافران گمشده کمک می‌کند و حیوانات بیمار را شفا می‌دهد. سیمرغ نماد حکمت و خیر است.',
      translation: 'Simorgh is a mythical bird in Iranian culture. Simorgh lives on the peak of Mount Qaf. This bird is large and beautiful and has colorful feathers. Simorgh is very wise and kind. It helps lost travelers and heals sick animals. Simorgh is a symbol of wisdom and goodness.',
      audioText: 'سیمرغ پرنده‌ای افسانه‌ای در فرهنگ ایرانی است. سیمرغ بر قله کوه قاف زندگی می‌کند.'
    },
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'What is Simorgh in Persian mythology?',
        options: ['A magical bird', 'A brave warrior', 'A wise king', 'A beautiful princess'],
        correctAnswer: 'A magical bird',
        explanation: 'سیمرغ (Simorgh) is a legendary bird in Persian mythology, known for its wisdom and healing powers.'
      },
      {
        id: '2',
        type: 'sentence-building',
        question: 'Build: "The bird has beautiful feathers"',
        words: ['پرنده', 'پرهای', 'زیبا', 'دارد'],
        correctOrder: [0, 1, 2, 3],
        correctAnswer: 'پرنده پرهای زیبا دارد',
        explanation: 'This describes the Simorgh\'s magnificent appearance.'
      },
      {
        id: '3',
        type: 'translation',
        question: 'What does "حکیم" mean?',
        options: ['Wise', 'Strong', 'Fast', 'Beautiful'],
        correctAnswer: 'Wise',
        explanation: 'حکیم (hakim) means wise or sage, describing the Simorgh\'s wisdom.'
      },
      {
        id: '4',
        type: 'multiple-choice',
        question: 'Where does Simorgh live according to the story?',
        options: ['Mount Qaf', 'The sea', 'The forest', 'The desert'],
        correctAnswer: 'Mount Qaf',
        explanation: 'The story says Simorgh lives on Mount Qaf (بر قله کوه قاف زندگی می‌کند).'
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'According to the story, what does Simorgh symbolize?',
        options: ['Wisdom and goodness', 'War and conflict', 'Sadness and fear', 'Money and power'],
        correctAnswer: 'Wisdom and goodness',
        explanation: 'The story says Simorgh is a symbol of wisdom and goodness (نماد حکمت و خیر است).'
      }
    ],
    culturalNote: 'The Simorgh appears in many Persian stories and represents divine wisdom. It\'s often depicted in Persian art and carpets.'
  },

  '9': {
    id: '9',
    title: 'Colors and Descriptions',
    type: 'regular',
    level: 'A1',
    description: 'Learn colors and basic descriptive words in Farsi',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'How do you say "red" in Farsi?',
        options: ['قرمز', 'آبی', 'زرد', 'سبز'],
        correctAnswer: 'قرمز',
        explanation: 'قرمز (ghermez) means red in Farsi.'
      },
      {
        id: '2',
        type: 'sentence-building',
        question: 'Build: "The sky is blue"',
        words: ['آسمان', 'آبی', 'است'],
        correctOrder: [0, 1, 2],
        correctAnswer: 'آسمان آبی است',
        explanation: 'This describes the color of the sky.'
      },
      {
        id: '3',
        type: 'audio-match',
        question: 'Listen to the word for "green":',
        options: ['سبز', 'زرد', 'نارنجی', 'بنفش'],
        correctAnswer: 'سبز',
        explanation: 'سبز (sabz) means green.'
      },
      {
        id: '4',
        type: 'translation',
        question: 'What does "بزرگ" mean?',
        options: ['Big', 'Small', 'Fast', 'Slow'],
        correctAnswer: 'Big',
        explanation: 'بزرگ (bozorg) means big or large.'
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'How do you say "beautiful"?',
        options: ['زیبا', 'زشت', 'بزرگ', 'کوچک'],
        correctAnswer: 'زیبا',
        explanation: 'زیبا (ziba) means beautiful.'
      }
    ],
    culturalNote: 'Colors have special meanings in Persian culture. Green represents nature and Islam, red symbolizes bravery, and white represents purity.'
  },

  '10': {
    id: '10',
    title: 'Persian Tea Culture',
    type: 'culture',
    level: 'A2',
    description: 'Discover the rich tradition of tea drinking in Persian culture',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'What is the Persian word for tea?',
        options: ['چای', 'قهوه', 'آب', 'شیر'],
        correctAnswer: 'چای',
        explanation: 'چای (chai) is the Persian word for tea, borrowed from Chinese.'
      },
      {
        id: '2',
        type: 'sentence-building',
        question: 'Build: "Would you like tea?"',
        words: ['چای', 'می‌خواهید', 'شما'],
        correctOrder: [2, 0, 1],
        correctAnswer: 'شما چای می‌خواهید',
        explanation: 'This is a polite way to offer tea to someone.'
      },
      {
        id: '3',
        type: 'translation',
        question: 'What does "استکان" mean?',
        options: ['Tea glass', 'Sugar', 'Spoon', 'Tray'],
        correctAnswer: 'Tea glass',
        explanation: 'استکان (estekan) is the traditional small glass used for drinking tea.'
      },
      {
        id: '4',
        type: 'multiple-choice',
        question: 'In Persian culture, tea is often served with...',
        options: ['Dates and sweets', 'Bread only', 'Nothing', 'Coffee'],
        correctAnswer: 'Dates and sweets',
        explanation: 'Persian tea is traditionally served with dates, sweets, and sometimes nuts.'
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'When do Persians typically drink tea?',
        options: ['Only morning', 'Only evening', 'Throughout the day', 'Only with meals'],
        correctAnswer: 'Throughout the day',
        explanation: 'Tea is consumed throughout the day in Persian culture, especially after meals.'
      }
    ],
    culturalNote: 'Tea culture in Iran is deeply rooted in hospitality. Refusing tea when offered can be considered impolite. The tea ceremony is a social ritual that brings people together.'
  }
};

export const getLesson = (id: string): Lesson | null => {
  return lessonData[id] || null;
};

export const getAllLessons = (): Lesson[] => {
  return Object.values(lessonData);
};