"use client"

import { Moon, Sun } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)
  const { locale } = useParams()

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setDarkMode(isDark)
  }, [])

  const toggleTheme = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem("theme", newMode ? "dark" : "light")
    document.documentElement.classList.toggle("dark", newMode)
  }

  const label = darkMode 
    ? locale === "tr" ? "Aydınlık mod" : "Light mode"
    : locale === "tr" ? "Karanlık mod" : "Dark mode"

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={label}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}