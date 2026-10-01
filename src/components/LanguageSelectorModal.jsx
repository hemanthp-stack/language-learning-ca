import React from 'react';
import { X, Check, Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGES } from '../data';
import AudioButton from './AudioButton';

const LanguageSelectorModal = () => {
  const { currentLanguageId, selectLanguage, isLanguageModalOpen, setIsLanguageModalOpen } = useLanguage();

  if (!isLanguageModalOpen) return null;

  const handleSelect = (langId) => {
    selectLanguage(langId);
    setIsLanguageModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/40">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-sm">
              <Globe size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Choose a Language</h2>
              <p className="text-xs text-slate-500">Select any language to switch your learning dashboard immediately</p>
            </div>
          </div>
          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Language Grid */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-3.5">
          {LANGUAGES.map((lang) => {
            const isSelected = lang.id === currentLanguageId;
            return (
              <div
                key={lang.id}
                onClick={() => handleSelect(lang.id)}
                className={`group relative p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70'
                }`}
              >
                {/* Left: Flag and Info */}
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="text-4xl select-none flex-shrink-0 drop-shadow-sm">
                    {lang.flag}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {lang.name}
                      </span>
                      <span className="text-sm font-medium text-slate-500">
                        • {lang.nativeName}
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white shadow-xs">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                      {lang.description}
                    </p>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-slate-500">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 font-medium text-slate-600">
                        {lang.speakers}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="font-medium text-slate-500">
                        {lang.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Sample Audio & Selection Indicator */}
                <div className="flex items-center justify-between sm:justify-end space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div 
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-white border border-slate-200 shadow-2xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs text-slate-600 font-medium truncate max-w-[120px] sm:max-w-[160px]">
                      "{lang.greetingSample}"
                    </span>
                    <AudioButton
                      text={lang.greetingSample}
                      languageKey={lang.id}
                      size="sm"
                      variant="ghost"
                    />
                  </div>

                  <div className="flex-shrink-0">
                    {isSelected ? (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                        <Check size={18} strokeWidth={2.5} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-slate-300 group-hover:border-indigo-400 flex items-center justify-center transition-colors">
                        <div className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-indigo-300 transition-colors" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-500" />
            Switch anytime — all your progress across all languages is saved automatically!
          </span>
          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectorModal;
