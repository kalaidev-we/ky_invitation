"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-pastel-bg px-4 select-none">
      {/* Background with subtle Ken Burns zoom effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 opacity-80"
        style={{ 
          backgroundImage: "url('/images/watercolor_clouds.png')",
          animation: "float 25s ease-in-out infinite alternate"
        }}
      />
      
      {/* Vignette Overlay for Premium Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(255,245,247,0.45)_100%)] pointer-events-none" />

      {/* Decorative Hanging Items */}
      <div className="absolute top-0 inset-x-0 flex justify-between px-10 md:px-24 pointer-events-none z-10 opacity-70">
        <div className="h-28 w-0.5 bg-pastel-gold/40 relative flex justify-center">
          <span className="absolute bottom-0 w-3 h-3 rounded-full bg-pastel-pink-light shadow" />
        </div>
        <div className="h-40 w-0.5 bg-pastel-gold/40 relative flex justify-center hidden sm:flex">
          <span className="absolute bottom-0 text-lg">⭐</span>
        </div>
        <div className="h-32 w-0.5 bg-pastel-gold/40 relative flex justify-center">
          <span className="absolute bottom-0 text-xl">🌙</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-3xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-4"
        >
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-pastel-gold font-semibold bg-white/45 px-4 py-1.5 rounded-full border border-pastel-pink-light/35 shadow-sm backdrop-blur-sm">
            ✨ An Invitation to Joy ✨
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="font-great-vibes text-6xl sm:text-7xl md:text-8xl text-shimmer-gold font-normal py-4 px-2 tracking-wide leading-tight drop-shadow-sm select-text"
        >
          A Little Miracle is on the Way 💕
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="font-playfair text-lg sm:text-2xl text-charcoal/80 font-medium italic max-w-xl leading-relaxed mt-2"
        >
          Join us in celebrating the beautiful journey of motherhood
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="mt-6 font-poppins text-xs tracking-wider uppercase text-charcoal/60 bg-white/20 px-3 py-1 rounded border border-white/20"
        >
          For Krithika Yogesh
        </motion.div>
      </div>

      {/* Animated Heart Pulse Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center cursor-pointer"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-pastel-rose/85 mb-2 font-poppins">
          Scroll to Begin
        </span>
        <div className="h-10 w-10 rounded-full bg-white/60 border border-pastel-pink-light flex items-center justify-center shadow-md animate-heart-pulse backdrop-blur-sm hover:scale-105 active:scale-95 transition-transform duration-200">
          <Heart className="h-4 w-4 text-pastel-rose fill-pastel-rose/20" />
        </div>
      </motion.div>
    </section>
  );
}
