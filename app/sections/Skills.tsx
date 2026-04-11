"use client";

export default function Skills() {
  const skills = [
    // Frontend
    {
      name: "JavaScript",
      icon: "🟨",
      url: "https://developer.mozilla.org/es/docs/Web/JavaScript",
      category: "Frontend",
    },
    {
      name: "TypeScript",
      icon: "🔷",
      url: "https://www.typescriptlang.org/",
      category: "Frontend",
    },
    {
      name: "HTML",
      icon: "🌐",
      url: "https://developer.mozilla.org/es/docs/Web/HTML",
      category: "Frontend",
    },
    {
      name: "CSS",
      icon: "🎨",
      url: "https://developer.mozilla.org/es/docs/Web/CSS",
      category: "Frontend",
    },
    {
      name: "ReactJS",
      icon: "⚛️",
      url: "https://react.dev/",
      category: "Frontend",
    },
    {
      name: "Next Js",
      icon: "▲",
      url: "https://nextjs.org/",
      category: "Frontend",
    },
    {
      name: "Astro",
      icon: "🚀",
      url: "https://astro.build/",
      category: "Frontend",
    },
    {
      name: "TailwindCSS",
      icon: "🌊",
      url: "https://tailwindcss.com/",
      category: "Frontend",
    },
    {
      name: "Bootstrap CSS",
      icon: "🅱️",
      url: "https://getbootstrap.com/",
      category: "Frontend",
    },

    // Backend
    {
      name: "Node.js",
      icon: "🟢",
      url: "https://nodejs.org/",
      category: "Backend",
    },
    {
      name: "Java",
      icon: "☕",
      url: "https://www.java.com/",
      category: "Backend",
    },
    {
      name: "Python",
      icon: "🐍",
      url: "https://www.python.org/",
      category: "Backend",
    },
    {
      name: "Spring Boot",
      icon: "🍃",
      url: "https://spring.io/projects/spring-boot",
      category: "Backend",
    },
    {
      name: "Django",
      icon: "🎸",
      url: "https://www.djangoproject.com/",
      category: "Backend",
    },
    {
      name: "Flask",
      icon: "🧪",
      url: "https://flask.palletsprojects.com/",
      category: "Backend",
    },
    {
      name: "FastAPI",
      icon: "⚡",
      url: "https://fastapi.tiangolo.com/",
      category: "Backend",
    },
    {
      name: "Hibernate",
      icon: "🐘",
      url: "https://hibernate.org/",
      category: "Backend",
    },

    // Database
    {
      name: "SQL",
      icon: "📊",
      url: "https://en.wikipedia.org/wiki/SQL",
      category: "Database",
    },
    {
      name: "NoSQL",
      icon: "🗄️",
      url: "https://en.wikipedia.org/wiki/NoSQL",
      category: "Database",
    },
    {
      name: "PostgreSQL",
      icon: "🐘",
      url: "https://www.postgresql.org/",
      category: "Database",
    },
    {
      name: "SQLite",
      icon: "📦",
      url: "https://www.sqlite.org/",
      category: "Database",
    },
    {
      name: "MongoDB",
      icon: "🍃",
      url: "https://www.mongodb.com/",
      category: "Database",
    },

    // DevOps & Tools
    {
      name: "Docker",
      icon: "🐳",
      url: "https://www.docker.com/",
      category: "DevOps & Tools",
    },
    {
      name: "AWS",
      icon: "☁️",
      url: "https://aws.amazon.com/",
      category: "DevOps & Tools",
    },
    {
      name: "Git",
      icon: "📦",
      url: "https://git-scm.com/",
      category: "DevOps & Tools",
    },
    {
      name: "Github",
      icon: "🐙",
      url: "https://github.com/",
      category: "DevOps & Tools",
    },
    {
      name: "BASH",
      icon: "💻",
      url: "https://www.gnu.org/software/bash/",
      category: "DevOps & Tools",
    },
    {
      name: "GraphQL",
      icon: "🔷",
      url: "https://graphql.org/",
      category: "DevOps & Tools",
    },
  ];

  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 sm:p-4 lg:p-6 overflow-y-auto min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Habilidades Aprendidas
        </h1>
        <div className="w-24 h-1 bg-linear-to-r from-green-400 to-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 flex-1 flex flex-col">
        {/* Additional Info */}
        <div className="mb-12 p-6 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
            Mi Trayectoria Profesional
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Durante los últimos 5 años he adquirido y perfeccionado habilidades que me proporcionan un conjunto diverso de herramientas y lenguajes de programación. 
            Esta experiencia me permite abordar desafíos complejos en el desarrollo de software, desde aplicaciones web modernas hasta sistemas backend robustos, 
            siempre manteniendo un enfoque en las mejores prácticas y la calidad del código.
          </p>
        </div>
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
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
                    className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:scale-105 flex flex-col items-center justify-center text-center min-h-[120px]"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                      {skill.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {skill.name}
                    </span>
                  </a>
                ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
