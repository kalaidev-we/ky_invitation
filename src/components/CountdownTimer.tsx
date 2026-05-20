"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    // Target Date: 18 June 2026 11:00 AM IST (UTC+5:30)
    const targetDate = new Date("2026-06-18T11:00:00+05:30").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    calculateTime();
    const intervalId = setInterval(calculateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <section className="relative w-full py-20 px-4 bg-gradient-to-b from-[#FFF5F7] to-pastel-bg overflow-hidden flex flex-col items-center justify-center select-none">
      <div className="absolute top-[10%] right-[10%] text-pastel-gold/45 animate-pulse-slow">
        <Sparkles className="h-6 w-6" />
      </div>

      {/* Main Timer Glass Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        className="max-w-2xl w-full p-8 md:p-12 rounded-[42px] glassmorphism border-2 border-pastel-gold/20 shadow-2xl relative text-center"
      >
        <div className="absolute inset-3 border border-dashed border-pastel-gold/20 rounded-[32px] pointer-events-none" />

        <div className="mb-6 flex justify-center text-pastel-rose opacity-80">
          <Calendar className="h-8 w-8 animate-bounce" />
        </div>

        <h3 className="font-great-vibes text-4xl sm:text-5xl text-pastel-rose font-normal mb-3">
          Counting Down the Days
        </h3>
        <p className="font-poppins text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-8 max-w-sm mx-auto">
          Till we welcome our bundle of joy with love
        </p>

        {timeLeft.isCompleted ? (
          /* EVENT START MESSAGE */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6 px-10 rounded-full bg-white/70 shadow border border-pastel-pink-light inline-block font-playfair text-xl font-bold text-shimmer-gold"
          >
            🎉 The Celebration is Live! 🎉
          </motion.div>
        ) : (
          /* TIMER BLOCKS */
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto relative z-10">
            {timeBlocks.map((block, idx) => (
              <div 
                key={idx}
                className="relative bg-white/50 border border-pastel-pink-light/35 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm flex flex-col items-center justify-center min-w-[70px] sm:min-w-[95px] overflow-hidden"
              >
                {/* Heartbeat pulse animation to background details */}
                <div className="absolute -inset-1 rounded bg-pastel-pink-light/5 opacity-5 animate-pulse" />

                <span className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal tracking-normal block select-text">
                  {String(block.value).padStart(2, "0")}
                </span>
                
                <span className="font-poppins text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 mt-1 select-none">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 font-poppins text-xs text-charcoal/60 select-text">
          18 June 2026 • 11:00 AM IST onwards
        </div>
      </motion.div>
    </section>
  );
}
