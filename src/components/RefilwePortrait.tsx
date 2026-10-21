import React, { useState, useRef } from 'react';
import { Heart, Sparkles, Sun, Moon, Camera, Flame } from 'lucide-react';
import { romanticAudio } from '../services/romanticAudio';
import confetti from 'canvas-confetti';

interface RefilwePortraitProps {
  onKissSent?: () => void;
}

export const RefilwePortrait: React.FC<RefilwePortraitProps> = ({ onKissSent }) => {
  const [filterMode, setFilterMode] = useState<'sunlit' | 'velvet' | 'polaroid'>('sunlit');
  const [loveCount, setLoveCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [tapHeartEffect, setTapHeartEffect] = useState<{ id: number; x: number; y: number }[]>([]);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleImageTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    // Get tap coordinate relative to card
    const rect = cardRef.current?.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const relX = rect ? clientX - rect.left : 150;
    const relY = rect ? clientY - rect.top : 200;

    const newHeart = {
      id: Date.now() + Math.random(),
      x: relX,
      y: relY,
    };

    setTapHeartEffect((prev) => [...prev.slice(-8), newHeart]);
    setTimeout(() => {
      setTapHeartEffect((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    setLoveCount((c) => c + 1);
    romanticAudio.playChime(1.1);

    // Haptic feedback on supported mobile devices
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(35);
    }

    if (onKissSent) {
      onKissSent();
    }
  };

  const handleBurstKisses = () => {
    romanticAudio.playChime(1.3);
    setLoveCount((c) => c + 10);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.45 },
      colors: ['#f43f5e', '#fb7185', '#fbbf24', '#fda4af', '#fef08a'],
      shapes: ['circle'],
      scalar: 1.1,
    });
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-sm mx-auto px-4 select-none">
      {/* Ambient Heartbeat Glow Backdrop matching her dress and the sunshine */}
      <div 
        className="absolute -inset-4 rounded-[40px] opacity-75 blur-2xl transition-all duration-700 pointer-events-none"
        style={{
          background:
            filterMode === 'velvet'
              ? 'radial-gradient(circle, rgba(225, 29, 72, 0.35) 0%, rgba(136, 19, 55, 0.25) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(225, 29, 72, 0.25) 50%, rgba(67, 20, 7, 0.1) 80%)',
        }}
      />

      {/* Main Portrait Frame Card */}
      <div
        ref={cardRef}
        onClick={handleImageTap}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 transform active:scale-[0.98] ${
          filterMode === 'polaroid'
            ? 'bg-[#fffaf0] p-3.5 pb-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#e2d5c5]'
            : 'border border-amber-500/30 bg-gradient-to-b from-[#2e1913]/90 to-[#190a07]/90 backdrop-blur-xl p-2.5 shadow-[0_20px_60px_rgba(245,158,11,0.2)]'
        }`}
      >
        {/* Floating Flying Hearts on Tap */}
        {tapHeartEffect.map((h) => (
          <div
            key={h.id}
            className="absolute pointer-events-none z-30 animate-float-fade"
            style={{ left: `${h.x}px`, top: `${h.y}px` }}
          >
            <div className="flex items-center gap-1 bg-rose-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-rose-400/40 shadow-lg text-xs font-semibold text-rose-100">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
              <span>I Love You Fifi</span>
            </div>
          </div>
        ))}

        {/* Photo Container */}
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-950">
          <img
            src="/assets/aistudio/WhatsApp_Image_2026-10-21_at_10.26.35_PM_cb249192.jpeg"
            alt="Refilwe (Fifi) - My Love"
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              filterMode === 'velvet'
                ? 'brightness-95 contrast-110 saturate-125 sepia-[0.15]'
                : filterMode === 'polaroid'
                ? 'contrast-105 saturate-110'
                : 'brightness-105 saturate-115'
            } ${isHovered ? 'scale-105' : 'scale-100'}`}
          />

          {/* Dynamic Light Gradient Overlay */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
              filterMode === 'velvet'
                ? 'bg-gradient-to-t from-[#1b0805]/80 via-transparent to-amber-950/20'
                : 'bg-gradient-to-t from-[#180a06]/60 via-transparent to-amber-500/10'
            }`}
          />

          {/* Romantic Badge: Blowing a kiss */}
          <div className="absolute top-3 left-3 bg-[#1e0e0a]/75 backdrop-blur-md border border-amber-400/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-[11px] font-medium tracking-wide text-amber-100">
              Your sweet kiss steals my soul
            </span>
          </div>

          {/* Interactive Tap Prompt Overlay */}
          <div className="absolute bottom-3 right-3 bg-rose-950/80 backdrop-blur-md border border-rose-400/30 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-bounce" />
            <span className="text-[10px] font-medium text-rose-200">
              Tap photo · {loveCount} {loveCount === 1 ? 'kiss' : 'kisses'}
            </span>
          </div>
        </div>

        {/* Polaroid Inscription if in polaroid mode */}
        {filterMode === 'polaroid' && (
          <div className="pt-3 px-2 text-center">
            <p className="font-script text-2xl text-stone-800 tracking-wide">
              Refilwe, the love of my life
            </p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-0.5">
              Forever & Always · Fifi
            </p>
          </div>
        )}
      </div>

      {/* Interactive Photo Mode & Love Controls */}
      <div className="flex items-center justify-between w-full mt-4 px-1">
        {/* Style switchers */}
        <div className="flex items-center gap-1 bg-[#23120d]/80 backdrop-blur-md border border-amber-900/40 p-1 rounded-xl">
          <button
            onClick={() => {
              setFilterMode('sunlit');
              romanticAudio.playChime(1.0);
            }}
            title="Golden Sunlight Mode"
            className={`p-2 rounded-lg transition-all ${
              filterMode === 'sunlit'
                ? 'bg-amber-600/30 text-amber-300 shadow-sm'
                : 'text-stone-400 hover:text-amber-200'
            }`}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setFilterMode('velvet');
              romanticAudio.playChime(1.1);
            }}
            title="Candlelight Velvet Mode"
            className={`p-2 rounded-lg transition-all ${
              filterMode === 'velvet'
                ? 'bg-rose-900/40 text-rose-300 shadow-sm'
                : 'text-stone-400 hover:text-rose-200'
            }`}
          >
            <Moon className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setFilterMode('polaroid');
              romanticAudio.playChime(1.2);
            }}
            title="Keepsake Polaroid Frame"
            className={`p-2 rounded-lg transition-all ${
              filterMode === 'polaroid'
                ? 'bg-amber-200/20 text-amber-100 shadow-sm'
                : 'text-stone-400 hover:text-amber-200'
            }`}
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Send Kiss Burst Button */}
        <button
          onClick={handleBurstKisses}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-rose-900/30 transition-transform active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>Shower Fifi with Love</span>
        </button>
      </div>
    </div>
  );
};
