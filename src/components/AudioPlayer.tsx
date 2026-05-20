"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Frequency map for standard notes
const NOTES: { [key: string]: number } = {
  E4: 329.63, G4: 392.00, C5: 523.25, B4: 493.88, A4: 440.00, D4: 293.66,
  F4: 349.23, G3: 196.00, C4: 261.63, F3: 174.61, G3_5: 220.00, A3: 220.00,
  REST: 0
};

// Brahms' Lullaby melody: [note, duration in beats]
const MELODY: [string, number][] = [
  ["E4", 1], ["E4", 1], ["G4", 2],
  ["E4", 1], ["E4", 1], ["G4", 2],
  ["E4", 1], ["G4", 1], ["C5", 2], ["B4", 1.5], ["A4", 1.5],
  ["A4", 1], ["G4", 2], ["REST", 1],
  ["D4", 1], ["E4", 1], ["F4", 2],
  ["D4", 1], ["E4", 1], ["F4", 2],
  ["D4", 1], ["F4", 1], ["B4", 2], ["A4", 1.5], ["G4", 1.5],
  ["B4", 1], ["C5", 2], ["REST", 1]
];

// Accompaniment chords: [chord root, duration]
const CHORDS: [string, number][] = [
  ["C3", 4], ["C3", 4], ["C3", 4], ["F3", 2], ["G3", 2],
  ["C3", 4], ["G3", 4], ["G3", 4], ["G3", 2], ["C3", 2]
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const noteIndexRef = useRef<number>(0);
  const chordIndexRef = useRef<number>(0);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  // Initialize Audio Context
  const initAudio = () => {
    if (audioCtxRef.current) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const masterGain = ctx.createGain();
    
    // Low master volume for gentle ambient background
    masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
    masterGain.connect(ctx.destination);
    
    audioCtxRef.current = ctx;
    masterGainRef.current = masterGain;
  };

  // Play a single synthesized note
  const playSynthNote = (freq: number, startTime: number, duration: number, isLead: boolean) => {
    const ctx = audioCtxRef.current;
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain || freq === 0) return;

    // Bell/Piano main oscillator (Triangle wave)
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = isLead ? "triangle" : "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    
    // Gentle envelope
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(isLead ? 0.35 : 0.15, startTime + 0.05); // attack
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration - 0.02); // release
    
    osc.connect(gainNode);
    gainNode.connect(masterGain);
    
    osc.start(startTime);
    osc.stop(startTime + duration);

    // If lead, add a subtle chime shimmer (higher frequency sine)
    if (isLead) {
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      
      chime.type = "sine";
      chime.frequency.setValueAtTime(freq * 2, startTime); // 1 octave higher
      
      chimeGain.gain.setValueAtTime(0, startTime);
      chimeGain.gain.linearRampToValueAtTime(0.06, startTime + 0.02);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.3); // short chime decay
      
      chime.connect(chimeGain);
      chimeGain.connect(masterGain);
      
      chime.start(startTime);
      chime.stop(startTime + 0.4);
    }
  };

  // Schedule next notes in the queue
  const scheduler = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || !isPlaying) return;

    const tempo = 75; // BPM
    const secondsPerBeat = 60 / tempo;

    while (nextNoteTimeRef.current < ctx.currentTime + 0.1) {
      // 1. Play Lead Melody
      const [note, durationBeats] = MELODY[noteIndexRef.current];
      const freq = NOTES[note] || 0;
      const noteDuration = durationBeats * secondsPerBeat;

      playSynthNote(freq, nextNoteTimeRef.current, noteDuration, true);

      // 2. Play Chords occasionally
      if (noteIndexRef.current % 4 === 0) {
        const chordNote = CHORDS[chordIndexRef.current][0];
        const chordFreq = NOTES[chordNote] || 0;
        playSynthNote(chordFreq, nextNoteTimeRef.current, secondsPerBeat * 4, false);
        // Play minor third or fifth above for a soft pad harmonic
        if (chordFreq > 0) {
          playSynthNote(chordFreq * 1.5, nextNoteTimeRef.current, secondsPerBeat * 4, false); // Fifth
        }
        
        chordIndexRef.current = (chordIndexRef.current + 1) % CHORDS.length;
      }

      // Advance time
      nextNoteTimeRef.current += noteDuration;

      // Advance melody pointer
      noteIndexRef.current = (noteIndexRef.current + 1) % MELODY.length;
    }

    // Schedule next run
    timeoutIdRef.current = setTimeout(scheduler, 50);
  };

  // Handle Play / Mute Toggle
  const togglePlay = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (isPlaying) {
      // Mute / Stop Scheduling
      setIsPlaying(false);
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      // Fade out master gain smoothly
      masterGainRef.current?.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
    } else {
      // Resume / Start scheduling
      setIsPlaying(true);
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      // Fade in master gain smoothly
      masterGainRef.current?.gain.cancelScheduledValues(ctx.currentTime);
      masterGainRef.current?.gain.setValueAtTime(0, ctx.currentTime);
      masterGainRef.current?.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.5);
      
      nextNoteTimeRef.current = ctx.currentTime + 0.1;
      // Start scheduler loop
      setTimeout(() => {
        noteIndexRef.current = 0;
        chordIndexRef.current = 0;
        scheduler();
      }, 100);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Floating suggestion for autoplay if user hasn't interacted yet */}
      {!hasInteracted && (
        <div className="glassmorphism hidden md:block rounded-xl px-4 py-2 text-xs font-medium text-pastel-rose animate-bounce shadow-md max-w-xs border border-pastel-pink-light">
          🎵 Click here to play the lullaby theme
        </div>
      )}
      
      <button
        onClick={togglePlay}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-pastel-rose to-pastel-pink shadow-lg flex items-center justify-center text-white border-2 border-white hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer focus:outline-none"
        title={isPlaying ? "Mute music" : "Play soft lullaby"}
        id="audio-toggle-btn"
      >
        {isPlaying ? (
          <>
            {/* Pulsing ring */}
            <span className="absolute -inset-1 rounded-full bg-pastel-pink opacity-40 animate-ping" />
            <Volume2 className="h-6 w-6 relative z-10 animate-pulse" />
            
            {/* Micro audio waves */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-pastel-rose rounded-full animate-bounce h-2" style={{ animationDelay: "0.1s" }} />
              <span className="w-0.5 bg-pastel-rose rounded-full animate-bounce h-3" style={{ animationDelay: "0.3s" }} />
              <span className="w-0.5 bg-pastel-rose rounded-full animate-bounce h-1" style={{ animationDelay: "0.5s" }} />
            </div>
          </>
        ) : (
          <VolumeX className="h-6 w-6 relative z-10" />
        )}
      </button>
    </div>
  );
}
