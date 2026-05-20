"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baby, Send, User, Award, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface Prediction {
  name: string;
  guess: string;
  gender: "Boy" | "Girl";
  relation: string;
}

const SEED_PREDICTIONS: Prediction[] = [
  { name: "Rahul & Deepthi", guess: "Kavya", gender: "Girl", relation: "Family" },
  { name: "Suresh Kumar", guess: "Aarav", gender: "Boy", relation: "Friend" },
  { name: "Meera Yogesh", guess: "Aditi", gender: "Girl", relation: "Family" },
  { name: "Anish", guess: "Vihaan", gender: "Boy", relation: "Colleague" },
];

export default function NameGame() {
  const [predictions, setPredictions] = useState<Prediction[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ky_baby_name_predictions");
      if (stored) return JSON.parse(stored);
    }
    return SEED_PREDICTIONS;
  });

  const [formData, setFormData] = useState({
    name: "",
    guess: "",
    gender: "Girl" as "Boy" | "Girl",
    relation: "Family",
  });
  const [submitted, setSubmitted] = useState(false);

  // Seed default predictions to localStorage on mount if missing
  useEffect(() => {
    const stored = localStorage.getItem("ky_baby_name_predictions");
    if (!stored) {
      localStorage.setItem("ky_baby_name_predictions", JSON.stringify(SEED_PREDICTIONS));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.guess.trim()) return;

    const newPrediction: Prediction = {
      name: formData.name,
      guess: formData.guess,
      gender: formData.gender,
      relation: formData.relation,
    };

    const updated = [newPrediction, ...predictions];
    setPredictions(updated);
    localStorage.setItem("ky_baby_name_predictions", JSON.stringify(updated));
    setSubmitted(true);

    // Confetti pop!
    confetti({
      particleCount: 60,
      spread: 45,
      colors: formData.gender === "Boy" ? ["#93C5FD", "#60A5FA", "#EFF6FF"] : ["#FCA5A5", "#F87171", "#FFF5F5"],
    });

    // Reset some form parts
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", guess: "", gender: "Girl", relation: "Family" });
    }, 3000);
  };

  // Calculate statistics
  const boyCount = predictions.filter((p) => p.gender === "Boy").length;
  const girlCount = predictions.filter((p) => p.gender === "Girl").length;
  const total = predictions.length || 1;
  const boyPercent = Math.round((boyCount / total) * 100);
  const girlPercent = Math.round((girlCount / total) * 100);

  return (
    <section className="relative w-full py-24 px-4 bg-gradient-to-b from-pastel-bg to-[#FFF5F7] overflow-hidden select-none">
      <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-pastel-pink-light/20 blur-[100px] pointer-events-none" />
      
      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <h2 className="font-great-vibes text-5xl md:text-6xl text-pastel-rose mb-3">
          Baby Name Prediction
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-pastel-gold/40 to-transparent mx-auto mb-4" />
        <p className="font-playfair text-base italic text-charcoal/70">
          Make a guess! Will it be a sweet boy or a beautiful girl?
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Left Side: Prediction Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 sm:p-8 rounded-[32px] glassmorphism border border-white/50 shadow-lg relative"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="prediction-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Baby className="h-5 w-5 text-pastel-rose" />
                  <span className="font-playfair text-sm font-bold text-charcoal uppercase tracking-wider">Cast Your Prediction</span>
                </div>

                {/* Name */}
                <div>
                  <label className="block font-poppins text-[10px] uppercase tracking-wider text-charcoal/60 font-bold mb-1.5 ml-1">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aunt Priya"
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/70 border border-pastel-pink-light/65 focus:outline-none focus:border-pastel-rose focus:ring-1 focus:ring-pastel-rose text-sm font-poppins text-charcoal placeholder:text-charcoal/40"
                    />
                  </div>
                </div>

                {/* Name prediction */}
                <div>
                  <label className="block font-poppins text-[10px] uppercase tracking-wider text-charcoal/60 font-bold mb-1.5 ml-1">Name Prediction</label>
                  <div className="relative">
                    <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/40" />
                    <input
                      type="text"
                      required
                      value={formData.guess}
                      onChange={(e) => setFormData({ ...formData, guess: e.target.value })}
                      placeholder="e.g. Diya or Aarav"
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/70 border border-pastel-pink-light/65 focus:outline-none focus:border-pastel-rose focus:ring-1 focus:ring-pastel-rose text-sm font-poppins text-charcoal placeholder:text-charcoal/40"
                    />
                  </div>
                </div>

                {/* Gender pills */}
                <div>
                  <label className="block font-poppins text-[10px] uppercase tracking-wider text-charcoal/60 font-bold mb-2 ml-1">Gender Guess</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: "Boy" })}
                      className={`py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center gap-1.5 ${
                        formData.gender === "Boy"
                          ? "bg-blue-100/90 text-blue-600 border-blue-300 shadow-sm"
                          : "bg-white/40 text-charcoal/60 border-pastel-pink-light/40 hover:bg-white/60"
                      }`}
                    >
                      💙 Team Boy
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: "Girl" })}
                      className={`py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center gap-1.5 ${
                        formData.gender === "Girl"
                          ? "bg-red-100/90 text-red-600 border-red-300 shadow-sm"
                          : "bg-white/40 text-charcoal/60 border-pastel-pink-light/40 hover:bg-white/60"
                      }`}
                    >
                      💗 Team Girl
                    </button>
                  </div>
                </div>

                {/* Relation dropdown */}
                <div>
                  <label className="block font-poppins text-[10px] uppercase tracking-wider text-charcoal/60 font-bold mb-1.5 ml-1">Relation</label>
                  <select
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full bg-white/70 border border-pastel-pink-light/65 focus:outline-none focus:border-pastel-rose focus:ring-1 focus:ring-pastel-rose text-sm font-poppins text-charcoal cursor-pointer"
                  >
                    <option value="Family">Family Member</option>
                    <option value="Friend">Friend</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Other">Well-wisher / Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-pastel-rose to-pastel-pink text-white font-semibold py-3 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-101 active:scale-99 transition-all cursor-pointer focus:outline-none mt-6"
                >
                  <Send className="h-4 w-4" />
                  Submit Prediction
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="prediction-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <CheckCircle className="h-16 w-16 text-emerald-500 mb-4 animate-pulse" />
                <h3 className="font-playfair text-2xl font-bold text-charcoal mb-2">Prediction Received!</h3>
                <p className="font-poppins text-xs text-charcoal/70 max-w-xs leading-relaxed">
                  Thank you for playing! Your prediction has been registered on our live statistics board.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Side: Real-time Stats Board */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Stats card */}
          <div className="p-6 sm:p-8 rounded-[32px] glassmorphism border border-white/50 shadow-lg relative">
            <h3 className="font-playfair text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
              📊 Live Gender Poll
            </h3>
            
            <div className="space-y-5">
              {/* Boy stat */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-charcoal/80 mb-1 ml-1">
                  <span>💙 Team Boy ({boyCount} votes)</span>
                  <span>{boyPercent}%</span>
                </div>
                <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden border border-blue-200">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-300 to-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${boyPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Girl stat */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-charcoal/80 mb-1 ml-1">
                  <span>💗 Team Girl ({girlCount} votes)</span>
                  <span>{girlPercent}%</span>
                </div>
                <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden border border-red-200">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-300 to-red-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${girlPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent list card */}
          <div className="p-6 sm:p-8 rounded-[32px] glassmorphism border border-white/50 shadow-lg h-[240px] overflow-hidden flex flex-col">
            <h3 className="font-playfair text-base font-bold text-charcoal mb-4">
              📝 Recent Guess Board
            </h3>
            <div className="flex-1 overflow-y-auto pr-1 space-y-3 no-scrollbar">
              {predictions.map((p, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between py-2 px-4 rounded-2xl bg-white/40 border border-white/50 text-xs font-poppins"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-charcoal">{p.name}</span>
                    <span className="text-[10px] text-charcoal/50">{p.relation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-charcoal">
                      Guess: <span className="text-shimmer-gold">{p.guess}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold border" style={{
                      backgroundColor: p.gender === "Boy" ? "rgba(147, 197, 253, 0.15)" : "rgba(252, 165, 165, 0.15)",
                      color: p.gender === "Boy" ? "#3B82F6" : "#EF4444",
                      borderColor: p.gender === "Boy" ? "rgba(147, 197, 253, 0.3)" : "rgba(252, 165, 165, 0.3)",
                    }}>
                      {p.gender === "Boy" ? "Boy 💙" : "Girl 💗"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
