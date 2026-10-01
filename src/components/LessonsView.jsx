import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Volume2, 
  Award, 
  Play, 
  Check, 
  X, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLanguageData, getAllLanguageItems } from '../data';
import AudioButton from './AudioButton';
import confetti from 'canvas-confetti';

const LessonsView = ({ activeLessonId, onClearActiveLesson }) => {
  const { 
    currentLanguage, 
    currentLanguageId, 
    completedLessonIds, 
    markLessonComplete, 
    markWordLearned 
  } = useLanguage();

  const langData = getLanguageData(currentLanguageId);
  const lessons = langData.lessons || [];
  const allItems = getAllLanguageItems(currentLanguageId);

  // Active lesson state
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [stepMode, setStepMode] = useState('study'); // 'study' | 'quiz' | 'finished'
  const [currentWordStep, setCurrentWordStep] = useState(0);

  // Mini quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  // Initialize or respond to incoming activeLessonId prop
  useEffect(() => {
    if (activeLessonId) {
      const match = lessons.find((l) => l.id === activeLessonId);
      if (match) {
        startLesson(match);
      }
    }
  }, [activeLessonId, lessons]);

  const startLesson = (lesson) => {
    setSelectedLesson(lesson);
    setStepMode('study');
    setCurrentWordStep(0);
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
  };

  const closeLesson = () => {
    setSelectedLesson(null);
    setStepMode('study');
    if (onClearActiveLesson) onClearActiveLesson();
  };

  // If a lesson is currently active, render the interactive lesson experience
  if (selectedLesson) {
    const lessonItemIds = selectedLesson.itemIds || [];
    const lessonItems = lessonItemIds
      .map((id) => allItems.find((item) => item.id === id))
      .filter(Boolean);

    const currentItem = lessonItems[currentWordStep] || lessonItems[0];
    const miniQuizQuestions = selectedLesson.miniQuiz || [];
    const currentQ = miniQuizQuestions[quizIndex];

    // Handle Study Step Navigation
    const handleNextWord = () => {
      // Auto-mark word as learned in context
      if (currentItem) {
        markWordLearned(currentItem.id);
      }

      if (currentWordStep < lessonItems.length - 1) {
        setCurrentWordStep(currentWordStep + 1);
      } else {
        // Move to mini quiz
        setStepMode('quiz');
        setQuizIndex(0);
        setSelectedAnswer(null);
      }
    };

    const handlePrevWord = () => {
      if (currentWordStep > 0) {
        setCurrentWordStep(currentWordStep - 1);
      }
    };

    // Handle Mini Quiz Option Select
    const handleOptionSelect = (option) => {
      if (selectedAnswer !== null) return; // already answered
      setSelectedAnswer(option);

      const isCorrect = option === currentQ.answer;
      if (isCorrect) {
        setQuizScore((prev) => prev + 1);
      }
    };

    const handleNextQuizQuestion = () => {
      if (quizIndex < miniQuizQuestions.length - 1) {
        setQuizIndex(quizIndex + 1);
        setSelectedAnswer(null);
      } else {
        // Finished lesson!
        setStepMode('finished');
        markLessonComplete(selectedLesson.id);
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    };

    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
        
        {/* Lesson Header Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={closeLesson}
            className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs"
          >
            <ArrowLeft size={16} />
            <span>All Lessons</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
              {selectedLesson.title}
            </span>
          </div>
        </div>

        {/* --- MODE 1: STUDY VOCABULARY CARDS --- */}
        {stepMode === 'study' && (
          <div className="space-y-6">
            
            {/* Step Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-500 font-semibold">
                <span>Word {currentWordStep + 1} of {lessonItems.length}</span>
                <span>Part 1: Vocabulary & Usage</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentWordStep + 1) / lessonItems.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Interactive Word Card */}
            {currentItem && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-6">
                
                <div className="flex items-center justify-between">
                  <span className="capitalize px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                    {currentItem.category}
                  </span>
                  <AudioButton
                    text={currentItem.word}
                    languageKey={currentLanguageId}
                    size="md"
                    variant="primary"
                  />
                </div>

                <div className="text-center space-y-2 pt-2">
                  <div className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    {currentItem.word}
                  </div>
                  <div className="text-sm font-semibold text-indigo-600">
                    Pronunciation: <strong>{currentItem.phonetic}</strong>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-700 pt-2">
                    "{currentItem.meaning}"
                  </div>
                </div>

                {/* Example sentence */}
                {currentItem.example && (
                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                          Context Sentence
                        </div>
                        <div className="text-base sm:text-lg font-bold text-slate-800 mt-1">
                          {currentItem.example}
                        </div>
                        {currentItem.examplePhonetic && (
                          <div className="text-xs text-indigo-600 font-medium">
                            {currentItem.examplePhonetic}
                          </div>
                        )}
                        <div className="text-sm text-slate-600 mt-1 italic">
                          "{currentItem.exampleTranslation}"
                        </div>
                      </div>
                      <AudioButton
                        text={currentItem.example}
                        languageKey={currentLanguageId}
                        size="sm"
                        variant="secondary"
                      />
                    </div>
                  </div>
                )}

                {/* Grammar / Note Tip */}
                {currentItem.notes && (
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex items-start space-x-2">
                    <span className="font-bold">💡 Tip:</span>
                    <span>{currentItem.notes}</span>
                  </div>
                )}

                {/* Card Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={handlePrevWord}
                    disabled={currentWordStep === 0}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-slate-700 transition-colors flex items-center space-x-1"
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNextWord}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-xs sm:text-sm font-bold text-white transition-all shadow-md shadow-indigo-600/20 flex items-center space-x-2"
                  >
                    <span>{currentWordStep === lessonItems.length - 1 ? 'Start Mini-Quiz' : 'Next Word'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

              </div>
            )}
          </div>
        )}

        {/* --- MODE 2: MINI QUIZ CHECK --- */}
        {stepMode === 'quiz' && currentQ && (
          <div className="space-y-6">
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-500 font-semibold">
                <span>Quiz Question {quizIndex + 1} of {miniQuizQuestions.length}</span>
                <span>Part 2: Check Your Understanding</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((quizIndex + 1) / miniQuizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">
                  Quick Check
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3">
                  {currentQ.question}
                </h3>
              </div>

              {/* 4 Multiple Choice Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectAnswer = option === currentQ.answer;

                  let optionStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800';

                  if (selectedAnswer !== null) {
                    if (isCorrectAnswer) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20';
                    } else if (isSelected && !isCorrectAnswer) {
                      optionStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-500/20';
                    } else {
                      optionStyle = 'border-slate-200 opacity-50 bg-slate-50 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 rounded-2xl border-2 text-left font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-between ${optionStyle}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-500">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {selectedAnswer !== null && (
                        <div>
                          {isCorrectAnswer && <Check size={20} className="text-emerald-600 stroke-[3]" />}
                          {isSelected && !isCorrectAnswer && <X size={20} className="text-rose-600 stroke-[3]" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Next */}
              {selectedAnswer !== null && (
                <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm ${
                    selectedAnswer === currentQ.answer
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border border-rose-200'
                  }`}>
                    <p className="font-bold">
                      {selectedAnswer === currentQ.answer ? '🎉 Correct!' : '❌ Not quite right'}
                    </p>
                    <p className="mt-1">{currentQ.explanation}</p>
                  </div>

                  <button
                    onClick={handleNextQuizQuestion}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>{quizIndex < miniQuizQuestions.length - 1 ? 'Next Question' : 'Complete Lesson'}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* --- MODE 3: LESSON FINISHED CELEBRATION --- */}
        {stepMode === 'finished' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-4xl shadow-inner">
              🎓
            </div>

            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Lesson Completed
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Great job on completing {selectedLesson.title}!
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                You scored {quizScore} out of {miniQuizQuestions.length} on the comprehension check. All words from this lesson are now saved to your learned vocabulary!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 max-w-sm mx-auto text-xs text-indigo-900 font-semibold flex items-center justify-center space-x-2">
              <Sparkles size={16} className="text-indigo-600" />
              <span>Daily Streak Updated & Lesson Mastered!</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => startLesson(selectedLesson)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2"
              >
                <RotateCcw size={16} />
                <span>Repeat Lesson</span>
              </button>

              <button
                onClick={closeLesson}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Continue to Other Lessons</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>
    );
  }

  // --- DEFAULT VIEW: LIST OF LESSONS ---
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{currentLanguage.flag}</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {currentLanguage.name} Structured Lessons
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Follow our bite-sized structured syllabus designed for college students. Learn new words, hear native pronunciations, and test your understanding.
        </p>
      </div>

      {/* Lesson Modules List */}
      <div className="space-y-4">
        {lessons.map((lesson, idx) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          const lessonItems = (lesson.itemIds || [])
            .map((id) => allItems.find((item) => item.id === id))
            .filter(Boolean);

          return (
            <div
              key={lesson.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border-2 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2.5">
                  <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Clock size={14} />
                    {lesson.duration}
                  </span>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {lesson.level}
                  </span>
                  {isCompleted && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      Completed
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {lesson.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                  {lesson.description}
                </p>

                {/* Preview words in this lesson */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lessonItems.slice(0, 4).map((it) => (
                    <span 
                      key={it.id}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      {it.word}
                    </span>
                  ))}
                  {lessonItems.length > 4 && (
                    <span className="px-2 py-1 text-xs text-slate-400 font-medium">
                      +{lessonItems.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={() => startLesson(lesson)}
                  className={`w-full md:w-auto px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2 ${
                    isCompleted
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                  }`}
                >
                  <Play size={16} className={isCompleted ? 'text-slate-700' : 'fill-white'} />
                  <span>{isCompleted ? 'Review Lesson' : 'Start Lesson'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default LessonsView;
