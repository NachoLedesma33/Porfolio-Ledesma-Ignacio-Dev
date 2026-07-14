"use client";

import { useTheme } from "@/app/contexts/ThemeContext";

export function useIsDark() {
  return useTheme().isDark;
}
