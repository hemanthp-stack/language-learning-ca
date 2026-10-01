import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Check, 
  X, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  Volume2, 
  Sparkles, 
  Clock, 
  Layers, 
  CheckCircle2, 
  XCircle,
  Headphones
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES, generateQuiz } from '../data';
import AudioButton from './AudioButton';
import confetti from 'canvas-confetti';

const QuizView = ({ setActiveTab }) => {
  const { 
    currentLanguage, 
    currentLanguageId, 
    recordQuiz 
  } = useLanguage();

  // Quiz setup states
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);
  const [quizCategory, setQuizCategory] = useState('all');
  const [quizMode, setQuizMode] = useState('mixed'); // 'standard' | 'reverse' | 'listening' | 'mixed'

  // In-quiz states
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answersHistory, setAnswersHistory] = useState([]); // [{ question, selected, correct, isCorrect }]

  // Start new quiz
  const handleStartQuiz = () => {
    const generated = generateQuiz(currentLanguageId, questionCount, quizCategory, quizMode);
    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswersHistory([]);
    setIsQuizActive(true);
    setIsQuizCompleted(false);
  };

  const currentQ = questions[currentIndex];

  // Auto pronounce audio if listening question
  useEffect(() => {
    if (isQuizActive && currentQ && currentQ.type === 'listening' && selectedAnswer === null) {
      // Small timeout to allow UI to mount
      const timer = setTimeout(() => {
        // Will be triggered by user or auto-ready
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isQuizActive, currentQ]);

  // Handle user selecting an option
  const handleSelectAnswer = (option) => {
    if (selectedAnswer !== null) return; // prevent changing answer

    setSelectedAnswer(option);
    const isCorrect = option === currentQ.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    setAnswersHistory((prev) => [
      ...prev,
      {
        question: currentQ,
        selected: option,
        correct: currentQ.correctAnswer,
        isCorrect
      }
    ]);
  };

  // Next question or finish
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Completed quiz!
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsQuizActive(false);
    setIsQuizCompleted(true);

    const percentage = Math.round((score / questions.length) * 100);

    // Save to localStorage history
    recordQuiz({
      score,
      total: questions.length,
      percentage,
      category: quizCategory,
      mode: quizMode
    });

    if (percentage >= 80) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  // Performance Evaluation Helper
  const getPerformanceFeedback = (percentage) => {
    if (percentage === 100) return { title: '🏆 Perfect Score! Master Linguist', color: 'text-amber-500' };
    if (percentage >= 80) return { title: '🎉 Excellent Work! Highly Accurate', color: 'text-emerald-500' };
    if (percentage >= 60) return { title: '👍 Good Job! Solid Progress', color: 'text-indigo-500' };
    return { title: '📚 Keep Practicing! You are Learning', color: 'text-blue-500' };
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* --- SCREEN 1: QUIZ SETUP SCREEN --- */}
      {!isQuizActive && !isQuizCompleted && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{currentLanguage.flag}</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {currentLanguage.name} Practice Quiz
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Test your language memory with randomized multiple-choice questions, instant feedback, and score tracking.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
            
            {/* Setting 1: Topic Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Topic / Category:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setQuizCategory('all')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left ${
                    quizCategory === 'all'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20 shadow-2xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="text-sm">🌟 All Topics</div>
                  <div className="text-[10px] text-slate-400 font-normal mt-0.5">Comprehensive test</div>
                </button>

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setQuizCategory(cat.id)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left ${
                      quizCategory === cat.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="text-sm truncate">{cat.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5 truncate">{cat.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Setting 2: Question Format */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Quiz Format:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'mixed', label: 'Mixed Challenge', desc: 'Varied format' },
                  { id: 'standard', label: 'Word to English', desc: 'Vocabulary focus' },
                  { id: 'reverse', label: 'English to Word', desc: 'Recall focus' },
                  { id: 'listening', label: 'Listening Test', desc: 'Audio recognition' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setQuizMode(mode.id)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left ${
                      quizMode === mode.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>{mode.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Setting 3: Length */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Number of Questions:
              </label>
              <div className="flex gap-3">
                {[5, 10].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`flex-1 py-3 px-4 rounded-2xl border text-xs font-bold transition-all ${
                      questionCount === count
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {count} Questions {count === 5 ? '(Quick Blitz)' : '(Full Exam)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleStartQuiz}
                className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2"
              >
                <span>Start Practice Quiz Now</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- SCREEN 2: ACTIVE QUESTION SCREEN --- */}
      {isQuizActive && currentQ && (
        <div className="space-y-6">
          
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span className="text-indigo-600 font-bold">Current Score: {score}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
            
            {/* Prompt Type Badge & Audio */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1.5">
                {currentQ.type === 'listening' ? <Headphones size={13} /> : <HelpCircle size={13} />}
                {currentQ.type === 'listening' ? 'Listening Comprehension' : currentQ.item.category}
              </span>

              <AudioButton
                text={currentQ.audioText}
                languageKey={currentLanguageId}
                size="md"
                variant="primary"
                title="Hear target word"
              />
            </div>

            {/* Prompt text */}
            <div className="text-center space-y-3 py-2">
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                {currentQ.prompt}
              </p>
              
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {currentQ.displayWord}
              </div>

              {currentQ.type !== 'reverse' && currentQ.phonetic && (
                <div className="text-xs sm:text-sm font-semibold text-indigo-600">
                  Pronunciation: {currentQ.phonetic}
                </div>
              )}
            </div>

            {/* 4 Multiple Choice Answers */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQ.correctAnswer;

                let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800';

                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-500/20';
                  } else {
                    btnStyle = 'border-slate-200 opacity-50 bg-slate-50 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(option)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-600">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {selectedAnswer !== null && (
                      <div>
                        {isCorrect && <Check size={20} className="text-emerald-600 stroke-[3]" />}
                        {isSelected && !isCorrect && <X size={20} className="text-rose-600 stroke-[3]" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate Explanation Card & Next Button */}
            {selectedAnswer !== null && (
              <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                <div className={`p-4 rounded-2xl text-xs sm:text-sm ${
                  selectedAnswer === currentQ.correctAnswer
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}>
                  <p className="font-bold flex items-center gap-1.5">
                    {selectedAnswer === currentQ.correctAnswer ? (
                      <>
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        <span>Correct! Well done.</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} className="text-rose-600" />
                        <span>Incorrect. The right answer is: <strong>{currentQ.correctAnswer}</strong></span>
                      </>
                    )}
                  </p>
                  <p className="mt-1 text-slate-700">{currentQ.explanation}</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm sm:text-base transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center space-x-2"
                >
                  <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- SCREEN 3: FINAL RESULTS SCREEN --- */}
      {isQuizCompleted && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
            
            {/* Score Ring / Trophy */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
              <span className="text-3xl font-black">{Math.round((score / questions.length) * 100)}%</span>
            </div>

            <div className="space-y-1">
              <h2 className={`text-xl sm:text-2xl font-black ${getPerformanceFeedback(Math.round((score / questions.length) * 100)).color}`}>
                {getPerformanceFeedback(Math.round((score / questions.length) * 100)).title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                You answered <strong>{score}</strong> out of <strong>{questions.length}</strong> questions correctly in {currentLanguage.name}.
              </p>
            </div>

            {/* Stats Breakdown Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 max-w-md mx-auto text-center">
              <div>
                <div className="text-xs text-slate-400 font-semibold">Total</div>
                <div className="text-lg font-bold text-slate-800">{questions.length}</div>
              </div>
              <div>
                <div className="text-xs text-emerald-600 font-semibold">Correct</div>
                <div className="text-lg font-bold text-emerald-600">{score}</div>
              </div>
              <div>
                <div className="text-xs text-rose-500 font-semibold">Mistakes</div>
                <div className="text-lg font-bold text-rose-500">{questions.length - score}</div>
              </div>
            </div>

            {/* Navigation and Try Again Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleStartQuiz}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center space-x-2"
              >
                <RotateCcw size={16} />
                <span>Try Again</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsQuizCompleted(false);
                  setIsQuizActive(false);
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm transition-colors"
              >
                Configure New Quiz
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('flashcards')}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center space-x-1"
              >
                <span>Review Flashcards</span>
              </button>
            </div>

          </div>

          {/* Detailed Question Review List */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Question-by-Question Review</span>
              <span className="text-xs font-semibold text-slate-400">{answersHistory.length} Questions</span>
            </h3>

            <div className="space-y-3">
              {answersHistory.map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    item.isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                  } flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {item.isCorrect ? (
                        <CheckCircle2 size={18} className="text-emerald-600" />
                      ) : (
                        <XCircle size={18} className="text-rose-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {item.question.prompt} <span className="text-indigo-600">"{item.question.displayWord}"</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 space-x-2">
                        <span>Your answer: <strong className={item.isCorrect ? 'text-emerald-700' : 'text-rose-600'}>{item.selected}</strong></span>
                        {!item.isCorrect && (
                          <span>• Correct: <strong className="text-emerald-700">{item.correct}</strong></span>
                        )}
                      </div>
                    </div>
                  </div>

                  <AudioButton
                    text={item.question.audioText}
                    languageKey={currentLanguageId}
                    size="sm"
                    variant="ghost"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default QuizView;
