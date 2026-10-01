import React, { useState, useEffect } from 'react';
import { 
  RotateCw, 
  Check, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Play, 
  Pause, 
  Sparkles, 
  BookOpen, 
  Award,
  Layers,
  Volume2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES, getItemsByCategory } from '../data';
import AudioButton from './AudioButton';
import confetti from 'canvas-confetti';

const FlashcardsView = ({ initialCategory = 'all' }) => {
  const { 
    currentLanguage, 
    currentLanguageId, 
    learnedWordIds, 
    practiceWordIds, 
    markWordLearned, 
    markWordPractice 
  } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'unlearned' | 'practice' | 'mastered'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Sync initialCategory prop if changed from parent
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [initialCategory]);

  // Compute cards based on category and filterMode
  const rawItems = getItemsByCategory(currentLanguageId, selectedCategory);
  const filteredItems = rawItems.filter((item) => {
    const isLearned = learnedWordIds.includes(item.id);
    const isPractice = practiceWordIds.includes(item.id);

    if (filterMode === 'mastered') return isLearned;
    if (filterMode === 'practice') return isPractice;
    if (filterMode === 'unlearned') return !isLearned;
    return true; // 'all'
  });

  // Ensure currentIndex stays within bounds
  useEffect(() => {
    if (currentIndex >= filteredItems.length && filteredItems.length > 0) {
      setCurrentIndex(filteredItems.length - 1);
    }
    setIsFlipped(false);
  }, [filteredItems.length]);

  // Auto-play slideshow timer
  useEffect(() => {
    let timer;
    if (isAutoPlaying && filteredItems.length > 0) {
      timer = setInterval(() => {
        setIsFlipped((prev) => {
          if (!prev) {
            // If on front, flip to back
            return true;
          } else {
            // If on back, flip back and move to next
            setCurrentIndex((curr) => (curr + 1) % filteredItems.length);
            return false;
          }
        });
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, filteredItems.length]);

  const currentCard = filteredItems[currentIndex];
  const isCurrentLearned = currentCard ? learnedWordIds.includes(currentCard.id) : false;
  const isCurrentPractice = currentCard ? practiceWordIds.includes(currentCard.id) : false;

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      // Loop or stay
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    } else {
      setCurrentIndex(filteredItems.length - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    if (filteredItems.length > 1) {
      const randomIndex = Math.floor(Math.random() * filteredItems.length);
      setCurrentIndex(randomIndex);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnowThis = () => {
    if (!currentCard) return;
    markWordLearned(currentCard.id);
    
    // Light celebratory confetti
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#4f46e5', '#10b981', '#f59e0b']
    });

    handleNext();
  };

  const handlePracticeAgain = () => {
    if (!currentCard) return;
    markWordPractice(currentCard.id);
    handleNext();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Top Header & Category Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{currentLanguage.flag}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {currentLanguage.name} Flashcards
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tap cards to flip between {currentLanguage.name} and English. Use the pronunciation button to hear authentic speech.
          </p>
        </div>

        {/* Filter Mode Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => { setFilterMode('all'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterMode === 'all' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({rawItems.length})
          </button>
          <button
            onClick={() => { setFilterMode('unlearned'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterMode === 'unlearned' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New
          </button>
          <button
            onClick={() => { setFilterMode('practice'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterMode === 'practice' ? 'bg-white text-amber-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Practice
          </button>
          <button
            onClick={() => { setFilterMode('mastered'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterMode === 'mastered' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mastered
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => { setSelectedCategory('all'); setCurrentIndex(0); }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Topics
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setSelectedCategory(cat.id); setCurrentIndex(0); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main Flashcard Container */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            📭
          </div>
          <h3 className="text-lg font-bold text-slate-800">No cards in this filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {filterMode === 'practice'
              ? 'You have not marked any cards for "Practice Again" in this category yet.'
              : filterMode === 'mastered'
              ? 'You have not marked any cards as "Known" yet. Start learning below!'
              : 'No cards match your filter criteria.'}
          </p>
          <button
            onClick={() => { setFilterMode('all'); setSelectedCategory('all'); }}
            className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Card Top Info Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
            <div className="flex items-center space-x-2">
              <span className="capitalize px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                {currentCard.category}
              </span>
              {isCurrentLearned && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1">
                  <Check size={12} /> Mastered
                </span>
              )}
              {isCurrentPractice && (
                <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-bold flex items-center gap-1">
                  <HelpCircle size={12} /> Needs Practice
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span>Card {currentIndex + 1} of {filteredItems.length}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredItems.length) * 100}%` }}
            />
          </div>

          {/* 3D Flip Card Element */}
          <div 
            className="relative w-full h-[360px] sm:h-[400px] perspective-1000 cursor-pointer select-none"
            onClick={handleFlip}
          >
            <div 
              className={`relative w-full h-full rounded-3xl transition-transform duration-500 transform-style-preserve-3d shadow-xl border border-slate-200/90 ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              
              {/* --- FRONT OF CARD --- */}
              <div className="absolute inset-0 w-full h-full bg-white rounded-3xl p-8 flex flex-col justify-between backface-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                    Target Word
                  </span>
                  <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                    <AudioButton
                      text={currentCard.word}
                      languageKey={currentLanguageId}
                      size="md"
                      variant="primary"
                    />
                  </div>
                </div>

                <div className="text-center space-y-3 my-auto">
                  <div className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    {currentCard.word}
                  </div>
                  
                  {/* Pronunciation guide */}
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold">
                    <Volume2 size={16} />
                    <span>Pronunciation: <strong>{currentCard.phonetic}</strong></span>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-slate-100 text-xs font-medium text-slate-400 flex items-center justify-center space-x-1.5">
                  <RotateCw size={14} className="text-indigo-500 animate-spin-slow" />
                  <span>Click card or Flip button below to reveal English translation</span>
                </div>
              </div>

              {/* --- BACK OF CARD --- */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between backface-hidden rotate-y-180">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 tracking-wider uppercase">
                    English Meaning
                  </span>
                  <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                    <AudioButton
                      text={currentCard.example || currentCard.word}
                      languageKey={currentLanguageId}
                      size="md"
                      variant="secondary"
                    />
                  </div>
                </div>

                <div className="text-center space-y-4 my-auto">
                  <div className="text-2xl sm:text-4xl font-extrabold text-amber-300 tracking-tight">
                    "{currentCard.meaning}"
                  </div>

                  {/* Example Sentence with Audio */}
                  {currentCard.example && (
                    <div 
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 max-w-lg mx-auto text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm sm:text-base font-bold text-white">
                            {currentCard.example}
                          </div>
                          {currentCard.examplePhonetic && (
                            <div className="text-xs text-indigo-200 mt-0.5">
                              {currentCard.examplePhonetic}
                            </div>
                          )}
                          <div className="text-xs sm:text-sm text-slate-300 mt-1 italic">
                            "{currentCard.exampleTranslation}"
                          </div>
                        </div>
                        <AudioButton
                          text={currentCard.example}
                          languageKey={currentLanguageId}
                          size="sm"
                          variant="secondary"
                        />
                      </div>
                    </div>
                  )}

                  {/* Notes / Tips */}
                  {currentCard.notes && (
                    <p className="text-xs text-indigo-200/90 max-w-md mx-auto line-clamp-2">
                      💡 <strong>Note:</strong> {currentCard.notes}
                    </p>
                  )}
                </div>

                <div className="text-center pt-3 border-t border-white/10 text-xs font-medium text-indigo-300 flex items-center justify-center space-x-1.5">
                  <RotateCw size={14} />
                  <span>Click card to flip back to target word</span>
                </div>
              </div>

            </div>
          </div>

          {/* Flashcard Action Control Buttons */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            
            {/* Practice Again Button */}
            <button
              onClick={handlePracticeAgain}
              className="py-3.5 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-2xs flex items-center justify-center space-x-2"
            >
              <HelpCircle size={18} className="text-amber-600" />
              <span>Practice Again</span>
            </button>

            {/* Flip Card Button */}
            <button
              onClick={handleFlip}
              className="py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md shadow-indigo-600/20 flex items-center justify-center space-x-2"
            >
              <RotateCw size={18} />
              <span>Flip Card</span>
            </button>

            {/* I Know This Button */}
            <button
              onClick={handleKnowThis}
              className="py-3.5 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-2xs flex items-center justify-center space-x-2"
            >
              <Check size={18} className="text-emerald-600 stroke-[2.5]" />
              <span>I Know This</span>
            </button>

          </div>

          {/* Deck Navigation & Utility Controls */}
          <div className="flex items-center justify-between pt-2 px-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center space-x-1"
                title="Previous card"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Prev</span>
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center space-x-1"
                title="Next card"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {/* Shuffle button */}
              <button
                onClick={handleShuffle}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center space-x-1.5"
                title="Shuffle cards"
              >
                <Shuffle size={16} />
                <span className="hidden sm:inline">Shuffle</span>
              </button>

              {/* Auto-play toggle */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                  isAutoPlaying
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                    : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
                title="Auto-play slideshow"
              >
                {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
                <span className="hidden sm:inline">{isAutoPlaying ? 'Pause' : 'Auto-Play'}</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default FlashcardsView;
