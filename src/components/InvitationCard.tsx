"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Download, Heart, ExternalLink, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function InvitationCard() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Sweet celebratory burst when envelope is opened
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#FADADD", "#F8C8DC", "#FFF5F7", "#E75480", "#D4A373"],
    });
  };

  const handleDownloadICS = () => {
    const icsText = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Krithika Yogesh Baby Shower//EN",
      "BEGIN:VEVENT",
      "UID:baby-shower-krithika-yogesh-2026",
      "DTSTART:20260618T053000Z", // 11:00 AM IST in UTC (11:00 AM - 5:30 = 05:30 UTC)
      "DTEND:20260618T093000Z",   // 3:00 PM IST in UTC
      "SUMMARY:Krithika Yogesh Baby Shower Ceremony",
      "DESCRIPTION:Join us in celebrating the beautiful journey of motherhood for Krithika Yogesh. Ceremony starts at 11:00 AM onwards.",
      "LOCATION:Annapoorna - M.T.P Road, Coimbatore",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsText], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "baby_shower_invitation.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative w-full py-24 px-4 bg-gradient-to-b from-[#FFF5F7] to-pastel-bg overflow-hidden flex flex-col items-center justify-center select-none">
      {/* Background floral assets */}
      <div className="absolute top-10 right-10 text-4xl opacity-15 rotate-12">⭐</div>
      <div className="absolute bottom-10 left-10 text-4xl opacity-15 -rotate-12">🎈</div>

      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <h2 className="font-great-vibes text-5xl md:text-6xl text-pastel-rose mb-3">
          The Invitation
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-pastel-gold/40 to-transparent mx-auto mb-4" />
        <p className="font-playfair text-base italic text-charcoal/70">
          Tap on the envelope to reveal the luxury invitation card.
        </p>
      </div>

      {/* Main Interactive Envelope Container */}
      <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center z-20">
        
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED ENVELOPE STAGE */
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", damping: 18 }}
              onClick={handleOpen}
              className="w-80 h-52 sm:w-96 sm:h-64 rounded-2xl bg-gradient-to-br from-pastel-pink-light to-pastel-pink shadow-2xl relative cursor-pointer group flex flex-col items-center justify-center border border-white/40 overflow-hidden"
            >
              {/* Envelope Flap seams using CSS Gradients */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_49%,rgba(212,163,115,0.15)_50%,rgba(212,163,115,0.15)_52%,transparent_53%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(225deg,transparent_49%,rgba(212,163,115,0.15)_50%,rgba(212,163,115,0.15)_52%,transparent_53%)] pointer-events-none" />

              {/* Heart Gold Seal */}
              <div className="z-10 flex flex-col items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="h-14 w-14 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-pastel-gold/60 group-hover:bg-pastel-bg group-hover:scale-110 transition-all duration-300"
                >
                  <Heart className="h-6 w-6 text-pastel-rose fill-pastel-rose/20" />
                </motion.div>
                <span className="font-playfair text-xs tracking-widest text-charcoal/80 uppercase font-bold bg-white/40 px-3 py-1 rounded-full">
                  Open Invitation
                </span>
              </div>

              {/* Subtle Gold Shimmer Border lines */}
              <div className="absolute inset-2 border border-dashed border-pastel-gold/30 rounded-xl" />
            </motion.div>
          ) : (
            /* OPENED INVITATION CARD STATE */
            <motion.div
              key="opened-card"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 15, duration: 0.8 }}
              className="w-full max-w-md p-6 sm:p-8 rounded-[36px] glassmorphism border-2 border-pastel-gold/40 shadow-2xl relative flex flex-col items-center text-center overflow-hidden"
            >
              {/* Premium Glow and Sparkles */}
              <div className="absolute -left-10 -top-10 w-24 h-24 rounded-full bg-pastel-pink-light/20 blur-xl pointer-events-none" />
              <div className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full bg-pastel-gold/15 blur-xl pointer-events-none" />
              
              <div className="absolute top-4 right-4 text-pastel-gold/60 animate-pulse">
                <Sparkles className="h-5 w-5" />
              </div>

              {/* Header details */}
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-pastel-gold bg-white/50 px-3.5 py-1 rounded-full shadow-sm border border-pastel-pink-light mb-4">
                🌸 You are Warmly Invited 🌸
              </span>

              <h3 className="font-great-vibes text-4xl sm:text-5xl text-pastel-rose font-normal mb-1">
                Baby Shower Ceremony
              </h3>
              
              <p className="font-poppins text-[11px] uppercase tracking-[0.15em] text-charcoal/60 mb-5">
                Celebrating the mother-to-be
              </p>

              {/* Guest of honor name */}
              <div className="bg-white/45 py-2 px-6 rounded-full border border-pastel-pink-light/40 shadow-inner mb-6">
                <span className="font-playfair text-xl sm:text-2xl font-bold text-shimmer-gold">
                  Krithika Yogesh
                </span>
              </div>

              {/* Time and Venue Details list */}
              <div className="w-full space-y-4 text-left border-y border-dashed border-pastel-gold/30 py-5 my-2">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-pastel-pink-light/40 flex items-center justify-center border border-pastel-pink/30 flex-shrink-0">
                    <Calendar className="h-4.5 w-4.5 text-pastel-rose" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider block">Date</span>
                    <span className="font-playfair text-sm font-bold text-charcoal select-text">
                      Thursday, 18 June 2026
                    </span>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-pastel-pink-light/40 flex items-center justify-center border border-pastel-pink/30 flex-shrink-0">
                    <svg className="h-4.5 w-4.5 text-pastel-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider block">Time</span>
                    <span className="font-playfair text-sm font-bold text-charcoal select-text">
                      11:00 AM onwards
                    </span>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-pastel-pink-light/40 flex items-center justify-center border border-pastel-pink/30 flex-shrink-0">
                    <MapPin className="h-4.5 w-4.5 text-pastel-rose" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider block">Venue</span>
                    <span className="font-playfair text-sm font-bold text-charcoal block leading-tight select-text">
                      Annapoorna
                    </span>
                    <span className="font-poppins text-xs text-charcoal/70 block select-text">
                      M.T.P Road, Coimbatore
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={handleDownloadICS}
                  className="rounded-full bg-white hover:bg-pastel-pink-light/25 border border-pastel-pink text-charcoal text-xs font-semibold py-2.5 px-4 flex items-center justify-center gap-1.5 shadow-sm hover:scale-102 active:scale-98 transition-all cursor-pointer focus:outline-none"
                >
                  <Download className="h-3.5 w-3.5 text-pastel-rose" />
                  Add to Calendar
                </button>
                <a
                  href="https://maps.google.com/?q=Annapoorna+MTP+Road+Coimbatore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gradient-to-r from-pastel-rose to-pastel-pink text-white text-xs font-semibold py-2.5 px-4 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all cursor-pointer focus:outline-none"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  View Map
                  <ExternalLink className="h-3 w-3 opacity-80" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
