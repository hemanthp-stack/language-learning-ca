import React from 'react';
import { 
  Flame, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Play, 
  MessageSquare, 
  Layers, 
  Hash, 
  Smile, 
  Volume2,
  Award,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES, LANGUAGES, getTodaysLesson, getItemsByCategory } from '../data';
import AudioButton from './AudioButton';

const CATEGORY_ICON_MAP = {
  vocabulary: BookOpen,
  phrases: MessageSquare,
  grammar: Layers,
  numbers: Hash,
  greetings: Smile
};

const Dashboard = ({ setActiveTab, setSelectedCategoryForPractice, startLessonById }) => {
  const { 
    currentLanguage, 
    currentLanguageId, 
    selectLanguage,
    learnedWordIds, 
    totalWords, 
    learnedCount, 
    progressPercent, 
    streakData, 
    quizHistory,
    currentLangQuizzes,
    averageQuizScore,
    setIsLanguageModalOpen
  } = useLanguage();

  const todaysLesson = getTodaysLesson(currentLanguageId);

  // Determine user learner tier
  const getLearnerLevel = (percent) => {
    if (percent >= 80) return { title: 'Polyglot Master', color: 'text-purple-600 bg-purple-50 border-purple-200' };
    if (percent >= 50) return { title: 'Conversationalist', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' };
    if (percent >= 25) return { title: 'Dedicated Learner', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    return { title: 'Beginner Explorer', color: 'text-blue-600 bg-blue-50 border-blue-200' };
  };

  const levelInfo = getLearnerLevel(progressPercent);

  // Jump to flashcards with specific category
  const handleCategoryClick = (categoryId) => {
    if (setSelectedCategoryForPractice) {
      setSelectedCategoryForPractice(categoryId);
    }
    setActiveTab('flashcards');
  };

  // Jump directly to today's lesson
  const handleStartTodayLesson = () => {
    if (startLessonById && todaysLesson) {
      startLessonById(todaysLesson.id);
    }
    setActiveTab('lessons');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-12">
      
      {/* Home Screen Language Selector Bar */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Globe size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Select Language to Learn</div>
              <div className="text-[11px] text-slate-400">Switch instantly between languages</div>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.id === currentLanguageId;
              return (
                <button
                  key={lang.id}
                  onClick={() => selectLanguage(lang.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-2xl text-xs font-bold transition-all duration-200 whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <span className="text-base select-none leading-none">{lang.flag}</span>
                  <span>{lang.name}</span>
                  <span className={`text-[10px] font-normal hidden md:inline ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                    ({lang.nativeName})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Welcome / Language Banner */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentLanguage.color} p-6 sm:p-8 text-white shadow-xl`}>
        {/* Decorative backdrop shapes */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-black/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
              <span className="text-base">{currentLanguage.flag}</span>
              <span>Learning {currentLanguage.name} ({currentLanguage.nativeName})</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to learn {currentLanguage.name} today?
            </h1>
            
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {currentLanguage.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium">
                <span>Greeting: <strong>{currentLanguage.greetingSample}</strong></span>
                <AudioButton
                  text={currentLanguage.greetingSample}
                  languageKey={currentLanguage.id}
                  size="sm"
                  variant="secondary"
                />
              </div>

              <button
                onClick={() => setIsLanguageModalOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-white text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors shadow-sm"
              >
                <Globe size={14} className="text-indigo-600" />
                <span>Switch Language</span>
              </button>
            </div>
          </div>

          {/* Quick Start Card inside banner */}
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-5 sm:min-w-[260px] text-center flex flex-col items-center justify-center space-y-3 shadow-inner">
            <div className="w-14 h-14 rounded-2xl bg-white text-indigo-600 flex items-center justify-center shadow-lg font-bold text-2xl">
              🎯
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-white/80">Daily Focus</div>
              <div className="text-base font-bold text-white">5 New Words a Day</div>
            </div>
            <button
              onClick={() => setActiveTab('flashcards')}
              className="w-full py-2.5 px-4 bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>Practice Flashcards</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Metric 1: Daily Streak */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Streak</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame size={18} className="fill-amber-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{streakData.count}</span>
            <span className="text-xs font-semibold text-slate-500">days</span>
          </div>
          <p className="mt-1 text-xs text-amber-600 font-medium flex items-center gap-1">
            <Sparkles size={12} />
            Keep the flame burning!
          </p>
        </div>

        {/* Metric 2: Words Learned */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Words Learned</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{learnedCount}</span>
            <span className="text-xs font-semibold text-slate-500">/ {totalWords}</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            {progressPercent}% of target vocabulary
          </p>
        </div>

        {/* Metric 3: Quiz Progress */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quiz Accuracy</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {currentLangQuizzes.length > 0 ? `${averageQuizScore}%` : 'N/A'}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            {currentLangQuizzes.length} {currentLangQuizzes.length === 1 ? 'quiz' : 'quizzes'} completed
          </p>
        </div>

        {/* Metric 4: Overall Progress */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Level</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <GraduationCap size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${levelInfo.color}`}>
              {levelInfo.title}
            </span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>

      </div>

      {/* Main Learning Hub: Today's Lesson Card & Quick Practice */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Today's Lesson Showcase Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                Recommended Daily Lesson
              </span>
              <span className="text-xs text-slate-400">• {todaysLesson.duration}</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
              {todaysLesson.level}
            </span>
          </div>

          <div className="mt-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {todaysLesson.title}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {todaysLesson.description}
            </p>
          </div>

          {/* Words Preview Chips */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Words & Concepts in This Lesson:
            </div>
            <div className="flex flex-wrap gap-2.5">
              {todaysLesson.itemIds.slice(0, 5).map((itemId) => {
                const item = getItemsByCategory(currentLanguageId, 'all').find(i => i.id === itemId);
                if (!item) return null;
                return (
                  <div 
                    key={item.id}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-800"
                  >
                    <span className="font-bold text-indigo-600">{item.word}</span>
                    <span className="text-slate-400">({item.meaning})</span>
                    <AudioButton 
                      text={item.word}
                      languageKey={currentLanguageId}
                      size="sm"
                      variant="ghost"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Includes step-by-step flashcards & a mini comprehension test</span>
            </div>
            <button
              onClick={handleStartTodayLesson}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-2xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center space-x-2"
            >
              <Play size={16} className="fill-white" />
              <span>Start Today’s Lesson</span>
            </button>
          </div>
        </div>

        {/* Right Col: Quick Launch & Daily Challenge */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={16} />
              <span>Daily Practice Test</span>
            </div>
            <h3 className="text-xl font-bold mt-2 text-white">Test Your Memory</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Take a randomized 5-question quiz to reinforce words you've seen and solidify long-term retention.
            </p>
          </div>

          <div className="my-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
            <div className="flex justify-between text-xs text-slate-300 font-medium">
              <span>Overall Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 text-center pt-1">
              {learnedCount} of {totalWords} words mastered in {currentLanguage.name}
            </p>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => setActiveTab('quiz')}
              className="w-full py-3 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-400 active:scale-95 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Take Quick Quiz</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium text-xs transition-all flex items-center justify-center space-x-1"
            >
              <span>Review All Flashcards</span>
            </button>
          </div>
        </div>

      </div>

      {/* Learning Categories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Learning Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Browse structured topics in {currentLanguage.name} — click any category to practice its cards
            </p>
          </div>
          <button
            onClick={() => {
              if (setSelectedCategoryForPractice) setSelectedCategoryForPractice('all');
              setActiveTab('flashcards');
            }}
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICON_MAP[category.id] || BookOpen;
            const categoryItems = getItemsByCategory(currentLanguageId, category.id);
            const categoryLearnedCount = categoryItems.filter(item => learnedWordIds.includes(item.id)).length;
            const catPercent = categoryItems.length > 0 ? Math.round((categoryLearnedCount / categoryItems.length) * 100) : 0;

            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="group bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-50 text-slate-700 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                      {categoryItems.length} words
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium mb-1.5">
                    <span>Mastered</span>
                    <span className="font-bold text-slate-700">{categoryLearnedCount} / {categoryItems.length}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
