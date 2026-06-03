export type ProjectCategory = "Proyectos" | "Juegos (Extra)";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  status: string;
  link: string;
  repo?: string;
  images?: string[];
};

export const projectsByCategory: Record<ProjectCategory, Project[]> = {
  "Proyectos": [
    {
      title: "Dev-News",
      description: "Lector moderno y optimizado de Hacker News desarrollado con Next.js 15 (App Router) y Tailwind CSS v4. Soporta búsqueda integrada, filtrado por marcadores persistentes en local storage, fallback automático con datos mock ante caídas del servidor y una integración fluida con un backend serverless en Python/FastAPI desplegado en Vercel para alto rendimiento y caching eficiente.",
      tech: ["Next.js 15", "React", "FastAPI", "Python", "Tailwind v4", "TypeScript"],
      status: "Completado",
      link: "https://dev-news-taupe.vercel.app/",
      repo: "https://github.com/NachoLedesma33/Dev-news",
      images: [
        "/dev-news/1placeholderdevnews.webp",
        "/dev-news/2devnews.webp",
        "/dev-news/3devnews.webp",
        "/dev-news/4devnews.webp",
        "/dev-news/5devnews.webp"
      ],
    },
    {
      title: "Expense Tracker",
      description: "Aplicación interactiva y responsive para el control de gastos y finanzas personales. Permite registrar ingresos y egresos, categorizar transacciones en tiempo real, visualizar reportes financieros dinámicos y gestionar presupuestos de manera inteligente para optimizar el rendimiento económico diario.",
      tech: ["Django 5.0", "Tailwind CSS 4", "HTMX", "Chart.js", "PostgreSQL"],
      status: "Completado",
      link: "https://expense-tracker-ten-tau-16.vercel.app",
      repo: "https://github.com/NachoLedesma33/Expense-tracker",
      images: [
        "/transactions/1tranactionplaceholder.webp",
        "/transactions/2transaction.webp",
        "/transactions/3transaction.webp",
        "/transactions/4transation.webp",
        "/transactions/5transaction.webp",
        "/transactions/6transaction.webp"
      ],
    },
    {
      title: "CodeReflex",
      description: "Plataforma interactiva de entrenamiento técnico para desarrolladores. Combina el speed typing de código real (Reflex Typing) con la resolución guiada de problemas de algoritmos (Guided Problems). Cuenta con editor Monaco integrado, sistema de gamificación con logros (XP), heatmaps de actividad y soporte multi-lenguaje.",
      tech: ["Next.js 16", "TypeScript", "Monaco Editor", "Zustand", "Tailwind CSS v4", "Zod"],
      status: "En progreso",
      link: "https://code-reflex-lac.vercel.app/",
      repo: "https://github.com/NachoLedesma33/CodeReflex",
      images: [
        "/code-reflex/1placeholdercodereflex.webp",
        "/code-reflex/2codeflex.webp",
        "/code-reflex/3codereflex.webp",
        "/code-reflex/4codereflex.webp",
        "/code-reflex/5codereflex.webp"
      ],
    },
    {
      title: "MatchFlow",
      description: "Sistema de emparejamiento en tiempo real con algoritmos híbridos para gaming competitivo. Encuentra teammates perfectos para tus juegos favoritos al instante. Soporta 12 juegos populares incluyendo Valorant, League of Legends, CS2, Dota 2 y más.",
      tech: ["Node.js", "TypeScript", "Express", "Socket.io", "React", "Vite", "Tailwind CSS"],
      status: "En progreso",
      link: "https://matchflow-one.vercel.app/",
      repo: "https://github.com/NachoLedesma33/matchflow",
      images: ["/matflow/1mateflowplaceholder.webp", "/matflow/2matflow.webp", "/matflow/3matflow.webp", "/matflow/4matflow.webp", "/matflow/5matflow.webp"],
    },
    {
      title: "Simulador de Carrera IT",
      description: "Simulador interactivo y no lineal de carrera en tecnología. Toma decisiones, desarrolla habilidades, gestiona el estrés y alcanza la cima: de Trainee a CTO. Desarrollado con Flask y Python, incluye motor de decisiones, eventos aleatorios y sistema de logros.",
      tech: ["Python", "Flask", "JavaScript", "HTML5", "CSS3"],
      status: "Completado",
      link: "https://nacholedesma.pythonanywhere.com/",
      repo: "https://github.com/NachoLedesma33/Simulador-de-Carrera-IT",
      images: [
        "/carrera-IT/1ITplaceholder.webp",
        "/carrera-IT/2IT.webp",
        "/carrera-IT/3IT.webp",
        "/carrera-IT/4IT.webp",
        "/carrera-IT/5IT.webp",
        "/carrera-IT/6IT.webp"
      ],
    },
    {
      title: "Ejercicios de Python",
      description: "Aplicación web interactiva para practicar programación en Python con un editor de código profesional directamente en el navegador. Incluye una amplia variedad de ejercicios interactivos sobre matemáticas, métodos numéricos y ciencia de datos. Utiliza WebAssembly (Pyodide) para ejecutar el código localmente de forma segura y sin necesidad de un servidor backend.",
      tech: ["Next.js", "React", "TypeScript", "Pyodide", "Monaco Editor", "Tailwind CSS"],
      status: "Completado",
      link: "https://python-excercises.vercel.app/",
      repo: "https://github.com/NachoLedesma33/python-excercises",
      images: [
        "/python-excercises/1pythonexcercisesplaceholder.webp",
        "/python-excercises/2pythonexcercises.webp",
        "/python-excercises/3pythonexercises.webp",
        "/python-excercises/4pythonexercises.webp",
        "/python-excercises/5pythonexcersices.webp",
        "/python-excercises/Screenshot 2026-05-23 185928.webp"
      ],
    },
    {
      title: "API Client",
      description: "Cliente API ligero e interactivo construido con Astro y React. Inspirado en Postman, permite enviar solicitudes HTTP, gestionar colecciones, trabajar con variables de entorno, importar/exportar cURL y soportar OpenAPI 3.0. Con arquitectura Astro Islands para rendimiento óptimo.",
      tech: ["Astro", "React", "TypeScript", "TailwindCSS", "Zustand", "Dexie", "IndexedDB"],
      status: "Completado",
      link: "https://client-api-interactive.vercel.app/",
      repo: "https://github.com/NachoLedesma33/client-api-interactive",
      images: ["/api-client/1placeholder-api-client-v2.webp", "/api-client/2api-client.webp", "/api-client/3api-client.webp", "/api-client/4api-client.webp", "/api-client/5api-client.webp"],
    },
    {
      title: "CraftUI",
      description: "Librería de componentes UI modernos, accesibles y altamente personalizables. Diseñada para acelerar el desarrollo frontend con componentes listos para usar, animaciones fluidas, soporte para modo oscuro y una estética premium. Proyecto en proceso de desarrollo.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: "En progreso",
      link: "https://craft-ui-omega.vercel.app/",
      repo: "https://github.com/NachoLedesma33/CraftUI",
      images: ["/craftUI/1craftUIPlaceholder.webp"],
    },
    {
      title: "Dashboard de Productividad",
      description: "Dashboard interactivo para el seguimiento y análisis de productividad personal. Implementa métricas en tiempo real, gráficos dinámicos y sistema de gestión de tareas con interfaz moderna y responsive diseñada para optimizar el rendimiento diario.",
      tech: ["TypeScript", "CSS3", "TailwindCSS", "HTML", "React", "Vite"],
      status: "Completado",
      link: "https://dashboard-productividad-ledesma.vercel.app/",
      repo: "https://github.com/NachoLedesma33/dashboard-productividad",
      images: ["/dashboard-productividad/placeholder-productividad.webp", "/dashboard-productividad/uno-productividad.webp", "/dashboard-productividad/dos-productividad.webp", "/dashboard-productividad/tres-productividad.webp"],
    },
    {
      title: "Simulador Visual de Algoritmos",
      description: "Herramienta educativa interactiva para visualizar y entender el funcionamiento de algoritmos de ordenamiento y búsqueda. Permite observar paso a paso cómo operan diferentes algoritmos con controles de velocidad y animaciones fluidas.",
      tech: ["TypeScript", "CSS3", "TailwindCSS", "HTML", "React", "Vite"],
      status: "Completado",
      link: "https://simulador-visual-de-algoritmos-lede.vercel.app/",
      repo: "https://github.com/NachoLedesma33/Simulador-Visual-de-Algoritmos",
      images: ["/visualizador-algoritmos/placeholderalgoritmo.webp", "/visualizador-algoritmos/uno-algoritmo.webp", "/visualizador-algoritmos/dos-algoritmo.webp", "/visualizador-algoritmos/tres-algoritmo.webp", "/visualizador-algoritmos/cuatro-algoritmo.webp", "/visualizador-algoritmos/cinco-algoritmo.webp"],
    },
    {
      title: "Budget App",
      description: "Aplicación web para gestión de presupuestos personales desarrollada con HTML5, CSS3 y JavaScript puro. Interfaz moderna y responsive con gráficos interactivos, categorización de gastos y análisis financiero en tiempo real.",
      tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
      status: "Completado",
      link: "https://nacholedesma33.github.io/budgetApp/",
      repo: "https://github.com/NachoLedesma33/budgetApp",
      images: ["/budget-app/PlaceholderBudget.webp", "/budget-app/2budget.webp", "/budget-app/3budget.webp"],
    }
  ],
  "Juegos (Extra)": [
    {
      title: "Game 2048",
      description: "¡Bienvenido al clásico juego 2048 implementado con HTML, CSS y JavaScript puro! Este proyecto es una versión moderna y responsive del popular juego de rompecabezas numérico con interfaz limpia, sistema de puntuación, tema claro/oscuro y compatible con teclado y pantallas táctiles.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      status: "Completado",
      link: "https://nacholedesma33.github.io/Game-2048/",
      repo: "https://github.com/NachoLedesma33/Game-2048",
      images: ["/game-2048/placeholder.webp", "/game-2048/2.webp", "/game-2048/3.webp", "/game-2048/4.webp"],
    },
    {
      title: "Snake Game",
      description: "¡Clásico juego de la serpiente implementado con HTML5, CSS3 y JavaScript puro! Este proyecto recrea el icónico juego arcade con movimiento fluido, sistema de puntuación, niveles progresivos, controles de teclado responsive y diseño moderno adaptable a diferentes dispositivos.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      status: "Completado",
      link: "https://nacholedesma33.github.io/Snake-Game/",
      repo: "https://github.com/NachoLedesma33/Snake-Game",
      images: ["/game-snake/1placeholder.webp", "/game-snake/2snake.webp", "/game-snake/3snake.webp"],
    }
  ]
};

export const projectCategories: ProjectCategory[] = ["Proyectos", "Juegos (Extra)"];

export function getProjectCount(): number {
  return Object.values(projectsByCategory).reduce((sum, arr) => sum + arr.length, 0);
}
