"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <Card className="col-span-1 lg:col-span-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900/60">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/30 border-b py-3 sm:py-4">
          <CardTitle className="text-base sm:text-lg">Equipe Técnica</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-48 sm:h-56 md:h-64 w-full">
            <Image
              src="/images/equipe-tecnica.png"
              alt="Equipe técnica analisando plantas de construção"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Gerenciamento de Projetos</h3>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                  Acompanhe o trabalho da equipe técnica e gerencie os projetos em andamento em Marabá.
                </p>
                <Button
                  asChild
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-xs sm:text-sm h-8 sm:h-9"
                >
                  <Link href="/admin/equipe">
                    Gerenciar Equipe
                    <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900/60">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/30 border-b py-3 sm:py-4">
          <CardTitle className="text-base sm:text-lg">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6">
          <div className="space-y-3 sm:space-y-4">
            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 justify-start text-xs sm:text-sm h-8 sm:h-9"
            >
              <Link href="/admin?tab=cadastro">
                <span className="flex-1 text-left">Cadastrar Nova Obra</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              </Link>
            </Button>

            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 justify-start text-xs sm:text-sm h-8 sm:h-9"
            >
              <Link href="/#timeline">
                <span className="flex-1 text-left">Ver Obras Públicas</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              </Link>
            </Button>

            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 justify-start text-xs sm:text-sm h-8 sm:h-9"
            >
              <Link href="/admin">
                <span className="flex-1 text-left">Gerenciar Documentos</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              </Link>
            </Button>

            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 justify-start text-xs sm:text-sm h-8 sm:h-9"
            >
              <Link href="/admin">
                <span className="flex-1 text-left">Gerenciar Usuários</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
