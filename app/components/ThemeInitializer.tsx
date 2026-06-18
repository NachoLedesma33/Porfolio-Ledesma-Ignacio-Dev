"use client";
import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    try {
      const t = localStorage.getItem("theme");
      if (t === "dark" || (t !== "light" && window.matchMedia("(prefers-color-scheme:dark)").matches)) {
        document.documentElement.classList.add("dark");
      }
    } catch {}
  }, []);

  return null;
}
