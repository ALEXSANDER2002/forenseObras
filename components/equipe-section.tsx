import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function EquipeSection() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Equipe Técnica</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Nossa equipe de engenheiros e técnicos altamente qualificados trabalha diariamente para garantir a qualidade
            e o cumprimento dos prazos em todas as obras públicas de Marabá.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg mx-auto lg:mx-0 max-w-md lg:max-w-none w-full">
            <Image
              src="/images/equipe-tecnica.png"
              alt="Equipe técnica analisando plantas de construção"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Excelência em Engenharia e Fiscalização
            </h3>
            <p className="text-lg">
              Nossa equipe multidisciplinar é composta por profissionais especializados em diversas áreas da engenharia
              civil, arquitetura e urbanismo, garantindo que cada projeto seja executado com os mais altos padrões de
              qualidade e segurança.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800/60">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Badge className="bg-blue-600 mr-2">15+</Badge> Engenheiros Civis
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Especialistas em estruturas, hidráulica, pavimentação e geotecnia
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800/60">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Badge className="bg-blue-600 mr-2">8+</Badge> Arquitetos
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Focados em projetos urbanos, acessibilidade e sustentabilidade
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800/60">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Badge className="bg-blue-600 mr-2">20+</Badge> Técnicos
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Equipe de fiscalização e acompanhamento diário das obras
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800/60">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Badge className="bg-blue-600 mr-2">5+</Badge> Especialistas Ambientais
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Garantindo conformidade com legislações ambientais e sustentabilidade
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
