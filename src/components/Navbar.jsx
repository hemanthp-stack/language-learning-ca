import React from 'react';
import { 
  BookOpen, 
  Home, 
  GraduationCap, 
  Layers, 
  HelpCircle, 
  TrendingUp, 
  Flame, 
  ChevronDown,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'lessons', label: 'Lessons', icon: GraduationCap },
  { id: 'flashcards', label: 'Flashcards', icon: Layers },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  { id: 'progress', label: 'Progress', icon: TrendingUp }
];

const Navbar = ({ activeTab, setActiveTab }) => {
  const { currentLanguage, streakData, setIsLanguageModalOpen } = useLanguage();

  return (
    <>
      {/* Top Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Logo */}
            <div 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <BookOpen size={22} className="stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent tracking-tight">
                  LinguaLearn
                </span>
                <span className="hidden sm:inline-block ml-1.5 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                  College Ed.
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-indigo-600 stroke-[2.5]' : 'text-slate-400'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Side Badges & Controls */}
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              
              {/* Daily Streak Badge */}
              <div 
                title={`Daily Streak: ${streakData.count} days in a row!`}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 shadow-2xs transition-transform hover:scale-105 cursor-pointer"
                onClick={() => setActiveTab('progress')}
              >
                <Flame size={18} className="text-amber-500 fill-amber-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold">{streakData.count}</span>
                <span className="hidden sm:inline text-xs font-medium text-amber-600">Streak</span>
              </div>

              {/* Active Language Pill / Switcher Button */}
              <button
                type="button"
                onClick={() => setIsLanguageModalOpen(true)}
                className="flex items-center space-x-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 group"
                title="Change active language"
              >
                <span className="text-xl sm:text-2xl leading-none">{currentLanguage.flag}</span>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                    {currentLanguage.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight">
                    {currentLanguage.nativeName}
                  </div>
                </div>
                <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-transform group-hover:translate-y-0.5" />
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
        <div className="grid grid-cols-5 gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-colors ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50/80 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-indigo-600 stroke-[2.5]' : 'text-slate-400'} />
                <span className="mt-0.5 leading-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
