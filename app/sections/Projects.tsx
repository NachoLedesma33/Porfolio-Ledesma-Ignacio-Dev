"use client";

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      tech: ["React", "Node.js", "MongoDB"],
      status: "Completed",
      link: "#"
    },
    {
      title: "Task Management App",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
      tech: ["Next.js", "TypeScript", "PostgreSQL"],
      status: "In Progress",
      link: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      tech: ["Vue.js", "API", "Tailwind"],
      status: "Completed",
      link: "#"
    },
    {
      title: "Social Media Analytics",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      tech: ["Python", "React", "Docker"],
      status: "Planning",
      link: "#"
    },
    {
      title: "Portfolio Website",
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
      tech: ["Next.js", "Framer", "SCSS"],
      status: "Completed",
      link: "#"
    },
    {
      title: "Mobile Banking App",
      description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis.",
      tech: ["React Native", "Node.js", "JWT"],
      status: "In Progress",
      link: "#"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 overflow-y-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Proyectos
        </h1>
        <div className="w-24 h-1 bg-linear-to-r from-purple-400 to-pink-600 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Project Header */}
              <div className="h-48 bg-linear-to-br from-purple-400 to-pink-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                <a
                  href={project.link}
                  className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium text-sm"
                >
                  Ver Proyecto
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-3">
            Lorem Ipsum
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni 
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
          </p>
        </div>
      </div>
    </div>
  );
}
