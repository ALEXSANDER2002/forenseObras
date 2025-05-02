"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evita problemas de hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  // Força a aplicação do tema claro como padrão na montagem inicial
  useEffect(() => {
    if (mounted) {
      try {
        // Verificação segura para evitar erros em SSR
        const savedTheme = typeof window !== 'undefined' ? localStorage.getItem("theme") : null
        if (savedTheme) {
          setTheme(savedTheme)
        } else {
          // Se não houver tema salvo, usa o tema claro
          setTheme("light")
        }
      } catch (error) {
        // Fallback seguro se ocorrer algum erro
        setTheme("light")
        console.error("Erro ao acessar localStorage:", error)
      }
    }
  }, [mounted, setTheme])

  // Função para alternar diretamente entre temas claro e escuro
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  // Renderização segura para SSR
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled className="opacity-70">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Carregando tema</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Alternar tema"
          onClick={(e) => {
            // Previne a abertura do dropdown ao clicar no botão
            e.preventDefault()
            toggleTheme()
          }}
          className="transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Claro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Escuro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>Sistema</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
