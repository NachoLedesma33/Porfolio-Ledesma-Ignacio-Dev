"use client";

import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";

export default function AnimatedBorder({
  children,
  rounded = "xl",
  innerClass = "",
  className = "",
}: {
  children: ReactNode;
  rounded?: "xl" | "lg";
  innerClass?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const outerRounded = rounded === "lg" ? "rounded-lg" : "rounded-xl";
  return (
    <div
      ref={ref}
      className={`relative ${outerRounded} p-[1.5px] ${isVisible ? "gradient-border-wrap" : ""} ${className}`}
    >
      <div className={`${outerRounded} overflow-hidden h-full ${innerClass}`}>
        {children}
      </div>
    </div>
  );
}
