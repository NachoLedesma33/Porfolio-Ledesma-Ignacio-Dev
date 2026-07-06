"use client";

import { useState, useEffect } from "react";
import SectionBackdrop from "@/app/components/SectionBackdrop";

const roles = [
  "Desarrollador Full Stack",
  "Futuro Ingeniero en Sistemas",
  "Creador de Experiencias Web",
];

import type { NavigationItem } from "@/app/components/Sidebar";

export default function Hero({ active = true, onNavigate }: { active?: boolean; onNavigate?: (id: NavigationItem) => void }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 15);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 8);
    } else if (deleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((r) => (r + 1) % roles.length);
      }, 15);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <div className="scrollbar-hide relative w-full h-full flex flex-col items-center justify-center rounded-2xl shadow-xl ring-1 ring-rose-100/70 dark:ring-rose-950/40 overflow-y-auto">
      <SectionBackdrop active={active}>
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 min-h-[60vh]">
          {/* Greeting */}
          <p className="text-lg sm:text-xl text-rose-600 dark:text-rose-400 font-medium mb-4 tracking-wide">
            Hola, soy
          </p>

          {/* Name */}
          <h1 className="section-heading text-5xl sm:text-6xl lg:text-7xl font-display tracking-tight mb-8">
            Ignacio<span className="inline-block w-6" />Ledesma
          </h1>

          <div className="accent-rule w-32 h-1 mx-auto rounded-full mb-10" aria-hidden />

          {/* TypeWriter Role */}
          <div className="h-10 sm:h-12 flex items-center justify-center mb-12">
            <span className="text-xl sm:text-2xl lg:text-3xl text-stone-700 dark:text-stone-200 font-semibold">
              {roles[roleIndex].slice(0, charIndex)}
              <span className="inline-block w-0.5 h-6 sm:h-7 ml-0.5 bg-rose-500 dark:bg-rose-400 animate-pulse" />
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <button
              onClick={() => onNavigate?.("projects")}
              className="px-6 sm:px-8 py-3 sm:py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition-all duration-200 text-sm sm:text-base"
            >
              Ver Proyectos
            </button>

            <button
              onClick={() => onNavigate?.("contact")}
              className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 font-semibold rounded-xl ring-2 ring-rose-200 dark:ring-rose-800 hover:ring-rose-400 dark:hover:ring-rose-600 shadow-lg hover:shadow-rose-200/30 dark:hover:shadow-rose-900/30 transition-all duration-200 text-sm sm:text-base"
            >
              Contactarme
            </button>

            <a
              href="/cv/CV_Ignacio_Ledesma.pdf"
              download
              className="px-6 sm:px-8 py-3 sm:py-3.5 bg-stone-100 dark:bg-stone-800/50 text-stone-700 dark:text-stone-200 font-semibold rounded-xl ring-2 ring-stone-200 dark:ring-stone-700 hover:ring-stone-400 dark:hover:ring-stone-500 shadow-lg hover:shadow-stone-200/30 dark:hover:shadow-stone-900/30 transition-all duration-200 text-sm sm:text-base inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar CV
            </a>
          </div>
        </div>
      </SectionBackdrop>
    </div>
  );
}
