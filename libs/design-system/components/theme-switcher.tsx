"use client";

import { cn } from "@project/design-system/lib/utils";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // Render a placeholder with the same dimensions during SSR
  if (!mounted) {
    return (
      <div className={cn("relative inline-block", className)}>
        <div className="h-6 w-12 rounded-full p-0.5">
          <div className="invisible">
            <span className="sr-only">Toggle theme</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative inline-block", className)}>
      <motion.button
        animate={{
          backgroundColor: isDark ? "rgb(51, 65, 85)" : "rgb(226, 232, 240)",
        }}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className={cn(
          "relative h-6 w-12 rounded-full p-0.5",
          isDark ? "bg-slate-700" : "bg-slate-200"
        )}
        onClick={toggleTheme}
        transition={{ duration: 0.6 }}
      >
        <span className="sr-only">Toggle theme</span>

        {/* Track icons with motion */}
        <motion.div
          animate={{ opacity: isDark ? 0.5 : 1 }}
          className="absolute top-1 left-1"
          transition={{ duration: 0.6 }}
        >
          <Sun className="h-4 w-4 text-current" />
        </motion.div>

        <motion.div
          animate={{ opacity: isDark ? 1 : 0.5 }}
          className="absolute top-1 right-1"
          transition={{ duration: 0.6 }}
        >
          <Moon className="h-4 w-4 text-current" />
        </motion.div>

        {/* Slider thumb with motion */}
        <motion.span
          animate={{
            x: isDark ? 24 : 0,
          }}
          className="absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow-lg"
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8,
          }}
        />
      </motion.button>
    </div>
  );
}
