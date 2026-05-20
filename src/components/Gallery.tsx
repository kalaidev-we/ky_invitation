"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X, Heart, Maximize2, Minimize2 } from "lucide-react";

interface PolaroidItem {
  id: number;
  src: string;
  caption: string;
  details: string;
  rotation: number; // default tilt in degrees
}

const ITEMS: PolaroidItem[] = [
  {
    id: 1,
    src: "/images/polaroid_maternity_1.png",
    caption: "A New Beginning",
    details: "The soft whispers of hope, sorting through tiny garments, dreaming of the day your tiny fingers wrap around ours.",
    rotation: -4,
  },
  {
    id: 2,
    src: "/images/polaroid_maternity_2.png",
    caption: "Moments of Wonder",
    details: "Quiet afternoons feeling you move, counting down the weeks with butterflies in our stomachs and smiles on our faces.",
    rotation: 3,
  },
  {
    id: 3,
    src: "/images/polaroid_maternity_3.png",
    caption: "Love in Abundance",
    details: "Surrounded by the warmth of family prayers and blessings, preparing the nest with pure joy.",
    rotation: -2,
  },
];

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState<PolaroidItem | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPlayingSimulated, setIsPlayingSimulated] = useState(false);

  return (
    <section className="relative w-full py-24 px-4 bg-gradient-to-b from-[#FFF5F7] to-pastel-bg overflow-hidden select-none">
      {/* Background blobs */}
      <div className="absolute top-[30%] right-[-15%] w-[400px] h-[400px] rounded-full bg-pastel-pink-light/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[400px] h-[400px] rounded-full bg-pastel-gold/20 blur-[130px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <h2 className="font-great-vibes text-5xl md:text-6xl text-pastel-rose mb-3">
          Our Scrapbook
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-pastel-gold/40 to-transparent mx-auto mb-4" />
        <p className="font-playfair text-base italic text-charcoal/70">
          Capturing the beautiful chapters of our growing family.
        </p>
      </div>

      {/* Grid of Scrapbook Elements */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center items-center">
        
        {/* Photo Polaroids */}
        {ITEMS.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30, rotate: item.rotation }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -8, rotate: item.rotation * 0.4, scale: 1.02 }}
            transition={{ type: "spring", damping: 14 }}
            onClick={() => setActivePhoto(item)}
            className="w-64 p-4 pb-6 bg-white shadow-lg border border-pastel-pink-light/35 rounded-md cursor-pointer relative group flex-shrink-0"
          >
            {/* Polaroid Shadow Glow */}
            <div className="absolute -inset-1 rounded bg-pastel-pink-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {/* Image Box */}
            <div className="relative w-full h-56 bg-pastel-bg rounded overflow-hidden mb-4">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover"
                sizes="256px"
              />
              {/* Overlay hover effect */}
              <div className="absolute inset-0 bg-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize2 className="h-6 w-6 text-white drop-shadow" />
              </div>
            </div>
            
            {/* Caption */}
            <div className="text-center font-great-vibes text-2xl text-charcoal/90 mt-1 select-text">
              {item.caption}
            </div>
            
            {/* Tape Deco */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pastel-gold/25 border-y border-dashed border-pastel-gold/40 rotate-1 flex items-center justify-center font-poppins text-[8px] text-pastel-gold font-bold select-none opacity-85">
              Sweet Baby
            </div>
          </motion.div>
        ))}

        {/* Video Polaroid Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
          transition={{ type: "spring", damping: 14 }}
          onClick={() => setIsVideoOpen(true)}
          className="w-64 p-4 pb-6 bg-white shadow-lg border border-pastel-pink-light/35 rounded-md cursor-pointer relative group flex-shrink-0"
        >
          {/* Polaroid Shadow Glow */}
          <div className="absolute -inset-1 rounded bg-pastel-pink-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* simulated Play Video cover */}
          <div className="relative w-full h-56 bg-gradient-to-tr from-pastel-pink to-pastel-pink-light rounded overflow-hidden mb-4 flex items-center justify-center">
            {/* Glowing Ring Play Button */}
            <div className="h-14 w-14 rounded-full bg-white/80 flex items-center justify-center border border-pastel-pink shadow-md relative group-hover:scale-110 transition-transform duration-300">
              <span className="absolute -inset-2 rounded-full bg-pastel-pink-light/30 animate-pulse" />
              <Play className="h-6 w-6 text-pastel-rose fill-pastel-rose/20 ml-0.5" />
            </div>
            <span className="absolute bottom-2 right-2 text-[9px] uppercase tracking-widest text-charcoal/60 bg-white/60 px-2 py-0.5 rounded font-poppins font-medium">
              0:45
            </span>
          </div>

          <div className="text-center font-great-vibes text-2xl text-charcoal/90 mt-1 select-text">
            Play Memory Video
          </div>

          {/* Tape Deco */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pastel-rose/15 border-y border-dashed border-pastel-rose/30 -rotate-2 flex items-center justify-center font-poppins text-[8px] text-pastel-rose font-bold select-none opacity-85">
            Moments
          </div>
        </motion.div>

      </div>

      {/* Lightbox Photo Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
            />
            
            {/* Polaroid Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm md:max-w-md p-5 pb-8 bg-white rounded-2xl shadow-2xl relative z-10 border border-pastel-pink-light"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-pastel-bg border border-pastel-pink-light flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer focus:outline-none"
              >
                <X className="h-4.5 w-4.5 text-pastel-rose" />
              </button>
              
              <div className="relative w-full h-[320px] bg-pastel-bg rounded-lg overflow-hidden mb-5">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              <div className="text-center font-great-vibes text-3xl text-pastel-rose mb-3 select-text">
                {activePhoto.caption}
              </div>

              <p className="font-poppins text-xs leading-relaxed text-charcoal/80 text-center max-w-sm mx-auto select-text">
                {activePhoto.details}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Simulated Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsVideoOpen(false);
                setIsPlayingSimulated(false);
              }}
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
            />
            
            {/* Video Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md p-6 bg-white rounded-3xl shadow-2xl relative z-10 border border-pastel-pink-light"
            >
              <button
                onClick={() => {
                  setIsVideoOpen(false);
                  setIsPlayingSimulated(false);
                }}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-pastel-bg border border-pastel-pink-light flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer focus:outline-none"
              >
                <X className="h-4.5 w-4.5 text-pastel-rose" />
              </button>

              <h3 className="font-playfair text-lg font-bold text-charcoal mb-4 text-center">
                Maternity Wishes Video
              </h3>

              {/* Simulated Video Player Screen */}
              <div className="relative w-full h-[250px] bg-charcoal/90 rounded-2xl overflow-hidden mb-4 flex flex-col items-center justify-center">
                
                {isPlayingSimulated ? (
                  /* Animated memory simulation using pure CSS graphics */
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-tr from-pastel-pink/70 to-pastel-pink-light/70 relative">
                    
                    {/* Floating hearts animation */}
                    <div className="absolute bottom-1/4 flex gap-8 select-none">
                      <span className="text-xl animate-float-slow opacity-60">💖</span>
                      <span className="text-2xl animate-float-medium opacity-80" style={{ animationDelay: "1s" }}>🍼</span>
                      <span className="text-lg animate-float-fast opacity-50" style={{ animationDelay: "0.5s" }}>👶</span>
                    </div>

                    {/* Cute bouncing cradle symbol */}
                    <motion.div
                      animate={{ rotate: [-6, 6, -6], y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="text-6xl text-white select-none drop-shadow-md"
                    >
                      🍼🧸👣
                    </motion.div>
                    
                    {/* Caption floating text */}
                    <motion.span
                      animate={{ scale: [0.95, 1.05, 0.95] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="font-great-vibes text-3xl text-white mt-6 font-medium text-center drop-shadow select-text"
                    >
                      Waiting for Baby Yogesh...
                    </motion.span>
                  </div>
                ) : (
                  /* Play Cover */
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pastel-pink-light/30 to-pastel-pink/30">
                    <button
                      onClick={() => setIsPlayingSimulated(true)}
                      className="h-16 w-16 rounded-full bg-white hover:bg-pastel-bg text-pastel-rose shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer focus:outline-none"
                    >
                      <Play className="h-7 w-7 fill-pastel-rose/20 ml-1" />
                    </button>
                    <span className="text-[10px] text-white font-semibold uppercase tracking-[0.15em] bg-charcoal/45 px-3 py-1 rounded-full mt-4">
                      Click to Play Memory
                    </span>
                  </div>
                )}

                {/* Simulated controls bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent p-3 flex items-center justify-between z-10 text-white font-poppins text-[10px]">
                  <button 
                    onClick={() => setIsPlayingSimulated(!isPlayingSimulated)}
                    className="hover:text-pastel-pink transition-colors focus:outline-none"
                  >
                    {isPlayingSimulated ? "Pause" : "Play"}
                  </button>
                  <div className="flex-1 mx-3 h-1 bg-white/30 rounded relative overflow-hidden">
                    <motion.div 
                      className="h-full bg-pastel-rose" 
                      animate={isPlayingSimulated ? { width: ["0%", "100%"] } : { width: "0%" }}
                      transition={isPlayingSimulated ? { repeat: Infinity, duration: 15, ease: "linear" } : { duration: 0.1 }}
                    />
                  </div>
                  <span>0:45</span>
                </div>
              </div>

              <p className="font-poppins text-[11px] leading-relaxed text-charcoal/70 text-center">
                A warm collection of sweet wishes, pregnancy photoshoots, and prayers from family members.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
