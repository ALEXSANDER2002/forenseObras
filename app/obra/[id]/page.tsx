"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useObrasStore } from "@/lib/store"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, Calendar, FileText, Download, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { formatCurrency, formatDate } from "@/lib/utils"
import { CommentSection } from "@/components/comment-section"

export default function ObraDetalhes() {
  const params = useParams()
  const id = params.id as string
  const { obras } = useObrasStore()
  const [obra, setObra] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    const obraEncontrada = obras.find((o) => o.id === id)
    if (obraEncontrada) {
      setObra(obraEncontrada)
    }
  }, [id, obras])

  if (!obra) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Obra não encontrada</h1>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/">Voltar para a página inicial</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const calcularProgresso = () => {
    if (obra.status === "Concluída") return 100
    if (obra.status === "Paralisada") return obra.progresso || 50
    return obra.progresso || Math.floor(Math.random() * 100)
  }

  const getBadgeColor = () => {
    switch (obra.status) {
      case "Em andamento":
        return "bg-blue-500"
      case "Concluída":
        return "bg-green-500"
      case "Paralisada":
        return "bg-amber-500"
      case "Não iniciada":
        return "bg-slate-500"
      default:
        return ""
    }
  }

  // Função para obter uma imagem de capa padrão baseada no ID da obra
  const getDefaultCoverImage = () => {
    if (obra.fotos && obra.fotos.length > 0) {
      return obra.fotos[0]
    }

    switch (obra.id) {
      case "1":
        return "/images/obras/ponte-1.jpg"
      case "2":
        return "/images/obras/escola-1.jpg"
      case "3":
        return "/images/obras/pavimentacao-3.png"
      case "4":
        return "/images/obras/hospital-1.png"
      case "5":
        return "/images/obras/praca-1.png"
      default:
        return "/images/obras/default-cover.png"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="relative h-48 sm:h-64 md:h-80 w-full">
        <Image
          src={getDefaultCoverImage() || "/placeholder.svg"}
          alt={obra.titulo}
          fill
          className="object-cover brightness-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 line-clamp-2">
              {obra.titulo}
            </h1>
            <Badge className={`${getBadgeColor()} text-xs sm:text-sm py-0.5 sm:py-1 px-2 sm:px-3`}>{obra.status}</Badge>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8">
        <Button variant="outline" asChild className="mb-6 sm:mb-8 text-xs sm:text-sm h-8 sm:h-9">
          <a href="/">
            <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Voltar para a timeline
          </a>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="md:col-span-2 shadow-sm">
            <CardHeader className="py-3 sm:py-4">
              <CardTitle className="text-base sm:text-lg">Detalhes da Obra</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 sm:pt-2">
              <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">{obra.descricao}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 sm:p-2 rounded-full">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Início</p>
                    <p className="text-sm sm:text-base font-medium">{formatDate(obra.dataInicio)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 sm:p-2 rounded-full">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Previsão de Término</p>
                    <p className="text-sm sm:text-base font-medium">{formatDate(obra.dataFim)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 sm:p-2 rounded-full">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Local</p>
                    <p className="text-sm sm:text-base font-medium">{obra.local}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 sm:p-2 rounded-full">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Responsável</p>
                    <p className="text-sm sm:text-base font-medium">{obra.responsavel || "Secretaria de Obras"}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="flex justify-between mb-1 sm:mb-2">
                  <p className="text-xs sm:text-sm font-medium">Progresso da Obra</p>
                  <p className="text-xs sm:text-sm font-medium">{calcularProgresso()}%</p>
                </div>
                <Progress value={calcularProgresso()} className="h-1.5 sm:h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b py-3 sm:py-4">
              <CardTitle className="text-base sm:text-lg">Informações Financeiras</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">Valor Inicial</p>
                  <p className="text-lg sm:text-xl font-bold">{formatCurrency(obra.valorInicial)}</p>
                </div>
                {obra.valorAditivos > 0 && (
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">Aditivos</p>
                    <p className="text-base sm:text-lg font-semibold text-amber-600">
                      +{formatCurrency(obra.valorAditivos)}
                    </p>
                  </div>
                )}
                <div className="pt-3 sm:pt-4 border-t">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">Valor Total</p>
                  <p className="text-lg sm:text-xl font-bold text-blue-600">
                    {formatCurrency(obra.valorInicial + (obra.valorAditivos || 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="fotos" className="mb-6 sm:mb-8">
          <TabsList className="mb-4 w-full justify-start overflow-x-auto h-9 sm:h-10">
            <TabsTrigger value="fotos" className="text-xs sm:text-sm h-8 sm:h-9">
              Fotos
            </TabsTrigger>
            <TabsTrigger value="documentos" className="text-xs sm:text-sm h-8 sm:h-9">
              Documentos
            </TabsTrigger>
            <TabsTrigger value="mapa" className="text-xs sm:text-sm h-8 sm:h-9">
              Mapa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fotos" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {obra.fotos &&
                obra.fotos.map((foto: string, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-md overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Image
                      src={foto || "/placeholder.svg"}
                      alt={`Foto ${index + 1} da obra ${obra.titulo}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              {(!obra.fotos || obra.fotos.length === 0) && (
                <p className="col-span-full text-center py-6 sm:py-8 text-muted-foreground text-sm">
                  Nenhuma foto disponível para esta obra.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documentos">
            <Card className="shadow-sm">
              <CardContent className="pt-4 sm:pt-6">
                <div className="space-y-3 sm:space-y-4">
                  {obra.documentos &&
                    obra.documentos.map((doc: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 sm:p-4 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 sm:p-2 rounded-full flex-shrink-0">
                            <FileText className="h-3 w-3 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="truncate text-xs sm:text-sm">{doc.nome}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-2 flex-shrink-0 h-7 sm:h-8 text-xs sm:text-sm px-2 sm:px-3"
                          onClick={() => {
                            toast({
                              title: "Download iniciado",
                              description: `O documento ${doc.nome} está sendo baixado.`,
                            })
                          }}
                        >
                          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span className="hidden xs:inline">Baixar</span>
                        </Button>
                      </div>
                    ))}
                  {(!obra.documentos || obra.documentos.length === 0) && (
                    <p className="text-center py-6 sm:py-8 text-muted-foreground text-sm">
                      Nenhum documento disponível para esta obra.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mapa">
            <Card className="shadow-sm">
              <CardContent className="pt-4 sm:pt-6">
                <div className="aspect-video relative rounded-md overflow-hidden border">
                  <Image
                    src={
                      obra.id === "1"
                        ? "/images/mapas/mapa-ponte.png"
                        : obra.id === "2"
                          ? "/images/mapas/mapa-escola.png"
                          : obra.id === "3"
                            ? "/images/mapas/mapa-pavimentacao.png"
                            : obra.id === "4"
                              ? "/images/mapas/mapa-hospital.png"
                              : `/images/mapas/mapa-maraba.png`
                    }
                    alt={`Mapa da localização da obra ${obra.titulo}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/80 p-2 sm:p-4 rounded-md shadow-md max-w-[90%]">
                      <p className="font-medium text-xs sm:text-sm text-center">{obra.local}</p>
                      <p className="text-xs text-muted-foreground text-center">Localização aproximada</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <CommentSection obraId={id} />
      </main>
      <Footer />
    </div>
  )
}
