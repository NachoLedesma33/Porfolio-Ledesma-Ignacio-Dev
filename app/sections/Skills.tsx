"use client";

export default function Skills() {
  const skills = [
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Frontend" },
    { name: "Tailwind CSS", level: 88, category: "Frontend" },
    { name: "Next.js", level: 82, category: "Frontend" },
    { name: "Node.js", level: 75, category: "Backend" },
    { name: "Python", level: 70, category: "Backend" },
    { name: "PostgreSQL", level: 65, category: "Database" },
    { name: "MongoDB", level: 60, category: "Database" },
    { name: "Docker", level: 55, category: "DevOps" },
    { name: "AWS", level: 50, category: "DevOps" },
    { name: "Git", level: 85, category: "Tools" },
    { name: "Figma", level: 70, category: "Design" },
  ];

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 sm:p-4 lg:p-6 overflow-y-auto min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Habilidades
        </h1>
        <div className="w-24 h-1 bg-linear-to-r from-green-400 to-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 flex-1 flex flex-col">
        {categories.map((category) => (
          <div key={category} className="mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {skills
                .filter(skill => skill.category === category)
                .map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-linear-to-r from-green-400 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
            Lorem Ipsum
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </div>
    </div>
  );
}
