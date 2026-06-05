"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-rose-50/60 dark:bg-neutral-950">
      <div className="text-center px-6 max-w-md">
        <div className="text-6xl mb-6 font-display text-rose-600 dark:text-rose-400">
          Error
        </div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">
          Algo salió mal
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mb-8">
          Ocurrió un error inesperado. Intenta de nuevo o volvé al inicio.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/25 transition-all duration-200"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 font-semibold rounded-xl ring-2 ring-rose-200 dark:ring-rose-800 hover:ring-rose-400 dark:hover:ring-rose-600 transition-all duration-200"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
