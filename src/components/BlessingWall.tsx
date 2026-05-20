"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift, MessageSquareCode, Plus } from "lucide-react";
import confetti from "canvas-confetti";

interface Wish {
  name: string;
  message: string;
  timestamp: string;
}

const SEED_WISHES: Wish[] = [
  { name: "Aunt Lakshmi", message: "Congratulations Krithika & Yogesh! May God shower the little one with endless health, love, and sweet happiness.", timestamp: new Date().toISOString() },
  { name: "Kavya & Arjun", message: "Can't wait to hold the little angel! Sending so much love, hugs, and protective prayers to the beautiful mom-to-be.", timestamp: new Date().toISOString() },
  { name: "Divya Srinivasan", message: "Wishing you a smooth and beautiful journey ahead. You are going to be a stellar mother, Krithika! Much love.", timestamp: new Date().toISOString() },
  { name: "Uncle Prasad", message: "Blessed wishes for this lovely phase of life. May the newborn bring infinite laughter and sweet fortunes to your family.", timestamp: new Date().toISOString() }
];

export default function BlessingWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWish, setNewWish] = useState({ name: "", message: "" });

  const loadWishes = () => {
    const stored = localStorage.getItem("ky_baby_wishes");
    if (stored) {
      setWishes(JSON.parse(stored));
    } else {
      setWishes(SEED_WISHES);
      localStorage.setItem("ky_baby_wishes", JSON.stringify(SEED_WISHES));
    }
  };

  useEffect(() => {
    loadWishes();

    // Listen for custom event from RSVP Form
    const handleWishesUpdated = () => {
      loadWishes();
    };

    window.addEventListener("wishes-updated", handleWishesUpdated);
    return () => {
      window.removeEventListener("wishes-updated", handleWishesUpdated);
    };
  }, []);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim()) return;

    const wishObj: Wish = {
      name: newWish.name,
      message: newWish.message,
      timestamp: new Date().toISOString(),
    };

    const updated = [wishObj, ...wishes];
    setWishes(updated);
    localStorage.setItem("ky_baby_wishes", JSON.stringify(updated));
    
    // Reset form and close modal
    setNewWish({ name: "", message: "" });
    setIsModalOpen(false);

    // Sweet burst
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#FADADD", "#F8C8DC", "#E75480", "#D4A373"],
    });
  };

  return (
    <section className="relative w-full py-24 px-4 bg-gradient-to-b from-pastel-bg to-[#FFF5F7] overflow-hidden select-none">
      <div className="absolute top-[30%] left-[-15%] w-[400px] h-[400px] rounded-full bg-pastel-pink-light/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[400px] h-[400px] rounded-full bg-pastel-gold/20 blur-[120px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <h2 className="font-great-vibes text-5xl md:text-6xl text-pastel-rose mb-3">
          Family Blessing Wall
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-pastel-gold/40 to-transparent mx-auto mb-4" />
        <p className="font-playfair text-base italic text-charcoal/70">
          Showering Krithika with loving thoughts, blessings, and wisdom.
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-center mb-12">
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-full bg-gradient-to-r from-pastel-rose to-pastel-pink text-white font-semibold py-3 px-8 flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 relative group cursor-pointer focus:outline-none"
        >
          <Plus className="h-5 w-5" />
          Send a Blessing
          <span className="absolute -inset-1 rounded-full border border-pastel-pink opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 pointer-events-none" />
        </button>
      </div>

      {/* Wishes Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        <AnimatePresence mode="popLayout">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.timestamp + index}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, type: "spring", damping: 15 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-3xl glassmorphism border border-white/50 shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              {/* Gold heart tag */}
              <div className="absolute top-4 right-4 text-pastel-pink/70">
                <Heart className="h-4.5 w-4.5 fill-pastel-pink/20" />
              </div>

              {/* Message */}
              <p className="font-poppins text-xs leading-relaxed text-charcoal/80 mb-6 italic select-text">
                "{wish.message}"
              </p>

              {/* Author Info */}
              <div className="border-t border-dashed border-pastel-pink-light/60 pt-4 flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-pastel-pink-light/35 flex items-center justify-center text-xs font-semibold text-pastel-rose">
                  {wish.name.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <span className="font-playfair text-sm font-bold text-charcoal block select-text">
                    {wish.name}
                  </span>
                  <span className="font-poppins text-[9px] text-charcoal/40 uppercase tracking-wider block">
                    Blessing Card
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Send Blessing Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md p-6 sm:p-8 bg-white rounded-3xl shadow-2xl relative z-10 border border-pastel-pink-light"
            >
              <div className="absolute inset-3 border border-dashed border-pastel-gold/25 rounded-[20px] pointer-events-none" />

              <h3 className="font-playfair text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
                <Gift className="h-5 w-5 text-pastel-rose" />
                Write Your Blessings
              </h3>

              <form onSubmit={handleAddWish} className="space-y-4 relative z-10">
                {/* Author Name */}
                <div>
                  <label className="block font-poppins text-[10px] uppercase tracking-wider text-charcoal/60 font-bold mb-1 ml-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newWish.name}
                    onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
                    placeholder="e.g. Uncle Prasad"
                    className="w-full px-4 py-2.5 rounded-full bg-white border border-pastel-pink-light/65 focus:outline-none focus:border-pastel-rose focus:ring-1 focus:ring-pastel-rose text-sm font-poppins text-charcoal placeholder:text-charcoal/40 shadow-sm"
                  />
                </div>

                {/* Blessing message */}
                <div>
                  <label className="block font-poppins text-[10px] uppercase tracking-wider text-charcoal/60 font-bold mb-1 ml-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={newWish.message}
                    onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
                    placeholder="May this pregnancy phase bring you deep happiness, and may the baby arrive with good fortune and a heart of gold..."
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-pastel-pink-light/65 focus:outline-none focus:border-pastel-rose focus:ring-1 focus:ring-pastel-rose text-sm font-poppins text-charcoal placeholder:text-charcoal/40 shadow-sm resize-none"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-full bg-white hover:bg-pastel-bg border border-pastel-pink text-charcoal text-xs font-semibold py-2 px-5 cursor-pointer focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-gradient-to-r from-pastel-rose to-pastel-pink text-white font-semibold py-2 px-6 flex items-center gap-1.5 shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer focus:outline-none"
                  >
                    Send Blessing
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
