/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Music, Volume2, ShieldCheck, Stars, Flame, Compass } from 'lucide-react';
import { RomanticCanvas } from './components/RomanticCanvas';
import { RefilwePortrait } from './components/RefilwePortrait';
import { HeartbeatExperience } from './components/HeartbeatExperience';
import { LoveLetters } from './components/LoveLetters';
import { LoveReasons } from './components/LoveReasons';
import { StarConstellation } from './components/StarConstellation';
import { RomanticKeepsake } from './components/RomanticKeepsake';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { romanticAudio } from './services/romanticAudio';
import confetti from 'canvas-confetti';

export default function App() {
  const [totalKisses, setTotalKisses] = useState(128);
  const [activeTab, setActiveTab] = useState<'portrait' | 'letters' | 'heartbeat' | 'stars'>('portrait');
  const [secondsTogether, setSecondsTogether] = useState(14839200);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsTogether((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGlobalHeartTap = () => {
    romanticAudio.playChime(1.1);
    setTotalKisses((k) => k + 1);
    confetti({
      particleCount: 20,
      spread: 60,
      origin: { y: 0.25 },
      colors: ['#f43f5e', '#fbbf24', '#fda4af'],
    });
  };

  const scrollToSection = (id: string) => {
    romanticAudio.playChime(1.2);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0d0504] text-[#f7ece1] selection:bg-rose-700 selection:text-white font-body overflow-x-hidden pb-28">
      {/* Dynamic Background Petals & Bokeh Canvas */}
      <RomanticCanvas />

      {/* Atmospheric Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-b from-[#782613]/25 via-[#4a160c]/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-rose-900/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-700/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content Container (Mobile-first, constrained max-w-md for perfect mobile intimacy) */}
      <div className="relative z-20 max-w-md mx-auto pt-6 px-4 flex flex-col items-center">
        {/* Top Header Badge */}
        <div 
          onClick={handleGlobalHeartTap}
          className="cursor-pointer group flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#27110b]/80 border border-amber-500/30 backdrop-blur-md shadow-lg transition-all hover:border-amber-400/60 active:scale-95"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-[11px] font-semibold tracking-widest uppercase text-amber-200">
            A Love Sanctuary for Refilwe
          </span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 group-hover:scale-125 transition-transform" />
        </div>

        {/* Hero Romantic Declaration */}
        <header className="text-center mt-5 mb-6 px-2">
          <p className="font-script text-3xl sm:text-4xl text-amber-300 drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]">
            To My Beautiful Queen
          </p>

          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif-romance tracking-tight mt-1 bg-gradient-to-r from-[#ffe4d6] via-[#ffd29d] to-[#ffb3ba] bg-clip-text text-transparent">
            I Love You, Fifi
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-xs mx-auto mt-2.5 leading-relaxed font-garamond italic">
            "Your sweet kiss captured my soul, and every sunrise since has belonged completely to you, Refilwe."
          </p>

          {/* Quick Jump Pills for Mobile */}
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            <button
              onClick={() => scrollToSection('portrait-section')}
              className="px-3 py-1 rounded-full bg-[#220d09]/90 border border-amber-600/30 text-[11px] font-medium text-amber-200 hover:text-white transition-colors cursor-pointer"
            >
              Your Beauty
            </button>
            <button
              onClick={() => scrollToSection('heartbeat-section')}
              className="px-3 py-1 rounded-full bg-[#220d09]/90 border border-rose-600/30 text-[11px] font-medium text-rose-300 hover:text-white transition-colors cursor-pointer"
            >
              My Heartbeat
            </button>
            <button
              onClick={() => scrollToSection('letters-section')}
              className="px-3 py-1 rounded-full bg-[#220d09]/90 border border-amber-600/30 text-[11px] font-medium text-amber-200 hover:text-white transition-colors cursor-pointer"
            >
              Love Letters
            </button>
            <button
              onClick={() => scrollToSection('reasons-section')}
              className="px-3 py-1 rounded-full bg-[#220d09]/90 border border-rose-600/30 text-[11px] font-medium text-rose-300 hover:text-white transition-colors cursor-pointer"
            >
              Why I Love You
            </button>
          </div>
        </header>

        {/* Section 1: Refilwe's Visual Centerpiece */}
        <section id="portrait-section" className="w-full">
          <RefilwePortrait onKissSent={() => setTotalKisses((k) => k + 1)} />
        </section>

        {/* Eternity Counter Banner */}
        <div className="w-full max-w-sm mx-auto my-5 p-3.5 rounded-2xl bg-gradient-to-r from-[#210c08] via-[#1a0a07] to-[#210c08] border border-amber-900/30 flex items-center justify-around text-center backdrop-blur-md">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400">Total Kisses Sent</p>
            <p className="text-lg font-bold font-serif-romance text-rose-400">{totalKisses}</p>
          </div>
          <div className="h-7 w-[1px] bg-amber-900/40" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400">Endless Love</p>
            <p className="text-lg font-bold font-serif-romance text-amber-300">Infinite ∞</p>
          </div>
          <div className="h-7 w-[1px] bg-amber-900/40" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400">My Only One</p>
            <p className="text-lg font-bold font-serif-romance text-rose-300">Refilwe</p>
          </div>
        </div>

        {/* Section 2: Interactive Heartbeat Touch Experience */}
        <section id="heartbeat-section" className="w-full">
          <HeartbeatExperience />
        </section>

        {/* Section 3: Interactive Love Letters */}
        <section id="letters-section" className="w-full">
          <LoveLetters />
        </section>

        {/* Section 4: 100 Reasons Why I Love You Card Draw */}
        <section id="reasons-section" className="w-full">
          <LoveReasons />
        </section>

        {/* Section 5: The Constellation of Fifi */}
        <section id="stars-section" className="w-full">
          <StarConstellation />
        </section>

        {/* Section 6: Love Sealed & Keepsake Card */}
        <section id="keepsake-section" className="w-full">
          <RomanticKeepsake />
        </section>

        {/* Romantic Outro / Vow */}
        <footer className="w-full max-w-sm mx-auto my-8 text-center px-4">
          <div className="p-5 rounded-3xl bg-gradient-to-b from-[#240e09]/60 to-[#120604]/80 border border-amber-900/30 backdrop-blur-md">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500 mx-auto mb-2 animate-pulse" />
            <p className="font-script text-3xl text-amber-200">
              Forever Yours, Refilwe
            </p>
            <p className="text-xs text-stone-400 mt-1.5 leading-relaxed font-garamond italic">
              "No distance, no passage of time, and no shadow in this world could ever dim how deeply I love you. You are my today, my tomorrow, and my forever, Fifi."
            </p>
            <p className="text-[10px] uppercase tracking-widest text-amber-500/80 mt-3 font-semibold">
              Crafted With Unconditional Love · Always & Forever
            </p>
          </div>
        </footer>
      </div>

      {/* Floating Audio Player & Soundscape Controller */}
      <AudioPlayerBar />
    </div>
  );
}
