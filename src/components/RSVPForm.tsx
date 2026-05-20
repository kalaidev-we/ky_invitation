"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, User, Users, Coffee, Gift } from "lucide-react";
import confetti from "canvas-confetti";

export default function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    dietary: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Save RSVP to LocalStorage
    const storedRSVPs = localStorage.getItem("ky_rsvp_submissions");
    const rsvps = storedRSVPs ? JSON.parse(storedRSVPs) : [];
    const newRSVP = {
      ...formData,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("ky_rsvp_submissions", JSON.stringify([...rsvps, newRSVP]));

    // If there is a blessing message, also save it directly to the wishes array
    // so it shows up on the Blessing Wall!
    if (formData.message.trim()) {
      const storedWishes = localStorage.getItem("ky_baby_wishes");
      const wishes = storedWishes ? JSON.parse(storedWishes) : [];
      const newWish = {
        name: formData.name,
        message: formData.message,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("ky_baby_wishes", JSON.stringify([newWish, ...wishes]));
      
      // Dispatch custom event to notify BlessingWall to re-load wishes
      window.dispatchEvent(new Event("wishes-updated"));
    }

    // Explode Confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FADADD", "#F8C8DC", "#FFF5F7", "#E75480", "#D4A373"],
    });

    setSubmitted(true);
  };

  return (
    <section className="relative w-full py-24 px-4 bg-gradient-to-b from-[#FFF5F7] to-pastel-bg overflow-hidden flex flex-col items-center select-none" id="rsvp-section">
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-pastel-pink-light/20 blur-[120px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <h2 className="font-great-vibes text-5xl md:text-6xl text-pastel-rose mb-3">
          Join Our Celebration
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-pastel-gold/40 to-transparent mx-auto mb-4" />
        <p className="font-playfair text-base italic text-charcoal/70">
          Kindly respond by June 10, 2026, to help us prepare.
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-xl relative z-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="rsvp-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-10 rounded-[38px] glassmorphism border border-white/50 shadow-2xl relative"
            >
              {/* Outer Decorative Lines */}
              <div className="absolute inset-3 border border-dashed border-pastel-gold/25 rounded-[28px] pointer-events-none" />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Full name */}
                <div>
                  <label className="block font-poppins text-[10px] uppercase tracking-widest text-charcoal/60 font-bold mb-1.5 ml-1">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full pl-11 pr-4 py-3 rounded-full bg-white/70 border border-pastel-pink-light/65 focus:outline-none focus:border-pastel-rose focus:ring-1 focus:ring-pastel-rose text-sm font-poppins text-charcoal placeholder:text-charcoal/45 shadow-sm"
                    />
                  </div>
                </div>

                {/* Attending pills */}
                <div>
                  <label className="block font-poppins text-[10px] uppercase tracking-widest text-charcoal/60 font-bold mb-2 ml-1">Attending Status</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: "yes" })}
                      className={`py-3 rounded-full border text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center gap-1.5 shadow-sm ${
                        formData.attending === "yes"
                          ? "bg-gradient-to-r from-pastel-rose to-pastel-pink text-white border-transparent"
                          : "bg-white/45 text-charcoal/60 border-pastel-pink-light/40 hover:bg-white/60"
                      }`}
                    >
                      🌸 Joyfully Attend
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: "no" })}
                      className={`py-3 rounded-full border text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center gap-1.5 shadow-sm ${
                        formData.attending === "no"
                          ? "bg-charcoal text-white border-transparent"
                          : "bg-white/45 text-charcoal/60 border-pastel-pink-light/40 hover:bg-white/60"
                      }`}
                    >
                      😔 Regretfully Decline
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {formData.attending === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6 overflow-hidden"
                    >
                      {/* Number of guests selection */}
                      <div>
                        <label className="block font-poppins text-[10px] uppercase tracking-widest text-charcoal/60 font-bold mb-1.5 ml-1">Number of Guests</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40" />
                          <select
                            value={formData.guests}
                            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 rounded-full bg-white/70 border border-pastel-pink-light/65 focus:outline-none focus:border-pastel-rose focus:ring-1 focus:ring-pastel-rose text-sm font-poppins text-charcoal cursor-pointer shadow-sm"
                          >
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                            <option value="3">3 People</option>
                            <option value="4">4+ People</option>
                          </select>
                        </div>
                      </div>

                      {/* Dietary note */}
                      <div>
                        <label className="block font-poppins text-[10px] uppercase tracking-widest text-charcoal/60 font-bold mb-1.5 ml-1">Dietary Preferences / Notes</label>
                        <div className="relative">
                          <Coffee className="absolute left-4 top-3.5 h-4 w-4 text-charcoal/40" />
                          <textarea
                            rows={2}
                            value={formData.dietary}
                            onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                            placeholder="e.g. Vegetarian, Gluten-free, etc. (optional)"
                            className="w-full pl-11 pr-4 py-3 rounded-[20px] bg-white/70 border border-pastel-pink-light/65 focus:outline-none focus:border-pastel-rose focus:ring-1 focus:ring-pastel-rose text-sm font-poppins text-charcoal placeholder:text-charcoal/45 shadow-sm resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message / Blessings for mom to be */}
                <div>
                  <label className="block font-poppins text-[10px] uppercase tracking-widest text-charcoal/60 font-bold mb-1.5 ml-1">Blessings & Wishes</label>
                  <div className="relative">
                    <Gift className="absolute left-4 top-3.5 h-4 w-4 text-charcoal/40" />
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your loving blessings for Krithika & the baby. Your message will be placed on our Blessing Wall! 💖"
                      className="w-full pl-11 pr-4 py-3 rounded-[24px] bg-white/70 border border-pastel-pink-light/65 focus:outline-none focus:border-pastel-rose focus:ring-1 focus:ring-pastel-rose text-sm font-poppins text-charcoal placeholder:text-charcoal/45 shadow-sm resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-pastel-rose to-pastel-pink text-white font-semibold py-3.5 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-101 active:scale-99 transition-all cursor-pointer focus:outline-none mt-4"
                >
                  <Send className="h-4.5 w-4.5" />
                  Send Response
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="rsvp-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 sm:p-12 rounded-[38px] glassmorphism border border-white/50 shadow-2xl text-center flex flex-col items-center justify-center"
            >
              <div className="absolute inset-3 border border-dashed border-pastel-gold/25 rounded-[28px] pointer-events-none" />
              
              <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-5 animate-pulse" />
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-charcoal mb-3">Response Received</h3>
              
              {formData.attending === "yes" ? (
                <p className="font-poppins text-xs text-charcoal/70 max-w-sm leading-relaxed mb-6 select-text">
                  We are absolutely thrilled! Thank you for planning to join us in celebrating this beautiful blessing. We can&apos;t wait to see you on June 18, 2026.
                </p>
              ) : (
                <p className="font-poppins text-xs text-charcoal/70 max-w-sm leading-relaxed mb-6 select-text">
                  We will miss you! Thank you for letting us know and for sending your prayers. We will carry your blessings in our hearts.
                </p>
              )}

              <button
                onClick={() => setSubmitted(false)}
                className="rounded-full bg-white hover:bg-pastel-bg border border-pastel-pink text-charcoal text-xs font-semibold py-2.5 px-6 shadow-sm hover:scale-102 active:scale-98 transition-all cursor-pointer focus:outline-none"
              >
                Change Response
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
