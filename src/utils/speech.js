// Web Speech API text-to-speech helper with multi-language fallback

const LANGUAGE_VOICE_CODES = {
  spanish: 'es-ES',
  french: 'fr-FR',
  german: 'de-DE',
  japanese: 'ja-JP',
  telugu: 'te-IN'
};

/**
 * Check if speech synthesis is supported
 */
export const isSpeechSynthesisSupported = () => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

/**
 * Play pronunciation for a given text and language
 * @param {string} text - The word or sentence to pronounce
 * @param {string} languageKey - 'spanish' | 'french' | 'german' | 'japanese' | 'telugu'
 * @param {object} options - rate, pitch, onStart, onEnd, onError
 */
export const speakText = (text, languageKey = 'spanish', options = {}) => {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis not supported in this browser.');
    if (options.onError) options.onError(new Error('Speech synthesis not supported'));
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const langCode = LANGUAGE_VOICE_CODES[languageKey] || 'en-US';
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  utterance.rate = options.rate || 0.9; // Slightly slower for clarity in learning
  utterance.pitch = options.pitch || 1.0;

  // Try to find a matching voice
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    const matchingVoice = voices.find(
      (voice) => voice.lang.toLowerCase() === langCode.toLowerCase() ||
                 voice.lang.toLowerCase().startsWith(langCode.substring(0, 2))
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
  }

  if (options.onStart) utterance.onstart = options.onStart;
  if (options.onEnd) utterance.onend = options.onEnd;
  if (options.onError) utterance.onerror = options.onError;

  window.speechSynthesis.speak(utterance);
  return true;
};

/**
 * Preload voices if needed
 */
export const preloadVoices = () => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.getVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }
};
