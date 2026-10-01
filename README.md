# 🌟 LinguaLearn — Modern Interactive Language Learning Web Application

> **College Project Submission**  
> **Course / Module:** Web Application Development / Software Engineering Project  
> **Application Name:** LinguaLearn  

---

## 📖 Project Overview

**LinguaLearn** is an interactive, responsive web application engineered to help language learners acquire new words, phrases, grammatical foundations, and conversational sentences in **Spanish**, **French**, **German**, **Japanese**, and **Telugu**. 

The application incorporates multi-sensory learning principles — combining visual cues, authentic native script, Romanized/phonetic pronunciation guides, browser-native **Text-to-Speech (TTS)** audio synthesis, interactive **3D flashcards**, active-recall **quizzes**, and comprehensive **progress analytics**.

---

## 🚀 Key Features & Syllabus Alignment

### 1. 🌐 Multi-Language Selection
- **Spanish (Español)** 🇪🇸: 548M+ speakers; greetings, core vocabulary, numbers, and `ser` vs `estar` grammar.
- **French (Français)** 🇫🇷: 300M+ speakers; café etiquette, travel phrases, numbers, and `être` conjugation.
- **German (Deutsch)** 🇩🇪: 130M+ speakers; articles (`der`, `die`, `das`), V2 word order, and conversational vocabulary.
- **Japanese (日本語)** 🇯🇵: Kanji & Kana with full Romaji romanization, polite copula `desu`, particles `wa`/`o`.
- **Telugu (తెలుగు)** 🇮🇳: Authentic Dravidian script + phonetic Romanization, respectful pronouns (`mīru` vs `nuvvu`), and SOV structure.
- Accessible directly on the **Home Screen** and via the global header language switcher modal.

### 2. 📊 Interactive Dashboard
- **Recommended Daily Lesson**: Dynamic daily lesson based on syllabus progression.
- **Daily Streak Tracker**: Visual consecutive-day streak counter with animated flame and motivational alerts.
- **Words Learned Metric**: Live ratio of mastered words to target vocabulary.
- **Quiz Performance Metric**: Average accuracy score across completed practice tests.
- **Mastery Level Badge**: Dynamic learner tier (*Beginner Explorer*, *Dedicated Learner*, *Conversationalist*, *Polyglot Master*).
- **Curated Learning Categories**: Direct launch into *Vocabulary*, *Common Phrases*, *Grammar*, *Numbers*, and *Greetings*.

### 3. 🃏 3D Interactive Flashcards
- Realistic **3D flip animation** toggling between target language and English translation.
- Displays target word, phonetic guide, English meaning, context sentence, and grammar notes.
- Direct **"I Know This"** button (marks word learned, triggers celebratory micro-animation, advances card).
- Direct **"Practice Again"** button (flags word for focused review).
- Filter by topic (*Vocabulary*, *Phrases*, *Grammar*, *Numbers*, *Greetings*) or by learning status (*All*, *New*, *Needs Practice*, *Mastered*).
- Card counter (`Card 3 of 15`), shuffle deck mode, and hands-free **Auto-Play** slideshow timer.

### 4. 🔊 Browser-Native Pronunciation (Text-to-Speech)
- Powered by the W3C **Web Speech API** (`window.speechSynthesis`).
- Configured with BCP-47 language codes:
  - Spanish: `es-ES`
  - French: `fr-FR`
  - German: `de-DE`
  - Japanese: `ja-JP`
  - Telugu: `te-IN`
- Interactive speaker buttons beside words, sentences, flashcards, quiz questions, and the vocabulary bank.
- Non-blocking audio playback with dynamic wave animation.

### 5. 🎯 Comprehensive Quizzes & Practice Tests
- **Multiple Modes**:
  - *Standard*: Target language word $\rightarrow$ English translation.
  - *Reverse*: English concept $\rightarrow$ Target language selection.
  - *Listening Challenge*: Audio prompt $\rightarrow$ Select correct translation.
  - *Mixed Challenge*: Dynamic blend of all formats.
- 4 multiple-choice options with instant feedback (correct green / wrong red).
- Detailed explanations explaining why the answer is correct.
- End-of-quiz score summary card, percentage score, accuracy rating, and confetti celebration on $\ge 80\%$.
- Question-by-question review drawer with replayable audio.
- "Try Again" and "Review Flashcards" quick restart buttons.

### 6. 📈 Detailed Learning Analytics & Word Bank
- **Category Mastery Breakdown**: Horizontal visual progress bars for each learning category.
- **Weekly Streak Calendar**: 7-day activity visualizer tracking daily study habits.
- **Quiz Score Trend Chart**: Graphical bar chart tracking scores across the last 5 tests.
- **Milestones & Achievements**: Unlocks badges such as *First Step*, *Dedicated Flame*, *Quiz Ace*, and *Vocab Champion*.
- **Searchable Vocabulary Bank (Glossary)**:
  - Search any word by foreign spelling, Romanization, or English meaning.
  - Filter by category.
  - Directly toggle learned/unlearned state.
  - Listen to pronunciation on demand.
- **Reset Progress Option**: Clean-slate reset utility with confirmation dialog for live project demonstrations.

### 7. 💾 LocalStorage Persistence
All learner data is saved across browser sessions:
- Selected active language
- Mastered word IDs map
- Words flagged for practice
- Completed structured lessons
- Comprehensive quiz history with timestamps and percentages
- Daily streak counter and last active date

---

## 🛠️ Technical Stack & Architecture

- **Frontend Library:** React 19 (Hooks, Context API, stateful components)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 + Custom 3D CSS transforms
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
- **Audio:** Web Speech API (`SpeechSynthesisUtterance`)
- **Data Architecture:** Modular JS data sets with zero external API dependencies

```
language-learning-ca/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AudioButton.jsx          # Speech synthesis audio trigger
│   │   ├── Dashboard.jsx            # Main dashboard & metrics
│   │   ├── FlashcardsView.jsx       # 3D interactive flashcard deck
│   │   ├── LanguageSelectorModal.jsx# Language chooser modal
│   │   ├── LessonsView.jsx          # Guided structured lessons & mini-checks
│   │   ├── Navbar.jsx               # Header & mobile navigation
│   │   ├── ProgressView.jsx         # Analytics, charts & word bank
│   │   └── QuizView.jsx             # Practice test engine
│   ├── context/
│   │   └── LanguageContext.jsx      # Global state & progress management
│   ├── data/
│   │   ├── languages.js             # Language metadata & category constants
│   │   ├── spanishData.js           # Spanish words, grammar & lessons
│   │   ├── frenchData.js            # French words, grammar & lessons
│   │   ├── germanData.js            # German words, grammar & lessons
│   │   ├── japaneseData.js          # Japanese Kanji, Romaji & lessons
│   │   ├── teluguData.js            # Telugu script, transliteration & lessons
│   │   └── index.js                 # Central aggregator & quiz generator
│   ├── utils/
│   │   ├── speech.js                # Web Speech API utility
│   │   └── storage.js               # localStorage persistence helpers
│   ├── App.css
│   ├── App.jsx                      # App root with tab navigation
│   ├── index.css                    # Tailwind v4 import & 3D card CSS
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm (version 9 or higher)

### Setup Instructions
1. Open terminal in the project directory:
   ```bash
   cd "language learning ca"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the local URL displayed in your terminal (typically `http://localhost:5173`) in your web browser.

5. To create an optimized production build:
   ```bash
   npm run build
   ```
