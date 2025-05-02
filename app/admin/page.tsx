"use client"

import { useState } from "react"
import { useObrasStore } from "@/lib/store"
import { AdminNavbar } from "@/components/admin-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminObrasList } from "@/components/admin-obras-list"
import { AdminObraForm } from "@/components/admin-obra-form"
import { PlusCircle, Activity, Clock, CheckCircle, DollarSign } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  const { obras } = useObrasStore()
  const [activeTab, setActiveTab] = useState("lista")
  const [editingObraId, setEditingObraId] = useState<string | null>(null)

  const handleEditObra = (id: string) => {
    setEditingObraId(id)
    setActiveTab("cadastro")
  }

  const handleCancelEdit = () => {
    setEditingObraId(null)
    setActiveTab("lista")
  }

  const handleSaveComplete = () => {
    setEditingObraId(null)
    setActiveTab("lista")
  }

  // Calcular estatísticas
  const totalObras = obras.length
  const obrasEmAndamento = obras.filter((o) => o.status === "Em andamento").length
  const obrasConcluidas = obras.filter((o) => o.status === "Concluída").length
  const obrasParalisadas = obras.filter((o) => o.status === "Paralisada").length

  const totalInvestimento = obras.reduce((total, obra) => total + obra.valorInicial + (obra.valorAditivos || 0), 0)

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie as obras cadastradas no sistema</p>
          </div>
          {activeTab === "lista" && (
            <Button
              onClick={() => {
                setEditingObraId(null)
                setActiveTab("cadastro")
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Obra
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total de Obras</p>
                  <p className="text-3xl font-bold">{totalObras}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-indigo-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Em Andamento</p>
                  <p className="text-3xl font-bold">{obrasEmAndamento}</p>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-sky-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Concluídas</p>
                  <p className="text-3xl font-bold">{obrasConcluidas}</p>
                </div>
                <div className="bg-sky-100 dark:bg-sky-900/30 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-700">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Investimento Total</p>
                  <p className="text-3xl font-bold">{formatCurrency(totalInvestimento)}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <AdminDashboard />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="lista" className="flex-1 md:flex-none">
              Lista de Obras
            </TabsTrigger>
            <TabsTrigger value="cadastro" className="flex-1 md:flex-none">
              {editingObraId ? "Editar Obra" : "Cadastrar Nova Obra"}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="lista" className="space-y-4">
            <AdminObrasList onEdit={handleEditObra} />
          </TabsContent>
          <TabsContent value="cadastro">
            <AdminObraForm obraId={editingObraId} onCancel={handleCancelEdit} onSaveComplete={handleSaveComplete} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
