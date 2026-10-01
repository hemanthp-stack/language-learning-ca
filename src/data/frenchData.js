// French Learning Content (Français)

export const frenchData = {
  items: [
    // --- GREETINGS ---
    {
      id: 'fr_g_1',
      word: 'Bonjour',
      phonetic: 'bohn-ZHOOR',
      meaning: 'Hello / Good morning',
      category: 'greetings',
      example: 'Bonjour, comment allez-vous ?',
      examplePhonetic: 'bohn-ZHOOR, koh-mahn tah-lay VOO?',
      exampleTranslation: 'Hello, how are you?',
      notes: 'The most universal French greeting, used from morning until sunset.'
    },
    {
      id: 'fr_g_2',
      word: 'Bonsoir',
      phonetic: 'bohn-SWAHR',
      meaning: 'Good evening',
      category: 'greetings',
      example: 'Bonsoir madame, bienvenue !',
      examplePhonetic: 'bohn-SWAHR mah-dahm, byehn-veh-NOO!',
      exampleTranslation: 'Good evening madam, welcome!',
      notes: 'Used to say hello when the sun begins to set (around 5-6 PM onwards).'
    },
    {
      id: 'fr_g_3',
      word: 'Bonne nuit',
      phonetic: 'bohn NWEE',
      meaning: 'Good night',
      category: 'greetings',
      example: 'Bonne nuit, dors bien.',
      examplePhonetic: 'bohn NWEE, dohr byehn.',
      exampleTranslation: 'Good night, sleep well.',
      notes: 'Exclusively said when someone is heading to bed or sleeping.'
    },
    {
      id: 'fr_g_4',
      word: 'Salut',
      phonetic: 'sah-LOO',
      meaning: 'Hi / Bye (informal)',
      category: 'greetings',
      example: 'Salut Thomas ! Ça va ?',
      examplePhonetic: 'sah-LOO toh-MAH! sah VAH?',
      exampleTranslation: 'Hi Thomas! How are things?',
      notes: 'Casual and affectionate, works as both "hi" and "bye" among friends.'
    },
    {
      id: 'fr_g_5',
      word: 'S’il vous plaît',
      phonetic: 'seel voo PLEH',
      meaning: 'Please (formal / plural)',
      category: 'greetings',
      example: 'L’addition, s’il vous plaît.',
      examplePhonetic: 'lah-dee-SYOHN, seel voo PLEH.',
      exampleTranslation: 'The bill, please.',
      notes: 'Use "s’il te plaît" when speaking casually to friends or children.'
    },
    {
      id: 'fr_g_6',
      word: 'Merci beaucoup',
      phonetic: 'mehr-SEE boh-KOO',
      meaning: 'Thank you very much',
      category: 'greetings',
      example: 'Merci beaucoup pour votre aide.',
      examplePhonetic: 'mehr-SEE boh-KOO poor VOHT-ruh EHD.',
      exampleTranslation: 'Thank you very much for your help.',
      notes: 'Reply with "De rien" (You’re welcome).'
    },
    {
      id: 'fr_g_7',
      word: 'Au revoir',
      phonetic: 'oh ruh-VWAHR',
      meaning: 'Goodbye',
      category: 'greetings',
      example: 'Au revoir et à la semaine prochaine !',
      examplePhonetic: 'oh ruh-VWAHR ay ah lah seh-MEHN proh-SHEHN!',
      exampleTranslation: 'Goodbye and see you next week!',
      notes: 'Literally means "until we see each other again".'
    },
    {
      id: 'fr_g_8',
      word: 'Comment allez-vous ?',
      phonetic: 'koh-mahn tah-lay VOO',
      meaning: 'How are you? (formal)',
      category: 'greetings',
      example: 'Bonjour docteur, comment allez-vous ?',
      examplePhonetic: 'bohn-ZHOOR dohk-TOOR, koh-mahn tah-lay VOO?',
      exampleTranslation: 'Hello doctor, how are you?',
      notes: 'In casual conversation, French speakers simply ask "Ça va ?".'
    },

    // --- VOCABULARY ---
    {
      id: 'fr_v_1',
      word: 'L’eau',
      phonetic: 'loh',
      meaning: 'Water',
      category: 'vocabulary',
      example: 'Je bois un verre d’eau fraîche.',
      examplePhonetic: 'zhuh bwah oon vehr doh FRESH.',
      exampleTranslation: 'I drink a glass of fresh water.',
      notes: 'Feminine noun contracted with l’ (l’eau).'
    },
    {
      id: 'fr_v_2',
      word: 'La maison',
      phonetic: 'lah meh-ZOHN',
      meaning: 'House / Home',
      category: 'vocabulary',
      example: 'C’est une grande maison blanche.',
      examplePhonetic: 'seh toon grahnd meh-ZOHN blahnsh.',
      exampleTranslation: 'It is a large white house.',
      notes: 'Feminine noun.'
    },
    {
      id: 'fr_v_3',
      word: 'Le livre',
      phonetic: 'luh LEE-vruh',
      meaning: 'Book',
      category: 'vocabulary',
      example: 'Ce livre est passionnant.',
      examplePhonetic: 'suh LEE-vruh eh pah-syoh-NAHN.',
      exampleTranslation: 'This book is thrilling.',
      notes: 'Masculine noun.'
    },
    {
      id: 'fr_v_4',
      word: 'La nourriture',
      phonetic: 'lah noo-ree-TOOR',
      meaning: 'Food',
      category: 'vocabulary',
      example: 'La cuisine française est célèbre.',
      examplePhonetic: 'lah kwee-ZEEN frahn-SEHZ eh seh-LEH-bruh.',
      exampleTranslation: 'French cuisine is famous.',
      notes: 'General word for food; "le repas" means the meal.'
    },
    {
      id: 'fr_v_5',
      word: 'L’ami',
      phonetic: 'lah-MEE',
      meaning: 'Friend',
      category: 'vocabulary',
      example: 'Pierre est un bon ami.',
      examplePhonetic: 'pyehr eh toon bohn ah-MEE.',
      exampleTranslation: 'Pierre is a good friend.',
      notes: 'Feminine form is "l’amie" (pronounced identically).'
    },
    {
      id: 'fr_v_6',
      word: 'Le temps',
      phonetic: 'luh tahn',
      meaning: 'Time / Weather',
      category: 'vocabulary',
      example: 'Quel beau temps aujourd’hui !',
      examplePhonetic: 'kehl boh tahn oh-zhoor-DWEE!',
      exampleTranslation: 'What beautiful weather today!',
      notes: 'The letters "p" and "s" at the end are silent.'
    },
    {
      id: 'fr_v_7',
      word: 'Le chien',
      phonetic: 'luh SHYEHN',
      meaning: 'Dog',
      category: 'vocabulary',
      example: 'Le chien court dans le jardin.',
      examplePhonetic: 'luh SHYEHN koor dahn luh zhar-DEHN.',
      exampleTranslation: 'The dog runs in the garden.',
      notes: 'Feminine is "la chienne".'
    },
    {
      id: 'fr_v_8',
      word: 'Le chat',
      phonetic: 'luh shah',
      meaning: 'Cat',
      category: 'vocabulary',
      example: 'Le chat blanc dort sur le lit.',
      examplePhonetic: 'luh shah blahn dohr soor luh lee.',
      exampleTranslation: 'The white cat sleeps on the bed.',
      notes: 'Final "t" is silent.'
    },
    {
      id: 'fr_v_9',
      word: 'La ville',
      phonetic: 'lah VEEL',
      meaning: 'City / Town',
      category: 'vocabulary',
      example: 'Paris est une ville magnifique.',
      examplePhonetic: 'pah-REE eh toon VEEL mah-nyee-FEEK.',
      exampleTranslation: 'Paris is a magnificent city.',
      notes: 'Notice double "ll" is pronounced like "l", not like "y".'
    },

    // --- COMMON PHRASES ---
    {
      id: 'fr_p_1',
      word: 'Je m’appelle...',
      phonetic: 'zhuh mah-PEHL...',
      meaning: 'My name is...',
      category: 'phrases',
      example: 'Je m’appelle Sophie et je suis étudiante.',
      examplePhonetic: 'zhuh mah-PEHL soh-FEE ay zhuh swee zay-too-DYAHNT.',
      exampleTranslation: 'My name is Sophie and I am a student.',
      notes: 'Literally means "I call myself...".'
    },
    {
      id: 'fr_p_2',
      word: 'Enchanté(e)',
      phonetic: 'ahn-shahn-TAY',
      meaning: 'Nice to meet you',
      category: 'phrases',
      example: 'Enchanté de faire votre connaissance.',
      examplePhonetic: 'ahn-shahn-TAY duh fehr VOHT-ruh koh-neh-SAHNS.',
      exampleTranslation: 'Delighted to meet you.',
      notes: 'Spelled "enchantée" when written by a woman, but sounds the same.'
    },
    {
      id: 'fr_p_3',
      word: 'Je ne comprends pas',
      phonetic: 'zhuh nuh kohm-PRAHN pah',
      meaning: 'I don’t understand',
      category: 'phrases',
      example: 'Pardon, je ne comprends pas le français.',
      examplePhonetic: 'pahr-DOHN, zhuh nuh kohm-PRAHN pah luh frahn-SEH.',
      exampleTranslation: 'Pardon, I don’t understand French.',
      notes: 'In casual spoken French, the "ne" is often omitted ("Je comprends pas").'
    },
    {
      id: 'fr_p_4',
      word: 'Où sont les toilettes ?',
      phonetic: 'oo sohn lay twah-LEHT',
      meaning: 'Where is the restroom?',
      category: 'phrases',
      example: 'Excusez-moi, où sont les toilettes ?',
      examplePhonetic: 'ex-koo-zay MWAH, oo sohn lay twah-LEHT?',
      exampleTranslation: 'Excuse me, where are the restrooms?',
      notes: 'Always plural in French ("les toilettes").'
    },
    {
      id: 'fr_p_5',
      word: 'Combien ça coûte ?',
      phonetic: 'kohm-BYEHN sah KOOT',
      meaning: 'How much does it cost?',
      category: 'phrases',
      example: 'C’est très joli, combien ça coûte ?',
      examplePhonetic: 'seh treh zhoh-LEE, kohm-BYEHN sah KOOT?',
      exampleTranslation: 'It’s very pretty, how much does it cost?',
      notes: 'Essential for shops, markets, and cafés.'
    },
    {
      id: 'fr_p_6',
      word: 'Je voudrais...',
      phonetic: 'zhuh voo-DREH',
      meaning: 'I would like...',
      category: 'phrases',
      example: 'Je voudrais un croissant et un café, s’il vous plaît.',
      examplePhonetic: 'zhuh voo-DREH oon krwah-SAHN ay oon kah-FEH, seel voo PLEH.',
      exampleTranslation: 'I would like a croissant and a coffee, please.',
      notes: 'The conditional tense of "vouloir", making requests polite.'
    },

    // --- NUMBERS ---
    {
      id: 'fr_n_1',
      word: 'Un',
      phonetic: 'uhn',
      meaning: 'One (1)',
      category: 'numbers',
      example: 'Un café pour la table deux.',
      examplePhonetic: 'oon kah-FEH poor lah TAH-bluh duh.',
      exampleTranslation: 'One coffee for table two.',
      notes: 'Feminine form is "une".'
    },
    {
      id: 'fr_n_2',
      word: 'Deux',
      phonetic: 'duh',
      meaning: 'Two (2)',
      category: 'numbers',
      example: 'Nous sommes deux personnes.',
      examplePhonetic: 'noo suhm duh pehr-SOHN.',
      exampleTranslation: 'We are two people.',
      notes: 'The "x" is silent unless followed by a vowel.'
    },
    {
      id: 'fr_n_3',
      word: 'Trois',
      phonetic: 'trwah',
      meaning: 'Three (3)',
      category: 'numbers',
      example: 'Trois croissants au beurre.',
      examplePhonetic: 'trwah krwah-SAHN oh BOOR.',
      exampleTranslation: 'Three butter croissants.',
      notes: 'The "s" is silent.'
    },
    {
      id: 'fr_n_4',
      word: 'Quatre',
      phonetic: 'KAH-truh',
      meaning: 'Four (4)',
      category: 'numbers',
      example: 'Les quatre saisons de l’année.',
      examplePhonetic: 'lay KAH-truh say-ZOHN duh lah-NAY.',
      exampleTranslation: 'The four seasons of the year.',
      notes: 'In rapid speech, sounds like "kat".'
    },
    {
      id: 'fr_n_5',
      word: 'Cinq',
      phonetic: 'sank',
      meaning: 'Five (5)',
      category: 'numbers',
      example: 'Il est cinq heures.',
      examplePhonetic: 'eel eh sank ZUR.',
      exampleTranslation: 'It is five o’clock.',
      notes: 'The "q" is sounded like "k".'
    },
    {
      id: 'fr_n_6',
      word: 'Dix',
      phonetic: 'dees',
      meaning: 'Ten (10)',
      category: 'numbers',
      example: 'Dix euros pour le taxi.',
      examplePhonetic: 'dees uh-ROH poor luh tahk-SEE.',
      exampleTranslation: 'Ten euros for the taxi.',
      notes: 'Final "x" sounds like "s" on its own.'
    },
    {
      id: 'fr_n_7',
      word: 'Cent',
      phonetic: 'sahn',
      meaning: 'One hundred (100)',
      category: 'numbers',
      example: 'Cent pour cent naturel.',
      examplePhonetic: 'sahn poor sahn nah-too-REHL.',
      exampleTranslation: 'One hundred percent natural.',
      notes: 'Takes an "s" in the plural (deux cents) unless followed by another number.'
    },

    // --- GRAMMAR ---
    {
      id: 'fr_gr_1',
      word: 'Articles définis (Le / La / Les)',
      phonetic: 'luh / lah / lay',
      meaning: 'Definite articles (The)',
      category: 'grammar',
      example: 'Le garçon, la fille, les enfants.',
      examplePhonetic: 'luh gahr-SOHN, lah FEE-yuh, lay zahn-FAHN.',
      exampleTranslation: 'The boy, the girl, the children.',
      notes: 'Becomes l’ before vowels (l’orange, l’école).'
    },
    {
      id: 'fr_gr_2',
      word: 'Le verbe Être (To Be)',
      phonetic: 'luh vehrb EH-truh',
      meaning: 'Verb "Être" conjugations',
      category: 'grammar',
      example: 'Je suis, tu es, il/elle est, nous sommes.',
      examplePhonetic: 'zhuh swee, too eh, eel eh, noo suhm.',
      exampleTranslation: 'I am, you are, he/she is, we are.',
      notes: 'The most foundational auxiliary verb in French.'
    },
    {
      id: 'fr_gr_3',
      word: 'La négation (Ne... pas)',
      phonetic: 'lah nay-gah-SYOHN nuh... pah',
      meaning: 'Negation formula',
      category: 'grammar',
      example: 'Je ne sais pas. Il n’aime pas.',
      examplePhonetic: 'zhuh nuh say pah. eel nehm pah.',
      exampleTranslation: 'I do not know. He does not like.',
      notes: 'Wraps around the conjugated verb like a sandwich: subject + ne + verb + pas.'
    }
  ],

  lessons: [
    {
      id: 'fr_lesson_1',
      title: 'Level 1: Essential French Greetings',
      description: 'Master polite phrases, greeting customs, and saying goodbye in Paris style.',
      level: 'Beginner',
      duration: '4 mins',
      itemIds: ['fr_g_1', 'fr_g_4', 'fr_g_5', 'fr_g_6', 'fr_g_7'],
      miniQuiz: [
        {
          question: 'What is the standard French greeting for "Hello"?',
          options: ['Bonjour', 'Au revoir', 'S’il vous plaît', 'Merci'],
          answer: 'Bonjour',
          explanation: '"Bonjour" means hello or good morning.'
        },
        {
          question: 'How do you say "Thank you very much" in French?',
          options: ['Merci beaucoup', 'Enchanté', 'Bonne nuit', 'Salut'],
          answer: 'Merci beaucoup',
          explanation: '"Merci beaucoup" translates to "Thank you very much".'
        },
        {
          question: 'Which word means "Goodbye"?',
          options: ['Au revoir', 'Salut', 'Bonjour', 'Bienvenue'],
          answer: 'Au revoir',
          explanation: '"Au revoir" is the French phrase for goodbye.'
        }
      ]
    },
    {
      id: 'fr_lesson_2',
      title: 'Level 2: French Everyday Vocabulary',
      description: 'Build your vocabulary foundation with common items, animals, and surroundings.',
      level: 'Elementary',
      duration: '5 mins',
      itemIds: ['fr_v_1', 'fr_v_2', 'fr_v_3', 'fr_v_7', 'fr_v_8', 'fr_v_9'],
      miniQuiz: [
        {
          question: 'What does "La maison" mean?',
          options: ['The car', 'The house', 'The book', 'The friend'],
          answer: 'The house',
          explanation: '"La maison" means house or home in French.'
        },
        {
          question: 'Which word is "The dog" in French?',
          options: ['Le chat', 'Le chien', 'L’eau', 'La ville'],
          answer: 'Le chien',
          explanation: '"Le chien" is the dog, whereas "Le chat" is the cat.'
        },
        {
          question: 'What is "L’eau"?',
          options: ['Wine', 'Water', 'Bread', 'Coffee'],
          answer: 'Water',
          explanation: '"L’eau" translates to water in French.'
        }
      ]
    },
    {
      id: 'fr_lesson_3',
      title: 'Level 3: Numbers in French (1 to 100)',
      description: 'Learn French counting to navigate menus, prices, and phone numbers easily.',
      level: 'Beginner',
      duration: '4 mins',
      itemIds: ['fr_n_1', 'fr_n_2', 'fr_n_3', 'fr_n_4', 'fr_n_5', 'fr_n_6', 'fr_n_7'],
      miniQuiz: [
        {
          question: 'What number is "Trois"?',
          options: ['2', '3', '4', '5'],
          answer: '3',
          explanation: '"Trois" means 3 in French.'
        },
        {
          question: 'How do you say "Five" in French?',
          options: ['Cinq', 'Dix', 'Un', 'Cent'],
          answer: 'Cinq',
          explanation: '"Cinq" is the French number 5.'
        },
        {
          question: 'What does "Cent" stand for?',
          options: ['10', '50', '100', '1000'],
          answer: '100',
          explanation: '"Cent" means one hundred in French.'
        }
      ]
    },
    {
      id: 'fr_lesson_4',
      title: 'Level 4: Ordering at a Café & Travel Phrases',
      description: 'Sound like a local when visiting a French café, restaurant, or boutique.',
      level: 'Intermediate',
      duration: '5 mins',
      itemIds: ['fr_p_1', 'fr_p_3', 'fr_p_4', 'fr_p_5', 'fr_p_6'],
      miniQuiz: [
        {
          question: 'How do you politely say "I would like..." in French?',
          options: ['Je voudrais...', 'Je m’appelle...', 'Au revoir...', 'Merci...'],
          answer: 'Je voudrais...',
          explanation: '"Je voudrais" is the polite formula for "I would like".'
        },
        {
          question: 'How do you ask for the restroom location in French?',
          options: ['Où sont les toilettes ?', 'Combien ça coûte ?', 'Comment allez-vous ?', 'Je ne comprends pas'],
          answer: 'Où sont les toilettes ?',
          explanation: '"Où sont les toilettes ?" means "Where is the restroom?".'
        },
        {
          question: 'What does "Combien ça coûte ?" mean?',
          options: ['How much does it cost?', 'What is your name?', 'Where are you going?', 'What time is it?'],
          answer: 'How much does it cost?',
          explanation: '"Combien ça coûte ?" asks "How much does it cost?".'
        }
      ]
    }
  ]
};
