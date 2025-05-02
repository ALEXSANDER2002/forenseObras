import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/maraba-hero.jpg"
          alt="Vista aérea de Marabá"
          fill
          className="object-cover brightness-[0.35]"
          priority
        />
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-black/70 to-blue-800/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_70%)]"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32 animate-in fade-in duration-700 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12">
          <div className="max-w-3xl md:max-w-2xl lg:max-w-3xl">
            <div className="mb-2 inline-block">
              <Badge
                variant="outline"
                className="bg-blue-600/30 text-blue-50 border-blue-400/40 backdrop-blur-sm font-medium"
              >
                Transparência e Monitoramento
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 text-white drop-shadow-md">
              forense<span className="text-blue-400">Obras</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-100 mb-6 sm:mb-8 max-w-2xl leading-relaxed drop-shadow-md">
              Transparência e acompanhamento das obras públicas na cidade de Marabá, Pará. Monitore o progresso,
              investimentos e prazos das principais intervenções urbanas.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-700/30 text-sm sm:text-base"
              >
                <Link href="#timeline">Ver Obras</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-white border-white border-2 bg-black/20 hover:bg-white/20 backdrop-blur-sm transition-all text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                <Link href="/admin">Área Administrativa</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full max-w-[200px] sm:max-w-xs md:w-1/3 lg:w-1/4 aspect-square rounded-full overflow-hidden border-4 border-white/30 shadow-2xl mt-8 md:mt-0 md:block transform hover:scale-105 transition-transform duration-300 md:ml-auto">
            <Image
              src="/images/equipe-tecnica.png"
              alt="Equipe técnica de engenharia"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
