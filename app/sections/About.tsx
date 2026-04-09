"use client";

export default function About() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Profile Section */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Sobre Mi
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-left">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Años Exp</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Proyectos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Compromiso</div>
          </div>
        </div>
      </div>
    </div>
  );
}
