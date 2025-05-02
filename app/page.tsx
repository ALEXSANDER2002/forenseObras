import { Timeline } from "@/components/timeline"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { EquipeSection } from "@/components/equipe-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <main className="flex-1">
        <StatsSection />

        <EquipeSection />

        <section id="timeline" className="py-8 sm:py-12 lg:py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="mb-6 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-6 text-center">Obras em Marabá</h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto text-center mb-6 sm:mb-10">
                Acompanhe o andamento das principais obras públicas em execução na cidade de Marabá, com informações
                atualizadas sobre progresso, investimentos e prazos.
              </p>
            </div>
            <Timeline />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
