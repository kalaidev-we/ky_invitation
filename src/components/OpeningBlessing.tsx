"use client";

import React from "react";
import { motion } from "framer-motion";

export default function OpeningBlessing() {
  const blessingText = "With the blessings of God and the love of our family, we are happily awaiting the arrival of our little bundle of joy.";
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative min-h-[60vh] w-full flex items-center justify-center py-20 px-4 bg-gradient-to-b from-pastel-bg to-[#FFF5F7] overflow-hidden select-none">
      {/* Decorative floral/sparkle overlays */}
      <div className="absolute top-10 left-10 text-5xl opacity-25 animate-float-slow select-none">🌸</div>
      <div className="absolute bottom-10 right-10 text-5xl opacity-25 animate-float-medium select-none">🌸</div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        className="max-w-2xl w-full p-8 md:p-12 rounded-3xl glassmorphism border-2 border-dashed border-pastel-gold/30 shadow-xl relative text-center flex flex-col items-center justify-center"
      >
        {/* Subtle Gold Foil Accent Corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-pastel-gold/40 rounded-tl-md" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-pastel-gold/40 rounded-tr-md" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-pastel-gold/40 rounded-bl-md" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-pastel-gold/40 rounded-br-md" />
        
        {/* Cute Baby Footprints Silhouette Icon */}
        <div className="mb-6 flex justify-center items-center gap-1.5 opacity-65 text-pastel-gold text-2xl">
          👣
        </div>

        {/* Shimmering Title */}
        <h2 className="font-playfair text-xs uppercase tracking-[0.25em] text-pastel-gold font-bold mb-4">
          ~ Opening Blessing ~
        </h2>

        {/* Typed/Faded Text */}
        <motion.p
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          className="font-great-vibes text-4xl sm:text-5xl text-charcoal/95 leading-relaxed font-normal tracking-wide px-2 select-text"
        >
          {blessingText.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="inline-block mr-3"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
        
        {/* Small separator */}
        <div className="mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-pastel-gold/40 to-transparent" />
      </motion.div>
    </section>
  );
}
