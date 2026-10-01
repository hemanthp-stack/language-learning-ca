import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LessonsView from './components/LessonsView';
import FlashcardsView from './components/FlashcardsView';
import QuizView from './components/QuizView';
import ProgressView from './components/ProgressView';
import LanguageSelectorModal from './components/LanguageSelectorModal';
import { BookOpen, Heart, Sparkles, GraduationCap } from 'lucide-react';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategoryForPractice, setSelectedCategoryForPractice] = useState('all');
  const [activeLessonId, setActiveLessonId] = useState(null);

  const startLessonById = (lessonId) => {
    setActiveLessonId(lessonId);
    setActiveTab('lessons');
  };

  const handleSelectCategoryForPractice = (catId) => {
    setSelectedCategoryForPractice(catId);
    setActiveTab('flashcards');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Dynamic View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
        {activeTab === 'dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab} 
            setSelectedCategoryForPractice={handleSelectCategoryForPractice}
            startLessonById={startLessonById}
          />
        )}

        {activeTab === 'lessons' && (
          <LessonsView 
            activeLessonId={activeLessonId}
            onClearActiveLesson={() => setActiveLessonId(null)}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView 
            initialCategory={selectedCategoryForPractice} 
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView 
            setActiveTab={setActiveTab} 
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView />
        )}
      </main>

      {/* Language Selector Modal */}
      <LanguageSelectorModal />

      {/* College Project Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 text-center text-xs text-slate-500 mb-14 md:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              L
            </div>
            <span className="font-extrabold text-slate-800 text-sm">LinguaLearn</span>
            <span className="text-slate-400">• College Project Submission</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-600 font-medium">
            <span>Spanish • French • German • Japanese • Telugu</span>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-400">
            <span>Built with React & Web Speech API</span>
            <Sparkles size={12} className="text-amber-500" />
          </div>
        </div>
      </footer>

    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
