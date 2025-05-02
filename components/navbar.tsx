"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Frame, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detectar scroll para adicionar sombra na navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "bg-white dark:bg-slate-950 border-b sticky top-0 z-50 transition-all duration-300",
        scrolled ? "shadow-md" : "shadow-sm",
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded">
            <Frame className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="font-bold text-lg sm:text-xl">
            forense<span className="text-blue-600 dark:text-blue-400">Obras</span>
          </span>
        </Link>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-8 w-8 p-0 flex items-center justify-center"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Início
          </Link>
          <Link
            href="/#timeline"
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Obras
          </Link>
          <Link
            href="/admin"
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Área Administrativa
          </Link>
          <ModeToggle />
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium py-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/#timeline"
              className="text-sm font-medium py-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Obras
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium py-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Área Administrativa
            </Link>
            <div className="py-2 flex items-center">
              <ModeToggle />
              <span className="ml-2 text-sm text-muted-foreground">Alternar tema</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
