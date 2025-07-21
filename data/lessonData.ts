export interface Question {
  id: string;
  type: 'multiple-choice' | 'translation' | 'listening' | 'sentence-building' | 'audio-match';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  audio?: string;
  audioUrl?: string;
  words?: string[]; // For sentence building
  correctOrder?: number[]; // For sentence building
}

export interface Lesson {
  id: string;
  title: string;
  type: 'regular' | 'story' | 'grammar' | 'culture';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  description?: string;
  questions: Question[];
  culturalNote?: string;
}

export const lessonData: { [key: string]: Lesson } = {
  '1': {
    id: '1',
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
        explanation: 'سلام (salaam) is the most common way to say hello in Farsi!',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '2',
        type: 'audio-match',
        question: 'Listen and select the correct greeting:',
        options: ['صبح بخیر', 'شب بخیر', 'ظهر بخیر', 'عصر بخیر'],
        correctAnswer: 'صبح بخیر',
        explanation: 'صبح بخیر (sobh bekheir) means "good morning" in Farsi.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
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
        explanation: 'خداحافظ (khodahafez) means "goodbye" - literally "God protect you".',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '5',
        type: 'translation',
        question: 'How do you say "Thank you" in Farsi?',
        options: ['ممنون', 'خواهش می‌کنم', 'ببخشید', 'سلام'],
        correctAnswer: 'ممنون',
        explanation: 'ممنون (mamnoon) is the most common way to say thank you.'
      },
      {
        id: '6',
        type: 'sentence-building',
        question: 'Build: "Thank you very much"',
        words: ['خیلی', 'ممنون', 'متشکرم'],
        correctOrder: [1, 0],
        correctAnswer: 'ممنون خیلی',
        explanation: 'خیلی ممنون means "thank you very much" in Farsi.'
      },
      {
        id: '7',
        type: 'multiple-choice',
        question: 'Which greeting is used in the evening?',
        options: ['صبح بخیر', 'ظهر بخیر', 'عصر بخیر', 'شب بخیر'],
        correctAnswer: 'عصر بخیر',
        explanation: 'عصر بخیر (asr bekheir) is used in the evening/afternoon.'
      },
      {
        id: '8',
        type: 'audio-match',
        question: 'Listen and identify this farewell:',
        options: ['سلام', 'خداحافظ', 'ممنون', 'ببخشید'],
        correctAnswer: 'خداحافظ',
        explanation: 'خداحافظ is the standard way to say goodbye.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '9',
        type: 'translation',
        question: 'What does "خوش آمدید" mean?',
        options: ['Welcome', 'Goodbye', 'Hello', 'Thank you'],
        correctAnswer: 'Welcome',
        explanation: 'خوش آمدید (khosh amadid) means "welcome" - used to greet guests.'
      },
      {
        id: '10',
        type: 'sentence-building',
        question: 'Build: "You are welcome"',
        words: ['خواهش', 'می‌کنم', 'شما'],
        correctOrder: [0, 1],
        correctAnswer: 'خواهش می‌کنم',
        explanation: 'خواهش می‌کنم is the polite response to "thank you".'
      }
    ],
    culturalNote: 'In Persian culture, greetings are very important and show respect. Always greet elders first!'
  },
  
  '2': {
    id: '2',
    title: 'The Tale of Rostam',
    type: 'story',
    level: 'A1',
    description: 'A simplified version of the famous Persian hero story',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'Rostam was a famous Persian...',
        options: ['hero', 'king', 'poet', 'merchant'],
        correctAnswer: 'hero',
        explanation: 'رستم (Rostam) is the greatest hero in Persian mythology from the Shahnameh.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
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
        type: 'audio-match',
        question: 'Listen to this word meaning "brave":',
        options: ['شجاع', 'ضعیف', 'ترسو', 'آرام'],
        correctAnswer: 'شجاع',
        explanation: 'شجاع (shoja) means brave, a key quality of heroes.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      }
    ],
    culturalNote: 'The Shahnameh (Book of Kings) by Ferdowsi is Iran\'s national epic, containing stories like Rostam that every Persian child knows.'
  },

  '3': {
    id: '3',
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
        explanation: 'من هستم (man hastam) means "I am" in Farsi.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
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
        explanation: 'ما هستیم (ma hastim) means "we are".',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '6',
        type: 'sentence-building',
        question: 'Build: "They are eating"',
        words: ['آنها', 'دارند', 'می‌خورند', 'غذا'],
        correctOrder: [0, 1, 3, 2],
        correctAnswer: 'آنها دارند غذا می‌خورند',
        explanation: 'This is the present continuous tense in Farsi.'
      },
      {
        id: '7',
        type: 'multiple-choice',
        question: 'How do you say "You (plural) are"?',
        options: ['شما هستید', 'تو هستی', 'ما هستیم', 'آنها هستند'],
        correctAnswer: 'شما هستید',
        explanation: 'شما هستید (shoma hastid) is the formal/plural "you are".'
      },
      {
        id: '8',
        type: 'translation',
        question: 'What does "می‌خوانم" mean?',
        options: ['I read', 'I write', 'I speak', 'I listen'],
        correctAnswer: 'I read',
        explanation: 'می‌خوانم (mikhanam) means "I read" in present tense.'
      },
      {
        id: '9',
        type: 'sentence-building',
        question: 'Build: "He is working"',
        words: ['او', 'دارد', 'کار', 'می‌کند'],
        correctOrder: [0, 1, 2, 3],
        correctAnswer: 'او دارد کار می‌کند',
        explanation: 'Present continuous: subject + دارد + object + verb'
      },
      {
        id: '10',
        type: 'multiple-choice',
        question: 'Which verb means "to come"?',
        options: ['آمدن', 'رفتن', 'خوردن', 'نوشتن'],
        correctAnswer: 'آمدن',
        explanation: 'آمدن (amadan) means "to come" in Farsi.'
      }
    ],
    culturalNote: 'Farsi verbs change their endings based on who is doing the action, similar to Spanish or French.'
  },

  '4': {
    id: '4',
    title: 'Persian New Year Story',
    type: 'story',
    level: 'A2',
    description: 'Learn about Nowruz, the Persian New Year celebration',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'When is Persian New Year celebrated?',
        options: ['Spring equinox', 'January 1st', 'Summer solstice', 'Winter solstice'],
        correctAnswer: 'Spring equinox',
        explanation: 'نوروز (Nowruz) is celebrated on the spring equinox, around March 20th.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
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
        type: 'audio-match',
        question: 'Listen to this Nowruz greeting:',
        options: ['نوروز مبارک', 'سلام', 'خداحافظ', 'ممنون'],
        correctAnswer: 'نوروز مبارک',
        explanation: 'نوروز مبارک means "Happy Nowruz".',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'How long does Nowruz celebration last?',
        options: ['13 days', '7 days', '3 days', '1 day'],
        correctAnswer: '13 days',
        explanation: 'Nowruz celebrations last 13 days, ending with Sizdeh Bedar (13th day outdoors).'
      }
    ],
    culturalNote: 'Nowruz is over 3,000 years old and is celebrated by over 300 million people worldwide, not just in Iran!'
  },

  '5': {
    id: '5',
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
        explanation: 'مادر (madar) means mother. Also commonly called مامان (maman).',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
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
        explanation: 'برادر (baradar) means brother.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
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
      },
      {
        id: '6',
        type: 'sentence-building',
        question: 'Build: "I have two sisters"',
        words: ['من', 'دو', 'خواهر', 'دارم'],
        correctOrder: [0, 1, 2, 3],
        correctAnswer: 'من دو خواهر دارم',
        explanation: 'دارم means "I have" in Farsi.'
      },
      {
        id: '7',
        type: 'translation',
        question: 'What is "عمو"?',
        options: ['Uncle (father\'s side)', 'Uncle (mother\'s side)', 'Cousin', 'Nephew'],
        correctAnswer: 'Uncle (father\'s side)',
        explanation: 'عمو (amo) is father\'s brother. Mother\'s brother is دایی (dayi).'
      },
      {
        id: '8',
        type: 'audio-match',
        question: 'Listen to "daughter":',
        options: ['دختر', 'پسر', 'بچه', 'کودک'],
        correctAnswer: 'دختر',
        explanation: 'دختر (dokhtar) means daughter or girl.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '9',
        type: 'multiple-choice',
        question: 'How do you say "my wife"?',
        options: ['همسر من', 'زن من', 'مادر من', 'دوست من'],
        correctAnswer: 'همسر من',
        explanation: 'همسر (hamsar) is the polite term for spouse.'
      },
      {
        id: '10',
        type: 'sentence-building',
        question: 'Build: "Our family is big"',
        words: ['خانواده', 'ما', 'بزرگ', 'است'],
        correctOrder: [0, 1, 2, 3],
        correctAnswer: 'خانواده ما بزرگ است',
        explanation: 'This describes a large family in Farsi.'
      }
    ],
    culturalNote: 'Persian families are typically very close-knit. Extended family relationships are very important in Iranian culture.'
  }
};

export const getLesson = (id: string): Lesson | null => {
  return lessonData[id] || null;
};

export const getAllLessons = (): Lesson[] => {
  return Object.values(lessonData);
};