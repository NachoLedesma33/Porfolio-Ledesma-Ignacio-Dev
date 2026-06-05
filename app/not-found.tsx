import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-rose-50/60 dark:bg-neutral-950">
      <div className="text-center px-6 max-w-md">
        <div className="text-8xl font-display text-rose-600/20 dark:text-rose-400/10 leading-none mb-4 select-none">
          404
        </div>
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
          Página no encontrada
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
          Esta página no existe o fue movida. Mejor volvemos al inicio, ¿no?
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/25 transition-all duration-200"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
