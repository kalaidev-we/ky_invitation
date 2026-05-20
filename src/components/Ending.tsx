"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface Lantern {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  flicker: number;
}

export default function Ending() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lanterns: Lantern[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const createLantern = (randomY = false): Lantern => {
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 30,
        size: Math.random() * 15 + 12,
        speedY: -(Math.random() * 0.7 + 0.3),
        speedX: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.5,
        flicker: Math.random() * 0.05,
      };
    };

    // Initialize lanterns
    const initLanterns = () => {
      lanterns = [];
      const count = Math.min(25, Math.floor(canvas.width / 50));
      for (let i = 0; i < count; i++) {
        lanterns.push(createLantern(true));
      }
    };

    const drawLantern = (l: Lantern) => {
      ctx.save();
      ctx.globalAlpha = l.opacity;
      
      // Outer soft glow aura
      const glow = ctx.createRadialGradient(l.x, l.y, 2, l.x, l.y, l.size * 1.5);
      glow.addColorStop(0, "rgba(255, 200, 100, 0.6)");
      glow.addColorStop(0.3, "rgba(231, 84, 128, 0.2)");
      glow.addColorStop(1, "rgba(46, 34, 53, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.size * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Lantern body (rounded rectangle)
      ctx.beginPath();
      const x = l.x - l.size / 2;
      const y = l.y - l.size / 2;
      const w = l.size;
      const h = l.size * 1.35;
      const r = 4; // corner radius
      
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      
      // Warm yellow/orange gradient
      const bodyGrad = ctx.createLinearGradient(l.x, y, l.x, y + h);
      bodyGrad.addColorStop(0, "#FFE082"); // gold bright top
      bodyGrad.addColorStop(0.7, "#FF8A65"); // warm orange middle
      bodyGrad.addColorStop(1, "#E57373"); // dark red-orange bottom
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Inner flame (bottom center)
      ctx.beginPath();
      const flameHeight = l.size * 0.35;
      ctx.arc(l.x, y + h - 3, l.size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#FFEB3B";
      ctx.fill();

      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < lanterns.length; i++) {
        const l = lanterns[i];
        l.y += l.speedY;
        l.x += l.speedX + Math.sin(l.y / 60) * 0.1; // slight sway
        
        // Flicker opacity slightly
        l.opacity += (Math.random() - 0.5) * 0.04;
        l.opacity = Math.max(0.4, Math.min(1.0, l.opacity));

        if (l.y < -l.size * 2) {
          lanterns[i] = createLantern(false);
        } else {
          drawLantern(l);
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    initLanterns();
    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF5F7] via-[#F8C8DC] to-[#2E2235] py-24 px-4 overflow-hidden select-none">
      
      {/* Canvas for sky lanterns */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />

      {/* Content overlays */}
      <div className="relative z-10 text-center max-w-2xl flex flex-col items-center">
        
        {/* Heart icon */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg mb-8"
        >
          <Heart className="h-6 w-6 text-white fill-white/20" />
        </motion.div>

        {/* Cursive emotional text */}
        <h3 className="font-great-vibes text-5xl sm:text-6xl text-white font-normal mb-8 leading-tight drop-shadow select-text">
          Your presence will make our celebration even more special 💖
        </h3>

        {/* Back to RSVP CTA button */}
        <button
          onClick={() => {
            const rsvpElement = document.getElementById("rsvp-section");
            if (rsvpElement) {
              rsvpElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="rounded-full bg-white text-pastel-rose font-bold text-xs uppercase tracking-widest py-3 px-8 shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
        >
          Submit RSVP Response
        </button>

        <p className="font-poppins text-[10px] text-white/50 uppercase tracking-widest mt-12 select-text">
          Krithika Yogesh Baby Shower • 2026
        </p>

      </div>
    </section>
  );
}
