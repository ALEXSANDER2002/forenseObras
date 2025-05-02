"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ReactNode } from "react"

// Usar uma abordagem mais simples com tipagem básica
export function ThemeProvider({ 
  children, 
  ...props 
}: { 
  children: ReactNode;
  [key: string]: any;
}) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      enableColorScheme={true}
      storageKey="theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
