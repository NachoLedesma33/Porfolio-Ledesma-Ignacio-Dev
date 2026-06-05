export default function Loading() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-rose-50/60 dark:bg-neutral-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-rose-200 dark:border-rose-800 border-t-rose-600 dark:border-t-rose-400 rounded-full animate-spin" />
        <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">
          Cargando...
        </p>
      </div>
    </div>
  );
}
