"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { formatCurrency } from "@/lib/utils"
import { Search, SlidersHorizontal, X, Filter } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

export interface FilterOptions {
  searchTerm: string
  status: string[]
  valorMin: number
  valorMax: number
  dataInicio: string
  dataFim: string
}

interface ObrasFilterProps {
  onFilterChange: (filters: FilterOptions) => void
  totalObras: number
  obrasFiltradas: number
}

export function ObrasFilter({ onFilterChange, totalObras, obrasFiltradas }: ObrasFilterProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    status: [],
    valorMin: 0,
    valorMax: 100000000,
    dataInicio: "",
    dataFim: "",
  })
  const [mobileFilters, setMobileFilters] = useState<FilterOptions>({
    searchTerm: "",
    status: [],
    valorMin: 0,
    valorMax: 100000000,
    dataInicio: "",
    dataFim: "",
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, searchTerm: e.target.value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleStatusChange = (status: string) => {
    let newStatus: string[]
    if (filters.status.includes(status)) {
      newStatus = filters.status.filter((s) => s !== status)
    } else {
      newStatus = [...filters.status, status]
    }
    const newFilters = { ...filters, status: newStatus }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleMobileStatusChange = (status: string) => {
    let newStatus: string[]
    if (mobileFilters.status.includes(status)) {
      newStatus = mobileFilters.status.filter((s) => s !== status)
    } else {
      newStatus = [...mobileFilters.status, status]
    }
    setMobileFilters({ ...mobileFilters, status: newStatus })
  }

  const handleValorChange = (value: number[]) => {
    const newFilters = { ...filters, valorMin: value[0], valorMax: value[1] }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleMobileValorChange = (value: number[]) => {
    setMobileFilters({ ...mobileFilters, valorMin: value[0], valorMax: value[1] })
  }

  const handleDateChange = (field: "dataInicio" | "dataFim", value: string) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleMobileDateChange = (field: "dataInicio" | "dataFim", value: string) => {
    setMobileFilters({ ...mobileFilters, [field]: value })
  }

  const clearFilters = () => {
    const newFilters = {
      searchTerm: "",
      status: [],
      valorMin: 0,
      valorMax: 100000000,
      dataInicio: "",
      dataFim: "",
    }
    setFilters(newFilters)
    setMobileFilters(newFilters)
    onFilterChange(newFilters)
  }

  const applyMobileFilters = () => {
    setFilters(mobileFilters)
    onFilterChange(mobileFilters)
  }

  const initMobileFilters = () => {
    setMobileFilters({ ...filters })
  }

  const statusOptions = ["Em andamento", "Concluída", "Paralisada", "Não iniciada"]

  // Conta quantos filtros estão ativos
  const activeFiltersCount =
    (filters.status.length > 0 ? 1 : 0) +
    (filters.dataInicio ? 1 : 0) +
    (filters.dataFim ? 1 : 0) +
    (filters.valorMin > 0 || filters.valorMax < 100000000 ? 1 : 0)

  return (
    <div className="space-y-4">
      {/* Desktop e Tablet */}
      <div className="hidden sm:flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar obras por título, descrição ou local..."
            className="pl-8"
            value={filters.searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="outline"
          className="flex gap-2 whitespace-nowrap"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros avançados
          {activeFiltersCount > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
              {activeFiltersCount}
            </span>
          )}
        </Button>
        {(filters.searchTerm || filters.status.length > 0 || filters.dataInicio || filters.dataFim) && (
          <Button variant="ghost" size="icon" onClick={clearFilters} title="Limpar filtros">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden flex-col gap-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar obras..."
              className="pl-8"
              value={filters.searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" onClick={initMobileFilters}>
                <Filter className="h-4 w-4" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] sm:h-[65vh]">
              <SheetHeader>
                <SheetTitle>Filtrar Obras</SheetTitle>
                <SheetDescription>Defina os filtros para encontrar obras específicas</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((status) => (
                      <Button
                        key={status}
                        variant={mobileFilters.status.includes(status) ? "default" : "outline"}
                        size="sm"
                        className={`text-xs h-7 ${
                          mobileFilters.status.includes(status)
                            ? status === "Em andamento"
                              ? "bg-blue-500 hover:bg-blue-600"
                              : status === "Concluída"
                                ? "bg-green-500 hover:bg-green-600"
                                : status === "Paralisada"
                                  ? "bg-amber-500 hover:bg-amber-600"
                                  : "bg-slate-500 hover:bg-slate-600"
                            : ""
                        }`}
                        onClick={() => handleMobileStatusChange(status)}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Valor da Obra</h3>
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between text-sm">
                      <span>{formatCurrency(mobileFilters.valorMin)}</span>
                      <span>{formatCurrency(mobileFilters.valorMax)}</span>
                    </div>
                    <Slider
                      defaultValue={[mobileFilters.valorMin, mobileFilters.valorMax]}
                      max={100000000}
                      step={100000}
                      onValueChange={handleMobileValorChange}
                      className="py-4"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Período</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-dataInicio">Data de início (a partir de)</Label>
                      <Input
                        id="mobile-dataInicio"
                        type="date"
                        value={mobileFilters.dataInicio}
                        onChange={(e) => handleMobileDateChange("dataInicio", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile-dataFim">Data de término (até)</Label>
                      <Input
                        id="mobile-dataFim"
                        type="date"
                        value={mobileFilters.dataFim}
                        onChange={(e) => handleMobileDateChange("dataFim", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <SheetFooter className="flex-row gap-3 sm:justify-end">
                <Button variant="outline" className="flex-1" onClick={() => setMobileFilters(filters)}>
                  Cancelar
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => clearFilters()}>
                  Limpar
                </Button>
                <SheetClose asChild>
                  <Button className="flex-1" onClick={applyMobileFilters}>
                    Aplicar Filtros
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between text-sm gap-2">
        <div>
          <span className="text-muted-foreground text-xs sm:text-sm">
            Mostrando {obrasFiltradas} de {totalObras} obras
          </span>
        </div>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {statusOptions.map((status) => (
            <Button
              key={status}
              variant={filters.status.includes(status) ? "default" : "outline"}
              size="sm"
              className={`text-xs h-6 sm:h-7 px-2 sm:px-3 ${
                filters.status.includes(status)
                  ? status === "Em andamento"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : status === "Concluída"
                      ? "bg-green-500 hover:bg-green-600"
                      : status === "Paralisada"
                        ? "bg-amber-500 hover:bg-amber-600"
                        : "bg-slate-500 hover:bg-slate-600"
                  : ""
              }`}
              onClick={() => handleStatusChange(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {isAdvancedOpen && (
        <Accordion type="single" collapsible className="border rounded-md p-4 bg-slate-50 dark:bg-slate-900">
          <AccordionItem value="valor" className="border-b-0">
            <AccordionTrigger>Valor da Obra</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="flex justify-between text-sm">
                  <span>{formatCurrency(filters.valorMin)}</span>
                  <span>{formatCurrency(filters.valorMax)}</span>
                </div>
                <Slider
                  defaultValue={[filters.valorMin, filters.valorMax]}
                  max={100000000}
                  step={100000}
                  onValueChange={handleValorChange}
                  className="py-4"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="data" className="border-b-0">
            <AccordionTrigger>Período</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="dataInicio">Data de início (a partir de)</Label>
                  <Input
                    id="dataInicio"
                    type="date"
                    value={filters.dataInicio}
                    onChange={(e) => handleDateChange("dataInicio", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataFim">Data de término (até)</Label>
                  <Input
                    id="dataFim"
                    type="date"
                    value={filters.dataFim}
                    onChange={(e) => handleDateChange("dataFim", e.target.value)}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  )
}
