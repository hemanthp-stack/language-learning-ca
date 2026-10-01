// LocalStorage management for LinguaLearn app

const STORAGE_KEYS = {
  SELECTED_LANGUAGE: 'lingualearn_selected_language',
  LEARNED_WORDS: 'lingualearn_learned_words',
  PRACTICE_WORDS: 'lingualearn_practice_words',
  QUIZ_HISTORY: 'lingualearn_quiz_history',
  COMPLETED_LESSONS: 'lingualearn_completed_lessons',
  STREAK_DATA: 'lingualearn_streak_data',
  USER_PROFILE: 'lingualearn_user_profile',
  THEME_MODE: 'lingualearn_theme'
};

/**
 * Safely get an item from localStorage with a fallback
 */
export const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`Error reading key ${key} from localStorage:`, error);
    return fallback;
  }
};

/**
 * Safely save an item to localStorage
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing key ${key} to localStorage:`, error);
  }
};

/**
 * Get selected language, defaults to 'spanish'
 */
export const getSavedLanguage = () => {
  return getStorageItem(STORAGE_KEYS.SELECTED_LANGUAGE, 'spanish');
};

export const setSavedLanguage = (lang) => {
  setStorageItem(STORAGE_KEYS.SELECTED_LANGUAGE, lang);
};

/**
 * Learned words per language: { spanish: ['es_1', 'es_2'], ... }
 */
export const getLearnedWords = () => {
  return getStorageItem(STORAGE_KEYS.LEARNED_WORDS, {
    spanish: [],
    french: [],
    german: [],
    japanese: [],
    telugu: []
  });
};

export const setLearnedWords = (data) => {
  setStorageItem(STORAGE_KEYS.LEARNED_WORDS, data);
};

/**
 * Practice words per language: { spanish: ['es_3'], ... }
 */
export const getPracticeWords = () => {
  return getStorageItem(STORAGE_KEYS.PRACTICE_WORDS, {
    spanish: [],
    french: [],
    german: [],
    japanese: [],
    telugu: []
  });
};

export const setPracticeWords = (data) => {
  setStorageItem(STORAGE_KEYS.PRACTICE_WORDS, data);
};

/**
 * Quiz history: list of past quiz results
 */
export const getQuizHistory = () => {
  return getStorageItem(STORAGE_KEYS.QUIZ_HISTORY, []);
};

export const saveQuizResult = (result) => {
  const history = getQuizHistory();
  const updated = [result, ...history].slice(0, 50); // Keep last 50
  setStorageItem(STORAGE_KEYS.QUIZ_HISTORY, updated);
  return updated;
};

/**
 * Completed lessons per language: { spanish: ['lesson_1'], ... }
 */
export const getCompletedLessons = () => {
  return getStorageItem(STORAGE_KEYS.COMPLETED_LESSONS, {
    spanish: ['es_lesson_1'], // Initial default for demo feel
    french: [],
    german: [],
    japanese: [],
    telugu: []
  });
};

export const setCompletedLessons = (data) => {
  setStorageItem(STORAGE_KEYS.COMPLETED_LESSONS, data);
};

/**
 * Streak tracking: tracks consecutive days practiced
 */
export const getStreakData = () => {
  const defaultStreak = {
    count: 3, // Starter streak for realistic demo presentation
    lastActiveDate: new Date().toISOString().split('T')[0],
    history: [new Date().toISOString().split('T')[0]]
  };
  return getStorageItem(STORAGE_KEYS.STREAK_DATA, defaultStreak);
};

export const updateStreakOnActivity = () => {
  const current = getStreakData();
  const today = new Date().toISOString().split('T')[0];
  
  if (!current.lastActiveDate) {
    const updated = { count: 1, lastActiveDate: today, history: [today] };
    setStorageItem(STORAGE_KEYS.STREAK_DATA, updated);
    return updated;
  }

  if (current.lastActiveDate === today) {
    // Already logged activity today
    return current;
  }

  const lastDate = new Date(current.lastActiveDate);
  const nowDate = new Date(today);
  const diffTime = nowDate - lastDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let newCount = current.count;
  if (diffDays === 1) {
    // Consecutive day
    newCount += 1;
  } else if (diffDays > 1) {
    // Streak broken, reset to 1
    newCount = 1;
  }

  const history = Array.isArray(current.history) ? current.history : [];
  if (!history.includes(today)) {
    history.push(today);
  }

  const updated = {
    count: newCount,
    lastActiveDate: today,
    history: history.slice(-30)
  };

  setStorageItem(STORAGE_KEYS.STREAK_DATA, updated);
  return updated;
};

/**
 * Reset all progress (for fresh testing/demoing)
 */
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};
