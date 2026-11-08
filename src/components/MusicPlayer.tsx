import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorNodesRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Play peaceful ambient wedding chime harmony using Web Audio API so it works without external MP3 files
  const startAmbientHarmony = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft meditative chord frequencies: C4 (261.63), G4 (392.00), C5 (523.25), E5 (659.25)
      const freqs = [261.63, 392.0, 523.25, 659.25];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Add slight gentle vibrato/lfo
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.25, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });

      oscillatorNodesRef.current = oscs;
      setIsPlaying(true);
    } catch {
      // AudioContext fallback
      setIsPlaying(false);
    }
  };

  const stopAmbientHarmony = () => {
    if (audioContextRef.current) {
      oscillatorNodesRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      oscillatorNodesRef.current = [];
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopAmbientHarmony();
    } else {
      startAmbientHarmony();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientHarmony();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause celebration music' : 'Play celebration music'}
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-navy-900/85 backdrop-blur-md border border-gold/40 text-gold hover:border-gold hover:bg-navy-800 shadow-xl transition-all duration-300 group"
      >
        {/* Animated Sound Waves */}
        <div className="music-bars">
          <div className={`music-bar ${isPlaying ? 'playing' : 'h-1'}`} />
          <div className={`music-bar ${isPlaying ? 'playing' : 'h-2'}`} />
          <div className={`music-bar ${isPlaying ? 'playing' : 'h-3'}`} />
          <div className={`music-bar ${isPlaying ? 'playing' : 'h-1.5'}`} />
        </div>

        <span className="font-sans-elegant text-[11px] tracking-widest uppercase hidden sm:inline text-ivory/80 group-hover:text-gold transition-colors">
          {isPlaying ? 'Music On' : 'Play Music'}
        </span>
      </button>
    </motion.div>
  );
};

export default MusicPlayer;

