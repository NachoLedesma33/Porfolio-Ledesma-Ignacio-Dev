"use client";

export default function Certificates() {
  const certificates = [
    {
      title: "React Developer Certification",
      issuer: "Meta",
      date: "2024",
      category: "Frontend",
      description: "Advanced React development including hooks, context, and performance optimization",
      skills: ["React", "JavaScript", "Hooks", "Performance"]
    },
    {
      title: "TypeScript Fundamentals",
      issuer: "Microsoft",
      date: "2024",
      category: "Languages",
      description: "Complete TypeScript course covering types, interfaces, generics, and advanced patterns",
      skills: ["TypeScript", "Types", "Interfaces", "Generics"]
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023",
      category: "Cloud",
      description: "Fundamental AWS services, cloud concepts, and best practices",
      skills: ["AWS", "Cloud Computing", "Security", "Architecture"]
    },
    {
      title: "Docker & Kubernetes",
      issuer: "Coursera",
      date: "2023",
      category: "DevOps",
      description: "Containerization and orchestration with Docker and Kubernetes",
      skills: ["Docker", "Kubernetes", "Containers", "CI/CD"]
    },
    {
      title: "Python for Data Science",
      issuer: "IBM",
      date: "2023",
      category: "Data Science",
      description: "Python programming for data analysis, visualization, and machine learning",
      skills: ["Python", "Data Analysis", "NumPy", "Pandas"]
    },
    {
      title: "Full Stack Web Development",
      issuer: "freeCodeCamp",
      date: "2022",
      category: "Full Stack",
      description: "Complete web development covering frontend, backend, databases, and deployment",
      skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"]
    }
  ];

  const categories = Array.from(new Set(certificates.map(cert => cert.category)));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "from-blue-400 to-cyan-600";
      case "Languages":
        return "from-purple-400 to-pink-600";
      case "Cloud":
        return "from-orange-400 to-red-600";
      case "DevOps":
        return "from-green-400 to-teal-600";
      case "Data Science":
        return "from-indigo-400 to-purple-600";
      case "Full Stack":
        return "from-yellow-400 to-orange-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 sm:p-4 lg:p-6 overflow-y-auto min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Certificados
        </h1>
        <div className="w-24 h-1 bg-linear-to-r from-indigo-400 to-purple-600 mx-auto rounded-full"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 flex-1 flex flex-col">
        {categories.map((category) => (
          <div key={category} className="mb-6 sm:mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {certificates
                .filter(cert => cert.category === category)
                .map((cert, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Certificate Header */}
                    <div className={`h-32 bg-linear-to-br ${getCategoryColor(cert.category)} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Certificate Content */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {cert.title}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {cert.issuer}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {cert.date}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                        {cert.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
