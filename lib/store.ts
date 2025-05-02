"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Obra {
  id: string
  titulo: string
  descricao: string
  status: "Não iniciada" | "Em andamento" | "Paralisada" | "Concluída"
  local: string
  dataInicio: string
  dataFim: string
  valorInicial: number
  valorAditivos: number
  responsavel: string
  fotos: string[]
  documentos: Array<{ id: string; nome: string }>
  progresso: number
}

interface ObrasStore {
  obras: Obra[]
  addObra: (obra: Obra) => void
  updateObra: (obra: Obra) => void
  removeObra: (id: string) => void
}

// Modificar o array obrasIniciais para incluir mais obras
const obrasIniciais: Obra[] = [
  {
    id: "1",
    titulo: "Construção da Ponte sobre o Rio Itacaiúnas",
    descricao:
      "Construção de ponte sobre o Rio Itacaiúnas ligando os núcleos Nova Marabá e Cidade Nova, com extensão de 320 metros e duas pistas de rolamento. A obra inclui iluminação LED, ciclovia e calçadas acessíveis.",
    status: "Em andamento",
    local: "Rio Itacaiúnas, entre Nova Marabá e Cidade Nova",
    dataInicio: "2023-03-15",
    dataFim: "2025-06-30",
    valorInicial: 45000000,
    valorAditivos: 5800000,
    responsavel: "Secretaria Municipal de Obras",
    fotos: ["https://mapa-da-obra-producao.s3.amazonaws.com/wp-content/uploads/2018/09/assessoria-de-obras.jpg"],
    documentos: [
      { id: "doc1", nome: "Projeto Executivo da Ponte.pdf" },
      { id: "doc2", nome: "Licença Ambiental SEMA-PA.pdf" },
      { id: "doc3", nome: "Contrato de Licitação 045/2023.pdf" },
    ],
    progresso: 35,
  },
  {
    id: "2",
    titulo: "Reforma da Escola Municipal Paulo Freire",
    descricao:
      "Reforma completa da Escola Municipal Paulo Freire, incluindo troca do telhado, pintura, reforma dos banheiros, construção de quadra poliesportiva coberta e laboratório de informática com 30 computadores.",
    status: "Concluída",
    local: "Folha 16, Quadra 07 - Nova Marabá",
    dataInicio: "2022-11-10",
    dataFim: "2023-07-15",
    valorInicial: 2850000,
    valorAditivos: 320000,
    responsavel: "Secretaria Municipal de Educação",
    fotos: ["https://www.sydle.com/blog/assets/post/gestao-de-obras-64a337650efb3b42f75360fe/gestao-de-obras.webp"],
    documentos: [
      { id: "doc4", nome: "Projeto de Reforma Escolar.pdf" },
      { id: "doc5", nome: "Termo de Entrega e Recebimento.pdf" },
    ],
    progresso: 100,
  },
  {
    id: "3",
    titulo: "Pavimentação da Avenida Transamazônica",
    descricao:
      "Pavimentação asfáltica da Avenida Transamazônica no trecho urbano de Marabá, com extensão de 8,5 km, incluindo drenagem pluvial, calçadas acessíveis, ciclovia e sinalização horizontal e vertical.",
    status: "Paralisada",
    local: "Avenida Transamazônica - Trecho urbano",
    dataInicio: "2023-01-20",
    dataFim: "2023-12-30",
    valorInicial: 12500000,
    valorAditivos: 1800000,
    responsavel: "Secretaria Municipal de Obras",
    fotos: ["https://ctcinfra.com.br/wp-content/uploads/2023/07/obras-industriais-1-1024x643.png"],
    documentos: [
      { id: "doc6", nome: "Projeto de Pavimentação.pdf" },
      { id: "doc7", nome: "Relatório de Paralisação.pdf" },
    ],
    progresso: 45,
  },
  {
    id: "4",
    titulo: "Construção do Hospital Municipal de Marabá",
    descricao:
      "Construção do novo Hospital Municipal de Marabá com 220 leitos, incluindo UTI adulto e neonatal, centro cirúrgico com 8 salas, pronto-socorro, laboratório e centro de diagnóstico por imagem. O hospital terá capacidade para atender toda a região sudeste do Pará.",
    status: "Em andamento",
    local: "Folha 32, Nova Marabá",
    dataInicio: "2023-05-10",
    dataFim: "2025-11-30",
    valorInicial: 78000000,
    valorAditivos: 0,
    responsavel: "Secretaria Municipal de Saúde",
    fotos: ["https://ctcinfra.com.br/wp-content/uploads/2023/07/construcao-industrial-1024x540.jpg"],
    documentos: [
      { id: "doc8", nome: "Projeto Arquitetônico do Hospital.pdf" },
      { id: "doc9", nome: "Estudo de Impacto Ambiental.pdf" },
      { id: "doc10", nome: "Contrato de Financiamento Federal.pdf" },
    ],
    progresso: 25,
  },
  {
    id: "5",
    titulo: "Revitalização da Praça São Félix de Valois",
    descricao:
      "Revitalização completa da Praça São Félix de Valois, no núcleo Velha Marabá, incluindo novo paisagismo, playground infantil, academia ao ar livre, quiosques para comerciantes locais, anfiteatro e iluminação em LED.",
    status: "Concluída",
    local: "Praça São Félix de Valois - Velha Marabá",
    dataInicio: "2022-08-15",
    dataFim: "2023-02-28",
    valorInicial: 1850000,
    valorAditivos: 215000,
    responsavel: "Secretaria Municipal de Cultura e Turismo",
    fotos: ["/images/obras/praca-1.png", "/images/obras/praca-2.png"],
    documentos: [
      { id: "doc11", nome: "Projeto de Revitalização.pdf" },
      { id: "doc12", nome: "Relatório de Conclusão.pdf" },
    ],
    progresso: 100,
  },
  // NOVAS OBRAS
  {
    id: "6",
    titulo: "Construção da UPA 24h Cidade Nova",
    descricao:
      "Construção da Unidade de Pronto Atendimento 24h no núcleo Cidade Nova, com 15 leitos de observação, 8 consultórios médicos, sala de raio-X, laboratório e farmácia. A unidade terá capacidade para realizar até 300 atendimentos diários.",
    status: "Em andamento",
    local: "Folha 27, Quadra Especial - Cidade Nova",
    dataInicio: "2023-09-05",
    dataFim: "2024-08-30",
    valorInicial: 8500000,
    valorAditivos: 450000,
    responsavel: "Secretaria Municipal de Saúde",
    fotos: ["https://ctcinfra.com.br/wp-content/uploads/2023/07/construcao-industrial-1024x540.jpg"],
    documentos: [
      { id: "doc13", nome: "Projeto Básico UPA 24h.pdf" },
      { id: "doc14", nome: "Contrato de Execução 078/2023.pdf" },
    ],
    progresso: 42,
  },
  {
    id: "7",
    titulo: "Construção da Creche Municipal Pequenos Passos",
    descricao:
      "Construção de creche municipal com capacidade para 150 crianças de 0 a 5 anos, com 8 salas de aula, refeitório, playground, sala multiuso e área administrativa. O projeto segue o padrão do FNDE tipo 2 com adaptações para o clima amazônico.",
    status: "Concluída",
    local: "Bairro Laranjeiras, Marabá",
    dataInicio: "2022-03-10",
    dataFim: "2023-04-20",
    valorInicial: 3200000,
    valorAditivos: 180000,
    responsavel: "Secretaria Municipal de Educação",
    fotos: ["https://www.sydle.com/blog/assets/post/gestao-de-obras-64a337650efb3b42f75360fe/gestao-de-obras.webp"],
    documentos: [
      { id: "doc15", nome: "Projeto Padrão FNDE.pdf" },
      { id: "doc16", nome: "Termo de Recebimento Definitivo.pdf" },
    ],
    progresso: 100,
  },
  {
    id: "8",
    titulo: "Sistema de Macrodrenagem do Bairro São Félix",
    descricao:
      "Implantação de sistema de macrodrenagem no bairro São Félix para mitigação de enchentes, incluindo 3,5 km de galerias, 45 poços de visita, 120 bocas de lobo e recuperação de 15 mil m² de pavimentação asfáltica.",
    status: "Não iniciada",
    local: "Bairro São Félix, Marabá",
    dataInicio: "2024-03-01",
    dataFim: "2025-06-30",
    valorInicial: 15800000,
    valorAditivos: 0,
    responsavel: "Secretaria Municipal de Obras",
    fotos: ["https://ctcinfra.com.br/wp-content/uploads/2023/07/obras-industriais-1-1024x643.png"],
    documentos: [
      { id: "doc17", nome: "Projeto Executivo de Drenagem.pdf" },
      { id: "doc18", nome: "Estudo Hidrológico.pdf" },
    ],
    progresso: 0,
  },
  {
    id: "9",
    titulo: "Construção do Terminal Rodoviário Interestadual",
    descricao:
      "Construção do novo Terminal Rodoviário Interestadual de Marabá, com 12 plataformas de embarque/desembarque, área comercial com 25 lojas, praça de alimentação, guichês para 15 empresas de transporte e estacionamento para 200 veículos.",
    status: "Em andamento",
    local: "BR-230, km 5, Marabá",
    dataInicio: "2023-07-12",
    dataFim: "2025-01-30",
    valorInicial: 22500000,
    valorAditivos: 1200000,
    responsavel: "Secretaria Municipal de Infraestrutura",
    fotos: ["https://mapa-da-obra-producao.s3.amazonaws.com/wp-content/uploads/2018/09/assessoria-de-obras.jpg"],
    documentos: [
      { id: "doc19", nome: "Projeto Arquitetônico Terminal.pdf" },
      { id: "doc20", nome: "Estudo de Impacto de Tráfego.pdf" },
    ],
    progresso: 28,
  },
  {
    id: "10",
    titulo: "Parque Ambiental do Rio Tocantins",
    descricao:
      "Implantação do Parque Ambiental do Rio Tocantins, com 12 hectares de área verde preservada, 3 km de trilhas ecológicas, centro de educação ambiental, mirantes, deck para contemplação do rio e áreas de lazer com equipamentos esportivos.",
    status: "Paralisada",
    local: "Margem do Rio Tocantins, Marabá",
    dataInicio: "2022-10-05",
    dataFim: "2024-05-30",
    valorInicial: 9800000,
    valorAditivos: 750000,
    responsavel: "Secretaria Municipal de Meio Ambiente",
    fotos: ["/images/obras/praca-1.png"],
    documentos: [
      { id: "doc21", nome: "Projeto Paisagístico.pdf" },
      { id: "doc22", nome: "Licença Ambiental SEMA.pdf" },
      { id: "doc23", nome: "Notificação de Paralisação.pdf" },
    ],
    progresso: 35,
  },
  {
    id: "11",
    titulo: "Ciclovia da Avenida VP-8",
    descricao:
      "Implantação de 7,2 km de ciclovia bidirecional na Avenida VP-8, ligando os núcleos Nova Marabá e Cidade Nova, com iluminação em LED, sinalização horizontal e vertical, bicicletários em pontos estratégicos e paisagismo com arborização nativa.",
    status: "Em andamento",
    local: "Avenida VP-8, Marabá",
    dataInicio: "2023-11-10",
    dataFim: "2024-07-15",
    valorInicial: 4200000,
    valorAditivos: 0,
    responsavel: "Secretaria Municipal de Mobilidade Urbana",
    fotos: ["https://ctcinfra.com.br/wp-content/uploads/2023/07/obras-industriais-1-1024x643.png"],
    documentos: [
      { id: "doc24", nome: "Projeto Executivo Ciclovia.pdf" },
      { id: "doc25", nome: "Plano de Mobilidade Urbana.pdf" },
    ],
    progresso: 15,
  },
  {
    id: "12",
    titulo: "Reforma e Ampliação do Mercado Municipal",
    descricao:
      "Reforma e ampliação do Mercado Municipal de Marabá, com restauração da estrutura histórica, reorganização de 120 boxes comerciais, nova praça de alimentação, sistema de refrigeração, instalações sanitárias acessíveis e estacionamento para 80 veículos.",
    status: "Concluída",
    local: "Núcleo Velha Marabá",
    dataInicio: "2022-05-20",
    dataFim: "2023-08-15",
    valorInicial: 5600000,
    valorAditivos: 920000,
    responsavel: "Secretaria Municipal de Desenvolvimento Econômico",
    fotos: ["/images/obras/praca-2.png"],
    documentos: [
      { id: "doc26", nome: "Projeto de Restauração.pdf" },
      { id: "doc27", nome: "Relatório de Conclusão.pdf" },
    ],
    progresso: 100,
  },
  {
    id: "13",
    titulo: "Centro de Convenções de Marabá",
    descricao:
      "Construção do Centro de Convenções de Marabá, com auditório principal para 1.200 pessoas, 5 salas modulares para eventos, área de exposições de 2.000 m², foyer, área administrativa e estacionamento para 300 veículos.",
    status: "Não iniciada",
    local: "Rodovia PA-150, km 3, Marabá",
    dataInicio: "2024-06-01",
    dataFim: "2026-05-30",
    valorInicial: 35000000,
    valorAditivos: 0,
    responsavel: "Secretaria Municipal de Desenvolvimento Econômico",
    fotos: ["/images/obras/default-cover.png"],
    documentos: [
      { id: "doc28", nome: "Projeto Arquitetônico.pdf" },
      { id: "doc29", nome: "Estudo de Viabilidade Econômica.pdf" },
    ],
    progresso: 0,
  },
  {
    id: "14",
    titulo: "Construção da Escola Municipal Professora Maria da Silva",
    descricao:
      "Construção da Escola Municipal Professora Maria da Silva, com 12 salas de aula, laboratório de informática, biblioteca, quadra poliesportiva coberta, refeitório, sala de professores e área administrativa. A escola terá capacidade para atender 960 alunos em dois turnos.",
    status: "Em andamento",
    local: "Bairro Novo Horizonte, Marabá",
    dataInicio: "2023-08-15",
    dataFim: "2024-12-20",
    valorInicial: 7800000,
    valorAditivos: 350000,
    responsavel: "Secretaria Municipal de Educação",
    fotos: ["https://www.sydle.com/blog/assets/post/gestao-de-obras-64a337650efb3b42f75360fe/gestao-de-obras.webp"],
    documentos: [
      { id: "doc30", nome: "Projeto Executivo Escola.pdf" },
      { id: "doc31", nome: "Cronograma Físico-Financeiro.pdf" },
    ],
    progresso: 48,
  },
  {
    id: "15",
    titulo: "Pavimentação do Residencial Tiradentes",
    descricao:
      "Pavimentação asfáltica de 15 km de vias no Residencial Tiradentes, incluindo drenagem pluvial, calçadas com acessibilidade, sinalização horizontal e vertical, e arborização urbana com espécies nativas.",
    status: "Concluída",
    local: "Residencial Tiradentes, Marabá",
    dataInicio: "2022-09-10",
    dataFim: "2023-06-25",
    valorInicial: 8500000,
    valorAditivos: 620000,
    responsavel: "Secretaria Municipal de Obras",
    fotos: ["https://mapa-da-obra-producao.s3.amazonaws.com/wp-content/uploads/2018/09/assessoria-de-obras.jpg"],
    documentos: [
      { id: "doc32", nome: "Projeto de Pavimentação.pdf" },
      { id: "doc33", nome: "Termo de Recebimento.pdf" },
    ],
    progresso: 100,
  },
]

export const useObrasStore = create<ObrasStore>()(
  persist(
    (set) => ({
      obras: obrasIniciais,
      addObra: (obra) => set((state) => ({ obras: [...state.obras, obra] })),
      updateObra: (obra) =>
        set((state) => ({
          obras: state.obras.map((o) => (o.id === obra.id ? obra : o)),
        })),
      removeObra: (id) =>
        set((state) => ({
          obras: state.obras.filter((o) => o.id !== id),
        })),
    }),
    {
      name: "forense-obras-storage",
    },
  ),
)
