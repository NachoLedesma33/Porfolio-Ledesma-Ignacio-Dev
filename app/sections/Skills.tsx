"use client";

import Image from "next/image";
import { useRef } from "react";
import SectionBackdrop from "@/app/components/SectionBackdrop";
import { useMouseDragScroll } from "@/app/hooks/useMouseDragScroll";
import { useIsDark } from "@/app/hooks/useIsDark";
import { skills, type SvglRoute } from "@/app/lib/skills";

function SkillIcon({ route, alt }: { route: SvglRoute; alt: string }) {
  const prefersDark = useIsDark();

  const src = typeof route === "string" ? route : prefersDark ? route.dark : route.light;

  return (
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      className="h-11 w-11 object-contain transition-transform duration-200 ease-out"
    />
  );
}

export default function Skills({ active = true }: { active?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useMouseDragScroll(scrollRef);

  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  return (
    <div
      ref={scrollRef}
      className="scrollbar-hide relative w-full h-full flex flex-col rounded-2xl shadow-xl ring-1 ring-rose-100/70 dark:ring-rose-950/40 p-2 sm:p-3 lg:p-4 overflow-y-auto min-h-screen"
    >
      <SectionBackdrop active={active}>
      <header className="text-center pt-4 sm:pt-6 mb-10 sm:mb-12">
        <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-3">
          Habilidades
        </h2>
        <div className="accent-rule w-20 h-1 mx-auto rounded-full" />
      </header>

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 flex-1 flex flex-col">
        <div className="mb-10 sm:mb-12 p-5 sm:p-6 rounded-xl ring-1 ring-rose-100/60 dark:ring-rose-900/40 bg-gradient-to-br from-rose-50/90 to-red-50/60 dark:from-rose-950/35 dark:to-red-950/20">
          <h2 className="text-base sm:text-lg font-semibold text-rose-900 dark:text-rose-200 mb-2 sm:mb-3 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-200/70 dark:bg-rose-800/50 text-[0.65rem] sm:text-xs" aria-hidden>
              i
            </span>
            Mi Trayectoria
          </h2>
          <p className="text-sm sm:text-base text-stone-900 dark:text-stone-200 leading-relaxed">
            Durante los últimos 5 años he adquirido y perfeccionado habilidades que me proporcionan un conjunto diverso de herramientas y lenguajes de programación. 
            Esta experiencia me permite abordar desafíos complejos en el desarrollo de software, desde aplicaciones web modernas hasta sistemas backend robustos, 
            siempre manteniendo un enfoque en las mejores prácticas y la calidad del código.
          </p>
        </div>

        {categories.map((category) => {
          const categorySkills = skills.filter((skill) => skill.category === category);
          const setWidth = categorySkills.length * 120;
          const copies = Math.max(2, Math.ceil(2000 / setWidth));
          const duration = Math.max(6, Math.round(setWidth / 60));
          const dir = category === "Backend" || category === "DevOps & Tools" ? "reverse" : "normal";
          return (
            <section key={category} className="mb-8 sm:mb-10" aria-labelledby={`category-${category.replace(/\s+/g, "-").toLowerCase()}`}>
              <h2 id={`category-${category.replace(/\s+/g, "-").toLowerCase()}`} className="text-xl sm:text-2xl font-semibold text-stone-800 dark:text-stone-100 mb-5 sm:mb-6 flex items-center gap-3">
                <span className="inline-block w-1.5 h-6 sm:h-7 rounded-full bg-gradient-to-b from-rose-400 to-rose-600 dark:from-rose-400 dark:to-rose-500" aria-hidden />
                {category}
              </h2>
              <div className="marquee-container">
                <div
                  className="marquee-track"
                  style={{"--duration": `${duration}s`, "--scroll-amount": `-${100 / copies}%`, "--direction": dir} as React.CSSProperties}
                >
                  {Array.from({ length: copies }, (_, i) => categorySkills.map((skill) =>
                    <a
                      key={`${skill.name}-${i}`}
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${skill.name} - View docs`}
                      className="marquee-item relative bg-rose-50/60 dark:bg-stone-800/50 rounded-xl p-3 hover:shadow-xl hover:shadow-rose-200/40 dark:hover:shadow-rose-900/30 hover:ring-2 hover:ring-rose-300/60 dark:hover:ring-rose-700/50 transition-all duration-250 ease-out flex flex-col items-center justify-center text-center min-h-[90px] sm:min-h-[100px] min-w-[96px] sm:min-w-[108px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
                    >
                      <div className="flex w-full flex-col items-center justify-center text-center gap-1.5 sm:gap-2">
                        <div className="flex flex-col items-center justify-center">
                          {skill.svgl ? (
                            <SkillIcon route={skill.svgl} alt={`${skill.name} logo`} />
                          ) : (
                            <div className="text-2xl sm:text-3xl transition-transform duration-200 ease-out hover:scale-110" aria-hidden>
                              {skill.emoji}
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] sm:text-xs font-medium text-stone-900 dark:text-stone-200 hover:text-rose-800 dark:hover:text-rose-300 transition-colors duration-200 leading-tight text-center">
                          {skill.name}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>

              </div>
            </section>
          );
        })}

      </div>
      </SectionBackdrop>
    </div>
  );
}
