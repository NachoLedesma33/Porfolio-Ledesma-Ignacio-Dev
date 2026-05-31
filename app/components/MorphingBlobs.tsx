"use client";

import { useSyncExternalStore } from "react";

function useIsDark() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false
  );
}

export default function MorphingBlobs({ active = true }: { active?: boolean }) {
  const isDark = useIsDark();

  const blobs = isDark
    ? [
        { size: 600, x: "15%", y: "10%", color: "rgba(190,18,60,0.2)", dur: 20, delay: 0 },
        { size: 500, x: "70%", y: "20%", color: "rgba(251,113,133,0.15)", dur: 25, delay: -5 },
        { size: 450, x: "80%", y: "60%", color: "rgba(244,63,94,0.15)", dur: 18, delay: -8 },
        { size: 550, x: "10%", y: "65%", color: "rgba(159,18,57,0.18)", dur: 22, delay: -12 },
      ]
    : [
        { size: 600, x: "15%", y: "10%", color: "rgba(190,18,60,0.07)", dur: 20, delay: 0 },
        { size: 500, x: "70%", y: "20%", color: "rgba(251,113,133,0.06)", dur: 25, delay: -5 },
        { size: 450, x: "80%", y: "60%", color: "rgba(244,63,94,0.05)", dur: 18, delay: -8 },
        { size: 550, x: "10%", y: "65%", color: "rgba(159,18,57,0.06)", dur: 22, delay: -12 },
      ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: blob.color,
            filter: "blur(80px)",
            animation: `morph-blob-${i} ${blob.dur}s ease-in-out ${blob.delay}s infinite alternate`,
            animationPlayState: active ? "running" : "paused",
            willChange: "transform",
          }}
        />
      ))}
      <style>{blobs.map((_, i) => `
@keyframes morph-blob-${i} {
  0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0,0) scale(1); }
  20%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate(30px,-25px) scale(1.05); }
  40%  { border-radius: 50% 60% 30% 60% / 40% 50% 60% 50%; transform: translate(-20px,30px) scale(0.95); }
  60%  { border-radius: 70% 30% 50% 50% / 30% 60% 50% 70%; transform: translate(25px,20px) scale(1.02); }
  80%  { border-radius: 40% 50% 60% 30% / 60% 40% 50% 50%; transform: translate(-15px,-15px) scale(0.98); }
  100% { border-radius: 50% 40% 60% 50% / 50% 60% 40% 60%; transform: translate(10px,-10px) scale(1.03); }
}`).join("")}</style>
    </div>
  );
}
