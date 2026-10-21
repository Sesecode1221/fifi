import React, { useState, useRef } from 'react';
import { Heart, Sparkles, Download, CheckCircle, Share2 } from 'lucide-react';
import { romanticAudio } from '../services/romanticAudio';
import confetti from 'canvas-confetti';

export const RomanticKeepsake: React.FC = () => {
  const [hasSentLove, setHasSentLove] = useState(false);
  const [loveNote, setLoveNote] = useState('');
  const [notesList, setNotesList] = useState<string[]>([
    "You are my whole world, Refilwe! ❤️",
    "Fifi, loving you is my greatest blessing."
  ]);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);

  const handleSendLoveBack = () => {
    setHasSentLove(true);
    romanticAudio.playChime(1.5);
    romanticAudio.playHeartbeat(0.6);

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#e11d48', '#f43f5e', '#fbbf24', '#f59e0b', '#ffffff'],
    });

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([100, 100, 150, 100, 200]);
    }
  };

  const handleAddCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loveNote.trim()) return;
    setNotesList((prev) => [loveNote.trim(), ...prev]);
    setLoveNote('');
    romanticAudio.playChime(1.2);
    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#fb7185', '#fbbf24'],
    });
  };

  const downloadDigitalKeepsake = () => {
    setIsGeneratingCard(true);
    romanticAudio.playChime(1.3);

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1100;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw luxury card background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, 1100);
    bgGradient.addColorStop(0, '#1c0a06');
    bgGradient.addColorStop(0.5, '#2b120c');
    bgGradient.addColorStop(1, '#150604');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 800, 1100);

    // Golden frame border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 740, 1040);
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, 40, 720, 1020);

    // Title
    ctx.fillStyle = '#fef3c7';
    ctx.font = 'italic 46px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('Forever Yours, Refilwe', 400, 110);

    ctx.fillStyle = '#f43f5e';
    ctx.font = '22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('— I LOVE YOU FIFI —', 400, 155);

    // Load and draw image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/aistudio/WhatsApp_Image_2026-10-21_at_10.26.35_PM_cb249192.jpeg';
    img.onload = () => {
      // Draw image with rounded corners
      const imgX = 90;
      const imgY = 190;
      const imgW = 620;
      const imgH = 680;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgW, imgH, 24);
      ctx.clip();
      ctx.drawImage(img, imgX, imgY, imgW, imgH);
      ctx.restore();

      // Image border
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgW, imgH, 24);
      ctx.stroke();

      // Romantic quote below image
      ctx.fillStyle = '#fef3c7';
      ctx.font = 'italic 34px "Great Vibes", cursive, Georgia';
      ctx.fillText('"The sweet kiss that captured my soul forever."', 400, 930);

      ctx.fillStyle = '#fed7aa';
      ctx.font = '18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('With every beat of my heart · For Refilwe (Fifi)', 400, 980);

      ctx.fillStyle = '#9a3412';
      ctx.font = '14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), 400, 1025);

      // Trigger download
      const link = document.createElement('a');
      link.download = 'Refilwe-My-Endless-Love.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      setIsGeneratingCard(false);
    };

    img.onerror = () => {
      setIsGeneratingCard(false);
    };
  };

  return (
    <div className="w-full max-w-sm mx-auto my-8 px-4">
      {/* Response Hero Action */}
      <div className="rounded-3xl p-6 bg-gradient-to-b from-[#31130b]/90 to-[#1b0805]/90 border border-rose-500/30 backdrop-blur-xl shadow-2xl text-center">
        <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>Your Turn, Fifi</span>
        </span>

        <h3 className="text-2xl font-serif-romance text-amber-100 mt-1 mb-2">
          Send Your Kiss Back
        </h3>

        <p className="text-xs text-stone-300 mb-5">
          Tap the button below to seal this love letter in our hearts forever.
        </p>

        <button
          onClick={handleSendLoveBack}
          className={`w-full py-4 px-6 rounded-2xl font-semibold text-base flex items-center justify-center gap-2.5 shadow-xl transition-all duration-300 transform active:scale-95 cursor-pointer ${
            hasSentLove
              ? 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-emerald-900/40 ring-2 ring-emerald-400'
              : 'bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-rose-900/50'
          }`}
        >
          {hasSentLove ? (
            <>
              <CheckCircle className="w-5 h-5 text-emerald-200" />
              <span>Love Sealed in My Heart!</span>
            </>
          ) : (
            <>
              <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
              <span>I Love You Too ❤️</span>
            </>
          )}
        </button>

        {hasSentLove && (
          <div className="mt-4 p-3 bg-rose-950/70 border border-rose-500/40 rounded-xl animate-fade-in text-center">
            <p className="font-script text-2xl text-rose-200">
              "You make me the happiest person alive, Fifi!"
            </p>
            <p className="text-[11px] text-amber-200/90 mt-1">
              Your love was received loud and clear in every beat.
            </p>
          </div>
        )}

        {/* Keepsake Download Option */}
        <div className="mt-6 pt-5 border-t border-amber-900/40 flex flex-col items-center">
          <p className="text-xs text-amber-200/80 mb-3">
            Want to keep our memory forever on your phone?
          </p>
          <button
            onClick={downloadDigitalKeepsake}
            disabled={isGeneratingCard}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#230f0a] hover:bg-[#34160e] text-amber-200 border border-amber-500/30 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>{isGeneratingCard ? 'Crafting Card...' : 'Save Digital Keepsake Card'}</span>
          </button>
        </div>
      </div>

      {/* Love Notes Memory Jar */}
      <div className="mt-6 rounded-3xl p-5 bg-[#1e0d08]/80 border border-amber-900/30 backdrop-blur-md">
        <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-400 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Whisper A Sweet Note</span>
        </h4>

        <form onSubmit={handleAddCustomNote} className="flex gap-2">
          <input
            type="text"
            value={loveNote}
            onChange={(e) => setLoveNote(e.target.value)}
            placeholder="Write a sweet whisper for Fifi..."
            className="flex-1 px-3 py-2 bg-[#120604] border border-amber-900/40 rounded-xl text-xs text-amber-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-rose-700 hover:bg-rose-600 text-white rounded-xl text-xs font-medium cursor-pointer transition-colors"
          >
            Send
          </button>
        </form>

        <div className="mt-3 space-y-2 max-h-40 overflow-y-auto pr-1">
          {notesList.map((note, index) => (
            <div
              key={index}
              className="p-2.5 bg-[#2a130c]/70 rounded-xl border border-amber-950 text-xs text-stone-200 flex items-start gap-2"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0 mt-0.5" />
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
