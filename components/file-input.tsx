"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Upload } from "lucide-react"

interface FileInputProps {
  onFileSelected: (url: string) => void
}

export function FileInput({ onFileSelected }: FileInputProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Simulação de upload
    setIsLoading(true)
    setTimeout(() => {
      // Usar uma das imagens existentes para simular o upload
      const imageTypes = [
        "/images/obras/ponte-1.jpg",
        "/images/obras/ponte-2.jpg",
        "/images/obras/escola-1.jpg",
        "/images/obras/pavimentacao-3.png",
        "/images/obras/hospital-1.png",
        "/images/obras/praca-1.png",
        "/images/equipe-tecnica.png",
      ]
      const randomIndex = Math.floor(Math.random() * imageTypes.length)
      const placeholderUrl = imageTypes[randomIndex]

      onFileSelected(placeholderUrl)
      setIsLoading(false)
      toast({
        title: "Arquivo enviado",
        description: `${file.name} foi enviado com sucesso.`,
      })
      e.target.value = ""
    }, 1500)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="foto">Adicionar Foto</Label>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative w-full">
          <Input
            id="foto"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer file:transition-colors text-sm py-1.5 cursor-pointer focus-visible:outline-blue-600"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        {isLoading && (
          <Button disabled className="mt-2 sm:mt-0 min-w-[120px]">
            <Upload className="mr-2 h-4 w-4 animate-pulse" />
            Enviando...
          </Button>
        )}
      </div>
    </div>
  )
}
