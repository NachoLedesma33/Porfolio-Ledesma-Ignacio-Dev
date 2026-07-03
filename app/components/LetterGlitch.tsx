"use client";

import { useRef, useEffect, useCallback } from "react";
import { useIsDark } from "@/app/hooks/useIsDark";

type Letter = {
  char: string;
  color: string;
  targetColor: string;
  colorProgress: number;
};

type Rgb = { r: number; g: number; b: number };

export type LetterGlitchProps = {
  glitchColors?: string[];
  className?: string;
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  characters?: string;
  backgroundColor?: string;
  /** Solo controla la animación; el canvas se mantiene precargado siempre. */
  active?: boolean;
};

const LIGHT_GLITCH_COLORS = ["#a8a29e", "#f9a8b4", "#fb7185", "#e11d48", "#be123c"];
const DARK_GLITCH_COLORS = ["#44403c", "#7f1d1d", "#9f1239", "#be123c", "#fb7185"];

function resolveContainerSize(el: HTMLElement) {
  let node: HTMLElement | null = el;
  while (node) {
    const width = node.clientWidth;
    const height = node.clientHeight;
    if (width > 0 && height > 0) return { width, height };
    node = node.parentElement;
  }
  return { width: window.innerWidth, height: window.innerHeight };
}

const LetterGlitch = ({
  glitchColors,
  className = "",
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  backgroundColor,
  active = true,
}: LetterGlitchProps) => {
  const isDark = useIsDark();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef(0);
  const animateRef = useRef<() => void>(() => {});
  const letters = useRef<Letter[]>([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(0);
  const activeRef = useRef(active);
  const reducedMotionRef = useRef(false);
  const colorsRef = useRef<string[]>([]);
  const charsRef = useRef<string[]>([]);
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  const resolvedColors = glitchColors ?? (isDark ? DARK_GLITCH_COLORS : LIGHT_GLITCH_COLORS);
  const resolvedBackground = backgroundColor ?? (isDark ? "#0c0a0a" : "#faf8f8");

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const getRandomChar = useCallback(
    () => charsRef.current[Math.floor(Math.random() * charsRef.current.length)] ?? "A",
    [],
  );

  const getRandomColor = useCallback(
    () => colorsRef.current[Math.floor(Math.random() * colorsRef.current.length)] ?? "#888",
    [],
  );

  const hexToRgb = useCallback((hex: string): Rgb | null => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const normalized = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }, []);

  const interpolateColor = useCallback((start: Rgb, end: Rgb, factor: number) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  }, []);

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = useCallback((columns: number, rows: number) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  }, [getRandomChar, getRandomColor]);

  const drawLetters = useCallback(() => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasSizeRef.current;
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const { width, height } = resolveContainerSize(parent);
    if (width === 0 || height === 0) return;

    canvasSizeRef.current = { width, height };

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(width, height);
    initializeLetters(columns, rows);
    drawLetters();
  }, [drawLetters, initializeLetters]);

  const updateLetters = useCallback(() => {
    if (!letters.current.length) return;

    const updateCount = Math.max(
      1,
      Math.floor(letters.current.length * (isDark ? 0.035 : 0.05)),
    );

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      const letter = letters.current[index];
      if (!letter) continue;

      letter.char = getRandomChar();
      letter.targetColor = getRandomColor();

      if (!smooth) {
        letter.color = letter.targetColor;
        letter.colorProgress = 1;
      } else {
        letter.colorProgress = 0;
      }
    }
  }, [getRandomChar, getRandomColor, isDark, smooth]);

  const handleSmoothTransitions = useCallback(() => {
    let needsRedraw = false;
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.04;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color) ?? hexToRgb(colorsRef.current[0] ?? "#888");
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) drawLetters();
  }, [drawLetters, hexToRgb, interpolateColor]);

  const animate = useCallback(() => {
    if (!activeRef.current) return;

    const now = Date.now();
    if (lastGlitchTime.current === 0) {
      lastGlitchTime.current = now;
    }

    if (!reducedMotionRef.current && now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth && !reducedMotionRef.current) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animateRef.current);
  }, [drawLetters, glitchSpeed, handleSmoothTransitions, smooth, updateLetters]);

  const remeasure = useCallback(() => {
    resizeCanvas();
  }, [resizeCanvas]);

  const startAnimation = useCallback(() => {
    cancelAnimationFrame(animationRef.current);
    animate();
  }, [animate]);

  const stopAnimation = useCallback(() => {
    cancelAnimationFrame(animationRef.current);
  }, []);

  const resolvedColorsKey = resolvedColors.join(",");

  useEffect(() => {
    colorsRef.current = glitchColors ?? (isDark ? DARK_GLITCH_COLORS : LIGHT_GLITCH_COLORS);
    charsRef.current = Array.from(characters);
  }, [characters, glitchColors, isDark]);

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  useEffect(() => {
    activeRef.current = active;
    if (active) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [active, startAnimation, stopAnimation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    context.current = canvas.getContext("2d");

    remeasure();
    if (activeRef.current) startAnimation();

    const parent = canvas.parentElement;
    let resizeRaf = 0;
    let resizeObserver: ResizeObserver | undefined;

    const scheduleRemeasure = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        remeasure();
        if (activeRef.current) startAnimation();
      });
    };

    if (parent) {
      resizeObserver = new ResizeObserver(scheduleRemeasure);
      resizeObserver.observe(parent);
      const sectionRoot = parent.closest(".scrollbar-hide");
      if (sectionRoot instanceof HTMLElement) {
        resizeObserver.observe(sectionRoot);
      }
    }

    const handleBackdropSync = () => scheduleRemeasure();

    window.addEventListener("resize", scheduleRemeasure);
    window.addEventListener("section-backdrop-sync", handleBackdropSync);

    return () => {
      stopAnimation();
      cancelAnimationFrame(resizeRaf);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleRemeasure);
      window.removeEventListener("section-backdrop-sync", handleBackdropSync);
    };
  }, [isDark, remeasure, resolvedBackground, resolvedColorsKey, startAnimation, stopAnimation]);

  return (
    <div
      style={{ backgroundColor: resolvedBackground, willChange: "transform", transform: "translateZ(0)" }}
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {outerVignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(12,10,10,0) 60%, rgba(12,10,10,0.72) 100%)"
              : "radial-gradient(circle, rgba(250,248,248,0) 62%, rgba(250,248,248,0.55) 100%)",
          }}
        />
      )}
      {centerVignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(12,10,10,0.42) 0%, rgba(12,10,10,0) 68%)"
              : "radial-gradient(circle, rgba(250,248,248,0.28) 0%, rgba(250,248,248,0) 68%)",
          }}
        />
      )}
    </div>
  );
};

export default LetterGlitch;
