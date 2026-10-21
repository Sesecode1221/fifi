/**
 * Pure Web Audio API Generative Romantic Soundscape & Interactive FX
 * Creates high-fidelity, lush romantic chords (Rhodes/Harp/Warm Pad),
 * realistic binaural heartbeat sound, and delicate chime accents.
 */

class RomanticAudioService {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private musicInterval: number | null = null;
  private masterGain: GainNode | null = null;
  private isMuted = false;
  private chordIndex = 0;

  // Romantic chord progression in Db Major (tender, emotional, cinematic)
  // Dbmaj9 -> Bbm9 -> Gbmaj9 -> Abadd9
  private chords: number[][] = [
    [138.59, 207.65, 261.63, 311.13, 369.99], // Dbmaj9 (Db3, Ab3, C4, Eb4, F#4/F4)
    [116.54, 174.61, 233.08, 277.18, 349.23], // Bbm9 (Bb2, F3, Bb3, Db4, F4)
    [92.50, 146.83, 185.00, 233.08, 293.66],  // Gbmaj9 (Gb2, D3/Eb3, Gb3, Bb3, D4)
    [103.83, 164.81, 207.65, 261.63, 311.13]  // Ab9 (Ab2, E3/C4, Ab3, C4, Eb4)
  ];

  private initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }

  public toggleMusic(): boolean {
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public startMusic() {
    const ctx = this.initContext();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Play first chord immediately
    this.playChord(this.chords[this.chordIndex]);

    // Schedule subsequent chords every 3.8 seconds with romantic arpeggiation
    this.musicInterval = window.setInterval(() => {
      this.chordIndex = (this.chordIndex + 1) % this.chords.length;
      this.playChord(this.chords[this.chordIndex]);
    }, 3800);
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  private playChord(frequencies: number[]) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const noteGain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      // Soft warm sine + slight triangle for rhodes/music box texture
      osc.type = idx === 0 ? 'sine' : idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for dreamy, warm velvety warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650 + idx * 120, now);
      filter.Q.setValueAtTime(2, now);

      // Arpeggiate notes slightly for harp-like acoustic cascade
      const delay = idx * 0.18;
      const start = now + delay;
      const duration = 3.6;

      noteGain.gain.setValueAtTime(0.0001, start);
      noteGain.gain.exponentialRampToValueAtTime(0.09 / (idx + 1), start + 0.4);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain!);

      osc.start(start);
      osc.stop(start + duration + 0.1);
    });
  }

  /**
   * Delicate romantic chime / star sound when tapping elements
   */
  public playChime(freqMultiplier = 1) {
    const ctx = this.initContext();
    if (this.isMuted) return;
    const now = ctx.currentTime;

    const baseFreqs = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
    const randomFreq = baseFreqs[Math.floor(Math.random() * baseFreqs.length)] * freqMultiplier;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(randomFreq, now);
    osc.frequency.exponentialRampToValueAtTime(randomFreq * 1.05, now + 0.8);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(400, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.25);
  }

  /**
   * Realistic organic human heartbeat thump (lub-dub)
   */
  public playHeartbeat(volume = 0.4) {
    const ctx = this.initContext();
    const now = ctx.currentTime;

    // First beat: Lub
    this.createHeartThump(ctx, now, 52, 0.08, volume);
    // Second beat: Dub (slightly higher pitch, slightly softer, 140ms later)
    this.createHeartThump(ctx, now + 0.14, 58, 0.06, volume * 0.85);
  }

  private createHeartThump(ctx: AudioContext, time: number, startFreq: number, duration: number, peakVol: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(32, time + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(110, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(peakVol, time + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration + 0.12);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + duration + 0.15);
  }

  /**
   * Sweet romantic speech whisper using Web Speech API
   */
  public speakLoveWhisper(message = "Refilwe, you are my heart. I love you, Fifi.") {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.volume = 0.85;

    // Select the warmest voice available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.4, this.ctx.currentTime);
    }
  }
}

export const romanticAudio = new RomanticAudioService();
