"use client"

import { useObrasStore } from "@/lib/store"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Calendar, ArrowRight, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"
import { ObrasFilter, type FilterOptions } from "@/components/obras-filter"

export function Timeline() {
  const { obras } = useObrasStore()
  const [filteredObras, setFilteredObras] = useState(obras)
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    status: [],
    valorMin: 0,
    valorMax: 100000000,
    dataInicio: "",
    dataFim: "",
  })

  useEffect(() => {
    const filtered = obras.filter((obra) => {
      // Filtro por texto
      const matchesSearch =
        filters.searchTerm === "" ||
        obra.titulo.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        obra.descricao.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        obra.local.toLowerCase().includes(filters.searchTerm.toLowerCase())

      // Filtro por status
      const matchesStatus = filters.status.length === 0 || filters.status.includes(obra.status)

      // Filtro por valor
      const valorTotal = obra.valorInicial + (obra.valorAditivos || 0)
      const matchesValor = valorTotal >= filters.valorMin && valorTotal <= filters.valorMax

      // Filtro por data de início
      const matchesDataInicio = !filters.dataInicio || new Date(obra.dataInicio) >= new Date(filters.dataInicio)

      // Filtro por data de término
      const matchesDataFim = !filters.dataFim || new Date(obra.dataFim) <= new Date(filters.dataFim)

      return matchesSearch && matchesStatus && matchesValor && matchesDataInicio && matchesDataFim
    })

    setFilteredObras(filtered)
  }, [obras, filters])

  if (obras.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Nenhuma obra cadastrada ainda.</p>
        <Button asChild>
          <Link href="/admin">Ir para área administrativa</Link>
        </Button>
      </div>
    )
  }

  // Agrupar obras por status
  const obrasPorStatus = {
    "Em andamento": filteredObras.filter((o) => o.status === "Em andamento"),
    Concluída: filteredObras.filter((o) => o.status === "Concluída"),
    Paralisada: filteredObras.filter((o) => o.status === "Paralisada"),
    "Não iniciada": filteredObras.filter((o) => o.status === "Não iniciada"),
  }

  // Ordenar obras por data de início (mais recentes primeiro)
  Object.keys(obrasPorStatus).forEach((status) => {
    obrasPorStatus[status].sort((a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime())
  })

  // Definir cores para cada status
  const statusColors = {
    "Em andamento": "bg-blue-500 border-blue-600",
    Concluída: "bg-green-500 border-green-600",
    Paralisada: "bg-amber-500 border-amber-600",
    "Não iniciada": "bg-slate-500 border-slate-600",
  }

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  return (
    <div className="space-y-8">
      <ObrasFilter
        onFilterChange={handleFilterChange}
        totalObras={obras.length}
        obrasFiltradas={filteredObras.length}
      />

      {filteredObras.length === 0 ? (
        <div className="text-center py-12 border rounded-md bg-slate-50 dark:bg-slate-900">
          <p className="text-muted-foreground">Nenhuma obra encontrada com os filtros selecionados.</p>
          <Button
            variant="link"
            onClick={() =>
              setFilters({
                searchTerm: "",
                status: [],
                valorMin: 0,
                valorMax: 100000000,
                dataInicio: "",
                dataFim: "",
              })
            }
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        Object.entries(obrasPorStatus).map(
          ([status, obrasDoStatus]) =>
            obrasDoStatus.length > 0 && (
              <div key={status} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${statusColors[status].split(" ")[0]}`}></div>
                  <h3 className="text-2xl font-semibold">{status}</h3>
                  <span className="text-muted-foreground">({obrasDoStatus.length})</span>
                </div>

                <div className="relative">
                  {/* Linha vertical da timeline - visível apenas em telas maiores */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

                  <div className="space-y-6 sm:space-y-8">
                    {obrasDoStatus.map((obra) => (
                      <div key={obra.id} className="relative pl-0 sm:pl-16">
                        {/* Círculo da timeline - visível apenas em telas maiores */}
                        <div
                          className={`absolute left-4 top-6 w-4 h-4 rounded-full border-4 ${
                            statusColors[status]
                          } hidden sm:block`}
                        ></div>

                        <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow dark:bg-slate-900/60">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative h-48 sm:h-56 md:h-auto md:w-2/5">
                              <Image
                                src={
                                  obra.fotos && obra.fotos.length > 0
                                    ? obra.fotos[0]
                                    : getDefaultImage(obra.id)
                                }
                                alt={obra.titulo}
                                fill
                                className="object-cover"
                              />
                              <Badge
                                className={`absolute top-2 right-2 sm:top-4 sm:right-4 ${
                                  statusColors[obra.status].split(" ")[0]
                                }`}
                              >
                                {obra.status}
                              </Badge>

                              {/* Data de início */}
                              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/60 text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 rounded-md backdrop-blur-sm">
                                <Calendar className="h-3 w-3 inline mr-1" />
                                {formatDate(obra.dataInicio)}
                              </div>
                            </div>
                            <div className="md:w-3/5 flex flex-col">
                              <CardHeader className="py-3 sm:py-6">
                                <CardTitle className="text-lg sm:text-xl line-clamp-2">{obra.titulo}</CardTitle>
                              </CardHeader>
                              <CardContent className="py-2 sm:py-3 flex-grow">
                                <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                                  {obra.descricao}
                                </p>
                                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                                    <span className="line-clamp-1">{obra.local}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                                    <span>{formatCurrency(obra.valorInicial + (obra.valorAditivos || 0))}</span>
                                  </div>

                                  {/* Barra de progresso */}
                                  {obra.progresso > 0 && (
                                    <div className="w-full mt-2">
                                      <div className="flex justify-between text-xs mb-1">
                                        <span>Progresso</span>
                                        <span>{obra.progresso}%</span>
                                      </div>
                                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 sm:h-2">
                                        <div
                                          className={`h-1.5 sm:h-2 rounded-full ${
                                            obra.status === "Em andamento"
                                              ? "bg-blue-500"
                                              : obra.status === "Concluída"
                                                ? "bg-green-500"
                                                : obra.status === "Paralisada"
                                                  ? "bg-amber-500"
                                                  : "bg-slate-500"
                                          }`}
                                          style={{ width: `${obra.progresso}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                              <CardFooter className="pt-0 pb-3 sm:pb-6">
                                <Button
                                  asChild
                                  size="sm"
                                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                  <Link href={`/obra/${obra.id}`}>
                                    Ver detalhes
                                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                  </Link>
                                </Button>
                              </CardFooter>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
        )
      )}
    </div>
  )
}

// Função para obter uma imagem padrão baseada no ID da obra
function getDefaultImage(id: string): string {
  switch (id) {
    case "1":
      return "https://mapa-da-obra-producao.s3.amazonaws.com/wp-content/uploads/2018/09/assessoria-de-obras.jpg"
    case "2":
      return "https://www.sydle.com/blog/assets/post/gestao-de-obras-64a337650efb3b42f75360fe/gestao-de-obras.webp"
    case "3":
      return "https://ctcinfra.com.br/wp-content/uploads/2023/07/obras-industriais-1-1024x643.png"
    case "4":
      return "https://ctcinfra.com.br/wp-content/uploads/2023/07/construcao-industrial-1024x540.jpg"
    case "5":
      return "https://mapa-da-obra-producao.s3.amazonaws.com/wp-content/uploads/2018/09/assessoria-de-obras.jpg"
    default:
      return "https://ctcinfra.com.br/wp-content/uploads/2023/07/construcao-industrial-1024x540.jpg"
  }
}
