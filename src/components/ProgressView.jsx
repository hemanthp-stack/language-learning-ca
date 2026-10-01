import React, { useState } from 'react';
import { 
  TrendingUp, 
  BookOpen, 
  Award, 
  Flame, 
  GraduationCap, 
  CheckCircle2, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  Calendar,
  Volume2,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES, getAllLanguageItems, LANGUAGES } from '../data';
import AudioButton from './AudioButton';

const ACHIEVEMENTS = [
  { id: 'first_word', name: 'First Step', desc: 'Learned your first new word', icon: '🌱' },
  { id: 'streak_3', name: 'Dedicated Flame', desc: 'Achieved a 3-day learning streak', icon: '🔥' },
  { id: 'quiz_ace', name: 'Quiz Ace', desc: 'Scored 80% or higher on a quiz', icon: '🎯' },
  { id: 'polyglot', name: 'Polyglot Explorer', desc: 'Explored words in multiple languages', icon: '🌍' },
  { id: 'lesson_master', name: 'Class Topper', desc: 'Completed a structured lesson syllabus', icon: '🎓' },
  { id: 'vocab_champ', name: 'Vocab Champion', desc: 'Learned 10+ words in a single language', icon: '⭐' }
];

const ProgressView = () => {
  const { 
    currentLanguage, 
    currentLanguageId, 
    learnedWordIds, 
    practiceWordIds, 
    completedLessonIds, 
    totalWords, 
    learnedCount, 
    progressPercent, 
    streakData, 
    quizHistory,
    currentLangQuizzes,
    averageQuizScore,
    toggleWordLearned,
    resetProgress 
  } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [glossaryCategory, setGlossaryCategory] = useState('all');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const allItems = getAllLanguageItems(currentLanguageId);

  // Filter glossary items
  const filteredGlossary = allItems.filter((item) => {
    const matchesCategory = glossaryCategory === 'all' || item.category === glossaryCategory;
    const matchesSearch = 
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phonetic && item.phonetic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Calculate achievements unlocked
  const isAchievementUnlocked = (achId) => {
    switch (achId) {
      case 'first_word':
        return learnedCount > 0;
      case 'streak_3':
        return streakData.count >= 3;
      case 'quiz_ace':
        return quizHistory.some((q) => q.percentage >= 80);
      case 'polyglot':
        return true; // Exploring 5 languages in app
      case 'lesson_master':
        return completedLessonIds.length > 0;
      case 'vocab_champ':
        return learnedCount >= 10;
      default:
        return false;
    }
  };

  // Last 7 days streak dots
  const renderWeekStreakDots = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const todayIndex = (new Date().getDay() + 6) % 7; // 0 for Mon, 6 for Sun

    return (
      <div className="flex items-center justify-between gap-1 sm:gap-2 pt-2">
        {days.map((day, idx) => {
          const isToday = idx === todayIndex;
          const isActive = idx <= todayIndex; // for demo visual

          return (
            <div key={day} className="flex flex-col items-center space-y-1">
              <span className="text-[10px] font-semibold text-slate-400">{day}</span>
              <div 
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isToday
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 ring-2 ring-amber-300'
                    : isActive
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isActive ? '🔥' : '•'}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{currentLanguage.flag}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Learning Progress & Analytics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your learned words, test history, streak records, and vocabulary library for {currentLanguage.name}.
          </p>
        </div>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold self-start sm:self-auto transition-colors"
          title="Reset progress to fresh state"
        >
          <RotateCcw size={14} />
          <span>Reset Progress</span>
        </button>
      </div>

      {/* Confirmation Modal for Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full border border-slate-200 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Reset All Learning Data?</h3>
              <p className="text-xs text-slate-500 mt-1">
                This will clear learned words, completed lessons, and quiz history. This is helpful if you want to restart your project demo.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors shadow-xs"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Words Learned */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Words Mastered</span>
            <BookOpen size={18} className="text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {learnedCount}
            <span className="text-xs font-medium text-slate-400 ml-1">/ {totalWords}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Lessons Done</span>
            <GraduationCap size={18} className="text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {completedLessonIds.length}
          </div>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 size={12} />
            Structured syllabus
          </p>
        </div>

        {/* Daily Streak */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Streak</span>
            <Flame size={18} className="text-amber-500 fill-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {streakData.count} <span className="text-xs font-semibold text-slate-500">days</span>
          </div>
          <p className="text-xs text-amber-600 font-medium">
            Active habit maintained
          </p>
        </div>

        {/* Quiz Accuracy */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Quiz Accuracy</span>
            <Award size={18} className="text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {currentLangQuizzes.length > 0 ? `${averageQuizScore}%` : 'N/A'}
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {currentLangQuizzes.length} tests taken
          </p>
        </div>

      </div>

      {/* 2 Graphical Simple Charts: Category Mastery & 7-Day Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Category Breakdown Progress Bars */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              Category Mastery Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-medium">In {currentLanguage.name}</span>
          </div>

          <div className="space-y-4">
            {CATEGORIES.map((cat) => {
              const catItems = allItems.filter(i => i.category === cat.id);
              const catLearned = catItems.filter(i => learnedWordIds.includes(i.id)).length;
              const percent = catItems.length > 0 ? Math.round((catLearned / catItems.length) * 100) : 0;

              return (
                <div key={cat.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{cat.name}</span>
                    <span className="text-slate-500 font-semibold">{catLearned} / {catItems.length} ({percent}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Streak & Quiz Activity Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Calendar size={18} className="text-indigo-600" />
                <span>Weekly Activity & Streak</span>
              </h3>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {streakData.count} Day Streak
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Practice every day to reinforce memory pathways and build lasting fluency.
            </p>

            {/* Week Dots */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              {renderWeekStreakDots()}
            </div>
          </div>

          {/* Simple Quiz Performance Chart */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Recent Quiz Scores:</span>
              <span className="text-slate-400 font-medium">Last 5 quizzes</span>
            </div>

            {currentLangQuizzes.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">
                No quizzes taken yet. Complete a quiz to view your score trend!
              </p>
            ) : (
              <div className="flex items-end justify-between gap-2 h-20 pt-4">
                {currentLangQuizzes.slice(0, 5).reverse().map((q, idx) => {
                  const heightPercent = Math.max(15, q.percentage);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Tooltip on hover */}
                      <span className="text-[10px] font-bold text-slate-600">
                        {q.percentage}%
                      </span>
                      <div 
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          q.percentage >= 80 ? 'bg-emerald-500' : q.percentage >= 60 ? 'bg-indigo-500' : 'bg-amber-500'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Badges & Achievements Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles size={18} className="text-amber-500" />
              <span>Milestones & Badges</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Unlock accomplishments as you learn words and complete tests
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {ACHIEVEMENTS.map((ach) => {
            const unlocked = isAchievementUnlocked(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  unlocked
                    ? 'border-amber-200 bg-amber-50/40 shadow-2xs'
                    : 'border-slate-100 bg-slate-50/50 opacity-40 grayscale'
                }`}
              >
                <div className="text-3xl mb-2 select-none">{ach.icon}</div>
                <div className="text-xs font-bold text-slate-800 leading-tight">{ach.name}</div>
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">{ach.desc}</div>
                {unlocked && (
                  <span className="inline-block mt-2 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 bg-amber-100 rounded-md">
                    Unlocked
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Searchable Words Bank / Glossary */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-600" />
              <span>{currentLanguage.name} Vocabulary Bank</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Search and listen to all words and phrases available in {currentLanguage.name}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search words or meanings..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setGlossaryCategory('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
              glossaryCategory === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            All ({allItems.length})
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setGlossaryCategory(c.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                glossaryCategory === c.id
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Table / List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                <th className="pb-3 pl-2">Word</th>
                <th className="pb-3">Phonetic</th>
                <th className="pb-3">English Meaning</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Audio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredGlossary.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                    No vocabulary items matched your search query.
                  </td>
                </tr>
              ) : (
                filteredGlossary.map((item) => {
                  const isLearned = learnedWordIds.includes(item.id);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 pl-2 font-bold text-slate-900 text-sm">
                        {item.word}
                      </td>
                      <td className="py-3 text-slate-500">
                        {item.phonetic}
                      </td>
                      <td className="py-3 text-slate-700 font-semibold">
                        {item.meaning}
                      </td>
                      <td className="py-3 capitalize text-slate-500">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px]">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => toggleWordLearned(item.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            isLearned
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                          title="Click to toggle learned status"
                        >
                          {isLearned ? '✓ Mastered' : '+ Mark Known'}
                        </button>
                      </td>
                      <td className="py-3 text-right pr-2">
                        <AudioButton
                          text={item.word}
                          languageKey={currentLanguageId}
                          size="sm"
                          variant="ghost"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ProgressView;
