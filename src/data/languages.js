// Language definitions and metadata for LinguaLearn

export const LANGUAGES = [
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    code: 'es-ES',
    description: 'The second most spoken native language in the world, renowned for vibrant rhythms, art, and literature.',
    speakers: '548 Million',
    difficulty: 'Easy for English speakers',
    color: 'from-amber-500 to-rose-500',
    lightBg: 'bg-amber-50 text-amber-900 border-amber-200',
    accent: '#f59e0b',
    greetingSample: '¡Hola! ¿Cómo estás?'
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    code: 'fr-FR',
    description: 'The language of romance, philosophy, diplomacy, and world-renowned gastronomy across five continents.',
    speakers: '300 Million',
    difficulty: 'Moderate',
    color: 'from-blue-600 to-indigo-600',
    lightBg: 'bg-blue-50 text-blue-900 border-blue-200',
    accent: '#2563eb',
    greetingSample: 'Bonjour! Comment allez-vous?'
  },
  {
    id: 'german',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    code: 'de-DE',
    description: 'The powerhouse language of engineering, science, philosophy, and innovation in Central Europe.',
    speakers: '130 Million',
    difficulty: 'Moderate',
    color: 'from-yellow-500 via-red-500 to-slate-800',
    lightBg: 'bg-yellow-50 text-yellow-900 border-yellow-200',
    accent: '#eab308',
    greetingSample: 'Hallo! Wie geht es dir?'
  },
  {
    id: 'japanese',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    code: 'ja-JP',
    description: 'A fascinating language rich in culture, politeness levels, anime, technology, and poetic expressions.',
    speakers: '125 Million',
    difficulty: 'Challenging & Rewarding',
    color: 'from-rose-500 to-pink-600',
    lightBg: 'bg-rose-50 text-rose-900 border-rose-200',
    accent: '#f43f5e',
    greetingSample: 'こんにちは！お元気ですか？'
  },
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    code: 'te-IN',
    description: 'Celebrated as the "Italian of the East" due to its lyrical vowel endings, rich classical literature, and cinema.',
    speakers: '95 Million',
    difficulty: 'Melodic & Expressive',
    color: 'from-emerald-600 to-teal-700',
    lightBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    accent: '#059669',
    greetingSample: 'నమస్కారం! మీరు ఎలా ఉన్నారు?'
  }
];

export const CATEGORIES = [
  {
    id: 'vocabulary',
    name: 'Vocabulary',
    icon: 'BookOpen',
    description: 'Everyday objects, food, animals, places, and essential words.',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    id: 'phrases',
    name: 'Common Phrases',
    icon: 'MessageSquare',
    description: 'Useful everyday expressions, travel questions, and conversational flow.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  {
    id: 'grammar',
    name: 'Grammar',
    icon: 'Layers',
    description: 'Sentence structures, verb forms, articles, and rules explained simply.',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    id: 'numbers',
    name: 'Numbers',
    icon: 'Hash',
    description: 'Counting, numerals, quantities, prices, and time expressions.',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  {
    id: 'greetings',
    name: 'Greetings',
    icon: 'Smile',
    description: 'Saying hello, polite courtesies, introductions, and farewells.',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200'
  }
];
