/**
 * Audio helper for background music and clapper sound effects
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isSynthesizing = false;
  private synthInterval: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Plays a crisp cinematic clapperboard "CLACK" sound effect
   */
  public playClapperSound() {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      // 1. Wooden body impact (bandpass filtered noise burst)
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(3.5, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(1.0, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);

      // 2. High snap click
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      oscGain.gain.setValueAtTime(0.6, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // AudioContext might fail silently if user hasn't interacted
    }
  }

  /**
   * Starts a gentle, warm cinematic ambient piano/bell progression in background
   * Used as fallback if no local music.mp3 is loaded
   */
  public startAmbientCinemaMusic() {
    if (this.isSynthesizing) return;
    this.isSynthesizing = true;
    const ctx = this.initCtx();

    // Cinematic chord arpeggio notes in D Major / B minor (warm, golden, inspiring)
    // Frequencies: D4, F#4, A4, C#5, E5, D5
    const notes = [
      293.66, 369.99, 440.00, 554.37, 659.25, 587.33, 440.00, 369.99,
      246.94, 329.63, 440.00, 493.88, 587.33, 493.88, 440.00, 329.63
    ];
    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isSynthesizing) return;
      const now = ctx.currentTime;
      const freq = notes[noteIndex % notes.length];
      noteIndex++;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Soft warm envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.8);

      // Warm low-pass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.0);
    };

    playNextNote();
    this.synthInterval = window.setInterval(playNextNote, 650);
  }

  public stopAmbientCinemaMusic() {
    this.isSynthesizing = false;
    if (this.synthInterval !== null) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  public getIsSynthesizing() {
    return this.isSynthesizing;
  }
}

export const soundEngine = new SoundEngine();
