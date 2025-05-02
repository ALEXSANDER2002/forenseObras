import Link from "next/link"
import { Frame } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="bg-blue-600 text-white p-1.5 rounded">
                <Frame className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span className="font-bold text-lg sm:text-xl">
                forense<span className="text-blue-400">Obras</span>
              </span>
            </div>
            <p className="text-blue-100 mb-3 sm:mb-4 text-sm sm:text-base">
              Sistema de monitoramento e transparência de obras públicas em Marabá, Pará.
            </p>
            <p className="text-blue-200 text-xs sm:text-sm">
              Prefeitura Municipal de Marabá
              <br />
              Folha 31, Quadra 07, Lote Especial
              <br />
              Nova Marabá, Marabá - PA, 68507-590
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/" className="text-blue-200 hover:text-blue-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/#timeline" className="text-blue-200 hover:text-blue-400 transition-colors">
                  Obras
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-blue-200 hover:text-blue-400 transition-colors">
                  Área Administrativa
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-4 md:mt-0">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contato</h3>
            <ul className="space-y-2 text-blue-200 text-sm sm:text-base">
              <li>(94) 3322-1000</li>
              <li>contato@maraba.pa.gov.br</li>
              <li>ouvidoria@maraba.pa.gov.br</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-blue-300 text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} forenseObras Marabá. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
