"use client"

import { useState } from "react"
import { useObrasStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, Search, Eye, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminObrasListProps {
  onEdit: (id: string) => void
}

export function AdminObrasList({ onEdit }: AdminObrasListProps) {
  const { obras, removeObra } = useObrasStore()
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()
  const [obraToDelete, setObraToDelete] = useState<string | null>(null)

  const filteredObras = obras.filter(
    (obra) =>
      obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obra.local.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    removeObra(id)
    toast({
      title: "Obra removida",
      description: "A obra foi removida com sucesso.",
    })
    setObraToDelete(null)
  }

  const getBadgeColor = (status: string) => {
    switch (status) {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar obras..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredObras.length === 0 ? (
        <div className="text-center py-12 border rounded-md bg-white dark:bg-slate-900">
          <p className="text-muted-foreground">Nenhuma obra encontrada. Tente ajustar sua busca.</p>
        </div>
      ) : (
        <>
          {/* Tabela para telas médias e grandes */}
          <div className="border rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow-sm hidden md:block">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="dark:border-slate-700">
                    <TableHead>Título</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Local</TableHead>
                    <TableHead className="hidden md:table-cell">Data de Início</TableHead>
                    <TableHead className="hidden lg:table-cell">Valor</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredObras.map((obra) => (
                    <TableRow
                      key={obra.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:border-slate-700"
                    >
                      <TableCell className="font-medium">{obra.titulo}</TableCell>
                      <TableCell>
                        <Badge className={getBadgeColor(obra.status)}>{obra.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{obra.local}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(obra.dataInicio)}</TableCell>
                      <TableCell className="hidden lg:table-cell">{formatCurrency(obra.valorInicial)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/obra/${obra.id}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Visualizar</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => onEdit(obra.id)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <AlertDialog
                            open={obraToDelete === obra.id}
                            onOpenChange={(open) => {
                              if (!open) setObraToDelete(null)
                            }}
                          >
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setObraToDelete(obra.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Excluir</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir a obra "{obra.titulo}"? Esta ação não pode ser
                                  desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(obra.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Cards para telas pequenas */}
          <div className="space-y-4 md:hidden">
            {filteredObras.map((obra) => (
              <Card key={obra.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base line-clamp-1">{obra.titulo}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/obra/${obra.id}`} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Visualizar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(obra.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <AlertDialog
                          open={obraToDelete === obra.id}
                          onOpenChange={(open) => {
                            if (!open) setObraToDelete(null)
                          }}
                        >
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                setObraToDelete(obra.id)
                              }}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Excluir</span>
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir a obra "{obra.titulo}"? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(obra.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className={getBadgeColor(obra.status)}>{obra.status}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Local:</span>
                      <span className="text-right max-w-[70%] line-clamp-1">{obra.local}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Data de Início:</span>
                      <span>{formatDate(obra.dataInicio)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Valor:</span>
                      <span>{formatCurrency(obra.valorInicial)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
