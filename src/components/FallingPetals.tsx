"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  angle: number;
  spinSpeed: number;
  opacity: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
}

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];
    let sparkles: Sparkle[] = [];
    
    const colors = ["#FADADD", "#F8C8DC", "#FFF5F7", "#E75480"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Initialize particles
    const initParticles = () => {
      petals = [];
      sparkles = [];
      const petalCount = Math.min(40, Math.floor(window.innerWidth / 30));
      const sparkleCount = Math.min(30, Math.floor(window.innerWidth / 40));

      for (let i = 0; i < petalCount; i++) {
        petals.push(createPetal(true));
      }
      for (let i = 0; i < sparkleCount; i++) {
        sparkles.push(createSparkle(true));
      }
    };

    const createPetal = (randomY = false): Petal => {
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : -20,
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 1.5 - 0.75,
        speedY: Math.random() * 1.2 + 0.8,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() * 0.02 - 0.01) * Math.PI,
        opacity: Math.random() * 0.5 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const createSparkle = (randomY = false): Sparkle => {
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : -10,
        size: Math.random() * 2 + 1,
        speedY: Math.random() * 0.6 + 0.4,
        speedX: Math.random() * 0.6 - 0.3,
        opacity: Math.random() * 0.8 + 0.2,
        fadeSpeed: Math.random() * 0.01 + 0.005,
      };
    };

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.beginPath();
      
      // Draw organic petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
      ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);
      
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (s: Sparkle) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = "#D4A373"; // luxury gold color
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#FFF5F7";
      ctx.globalAlpha = s.opacity;
      ctx.fill();
      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y / 30) * 0.3; // gentle waving sway
        p.angle += p.spinSpeed;

        if (p.y > canvas.height + p.size || p.x < -p.size || p.x > canvas.width + p.size) {
          petals[i] = createPetal(false);
        } else {
          drawPetal(p);
        }
      }

      // Update and draw sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.y += s.speedY;
        s.x += s.speedX;
        s.opacity -= s.fadeSpeed;

        if (s.opacity <= 0 || s.y > canvas.height) {
          sparkles[i] = createSparkle(false);
        } else {
          drawSparkle(s);
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    initParticles();
    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-10" />;
}
