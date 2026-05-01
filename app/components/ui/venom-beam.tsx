"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

export interface VenomBeamProps {
  children?: React.ReactNode;
  className?: string;
  /** Rellena el contenedor padre (position: relative + altura definida) */
  fill?: boolean;
  /** Modo sección: sin alturas fijas ni puntos decorativos; canvas no captura eventos */
  embed?: boolean;
}

const VenomBeam: React.FC<VenomBeamProps> = ({
  children,
  className = "",
  fill = false,
  embed = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDarkRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const paintStatic = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        if (dark) {
          g.addColorStop(0, "rgba(12, 10, 10, 1)");
          g.addColorStop(0.5, "rgba(69, 10, 10, 0.35)");
          g.addColorStop(1, "rgba(12, 10, 10, 1)");
        } else {
          g.addColorStop(0, "rgba(250, 248, 248, 1)");
          g.addColorStop(0.5, "rgba(255, 228, 230, 0.55)");
          g.addColorStop(1, "rgba(250, 248, 248, 1)");
        }
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };
      paintStatic();
      const ro = new ResizeObserver(paintStatic);
      ro.observe(canvas.parentElement ?? canvas);
      return () => ro.disconnect();
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const c = canvas.getContext("2d");
      if (!c) return;
      isDarkRef.current = window.matchMedia("(prefers-color-scheme: dark)").matches;
      c.fillStyle = isDarkRef.current ? "#0c0a0a" : "#fef2f2";
      c.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    const resizeHost = canvas.parentElement ?? canvas;
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(resizeHost);

    const initParticles = () => {
      particlesRef.current = [];
      const count = typeof window !== 'undefined' && window.innerWidth < 768 ? (embed ? 20 : 35) : (embed ? 35 : 55);
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          life: 0,
          maxLife: Math.random() * 150 + 80,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.6 + 0.25,
        });
      }
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (!embed) {
      canvas.addEventListener("mousemove", handleMouseMove);
    }

    const animate = () => {
      isDarkRef.current = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (isDarkRef.current) {
        ctx.fillStyle = "rgba(12, 10, 10, 0.4)";
      } else {
        ctx.fillStyle = "rgba(254, 242, 242, 0.5)";
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1 && distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.1;
          particle.vy += (dy / distance) * force * 0.1;
        }

        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.vx = (Math.random() - 0.5) * 2;
          particle.vy = (Math.random() - 0.5) * 2;
          particle.life = 0;
          particle.maxLife = Math.random() * 100 + 50;
        }

        const alpha = particle.opacity * (1 - particle.life / particle.maxLife);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2,
        );

        if (isDarkRef.current) {
          gradient.addColorStop(0, `rgba(244, 63, 94, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(225, 29, 72, ${alpha * 0.7})`);
          gradient.addColorStop(1, `rgba(190, 18, 60, ${alpha * 0.3})`);
        } else {
          gradient.addColorStop(0, `rgba(220, 38, 38, ${alpha * 0.8})`);
          gradient.addColorStop(0.5, `rgba(185, 28, 28, ${alpha * 0.5})`);
          gradient.addColorStop(1, `rgba(127, 29, 29, ${alpha * 0.2})`);
        }

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      const linkDistance = embed ? 90 : 120;
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < linkDistance) {
            const alpha = ((linkDistance - distance) / linkDistance) * (embed ? 0.2 : 0.35);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);

            if (isDarkRef.current) {
              ctx.strokeStyle = `rgba(244, 63, 94, ${alpha})`;
            } else {
              ctx.strokeStyle = `rgba(190, 18, 60, ${alpha})`;
            }
            ctx.lineWidth = embed ? 0.5 : 0.8;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      if (!embed) {
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationRef.current);
    };
  }, [embed]);

  const rootClass = fill
    ? "relative h-full min-h-full w-full overflow-hidden pointer-events-none"
    : "relative h-96 md:h-screen w-full overflow-hidden bg-white dark:bg-black pointer-events-auto";

  const canvasBg = embed
    ? "absolute inset-0 h-full w-full bg-transparent"
    : "absolute inset-0 w-full h-full bg-linear-to-br from-rose-50/40 via-stone-50 to-rose-100/30 dark:from-stone-950 dark:via-neutral-950 dark:to-rose-950/20";

  return (
    <div className={rootClass}>
      <canvas ref={canvasRef} className={`${canvasBg} ${embed ? "" : ""}`} aria-hidden />

      {!embed && (
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-white/20 to-white/55 dark:via-black/25 dark:to-black/55" />
      )}

      {children != null && <div className={`absolute inset-0 ${className}`}>{children}</div>}

      {!embed && (
        <>
          <div className="pointer-events-none absolute top-20 left-10 h-2 w-2 rounded-full bg-rose-500 opacity-50 animate-pulse dark:bg-rose-400" />
          <div className="pointer-events-none absolute top-40 right-20 h-1 w-1 rounded-full bg-red-600 opacity-35 animate-pulse dark:bg-rose-300" />
          <div className="pointer-events-none absolute bottom-32 left-1/4 h-1.5 w-1.5 rounded-full bg-rose-600 opacity-40 animate-pulse dark:bg-rose-400" />
          <div className="pointer-events-none absolute right-1/3 bottom-20 h-1 w-1 rounded-full bg-red-500 opacity-25 animate-pulse dark:bg-rose-300" />
        </>
      )}
    </div>
  );
};

export default VenomBeam;
