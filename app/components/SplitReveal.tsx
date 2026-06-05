"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

const variants = [
  { x: -30, y: 0, rotate: -3 },
  { x: 30, y: 0, rotate: 3 },
  { x: 0, y: 25, rotate: 0 },
  { x: 0, y: -25, rotate: 2 },
  { x: -25, y: 15, rotate: -2 },
  { x: 25, y: -15, rotate: 4 },
];

export default function SplitReveal({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "span" | "h1" | "h2" | "h3";
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const setRef = (el: HTMLElement | null) => { ref.current = el; };
  const words = text.split(" ");
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || isVisible) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 150);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, isVisible]);

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={setRef} className={className}>
      {words.map((word, i) => {
        const v = variants[i % variants.length];
        return (
          <span
            key={i}
            className="inline-block"
            style={{
              transform: isVisible
                ? "translate3d(0,0,0) rotate(0deg)"
                : `translate3d(${v.x}px,${v.y}px,0) rotate(${v.rotate}deg)`,
              opacity: isVisible ? 1 : 0,
              transition: `transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease-out`,
              transitionDelay: `${i * 0.04}s`,
            } as React.CSSProperties}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </Tag>
  );
}
