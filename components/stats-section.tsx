"use client"

import { useObrasStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { Activity, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export function StatsSection() {
  const { obras } = useObrasStore()

  // Calcular estatísticas
  const totalObras = obras.length
  const obrasEmAndamento = obras.filter((o) => o.status === "Em andamento").length
  const obrasConcluidas = obras.filter((o) => o.status === "Concluída").length
  const obrasParalisadas = obras.filter((o) => o.status === "Paralisada").length

  const totalInvestimento = obras.reduce((total, obra) => total + obra.valorInicial + (obra.valorAditivos || 0), 0)

  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Panorama das Obras</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900/60">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total de Obras</p>
                  <p className="text-3xl font-bold">{totalObras}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                  <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-indigo-500 shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900/60">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Em Andamento</p>
                  <p className="text-3xl font-bold">{obrasEmAndamento}</p>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-sky-500 shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900/60">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Concluídas</p>
                  <p className="text-3xl font-bold">{obrasConcluidas}</p>
                </div>
                <div className="bg-sky-100 dark:bg-sky-900/50 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-700 shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900/60">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Investimento Total</p>
                  <p className="text-3xl font-bold">{formatCurrency(totalInvestimento)}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
