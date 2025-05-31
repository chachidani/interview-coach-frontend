"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="outline" size="icon" className="relative overflow-hidden rounded-full h-9 w-9" />
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative overflow-hidden rounded-full h-9 w-9 transition-all duration-300 hover:border-primary"
    >
      <div className="relative z-10">
        {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        <span className="sr-only">{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</span>
      </div>
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0"
        initial={false}
        animate={{ opacity: theme === "dark" ? 0.1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </Button>
  )
}
