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
  },

  '6': {
    id: '6',
    title: 'The Legend of Simorgh',
    type: 'story',
    level: 'A2',
    description: 'Learn about the mythical Persian bird through this ancient tale',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'What is Simorgh in Persian mythology?',
        options: ['A magical bird', 'A brave warrior', 'A wise king', 'A beautiful princess'],
        correctAnswer: 'A magical bird',
        explanation: 'سیمرغ (Simorgh) is a legendary bird in Persian mythology, known for its wisdom and healing powers.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
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
        type: 'audio-match',
        question: 'Listen to the word for "mountain":',
        options: ['کوه', 'دریا', 'جنگل', 'صحرا'],
        correctAnswer: 'کوه',
        explanation: 'کوه (kuh) means mountain, where the Simorgh lives.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'In the story, Simorgh helps...',
        options: ['Lost travelers', 'Sick animals', 'Both travelers and animals', 'Only kings'],
        correctAnswer: 'Both travelers and animals',
        explanation: 'The Simorgh is known for helping all creatures with its healing powers and wisdom.'
      }
    ],
    culturalNote: 'The Simorgh appears in many Persian stories and represents divine wisdom. It\'s often depicted in Persian art and carpets.'
  },

  '7': {
    id: '7',
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
        explanation: 'چای (chai) is the Persian word for tea, borrowed from Chinese.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
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
        type: 'audio-match',
        question: 'Listen to "sugar cube":',
        options: ['قند', 'شکر', 'عسل', 'شیرینی'],
        correctAnswer: 'قند',
        explanation: 'قند (ghand) refers to sugar cubes traditionally served with tea.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'In Persian culture, tea is often served with...',
        options: ['Dates and sweets', 'Bread only', 'Nothing', 'Coffee'],
        correctAnswer: 'Dates and sweets',
        explanation: 'Persian tea is traditionally served with dates, sweets, and sometimes nuts.'
      },
      {
        id: '6',
        type: 'sentence-building',
        question: 'Build: "Tea is very hot"',
        words: ['چای', 'خیلی', 'داغ', 'است'],
        correctOrder: [0, 1, 2, 3],
        correctAnswer: 'چای خیلی داغ است',
        explanation: 'Persian tea is traditionally served very hot.'
      },
      {
        id: '7',
        type: 'translation',
        question: 'What is "سماور"?',
        options: ['Traditional tea maker', 'Tea cup', 'Sugar bowl', 'Tea spoon'],
        correctAnswer: 'Traditional tea maker',
        explanation: 'سماور (samovar) is the traditional Russian-style tea maker used in Iran.'
      },
      {
        id: '8',
        type: 'multiple-choice',
        question: 'When do Persians typically drink tea?',
        options: ['Only morning', 'Only evening', 'Throughout the day', 'Only with meals'],
        correctAnswer: 'Throughout the day',
        explanation: 'Tea is consumed throughout the day in Persian culture, especially after meals.'
      },
      {
        id: '9',
        type: 'audio-match',
        question: 'Listen to "guest":',
        options: ['مهمان', 'میزبان', 'دوست', 'همسایه'],
        correctAnswer: 'مهمان',
        explanation: 'مهمان (mehman) means guest. Offering tea to guests is essential in Persian hospitality.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '10',
        type: 'sentence-building',
        question: 'Build: "Welcome, please have tea"',
        words: ['خوش', 'آمدید', 'چای', 'بفرمایید'],
        correctOrder: [0, 1, 2, 3],
        correctAnswer: 'خوش آمدید، چای بفرمایید',
        explanation: 'This is a traditional Persian welcome with tea offering.'
      }
    ],
    culturalNote: 'Tea culture in Iran is deeply rooted in hospitality. Refusing tea when offered can be considered impolite. The tea ceremony is a social ritual that brings people together.'
  },

  '8': {
    id: '8',
    title: 'The Story of Yalda Night',
    type: 'story',
    level: 'A2',
    description: 'Learn about the longest night of the year celebration in Persian culture',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'When is Yalda Night celebrated?',
        options: ['Winter solstice', 'Summer solstice', 'Spring equinox', 'Fall equinox'],
        correctAnswer: 'Winter solstice',
        explanation: 'شب یلدا (Shab-e Yalda) is celebrated on the winter solstice, the longest night of the year.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '2',
        type: 'sentence-building',
        question: 'Build: "Tonight is very long"',
        words: ['امشب', 'خیلی', 'طولانی', 'است'],
        correctOrder: [0, 1, 2, 3],
        correctAnswer: 'امشب خیلی طولانی است',
        explanation: 'This describes the longest night of the year.'
      },
      {
        id: '3',
        type: 'translation',
        question: 'What fruit is traditionally eaten on Yalda?',
        options: ['Watermelon', 'Apple', 'Orange', 'Banana'],
        correctAnswer: 'Watermelon',
        explanation: 'هندوانه (hendovaneh) - watermelon is eaten to symbolize summer and warmth.'
      },
      {
        id: '4',
        type: 'audio-match',
        question: 'Listen to "pomegranate":',
        options: ['انار', 'سیب', 'پرتقال', 'موز'],
        correctAnswer: 'انار',
        explanation: 'انار (anar) - pomegranate represents the red color of dawn and life.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'What do families do on Yalda Night?',
        options: ['Stay awake together', 'Sleep early', 'Work late', 'Travel'],
        correctAnswer: 'Stay awake together',
        explanation: 'Families gather and stay awake to welcome the return of longer days.'
      }
    ],
    culturalNote: 'Yalda Night celebrates the victory of light over darkness. Families read poetry, especially Hafez, and share stories while eating fruits and nuts.'
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
        explanation: 'قرمز (ghermez) means red in Farsi.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
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
        explanation: 'سبز (sabz) means green.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
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
      },
      {
        id: '6',
        type: 'sentence-building',
        question: 'Build: "The flower is yellow"',
        words: ['گل', 'زرد', 'است'],
        correctOrder: [0, 1, 2],
        correctAnswer: 'گل زرد است',
        explanation: 'This describes a yellow flower.'
      },
      {
        id: '7',
        type: 'translation',
        question: 'What is the opposite of "بزرگ"?',
        options: ['کوچک', 'زیبا', 'سریع', 'آهسته'],
        correctAnswer: 'کوچک',
        explanation: 'کوچک (kuchak) means small, opposite of big.'
      },
      {
        id: '8',
        type: 'audio-match',
        question: 'Listen to "white":',
        options: ['سفید', 'سیاه', 'خاکستری', 'قهوه‌ای'],
        correctAnswer: 'سفید',
        explanation: 'سفید (sefid) means white.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '9',
        type: 'multiple-choice',
        question: 'How do you say "old" (for things)?',
        options: ['کهنه', 'جدید', 'تازه', 'نو'],
        correctAnswer: 'کهنه',
        explanation: 'کهنه (kohaneh) means old for objects.'
      },
      {
        id: '10',
        type: 'sentence-building',
        question: 'Build: "This car is new"',
        words: ['این', 'ماشین', 'نو', 'است'],
        correctOrder: [0, 1, 2, 3],
        correctAnswer: 'این ماشین نو است',
        explanation: 'نو (no) means new.'
      }
    ],
    culturalNote: 'Colors have special meanings in Persian culture. Green represents nature and Islam, red symbolizes bravery, and white represents purity.'
  },

  '10': {
    id: '10',
    title: 'The Wise Mulla Nasruddin',
    type: 'story',
    level: 'A2',
    description: 'Learn from the humorous and wise tales of Mulla Nasruddin',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'Who is Mulla Nasruddin?',
        options: ['A wise fool character', 'A real historical king', 'A famous poet', 'A brave warrior'],
        correctAnswer: 'A wise fool character',
        explanation: 'ملا نصرالدین (Mulla Nasruddin) is a beloved character in Persian folklore known for his wisdom disguised as foolishness.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '2',
        type: 'sentence-building',
        question: 'Build: "The man is very clever"',
        words: ['مرد', 'خیلی', 'باهوش', 'است'],
        correctOrder: [0, 1, 2, 3],
        correctAnswer: 'مرد خیلی باهوش است',
        explanation: 'باهوش (bahush) means clever or intelligent.'
      },
      {
        id: '3',
        type: 'translation',
        question: 'What does "حکایت" mean?',
        options: ['Story/tale', 'Book', 'Poem', 'Song'],
        correctAnswer: 'Story/tale',
        explanation: 'حکایت (hekayat) means story or tale, often with a moral lesson.'
      },
      {
        id: '4',
        type: 'audio-match',
        question: 'Listen to "wisdom":',
        options: ['حکمت', 'احمقی', 'شادی', 'غم'],
        correctAnswer: 'حکمت',
        explanation: 'حکمت (hekmat) means wisdom.',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'Nasruddin stories teach us...',
        options: ['Life lessons through humor', 'How to be rich', 'How to fight', 'How to cook'],
        correctAnswer: 'Life lessons through humor',
        explanation: 'Nasruddin stories use humor to teach profound life lessons and wisdom.'
      }
    ],
    culturalNote: 'Mulla Nasruddin stories are shared across many cultures from Turkey to Central Asia. They teach wisdom through humor and are beloved by children and adults alike.'
  }
};

export const getLesson = (id: string): Lesson | null => {
  return lessonData[id] || null;
};

export const getAllLessons = (): Lesson[] => {
  return Object.values(lessonData);
};