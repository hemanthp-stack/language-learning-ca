// Language Data Central Aggregator and Helper Functions

import { LANGUAGES, CATEGORIES } from './languages';
import { spanishData } from './spanishData';
import { frenchData } from './frenchData';
import { germanData } from './germanData';
import { japaneseData } from './japaneseData';
import { teluguData } from './teluguData';

export const LANGUAGE_DATA_MAP = {
  spanish: spanishData,
  french: frenchData,
  german: germanData,
  japanese: japaneseData,
  telugu: teluguData
};

export { LANGUAGES, CATEGORIES };

/**
 * Get full data set for a given language
 */
export const getLanguageData = (langId) => {
  return LANGUAGE_DATA_MAP[langId] || spanishData;
};

/**
 * Get all words/items for a language
 */
export const getAllLanguageItems = (langId) => {
  const data = getLanguageData(langId);
  return data.items || [];
};

/**
 * Get items filtered by category
 */
export const getItemsByCategory = (langId, categoryId) => {
  const items = getAllLanguageItems(langId);
  if (!categoryId || categoryId === 'all') return items;
  return items.filter((item) => item.category === categoryId);
};

/**
 * Get today's featured lesson for a language
 */
export const getTodaysLesson = (langId) => {
  const data = getLanguageData(langId);
  const lessons = data.lessons || [];
  // Use day of the year or default to first
  const dayIndex = new Date().getDate() % (lessons.length || 1);
  return lessons[dayIndex] || lessons[0];
};

/**
 * Generate randomized multiple choice quiz questions
 * @param {string} langId
 * @param {number} count - number of questions (e.g. 5 or 10)
 * @param {string} categoryId - 'all' or specific category
 * @param {string} mode - 'standard' (word -> meaning) | 'reverse' (meaning -> word) | 'listening'
 */
export const generateQuiz = (langId, count = 5, categoryId = 'all', mode = 'standard') => {
  let pool = getItemsByCategory(langId, categoryId);
  if (pool.length < 4) {
    // If category has few items, fallback to all
    pool = getAllLanguageItems(langId);
  }

  // Shuffle pool
  const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
  const selectedItems = shuffledPool.slice(0, Math.min(count, shuffledPool.length));

  const questions = selectedItems.map((targetItem, index) => {
    // Distractors
    const otherItems = pool.filter((item) => item.id !== targetItem.id);
    const shuffledOthers = [...otherItems].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 3);

    // Determine question type (standard, reverse, or listening)
    let qType = mode;
    if (mode === 'mixed') {
      const types = ['standard', 'reverse', 'listening'];
      qType = types[index % types.length];
    }

    if (qType === 'listening') {
      const options = [targetItem.meaning, ...distractors.map((d) => d.meaning)].sort(() => 0.5 - Math.random());
      return {
        id: `q_${index}_${targetItem.id}`,
        type: 'listening',
        item: targetItem,
        prompt: 'Listen to the audio and choose the correct English translation:',
        displayWord: '🔊 Listen to Audio',
        audioText: targetItem.word,
        correctAnswer: targetItem.meaning,
        options,
        phonetic: targetItem.phonetic,
        explanation: `"${targetItem.word}" (${targetItem.phonetic}) means "${targetItem.meaning}".`
      };
    } else if (qType === 'reverse') {
      const options = [targetItem.word, ...distractors.map((d) => d.word)].sort(() => 0.5 - Math.random());
      return {
        id: `q_${index}_${targetItem.id}`,
        type: 'reverse',
        item: targetItem,
        prompt: `Select the correct translation for "${targetItem.meaning}":`,
        displayWord: targetItem.meaning,
        audioText: targetItem.word,
        correctAnswer: targetItem.word,
        options,
        phonetic: targetItem.phonetic,
        explanation: `"${targetItem.meaning}" translates to "${targetItem.word}" (${targetItem.phonetic}).`
      };
    } else {
      // Standard target language -> English
      const options = [targetItem.meaning, ...distractors.map((d) => d.meaning)].sort(() => 0.5 - Math.random());
      return {
        id: `q_${index}_${targetItem.id}`,
        type: 'standard',
        item: targetItem,
        prompt: `What does this word mean in English?`,
        displayWord: targetItem.word,
        audioText: targetItem.word,
        correctAnswer: targetItem.meaning,
        options,
        phonetic: targetItem.phonetic,
        explanation: `"${targetItem.word}" (${targetItem.phonetic}) translates to "${targetItem.meaning}".`
      };
    }
  });

  return questions;
};
