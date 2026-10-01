import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakText, isSpeechSynthesisSupported } from '../utils/speech';

/**
 * Reusable Text-to-Speech audio button
 */
const AudioButton = ({
  text,
  languageKey = 'spanish',
  size = 'md',
  variant = 'primary',
  className = '',
  title = 'Listen to pronunciation'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isSupported = isSpeechSynthesisSupported();

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22
  };

  const variantClasses = {
    primary: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 active:scale-95 border border-indigo-200',
    secondary: 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-sm active:scale-95',
    ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800 active:scale-95',
    accent: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 active:scale-95'
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    if (!text || isPlaying) return;

    setIsPlaying(true);
    speakText(text, languageKey, {
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  if (!isSupported) {
    return (
      <button
        type="button"
        disabled
        title="Speech synthesis not supported on this device"
        className={`inline-flex items-center justify-center rounded-full opacity-40 cursor-not-allowed ${sizeClasses[size]} ${className}`}
      >
        <VolumeX size={iconSizes[size]} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      title={title}
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 ${
        sizeClasses[size]
      } ${variantClasses[variant] || variantClasses.primary} ${
        isPlaying ? 'ring-2 ring-indigo-500 ring-offset-1 scale-105 animate-pulse bg-indigo-100 text-indigo-700' : ''
      } ${className}`}
      aria-label={`Pronounce ${text}`}
    >
      <Volume2
        size={iconSizes[size]}
        className={isPlaying ? 'animate-bounce' : ''}
      />
    </button>
  );
};

export default AudioButton;
