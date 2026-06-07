"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Heart, Sparkles, Star, Calendar } from "lucide-react";

interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

const EVENTS: TimelineEvent[] = [
  {
    title: "The happiest news",
    date: "february 2025",
    description: "When the test showed two beautiful lines, our hearts instantly doubled in size. The beginning of our greatest adventure.",
    icon: <Sparkles className="h-5 w-5 text-pastel-gold" />,
  },
  {
    title: "Family celebrations",
    date: "may 2025",
    description: "Sharing the bliss with grandparents, uncles, and aunts. The warm laughter, sweet treats, and protective prayers wrapping around us.",
    icon: <Heart className="h-5 w-5 text-pastel-rose" />,
  },
  {
    title: "Moments of love",
    date: "june 2026",
    description: "Every soft kick, every gentle flutter, and quiet midnight conversations with the little bump. Building a lifetime of love.",
    icon: <Star className="h-5 w-5 text-pastel-gold" />,
  },
  {
    title: "Awaiting the baby",
    date: "October 2026",
    description: "Nesting, sorting through tiny pastel socks, and preparing our home and hearts for the sweet cry of our baby shower miracle.",
    icon: <Calendar className="h-5 w-5 text-pastel-rose" />,
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the container to animate the glowing line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 px-4 bg-gradient-to-b from-[#FFF5F7] to-pastel-bg overflow-hidden select-none"
    >
      {/* Soft floating decor icons */}
      <div className="absolute top-10 left-[8%] text-4xl opacity-15 animate-float-slow">🧸</div>
      <div className="absolute bottom-20 right-[6%] text-4xl opacity-20 animate-float-medium">🍼</div>

      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-20">
        <h2 className="font-great-vibes text-5xl md:text-6xl text-pastel-rose mb-3">
          Journey to Motherhood
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-pastel-gold/40 to-transparent mx-auto mb-4" />
        <p className="font-playfair text-base italic text-charcoal/70">
          The sweet milestones leading to our little bundle of love.
        </p>
      </div>

      {/* Timeline Path Container */}
      <div className="relative max-w-4xl mx-auto">
        
        {/* Background Track Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-pastel-pink-light/30 -translate-x-1/2" />
        
        {/* Glowing Filled Track Line */}
        <motion.div 
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pastel-pink via-pastel-rose to-pastel-gold -translate-x-1/2 shadow-[0_0_10px_rgba(231,84,128,0.5)] z-10"
        />

        {/* Timeline Nodes */}
        {EVENTS.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={index}
              className={`relative mb-16 md:mb-20 flex flex-col md:flex-row ${
                isEven ? "md:flex-row-reverse" : ""
              } items-start md:items-center`}
            >
              {/* Central Glowing Icon Node */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", damping: 12, delay: 0.1 }}
                  className="h-12 w-12 rounded-full bg-white shadow-md border-2 border-pastel-gold flex items-center justify-center relative group"
                >
                  {/* Glowing aura */}
                  <span className="absolute -inset-1.5 rounded-full bg-pastel-pink-light/40 group-hover:scale-125 transition-transform duration-300 pointer-events-none" />
                  {event.icon}
                </motion.div>
              </div>

              {/* Event Card Wrapper */}
              <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? "md:pr-14" : "md:pl-14"}`}>
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", damping: 18 }}
                  whileHover={{ y: -5 }}
                  className="p-6 md:p-8 rounded-3xl glassmorphism border border-white/50 shadow-md relative overflow-hidden"
                >
                  {/* Glass Card Glow */}
                  <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-pastel-pink-light/20 blur-xl pointer-events-none" />
                  
                  <span className="font-playfair text-xs tracking-wider font-bold text-pastel-gold uppercase block mb-1">
                    {event.date}
                  </span>
                  
                  <h3 className="font-playfair text-xl md:text-2xl font-bold text-charcoal mb-3">
                    {event.title}
                  </h3>
                  
                  <p className="font-poppins text-sm leading-relaxed text-charcoal/80">
                    {event.description}
                  </p>
                </motion.div>
              </div>
              
              {/* Empty side spacer for desktop */}
              <div className="hidden md:block w-1/2" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
