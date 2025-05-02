"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Frame, Menu, X } from "lucide-react"

export function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b bg-slate-100 dark:bg-slate-900 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded">
            <Frame className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl">
            forense<span className="text-blue-600 dark:text-blue-400">Obras</span>
          </span>
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium">Admin</span>
        </Link>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/admin"
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Dashboard
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Visualizar Site
          </Link>
          <ModeToggle />
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-4">
            <Link
              href="/admin"
              className="text-sm font-medium py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="text-sm font-medium py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Visualizar Site
            </Link>
            <div className="py-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
