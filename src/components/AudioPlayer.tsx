"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = async () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn("Unable to autoplay audio:", error);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (hasInteracted) return;

    const handleDocumentClick = async () => {
      setHasInteracted(true);
      const audio = audioRef.current;
      if (!audio) return;

      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn("Unable to play audio on page click:", error);
      }
    };

    document.addEventListener("click", handleDocumentClick, { once: true });

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [hasInteracted]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {!hasInteracted && (
        <div className="glassmorphism hidden md:block rounded-xl px-4 py-2 text-xs font-medium text-pastel-rose animate-bounce shadow-md max-w-xs border border-pastel-pink-light">
          🎵 Click anywhere to play the music
        </div>
      )}

      <button
        onClick={togglePlay}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-pastel-rose to-pastel-pink shadow-lg flex items-center justify-center text-white border-2 border-white hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer focus:outline-none"
        title={isPlaying ? "Mute music" : "Play music"}
        id="audio-toggle-btn"
      >
        {isPlaying ? (
          <>
            <span className="absolute -inset-1 rounded-full bg-pastel-pink opacity-40 animate-ping" />
            <Volume2 className="h-6 w-6 relative z-10 animate-pulse" />
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

      <audio ref={audioRef} src="/MUSIC/music.mp3" preload="auto" loop />
    </div>
  );
}
