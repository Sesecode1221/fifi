import React, { useState, useRef, useEffect } from 'react';
import { Heart, Activity, Sparkles, Volume2 } from 'lucide-react';
import { romanticAudio } from '../services/romanticAudio';
import confetti from 'canvas-confetti';

export const HeartbeatExperience: React.FC = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 100
  const [bpm, setBpm] = useState(74);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<number | null>(null);
  const beatIntervalRef = useRef<number | null>(null);

  const startHeartbeat = () => {
    setIsHolding(true);
    setCompleted(false);

    // Initial beat immediately
    romanticAudio.playHeartbeat(0.45);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([70, 70, 50, 420]);
    }

    let progress = 0;
    let currentBpm = 74;

    // Progress timer
    timerRef.current = window.setInterval(() => {
      progress += 2;
      setHoldProgress(Math.min(100, progress));

      // Accelerate BPM
      currentBpm = Math.min(138, 74 + Math.floor(progress * 0.65));
      setBpm(currentBpm);

      if (progress >= 100) {
        clearInterval(timerRef.current!);
        clearInterval(beatIntervalRef.current!);
        setCompleted(true);
        romanticAudio.playChime(1.4);
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#ffffff'],
        });
      }
    }, 90);

    // Dynamic heartbeat rhythm
    const beatCycle = () => {
      romanticAudio.playHeartbeat(0.5);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([80, 80, 60, 380]);
      }
    };

    beatIntervalRef.current = window.setInterval(beatCycle, 780);
  };

  const stopHeartbeat = () => {
    setIsHolding(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (beatIntervalRef.current) {
      clearInterval(beatIntervalRef.current);
      beatIntervalRef.current = null;
    }
    if (!completed) {
      setHoldProgress(0);
      setBpm(74);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (beatIntervalRef.current) clearInterval(beatIntervalRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto my-6 px-4">
      <div className="relative rounded-3xl p-6 bg-gradient-to-b from-[#25100b]/90 to-[#150704]/90 border border-rose-500/20 backdrop-blur-xl shadow-xl overflow-hidden text-center">
        {/* Glow behind the heart */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 pointer-events-none ${
            isHolding ? 'w-64 h-64 bg-rose-600/35 blur-3xl scale-125' : 'w-36 h-36 bg-amber-600/15 blur-2xl'
          }`}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Tactile Heart Connection</span>
          </div>

          <h3 className="text-xl font-semibold font-serif-romance text-amber-100 mb-1">
            Feel My Heart Beat for You
          </h3>

          <p className="text-xs text-stone-300 max-w-xs mb-5">
            Hold your finger on the heart below. Feel and hear every thump dedicated to you, Refilwe.
          </p>

          {/* Interactive Hold Button */}
          <div className="relative my-2">
            {/* Circular Progress Ring */}
            <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-stone-800"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-rose-500 transition-all duration-100 ease-out"
                strokeWidth="4"
                strokeDasharray={276.4}
                strokeDashoffset={276.4 - (276.4 * holdProgress) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Touch Target Heart */}
            <button
              onMouseDown={startHeartbeat}
              onMouseUp={stopHeartbeat}
              onTouchStart={(e) => {
                e.preventDefault();
                startHeartbeat();
              }}
              onTouchEnd={stopHeartbeat}
              className={`absolute inset-3 rounded-full flex flex-col items-center justify-center transition-all duration-300 select-none cursor-pointer ${
                isHolding
                  ? 'bg-rose-600 scale-105 shadow-[0_0_35px_rgba(244,63,94,0.7)] text-white'
                  : 'bg-gradient-to-br from-[#3b150e] to-[#1f0905] border border-rose-500/30 text-rose-300 hover:border-rose-400/60'
              }`}
            >
              <Heart
                className={`w-12 h-12 transition-transform duration-200 fill-current ${
                  isHolding ? 'scale-125 animate-ping-short' : 'scale-100'
                }`}
              />
              <span className="text-[11px] font-semibold mt-1 tracking-wide">
                {isHolding ? 'HOLDING...' : 'HOLD ME'}
              </span>
            </button>
          </div>

          {/* Dynamic BPM & Live Emotion */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1a0a07] border border-stone-800 rounded-full">
              <span className="text-xs font-mono text-rose-400 font-bold">{bpm}</span>
              <span className="text-[10px] text-stone-400">BPM</span>
            </div>
            <div className="text-xs text-amber-200/90 font-medium italic">
              {holdProgress === 0 && 'Ready to beat for Refilwe'}
              {holdProgress > 0 && holdProgress < 40 && 'My pulse quickens...'}
              {holdProgress >= 40 && holdProgress < 80 && 'Every beat whispers "Fifi"...'}
              {holdProgress >= 80 && holdProgress < 100 && 'You have my whole heart!'}
              {holdProgress === 100 && 'Forever in sync with you! ❤️'}
            </div>
          </div>

          {completed && (
            <div className="mt-4 p-3 bg-rose-950/60 border border-rose-500/40 rounded-2xl animate-fade-in">
              <p className="font-script text-2xl text-rose-200">
                "I love you with every beat, Fifi"
              </p>
              <p className="text-[11px] text-amber-200/80 mt-1">
                From the first second until the end of time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
