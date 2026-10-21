import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, Sparkles, Mic } from 'lucide-react';
import { romanticAudio } from '../services/romanticAudio';

export const AudioPlayerBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const togglePlay = () => {
    setHasInteracted(true);
    const playing = romanticAudio.toggleMusic();
    setIsPlaying(playing);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    romanticAudio.setMuted(nextMuted);
  };

  const handleWhisperDeclaration = () => {
    setHasInteracted(true);
    romanticAudio.speakLoveWhisper("Refilwe, my heart beats only for you. I love you, Fifi, more than words could ever say.");
  };

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-2.5 bg-[#1b0a07]/90 backdrop-blur-xl border border-amber-500/30 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.7)] max-w-sm w-full">
        {/* Left: Serenade status & animated visualizer */}
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-rose-700 to-amber-600 flex items-center justify-center shrink-0">
            <Music className={`w-4 h-4 text-white ${isPlaying ? 'animate-bounce' : ''}`} />
          </div>

          <div className="truncate">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-amber-100 truncate">
                Serenade for Refilwe
              </span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-rose-400 rounded-full animate-music-bar-1 h-2" />
                  <span className="w-0.5 bg-amber-400 rounded-full animate-music-bar-2 h-3" />
                  <span className="w-0.5 bg-rose-400 rounded-full animate-music-bar-3 h-1.5" />
                </div>
              )}
            </div>
            <p className="text-[10px] text-amber-300/70 truncate">
              {isPlaying ? 'Playing Romantic Chords' : 'Tap to hear our melody'}
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Whisper button */}
          <button
            onClick={handleWhisperDeclaration}
            title="Hear Love Whisper"
            className="p-2 rounded-full text-rose-300 hover:text-rose-100 hover:bg-rose-950/50 transition-colors cursor-pointer"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Mute button */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="p-2 rounded-full text-stone-300 hover:text-amber-200 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Play/Pause primary button */}
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md hover:from-rose-500 hover:to-amber-500 transition-all active:scale-95 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
