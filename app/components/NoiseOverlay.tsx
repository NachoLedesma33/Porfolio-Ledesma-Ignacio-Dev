"use client";

import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const generate = () => {
      const img = ctx.createImageData(size, size);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      if (ref.current) ref.current.style.backgroundImage = `url(${canvas.toDataURL()})`;
    };

    generate();

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const interval = setInterval(generate, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[64]"
      style={{
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        opacity: 0.04,
        imageRendering: "pixelated",
      }}
    />
  );
}
