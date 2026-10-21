import React, { useState } from 'react';
import { Mail, Heart, Sparkles, X, Volume2, Check } from 'lucide-react';
import { romanticAudio } from '../services/romanticAudio';

interface LoveLetter {
  id: string;
  tag: string;
  title: string;
  preview: string;
  fullLetter: string[];
  signOff: string;
}

const LETTERS: LoveLetter[] = [
  {
    id: 'kiss',
    tag: 'Chapter I · The Kiss',
    title: 'The Kiss That Stole My Soul',
    preview: 'When you blow that sweet kiss, time stands still and the entire universe fades...',
    fullLetter: [
      'Refilwe, my love,',
      'Look at you in that photo—standing beneath the wide blue sky with that playful, tender kiss resting gently on your fingertips. Every time I see it, my breath catches in my chest just like the very first day.',
      'You have this effortless way of lighting up everything around you. Your elegance in that warm terracotta dress, the gentle gleam in your eyes, and that sweet gesture that was sent straight into my soul.',
      'That kiss wasn’t just captured by a camera; it was etched permanently onto my heart. You are my most stunning sight, my favourite daydream, and my most cherished reality.',
    ],
    signOff: 'Forever captivated by you, Fifi',
  },
  {
    id: 'sunshine',
    tag: 'Chapter II · My Sunshine',
    title: 'You Are My Warmth',
    preview: 'No matter how chaotic the world gets, your voice is my peace and your laugh is my melody...',
    fullLetter: [
      'My dearest Fifi,',
      'The sun in the sky has nothing on the warmth you bring into my life. On my hardest days, just thinking of your smile settles the storm inside me.',
      'You possess a rare kind of beauty—one that shines from deep within your spirit, in the way you care, in the gentle rhythm of your laughter, and in the unshakeable strength of your character.',
      'Loving you is the easiest, most natural thing I have ever done. I thank the stars every single day that Refilwe is the queen of my heart.',
    ],
    signOff: 'Endlessly yours, with all my soul',
  },
  {
    id: 'promises',
    tag: 'Chapter III · Sacred Promises',
    title: 'My Unconditional Vows',
    preview: 'To stand by you in every season, to guard your smile, and to love you louder every day...',
    fullLetter: [
      'My precious Refilwe,',
      'I promise you a love that does not waver when the skies turn grey. I promise to be your safest shelter, your loudest cheerleader, and your constant hand to hold.',
      'Whenever you doubt yourself, I will remind you of how extraordinary you are. Whenever you achieve greatness, I will celebrate you till the world hears. And whenever you simply need to rest, my arms will be your home.',
      'You will never have to wonder if you are loved enough, cherished enough, or chosen enough—because every sunrise, my choice will always be you.',
    ],
    signOff: 'Your protector, your partner, your biggest fan',
  },
  {
    id: 'forever',
    tag: 'Chapter IV · The Truth',
    title: 'Why It Could Only Ever Be You',
    preview: 'Out of billions of souls, my heart only recognises one rhythm: Refilwe...',
    fullLetter: [
      'Fifi, my heart,',
      'They say home is a place, but since knowing you, I learned home is a person. It is in the sound of your name on my lips, in the peace I feel when we talk, and in the quiet certainty that you are my destiny.',
      'I love the way your mind works, your tender heart, and the beauty that radiates from you effortlessly.',
      'I love you, Fifi. Yesterday, today, tomorrow, and through every lifetime written in the stars.',
    ],
    signOff: 'With an eternal, unwavering love',
  },
];

export const LoveLetters: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(null);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  const openLetter = (letter: LoveLetter) => {
    setSelectedLetter(letter);
    romanticAudio.playChime(1.2);
  };

  const closeLetter = () => {
    setSelectedLetter(null);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsReadingAloud(false);
  };

  const handleReadAloud = (letter: LoveLetter) => {
    setIsReadingAloud(true);
    const spokenText = `${letter.title}. ${letter.fullLetter.join(' ')} ${letter.signOff}. I love you, Fifi.`;
    romanticAudio.speakLoveWhisper(spokenText);
  };

  return (
    <div className="w-full max-w-sm mx-auto my-8 px-4">
      <div className="text-center mb-6">
        <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Written From The Heart</span>
        </span>
        <h2 className="text-2xl font-serif-romance text-amber-100 mt-1">
          Love Letters for Refilwe
        </h2>
        <p className="text-xs text-stone-400 mt-1">
          Tap each wax-sealed envelope to unfold words meant only for you.
        </p>
      </div>

      {/* Grid of Interactive Envelopes */}
      <div className="grid grid-cols-1 gap-3.5">
        {LETTERS.map((letter, idx) => (
          <div
            key={letter.id}
            onClick={() => openLetter(letter)}
            className="group relative rounded-2xl p-4 bg-gradient-to-r from-[#24110b] via-[#1c0c08] to-[#24110b] border border-amber-900/40 hover:border-amber-500/50 backdrop-blur-md shadow-lg cursor-pointer transition-all duration-300 hover:translate-y-[-2px] active:scale-[0.98]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-400">
                  {letter.tag}
                </span>
                <h3 className="text-base font-serif-romance text-amber-100 group-hover:text-amber-300 transition-colors mt-0.5">
                  {letter.title}
                </h3>
                <p className="text-xs text-stone-300/80 line-clamp-2 mt-1 leading-relaxed">
                  {letter.preview}
                </p>
              </div>

              {/* Wax Seal Icon */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-700 to-amber-700 flex items-center justify-center shadow-[0_2px_10px_rgba(225,29,72,0.4)] border border-amber-400/40 shrink-0 group-hover:rotate-12 transition-transform">
                <Heart className="w-4 h-4 fill-amber-100 text-amber-100" />
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-amber-950/60 flex items-center justify-between text-[11px] text-amber-300/80">
              <span className="flex items-center gap-1 font-medium">
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                Tap to read letter
              </span>
              <span className="font-script text-base text-rose-300">Fifi & My Heart</span>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal with Romantic Parchment Design */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#fbf4ea] to-[#f4e6d4] text-[#2c1810] p-6 shadow-2xl border-2 border-amber-300/60">
            {/* Close Button */}
            <button
              onClick={closeLetter}
              className="absolute top-4 right-4 p-2 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-[#2c1810] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="text-center pt-2 pb-4 border-b border-amber-900/20">
              <span className="text-[11px] uppercase tracking-widest text-rose-800 font-semibold">
                {selectedLetter.tag}
              </span>
              <h3 className="text-2xl font-serif-romance text-[#1e0d07] mt-1">
                {selectedLetter.title}
              </h3>
            </div>

            {/* Letter Content */}
            <div className="py-5 space-y-3.5 font-garamond text-base leading-relaxed text-[#26130b]">
              {selectedLetter.fullLetter.map((p, i) => (
                <p key={i} className="first-letter:text-2xl first-letter:font-serif-romance first-letter:text-rose-800">
                  {p}
                </p>
              ))}
            </div>

            {/* Sign Off */}
            <div className="pt-3 pb-4 border-t border-amber-900/20 text-right">
              <p className="font-script text-3xl text-rose-900">
                {selectedLetter.signOff}
              </p>
            </div>

            {/* Read Aloud & Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleReadAloud(selectedLetter)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-900/15 hover:bg-rose-900/25 text-rose-950 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isReadingAloud ? 'Reading softly...' : 'Listen to Whisper'}</span>
              </button>

              <button
                onClick={closeLetter}
                className="px-4 py-1.5 bg-rose-800 hover:bg-rose-900 text-white rounded-xl text-xs font-semibold shadow transition-colors cursor-pointer"
              >
                Keep in Heart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
