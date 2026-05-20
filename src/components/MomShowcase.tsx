"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MomShowcase() {
  return (
    <section className="relative w-full py-24 px-4 bg-gradient-to-b from-pastel-bg to-[#FFF5F7] overflow-hidden select-none">
      {/* Background soft lighting overlays */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-pastel-pink-light/35 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-pastel-gold/25 blur-[120px] pointer-events-none" />

      {/* Floating Sparkles & Light Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pastel-pink-light/60 w-2 h-2"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 relative z-10">
        
        {/* Left Side: Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="relative w-72 h-96 sm:w-80 sm:h-[450px] rounded-[40px] shadow-2xl p-3 bg-white border border-pastel-pink-light/40 group cursor-pointer"
        >
          {/* Gold Filigree Corner Ornaments */}
          <div className="absolute inset-2 border border-pastel-gold/20 rounded-[34px] pointer-events-none" />
          
          {/* Glowing Aura Effect */}
          <div className="absolute -inset-1 rounded-[42px] bg-gradient-to-tr from-pastel-pink via-pastel-gold to-pastel-pink-light opacity-30 blur-sm group-hover:opacity-75 transition-opacity duration-700 pointer-events-none" />

          {/* Portrait Image Container */}
          <div className="relative w-full h-full overflow-hidden rounded-[30px] bg-pastel-pink-light/20">
            <Image
              src="/images/mom_to_be_portrait.png"
              alt="Krithika Yogesh - Mom To Be"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 320px"
              priority
            />
            {/* Soft inner glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-pastel-rose/10 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Blooming SVGs overlay (Top Right & Bottom Left) */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            whileInView={{ scale: 1, opacity: 0.9, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute -top-6 -right-6 w-16 h-16 pointer-events-none"
          >
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <path d="M50 0C55 25 75 45 100 50C75 55 55 75 50 100C45 75 25 55 0 50C25 45 45 25 50 0Z" fill="url(#goldGrad)" />
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F3E5AB" />
                  <stop offset="100%" stopColor="#D4A373" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 45 }}
            whileInView={{ scale: 1, opacity: 0.85, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="absolute -bottom-6 -left-6 w-14 h-14 pointer-events-none"
          >
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <circle cx="50" cy="50" r="30" fill="#F8C8DC" opacity="0.6" />
              <circle cx="30" cy="40" r="20" fill="#FADADD" opacity="0.8" />
              <circle cx="70" cy="60" r="15" fill="#FFF5F7" opacity="0.9" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Right Side: Text & Quote */}
        <div className="flex-1 max-w-lg text-center md:text-left flex flex-col justify-center items-center md:items-start">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
            className="flex flex-col items-center md:items-start"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-pastel-gold mb-2 block">
              ~ Celebrating the Mom-To-Be ~
            </span>
            <h2 className="font-great-vibes text-4xl sm:text-5xl text-pastel-rose mb-6">
              Krithika Yogesh
            </h2>
            
            {/* Quote Card */}
            <div className="p-6 md:p-8 rounded-3xl glassmorphism border border-white/50 shadow-md relative w-full mb-4">
              <span className="absolute -top-4 -left-2 text-6xl text-pastel-pink-light opacity-50 font-serif">“</span>
              <p className="font-playfair text-xl md:text-2xl text-charcoal italic leading-relaxed relative z-10 select-text">
                Every heartbeat now carries a little miracle.
              </p>
              <span className="absolute -bottom-10 -right-2 text-6xl text-pastel-pink-light opacity-50 font-serif">”</span>
            </div>

            <p className="font-poppins text-sm leading-relaxed text-charcoal/70 mt-4 select-text">
              We are eagerly looking forward to celebrating the magic of this new life, showering Krithika with love, blessings, and sweet laughter before the arrival of our precious little one.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
