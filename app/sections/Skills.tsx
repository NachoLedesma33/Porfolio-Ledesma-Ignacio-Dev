"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";
import SectionVenomBackdrop from "@/app/components/SectionVenomBackdrop";
import { useMouseDragScroll } from "@/app/hooks/useMouseDragScroll";

type SvglRoute = string | { light: string; dark: string };

type Skill = {
  name: string;
  url: string;
  category: string;
  svgl?: SvglRoute;
  emoji?: string;
};

function subscribePreferredDark(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getPreferredDarkSnapshot() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getPreferredDarkServerSnapshot() {
  return false;
}

function SkillIcon({ route, alt }: { route: SvglRoute; alt: string }) {
  const prefersDark = useSyncExternalStore(
    subscribePreferredDark,
    getPreferredDarkSnapshot,
    getPreferredDarkServerSnapshot
  );

  const src = typeof route === "string" ? route : prefersDark ? route.dark : route.light;

  return (
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      unoptimized
      className="h-11 w-11 object-contain transition-transform duration-200 ease-out"
    />
  );
}

export default function Skills() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useMouseDragScroll(scrollRef);

  const skills: Skill[] = [
    {
      name: "JavaScript",
      svgl: "https://svgl.app/library/javascript.svg",
      url: "https://developer.mozilla.org/es/docs/Web/JavaScript",
      category: "Frontend",
    },
    {
      name: "TypeScript",
      svgl: "https://svgl.app/library/typescript.svg",
      url: "https://www.typescriptlang.org/",
      category: "Frontend",
    },
    {
      name: "HTML",
      svgl: "https://svgl.app/library/html5.svg",
      url: "https://developer.mozilla.org/es/docs/Web/HTML",
      category: "Frontend",
    },
    {
      name: "CSS",
      svgl: "https://svgl.app/library/css.svg",
      url: "https://developer.mozilla.org/es/docs/Web/CSS",
      category: "Frontend",
    },
    {
      name: "ReactJS",
      svgl: {
        light: "https://svgl.app/library/react_light.svg",
        dark: "https://svgl.app/library/react_dark.svg",
      },
      url: "https://react.dev/",
      category: "Frontend",
    },
    {
      name: "Next Js",
      svgl: "https://svgl.app/library/nextjs_icon_dark.svg",
      url: "https://nextjs.org/",
      category: "Frontend",
    },
    {
      name: "Astro",
      svgl: {
        light: "https://svgl.app/library/astro-icon-light.svg",
        dark: "https://svgl.app/library/astro-icon-dark.svg",
      },
      url: "https://astro.build/",
      category: "Frontend",
    },
    {
      name: "TailwindCSS",
      svgl: "https://svgl.app/library/tailwindcss.svg",
      url: "https://tailwindcss.com/",
      category: "Frontend",
    },
    {
      name: "Bootstrap CSS",
      svgl: "https://svgl.app/library/bootstrap.svg",
      url: "https://getbootstrap.com/",
      category: "Frontend",
    },
    {
      name: "Node.js",
      svgl: "https://svgl.app/library/nodejs.svg",
      url: "https://nodejs.org/",
      category: "Backend",
    },
    {
      name: "NestJS",
      svgl: "https://svgl.app/library/nestjs.svg",
      url: "https://nestjs.com/",
      category: "Backend",
    },
    {
      name: "Java",
      svgl: "https://svgl.app/library/java.svg",
      url: "https://www.java.com/",
      category: "Backend",
    },
    {
      name: "Python",
      svgl: "https://svgl.app/library/python.svg",
      url: "https://www.python.org/",
      category: "Backend",
    },
    {
      name: "Spring Boot",
      svgl: "https://svgl.app/library/spring.svg",
      url: "https://spring.io/projects/spring-boot",
      category: "Backend",
    },
    {
      name: "Django",
      svgl: "https://svgl.app/library/django.svg",
      url: "https://www.djangoproject.com/",
      category: "Backend",
    },
    {
      name: "Flask",
      svgl: {
        light: "https://svgl.app/library/flask-light.svg",
        dark: "https://svgl.app/library/flask-dark.svg",
      },
      url: "https://flask.palletsprojects.com/",
      category: "Backend",
    },
    {
      name: "FastAPI",
      svgl: "https://svgl.app/library/fastapi.svg",
      url: "https://fastapi.tiangolo.com/",
      category: "Backend",
    },
    {
      name: "Hibernate",
      emoji: "🐘",
      url: "https://hibernate.org/",
      category: "Backend",
    },
    {
      name: "PostgreSQL",
      svgl: "https://svgl.app/library/postgresql.svg",
      url: "https://www.postgresql.org/",
      category: "Database",
    },
    {
      name: "MySQL",
      svgl: {
        light: "https://svgl.app/library/mysql-icon-light.svg",
        dark: "https://svgl.app/library/mysql-icon-dark.svg",
      },
      url: "https://www.mysql.com/",
      category: "Database",
    },
    {
      name: "SQLite",
      svgl: "https://svgl.app/library/sqlite.svg",
      url: "https://www.sqlite.org/",
      category: "Database",
    },
    {
      name: "MongoDB",
      svgl: {
        light: "https://svgl.app/library/mongodb-icon-light.svg",
        dark: "https://svgl.app/library/mongodb-icon-dark.svg",
      },
      url: "https://www.mongodb.com/",
      category: "Database",
    },
    {
      name: "Docker",
      svgl: "https://svgl.app/library/docker.svg",
      url: "https://www.docker.com/",
      category: "DevOps & Tools",
    },
    {
      name: "AWS",
      svgl: {
        light: "https://svgl.app/library/aws_light.svg",
        dark: "https://svgl.app/library/aws_dark.svg",
      },
      url: "https://aws.amazon.com/",
      category: "DevOps & Tools",
    },
    {
      name: "Git",
      svgl: "https://svgl.app/library/git.svg",
      url: "https://git-scm.com/",
      category: "DevOps & Tools",
    },
    {
      name: "Github",
      svgl: {
        light: "https://svgl.app/library/github_light.svg",
        dark: "https://svgl.app/library/github_dark.svg",
      },
      url: "https://github.com/",
      category: "DevOps & Tools",
    },
    {
      name: "BASH",
      svgl: {
        light: "https://svgl.app/library/bash.svg",
        dark: "https://svgl.app/library/bash_dark.svg",
      },
      url: "https://www.gnu.org/software/bash/",
      category: "DevOps & Tools",
    },
    {
      name: "GraphQL",
      svgl: "https://svgl.app/library/graphql.svg",
      url: "https://graphql.org/",
      category: "DevOps & Tools",
    },
  ];

  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  return (
    <div
      ref={scrollRef}
      className="scrollbar-hide relative w-full h-full flex flex-col rounded-2xl shadow-xl ring-1 ring-rose-100/70 dark:ring-rose-950/40 p-2 sm:p-3 lg:p-4 overflow-y-auto min-h-screen"
    >
      <SectionVenomBackdrop>
      <header className="text-center mb-10 sm:mb-12">
        <h1 className="section-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
          Habilidades
        </h1>
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
          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-200 leading-relaxed">
            Durante los ultimos 5 anos he adquirido y perfeccionado habilidades que me proporcionan un conjunto diverso de herramientas y lenguajes de programación. 
            Esta experiencia me permite abordar desafios complejos en el desarrollo de software, desde aplicaciones web modernas hasta sistemas backend robustos, 
            siempre manteniendo un enfoque en las mejores practicas y la calidad del codigo.
          </p>
        </div>

        {categories.map((category) => (
          <section key={category} className="mb-8 sm:mb-10" aria-labelledby={`category-${category.replace(/\s+/g, "-").toLowerCase()}`}>
            <h2 id={`category-${category.replace(/\s+/g, "-").toLowerCase()}`} className="text-xl sm:text-2xl font-semibold text-stone-800 dark:text-stone-100 mb-5 sm:mb-6 flex items-center gap-3">
              <span className="inline-block w-1.5 h-6 sm:h-7 rounded-full bg-gradient-to-b from-rose-400 to-rose-600 dark:from-rose-400 dark:to-rose-500" aria-hidden />
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${skill.name} - View docs`}
                    className="group relative bg-rose-50/60 dark:bg-stone-800/50 rounded-xl p-4 sm:p-5 hover:shadow-xl hover:shadow-rose-200/40 dark:hover:shadow-rose-900/30 hover:ring-2 hover:ring-rose-300/60 dark:hover:ring-rose-700/50 transition-all duration-250 ease-out flex flex-col items-center justify-center text-center min-h-[130px] sm:min-h-[140px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
                  >
                    <div className="flex w-full flex-col items-center justify-center text-center gap-2 sm:gap-3">
                      <div className="flex flex-col items-center justify-center">
                        {skill.svgl ? (
                          <SkillIcon route={skill.svgl} alt={`${skill.name} logo`} />
                        ) : (
                          <div className="text-3xl sm:text-4xl transition-transform duration-200 ease-out group-hover:scale-110" aria-hidden>
                            {skill.emoji}
                          </div>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-200 group-hover:text-rose-800 dark:group-hover:text-rose-300 transition-colors duration-200 line-clamp-2">
                        {skill.name}
                      </span>
                    </div>
                  </a>
                ))}
            </div>
          </section>
        ))}

      </div>
      </SectionVenomBackdrop>
    </div>
  );
}