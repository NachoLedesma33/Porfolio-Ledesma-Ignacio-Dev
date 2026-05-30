"use client";

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
  const outerRounded = rounded === "lg" ? "rounded-lg" : "rounded-xl";
  return (
    <div className={`relative ${outerRounded} p-[1.5px] gradient-border-wrap ${className}`}>
      <div className={`${outerRounded} overflow-hidden h-full ${innerClass}`}>
        {children}
      </div>
    </div>
  );
}
