"use client";

import React, { useEffect, useRef } from "react";

interface Heart {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

export default function HeartCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable on mobile/touch devices for performance and native feel
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let hearts: Heart[] = [];
    const colors = ["#FADADD", "#F8C8DC", "#E75480", "#FFF5F7"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const spawnHeart = (x: number, y: number) => {
      // Spawn only occasionally to prevent cluttering
      if (Math.random() > 0.4) return;
      
      hearts.push({
        x,
        y,
        size: Math.random() * 8 + 6,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 1.2 - 0.6,
        alpha: 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      spawnHeart(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const drawHeartShape = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // Top left curve
      ctx.bezierCurveTo(
        x - size / 2, y - topCurveHeight,
        x - size, y + topCurveHeight,
        x, y + size
      );
      // Top right curve
      ctx.bezierCurveTo(
        x + size, y + topCurveHeight,
        x + size / 2, y - topCurveHeight,
        x, y + topCurveHeight
      );
      ctx.fill();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.x += h.vx;
        h.y += h.vy;
        h.alpha -= 0.015; // fade out

        if (h.alpha <= 0) {
          hearts.splice(i, 1);
        } else {
          ctx.save();
          ctx.fillStyle = h.color;
          ctx.globalAlpha = h.alpha;
          // Add soft glow
          ctx.shadowBlur = 4;
          ctx.shadowColor = "#F8C8DC";
          drawHeartShape(ctx, h.x, h.y, h.size);
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50 hidden md:block" />;
}
