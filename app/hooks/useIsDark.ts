import { useSyncExternalStore } from "react";

function subscribeToDark(cb: () => void) {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getDarkSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getDarkServerSnapshot() {
  return false;
}

export function useIsDark() {
  return useSyncExternalStore(subscribeToDark, getDarkSnapshot, getDarkServerSnapshot);
}
