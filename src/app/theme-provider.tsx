"use client"

import { useEffect, useState } from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem("theme")
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    
    const initialTheme = storedTheme 
      ? storedTheme === "dark" 
      : systemDark
    
    if (initialTheme) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}