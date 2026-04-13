"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";
import { useMouseDragScroll } from "@/app/hooks/useMouseDragScroll";

type SvglRoute = string | { light: string; dark: string };

type Skill = {
  name: string;
  url: string;
  category: string;
  /** Ruta en SVGL (https://svgl.app). Si falta, se usa `emoji`. */
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
      width={40}
      height={40}
      unoptimized
      className="h-10 w-10 object-contain mb-2 group-hover:scale-110 transition-transform duration-200"
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
      className="scrollbar-hide w-full h-full flex flex-col bg-white dark:bg-stone-900 rounded-2xl shadow-xl ring-1 ring-rose-100/70 dark:ring-rose-950/40 p-1 sm:p-2 lg:p-3 overflow-y-auto min-h-screen"
    >
      <div className="text-center mb-8">
        <h1 className="section-heading text-4xl font-bold tracking-tight mb-2">
          Habilidades Aprendidas
        </h1>
        <div className="accent-rule w-24 h-1 mx-auto rounded-full" aria-hidden />
      </div>

      <div className="w-full max-w-7xl mx-auto px-1 sm:px-2 lg:px-3 flex-1 flex flex-col">
        {/* Additional Info */}
        <div className="mb-12 p-6 bg-linear-to-r from-rose-50 to-red-50/80 dark:from-rose-950/35 dark:to-red-950/25 rounded-lg ring-1 ring-rose-100/60 dark:ring-rose-900/40">
          <h3 className="text-lg font-semibold text-rose-900 dark:text-rose-200 mb-3">
            Mi Trayectoria Profesional
          </h3>
          <p className="text-stone-700 dark:text-stone-200 leading-relaxed">
            Durante los últimos 5 años he adquirido y perfeccionado habilidades que me proporcionan un conjunto diverso de herramientas y lenguajes de programación. 
            Esta experiencia me permite abordar desafíos complejos en el desarrollo de software, desde aplicaciones web modernas hasta sistemas backend robustos, 
            siempre manteniendo un enfoque en las mejores prácticas y la calidad del código.
          </p>
        </div>
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold text-stone-800 dark:text-stone-100 mb-6">
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-rose-50/40 dark:bg-stone-800 rounded-lg p-4 hover:shadow-lg hover:ring-1 hover:ring-rose-200/80 dark:hover:ring-rose-800/60 transition-shadow duration-200 flex flex-col items-center justify-center text-center min-h-[120px] cursor-pointer"
                  >
                    <div className="flex w-full flex-col items-center justify-center text-center transition-transform duration-200 group-hover:scale-105">
                      <div className="flex flex-col items-center justify-center min-h-[2.5rem]">
                        {skill.svgl ? (
                          <SkillIcon route={skill.svgl} alt={`${skill.name} logo`} />
                        ) : (
                          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                            {skill.emoji}
                          </div>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors duration-200">
                        {skill.name}
                      </span>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
