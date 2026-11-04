import { useState, useEffect, useRef, useCallback } from 'react';

export function useSoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playChime = useCallback((freq = 528) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // Soft pitch decay
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.25);
    } catch {
      // AudioContext policy catch
    }
  }, [soundEnabled, getAudioContext]);

  const playHover = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Ignore audio error
    }
  }, [soundEnabled, getAudioContext]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  // Handle ambient drone when enabled
  useEffect(() => {
    if (!soundEnabled) {
      if (ambientGainRef.current && audioCtxRef.current) {
        ambientGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
      }
      return;
    }

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      if (!ambientOscRef.current) {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(130.81, ctx.currentTime); // C3 warm drone

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, ctx.currentTime);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 1.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        ambientOscRef.current = osc;
        ambientGainRef.current = gain;
      } else if (ambientGainRef.current) {
        ambientGainRef.current.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.5);
      }
    } catch {
      // Audio error catch
    }

    return () => {
      // Keep nodes alive for quick resume or clean on unmount
    };
  }, [soundEnabled, getAudioContext]);

  return {
    soundEnabled,
    toggleSound,
    playChime,
    playHover
  };
}
