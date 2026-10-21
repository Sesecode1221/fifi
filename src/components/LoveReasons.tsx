import React, { useState } from 'react';
import { Heart, Sparkles, RefreshCw, BookmarkCheck } from 'lucide-react';
import { romanticAudio } from '../services/romanticAudio';
import confetti from 'canvas-confetti';

const REASONS = [
  "The breathtaking way you blow kisses, melting all my worries in a single second.",
  "Your warm, enchanting smile that outshines the brightest midday sun.",
  "How stunning you look in that terracotta dress with your effortless grace.",
  "The sweet sound of your voice that instantly brings peace to my spirit.",
  "The quiet confidence in your eyes that inspires me every single day.",
  "Your tender heart that always cares deeply and loves genuinely.",
  "The playful laughter we share that nobody else in the world understands.",
  "How proud I feel simply saying your name: Refilwe.",
  "The way you make the simplest ordinary moments feel like poetry.",
  "Because no matter where I look, you will always be the most beautiful woman to me.",
  "The gentle warmth you radiate that makes any room feel like home.",
  "The depth of your soul and the strength you hold with such poise.",
  "Because loving you, Fifi, is the easiest truth my heart has ever known.",
  "The spark in your gaze whenever you are excited or passionate.",
  "How you understand me even in the silence between our words.",
  "Your natural elegance, your style, and the way you carry yourself.",
  "Because you are my first thought at sunrise and my warmest comfort at night.",
  "The way your sweet presence turns heavy days into light.",
  "Because my favourite place in this entire world is right beside you.",
  "Every dream I build for tomorrow has your smile right in the center.",
  "How your kiss feels like coming home after a long journey.",
  "Your infectious joy that makes everyone around you want to smile.",
  "Because you are not just my love—you are my greatest answered prayer.",
  "The pure kindness in your soul that you give without asking for anything in return.",
  "Because out of eight billion people, it will always be you, Refilwe."
];

export const LoveReasons: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [savedCount, setSavedCount] = useState(1);

  const drawNewReason = () => {
    setIsFlipping(true);
    romanticAudio.playChime(1.15);

    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * REASONS.length);
      while (nextIndex === currentIndex && REASONS.length > 1) {
        nextIndex = Math.floor(Math.random() * REASONS.length);
      }
      setCurrentIndex(nextIndex);
      setIsFlipping(false);
    }, 250);
  };

  const handleSaveToHeart = () => {
    setSavedCount((c) => c + 1);
    romanticAudio.playChime(1.4);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fbbf24', '#ffffff'],
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto my-8 px-4">
      <div className="text-center mb-5">
        <span className="text-rose-400 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Heart className="w-3.5 h-3.5 fill-rose-400" />
          <span>Endless Devotion</span>
        </span>
        <h2 className="text-2xl font-serif-romance text-amber-100 mt-1">
          Why I Love You, Fifi
        </h2>
        <p className="text-xs text-stone-400 mt-1">
          A collection of eternal truths about you, Refilwe.
        </p>
      </div>

      {/* Interactive Card */}
      <div className="relative rounded-3xl p-6 bg-gradient-to-b from-[#2a140d]/90 to-[#170906]/90 border border-amber-600/30 backdrop-blur-xl shadow-2xl min-h-[220px] flex flex-col justify-between transition-all duration-300">
        {/* Subtle Card Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full pointer-events-none" />

        {/* Top bar of card */}
        <div className="flex items-center justify-between border-b border-amber-900/30 pb-3">
          <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">
            Reason #{currentIndex + 1}
          </span>
          <span className="font-script text-xl text-rose-300">
            Forever Refilwe
          </span>
        </div>

        {/* Center Reason Body with Flip Animation */}
        <div className={`my-4 py-2 transition-opacity duration-200 ${isFlipping ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <p className="font-garamond text-lg leading-relaxed text-[#fbf0e4] text-center italic">
            "{REASONS[currentIndex]}"
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-amber-900/30">
          <button
            onClick={handleSaveToHeart}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3a1a11]/80 hover:bg-[#4a2217] text-amber-200 rounded-xl text-xs font-medium border border-amber-500/20 transition-colors cursor-pointer"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Cherish ({savedCount})</span>
          </button>

          <button
            onClick={drawNewReason}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFlipping ? 'animate-spin' : ''}`} />
            <span>Draw Another</span>
          </button>
        </div>
      </div>
    </div>
  );
};
