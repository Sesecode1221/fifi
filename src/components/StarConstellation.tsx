import React, { useState } from 'react';
import { Sparkles, Star, Award, RotateCcw } from 'lucide-react';
import { romanticAudio } from '../services/romanticAudio';
import confetti from 'canvas-confetti';

interface ConstellationStar {
  id: number;
  name: string;
  x: number; // percentage
  y: number; // percentage
  meaning: string;
}

const STARS: ConstellationStar[] = [
  { id: 1, name: 'F', x: 22, y: 35, meaning: 'Forever' },
  { id: 2, name: 'I', x: 40, y: 22, meaning: 'Inseparable' },
  { id: 3, name: 'F', x: 62, y: 24, meaning: 'Flawless' },
  { id: 4, name: 'I', x: 78, y: 38, meaning: 'Infinite' },
  { id: 5, name: '❤️', x: 50, y: 65, meaning: 'Refilwe My Heart' },
];

export const StarConstellation: React.FC = () => {
  const [activeStarIds, setActiveStarIds] = useState<number[]>([1]);
  const [completed, setCompleted] = useState(false);

  const handleStarClick = (star: ConstellationStar) => {
    if (!activeStarIds.includes(star.id)) {
      const nextActive = [...activeStarIds, star.id];
      setActiveStarIds(nextActive);
      romanticAudio.playChime(1.0 + nextActive.length * 0.15);

      if (nextActive.length === STARS.length) {
        setCompleted(true);
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#fde047', '#fb7185', '#ffffff'],
        });
      }
    }
  };

  const resetConstellation = () => {
    setActiveStarIds([1]);
    setCompleted(false);
    romanticAudio.playChime(0.9);
  };

  return (
    <div className="w-full max-w-sm mx-auto my-8 px-4">
      <div className="text-center mb-4">
        <span className="text-amber-300 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-300" />
          <span>Celestial Love</span>
        </span>
        <h2 className="text-2xl font-serif-romance text-amber-100 mt-1">
          The Constellation of Fifi
        </h2>
        <p className="text-xs text-stone-400 mt-1">
          Connect all 5 celestial stars to reveal our cosmic alignment.
        </p>
      </div>

      <div className="relative w-full aspect-[4/3] rounded-3xl bg-gradient-to-b from-[#12070e] via-[#1a090b] to-[#0c0406] border border-amber-500/20 backdrop-blur-xl shadow-2xl overflow-hidden p-3 select-none">
        {/* Subtle background star dust */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* SVG lines connecting active stars */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {activeStarIds.map((id, index) => {
            if (index === 0) return null;
            const prevStar = STARS.find((s) => s.id === activeStarIds[index - 1]);
            const currStar = STARS.find((s) => s.id === id);
            if (!prevStar || !currStar) return null;

            return (
              <line
                key={`${prevStar.id}-${currStar.id}`}
                x1={`${prevStar.x}%`}
                y1={`${prevStar.y}%`}
                x2={`${currStar.x}%`}
                y2={`${currStar.y}%`}
                stroke="#fbbf24"
                strokeWidth="2"
                strokeDasharray="4 2"
                className="animate-pulse"
                opacity="0.85"
              />
            );
          })}
        </svg>

        {/* Render Stars */}
        {STARS.map((star) => {
          const isActive = activeStarIds.includes(star.id);
          return (
            <button
              key={star.id}
              onClick={() => handleStarClick(star)}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group transition-all duration-300 cursor-pointer ${
                isActive ? 'scale-110' : 'hover:scale-105 opacity-60'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 shadow-[0_0_18px_rgba(251,191,36,0.9)] ring-2 ring-amber-200'
                    : 'bg-[#291316] text-amber-200/60 border border-amber-400/30'
                }`}
              >
                <span className="text-xs font-bold">{star.name}</span>
              </div>
              <span className={`text-[10px] tracking-wide mt-1 font-medium transition-colors ${isActive ? 'text-amber-200' : 'text-stone-500'}`}>
                {star.meaning}
              </span>
            </button>
          );
        })}

        {/* Completed overlay text */}
        {completed && (
          <div className="absolute inset-x-4 bottom-3 z-30 bg-rose-950/85 backdrop-blur-md border border-amber-400/40 p-2.5 rounded-2xl text-center animate-fade-in shadow-xl">
            <p className="font-script text-2xl text-amber-200">
              "Written in every star: I love you, Fifi"
            </p>
            <p className="text-[10px] text-stone-300 mt-0.5">
              Refilwe, our story was destined before time began.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3 px-1 text-xs text-stone-400">
        <span>Connected: {activeStarIds.length} / {STARS.length} stars</span>
        {activeStarIds.length > 1 && (
          <button
            onClick={resetConstellation}
            className="flex items-center gap-1 text-amber-300 hover:text-amber-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};
