import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-flux-900 text-flux-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-sage-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="font-display font-semibold text-xl text-white">Flux</span>
            </div>
            <p className="text-flux-300 max-w-md">
              Comunidad de bienestar en Andorra. Conectamos personas a través del movimiento,
              la naturaleza y experiencias que cuidan cuerpo y mente.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-white mb-4">Explora</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/eventos" className="text-flux-300 hover:text-white transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="/#activities" className="text-flux-300 hover:text-white transition-colors">
                  Actividades
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-flux-300 hover:text-white transition-colors">
                  Sobre Flux
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="text-flux-300">Andorra la Vella</li>
              <li>
                <a href="mailto:hola@flux.ad" className="text-flux-300 hover:text-white transition-colors">
                  hola@flux.ad
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/flux.ad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-flux-300 hover:text-white transition-colors"
                >
                  @flux.ad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-flux-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-flux-400 text-sm">
            © {new Date().getFullYear()} Flux. Todos los derechos reservados.
          </p>
          <p className="text-flux-400 text-sm">
            Hecho con cuidado en Andorra
          </p>
        </div>
      </div>
    </footer>
  )
}
