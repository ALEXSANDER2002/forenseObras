"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useObrasStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { v4 as uuidv4 } from "@/lib/uuid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileInput } from "@/components/file-input"
import { X, Plus } from "lucide-react"

interface AdminObraFormProps {
  obraId: string | null
  onCancel: () => void
  onSaveComplete: () => void
}

export function AdminObraForm({ obraId, onCancel, onSaveComplete }: AdminObraFormProps) {
  const { obras, addObra, updateObra } = useObrasStore()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("informacoes")

  const emptyObra = {
    id: "",
    titulo: "",
    descricao: "",
    status: "Não iniciada",
    local: "",
    dataInicio: "",
    dataFim: "",
    valorInicial: 0,
    valorAditivos: 0,
    responsavel: "",
    fotos: [],
    documentos: [],
    progresso: 0,
  }

  const [formData, setFormData] = useState(emptyObra)
  const [documentos, setDocumentos] = useState<Array<{ id: string; nome: string }>>([])
  const [novoDocumento, setNovoDocumento] = useState("")

  useEffect(() => {
    if (obraId) {
      const obra = obras.find((o) => o.id === obraId)
      if (obra) {
        setFormData({
          ...obra,
          dataInicio: obra.dataInicio ? new Date(obra.dataInicio).toISOString().split("T")[0] : "",
          dataFim: obra.dataFim ? new Date(obra.dataFim).toISOString().split("T")[0] : "",
        })
        setDocumentos(obra.documentos || [])
      }
    } else {
      setFormData(emptyObra)
      setDocumentos([])
    }
  }, [obraId, obras])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) || 0 }))
  }

  const handleAddDocumento = () => {
    if (novoDocumento.trim()) {
      const newDoc = { id: uuidv4(), nome: novoDocumento.trim() }
      setDocumentos([...documentos, newDoc])
      setNovoDocumento("")
    }
  }

  const handleRemoveDocumento = (id: string) => {
    setDocumentos(documentos.filter((doc) => doc.id !== id))
  }

  const handleAddFoto = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      fotos: [...(prev.fotos || []), url],
    }))
  }

  const handleRemoveFoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.titulo || !formData.local || !formData.dataInicio) {
      toast({
        title: "Erro ao salvar",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    const obraToSave = {
      ...formData,
      id: formData.id || uuidv4(),
      documentos,
    }

    if (obraId) {
      updateObra(obraToSave)
      toast({
        title: "Obra atualizada",
        description: "A obra foi atualizada com sucesso.",
      })
    } else {
      addObra(obraToSave)
      toast({
        title: "Obra cadastrada",
        description: "A obra foi cadastrada com sucesso.",
      })
    }

    onSaveComplete()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="informacoes">Informações Básicas</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="fotos">Fotos</TabsTrigger>
        </TabsList>

        <TabsContent value="informacoes">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título da Obra *</Label>
                  <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Não iniciada">Não iniciada</SelectItem>
                      <SelectItem value="Em andamento">Em andamento</SelectItem>
                      <SelectItem value="Paralisada">Paralisada</SelectItem>
                      <SelectItem value="Concluída">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows={4} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="local">Local *</Label>
                  <Input id="local" name="local" value={formData.local} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavel">Responsável</Label>
                  <Input id="responsavel" name="responsavel" value={formData.responsavel} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataInicio">Data de Início *</Label>
                  <Input
                    id="dataInicio"
                    name="dataInicio"
                    type="date"
                    value={formData.dataInicio}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataFim">Previsão de Término</Label>
                  <Input id="dataFim" name="dataFim" type="date" value={formData.dataFim} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progresso">Progresso (%)</Label>
                  <Input
                    id="progresso"
                    name="progresso"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progresso}
                    onChange={handleNumberChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financeiro">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valorInicial">Valor Inicial (R$) *</Label>
                  <Input
                    id="valorInicial"
                    name="valorInicial"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.valorInicial}
                    onChange={handleNumberChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorAditivos">Valor de Aditivos (R$)</Label>
                  <Input
                    id="valorAditivos"
                    name="valorAditivos"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.valorAditivos}
                    onChange={handleNumberChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentos">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nome do documento"
                    value={novoDocumento}
                    onChange={(e) => setNovoDocumento(e.target.value)}
                  />
                  <Button type="button" onClick={handleAddDocumento}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>

                <div className="space-y-2">
                  {documentos.length === 0 ? (
                    <p className="text-center py-4 text-muted-foreground">Nenhum documento adicionado.</p>
                  ) : (
                    documentos.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                        <span>{doc.nome}</span>
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveDocumento(doc.id)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remover</span>
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fotos">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <FileInput onFileSelected={handleAddFoto} />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {formData.fotos &&
                  formData.fotos.map((foto, index) => (
                    <div key={index} className="relative aspect-video rounded-md overflow-hidden border">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 z-10 h-6 w-6"
                        onClick={() => handleRemoveFoto(index)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remover</span>
                      </Button>
                      <div className="relative h-full w-full">
                        <img
                          src={foto || "/placeholder.svg"}
                          alt={`Foto ${index + 1}`}
                          className="object-cover h-full w-full"
                        />
                      </div>
                    </div>
                  ))}
                {(!formData.fotos || formData.fotos.length === 0) && (
                  <p className="col-span-full text-center py-4 text-muted-foreground">Nenhuma foto adicionada.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{obraId ? "Atualizar Obra" : "Cadastrar Obra"}</Button>
      </div>
    </form>
  )
}
