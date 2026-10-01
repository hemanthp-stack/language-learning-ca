// React Context for LinguaLearn state management

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  getSavedLanguage,
  setSavedLanguage,
  getLearnedWords,
  setLearnedWords,
  getPracticeWords,
  setPracticeWords,
  getQuizHistory,
  saveQuizResult,
  getCompletedLessons,
  setCompletedLessons,
  getStreakData,
  updateStreakOnActivity,
  clearAllData
} from '../utils/storage';
import { LANGUAGES, getAllLanguageItems, getLanguageData } from '../data';
import { preloadVoices } from '../utils/speech';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [currentLanguageId, setCurrentLanguageId] = useState(getSavedLanguage);
  const [learnedWordsMap, setLearnedWordsMap] = useState(getLearnedWords);
  const [practiceWordsMap, setPracticeWordsMap] = useState(getPracticeWords);
  const [quizHistory, setQuizHistory] = useState(getQuizHistory);
  const [completedLessonsMap, setCompletedLessonsMap] = useState(getCompletedLessons);
  const [streakData, setStreakData] = useState(getStreakData);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // Preload speech synthesis voices on mount
  useEffect(() => {
    preloadVoices();
  }, []);

  // Update current language
  const selectLanguage = (langId) => {
    setCurrentLanguageId(langId);
    setSavedLanguage(langId);
    // Trigger streak check on active engagement
    const updatedStreak = updateStreakOnActivity();
    setStreakData(updatedStreak);
  };

  // Current language metadata
  const currentLanguage = useMemo(() => {
    return LANGUAGES.find((l) => l.id === currentLanguageId) || LANGUAGES[0];
  }, [currentLanguageId]);

  // Current language items
  const currentItems = useMemo(() => {
    return getAllLanguageItems(currentLanguageId);
  }, [currentLanguageId]);

  // Current language learned word IDs
  const learnedWordIds = useMemo(() => {
    return learnedWordsMap[currentLanguageId] || [];
  }, [learnedWordsMap, currentLanguageId]);

  // Current language practice word IDs
  const practiceWordIds = useMemo(() => {
    return practiceWordsMap[currentLanguageId] || [];
  }, [practiceWordsMap, currentLanguageId]);

  // Current language completed lesson IDs
  const completedLessonIds = useMemo(() => {
    return completedLessonsMap[currentLanguageId] || [];
  }, [completedLessonsMap, currentLanguageId]);

  // Mark a word as learned ("I Know This")
  const markWordLearned = (wordId) => {
    const currentList = learnedWordsMap[currentLanguageId] || [];
    if (!currentList.includes(wordId)) {
      const updated = {
        ...learnedWordsMap,
        [currentLanguageId]: [...currentList, wordId]
      };
      setLearnedWordsMap(updated);
      setLearnedWords(updated);
    }

    // Remove from practice list if it was there
    const currentPractice = practiceWordsMap[currentLanguageId] || [];
    if (currentPractice.includes(wordId)) {
      const updatedPractice = {
        ...practiceWordsMap,
        [currentLanguageId]: currentPractice.filter((id) => id !== wordId)
      };
      setPracticeWordsMap(updatedPractice);
      setPracticeWords(updatedPractice);
    }

    // Increment streak if not yet today
    const updatedStreak = updateStreakOnActivity();
    setStreakData(updatedStreak);
  };

  // Mark a word for practice ("Practice Again")
  const markWordPractice = (wordId) => {
    const currentPractice = practiceWordsMap[currentLanguageId] || [];
    if (!currentPractice.includes(wordId)) {
      const updatedPractice = {
        ...practiceWordsMap,
        [currentLanguageId]: [...currentPractice, wordId]
      };
      setPracticeWordsMap(updatedPractice);
      setPracticeWords(updatedPractice);
    }

    // Remove from learned if user felt they need practice
    const currentLearned = learnedWordsMap[currentLanguageId] || [];
    if (currentLearned.includes(wordId)) {
      const updatedLearned = {
        ...learnedWordsMap,
        [currentLanguageId]: currentLearned.filter((id) => id !== wordId)
      };
      setLearnedWordsMap(updatedLearned);
      setLearnedWords(updatedLearned);
    }
  };

  // Toggle word learned state
  const toggleWordLearned = (wordId) => {
    if (learnedWordIds.includes(wordId)) {
      markWordPractice(wordId);
    } else {
      markWordLearned(wordId);
    }
  };

  // Record a quiz result
  const recordQuiz = (quizResult) => {
    const resultObj = {
      id: `quiz_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      languageId: currentLanguageId,
      languageName: currentLanguage.name,
      ...quizResult
    };
    const updatedHistory = saveQuizResult(resultObj);
    setQuizHistory(updatedHistory);

    // Update streak
    const updatedStreak = updateStreakOnActivity();
    setStreakData(updatedStreak);
    return resultObj;
  };

  // Mark lesson as completed
  const markLessonComplete = (lessonId) => {
    const currentList = completedLessonsMap[currentLanguageId] || [];
    if (!currentList.includes(lessonId)) {
      const updated = {
        ...completedLessonsMap,
        [currentLanguageId]: [...currentList, lessonId]
      };
      setCompletedLessonsMap(updated);
      setCompletedLessons(updated);
    }
    const updatedStreak = updateStreakOnActivity();
    setStreakData(updatedStreak);
  };

  // Reset all progress
  const resetProgress = () => {
    clearAllData();
    setLearnedWordsMap({ spanish: [], french: [], german: [], japanese: [], telugu: [] });
    setPracticeWordsMap({ spanish: [], french: [], german: [], japanese: [], telugu: [] });
    setQuizHistory([]);
    setCompletedLessonsMap({ spanish: [], french: [], german: [], japanese: [], telugu: [] });
    setStreakData({ count: 1, lastActiveDate: new Date().toISOString().split('T')[0], history: [] });
  };

  // Calculated overall metrics
  const totalWords = currentItems.length;
  const learnedCount = learnedWordIds.length;
  const progressPercent = totalWords > 0 ? Math.min(100, Math.round((learnedCount / totalWords) * 100)) : 0;

  // Recent quiz stats
  const currentLangQuizzes = quizHistory.filter((q) => q.languageId === currentLanguageId);
  const averageQuizScore = currentLangQuizzes.length > 0
    ? Math.round(currentLangQuizzes.reduce((acc, q) => acc + q.percentage, 0) / currentLangQuizzes.length)
    : 0;

  const value = {
    currentLanguage,
    currentLanguageId,
    selectLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    currentItems,
    learnedWordIds,
    practiceWordIds,
    completedLessonIds,
    markWordLearned,
    markWordPractice,
    toggleWordLearned,
    recordQuiz,
    markLessonComplete,
    quizHistory,
    currentLangQuizzes,
    streakData,
    resetProgress,
    totalWords,
    learnedCount,
    progressPercent,
    averageQuizScore
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
