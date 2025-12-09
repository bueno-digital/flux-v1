import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { CATEGORIES } from '@/lib/utils'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-flux-50 via-sage-50 to-sand-50 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-sage-200 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-sand-200 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-flux-200 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-flux-600 mb-8 animate-fade-in-up">
              <span className="w-2 h-2 bg-sage-500 rounded-full animate-pulse" />
              Comunidad activa en Andorra
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-display font-semibold text-flux-900 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Muévete.{' '}
              <span className="text-sage-600">Conecta.</span>
              <br />
              Vive mejor.
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-flux-600 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Flux es la comunidad de bienestar de Andorra. Running clubs, yoga al aire libre,
              naturaleza y conexiones reales. Creado por gente de aquí, para gente de aquí.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/eventos">
                <Button variant="primary" size="lg">
                  Ver próximos eventos
                </Button>
              </Link>
              <Link href="#about">
                <Button variant="outline" size="lg">
                  Conoce Flux
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-16 flex items-center justify-center gap-8 text-flux-500 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <div className="text-3xl font-display font-semibold text-flux-800">150+</div>
                <div className="text-sm">Miembros activos</div>
              </div>
              <div className="w-px h-12 bg-flux-200" />
              <div className="text-center">
                <div className="text-3xl font-display font-semibold text-flux-800">30+</div>
                <div className="text-sm">Eventos al mes</div>
              </div>
              <div className="w-px h-12 bg-flux-200" />
              <div className="text-center">
                <div className="text-3xl font-display font-semibold text-flux-800">7</div>
                <div className="text-sm">Parroquias</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-flux-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sage-600 font-medium mb-4 block">Por qué Flux</span>
                <h2 className="text-4xl md:text-5xl font-display font-semibold text-flux-900 mb-6">
                  Más que ejercicio.<br />
                  <span className="text-sage-600">Conexión real.</span>
                </h2>
                <p className="text-lg text-flux-600 mb-6">
                  En Flux creemos que el bienestar va más allá de hacer deporte. Es encontrar tu tribu,
                  compartir experiencias al aire libre, y crear hábitos que transformen tu día a día.
                </p>
                <p className="text-lg text-flux-600 mb-8">
                  Somos una comunidad local que organiza quedadas de running, sesiones de yoga con vistas
                  a las montañas, rutas por la naturaleza, cafés con propósito y mucho más.
                  Todo pensado para gente que vive en Andorra y quiere conectar de verdad.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-flux-100 text-flux-700 rounded-full text-sm">Sin competición</span>
                  <span className="px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm">Todos los niveles</span>
                  <span className="px-4 py-2 bg-sand-100 text-sand-700 rounded-full text-sm">Comunidad real</span>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-sage-100 to-sand-100 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-8xl mb-4">🏔️</div>
                      <p className="text-flux-600 font-medium">Naturaleza + Comunidad</p>
                    </div>
                  </div>
                </div>
                {/* Floating Cards */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg border border-flux-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center text-2xl">🧘</div>
                    <div>
                      <div className="font-medium text-flux-900">Yoga al amanecer</div>
                      <div className="text-sm text-flux-500">Mañana, 7:00</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg border border-flux-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-sand-100 rounded-full flex items-center justify-center text-2xl">🏃</div>
                    <div>
                      <div className="font-medium text-flux-900">Running Club</div>
                      <div className="text-sm text-flux-500">Jueves, 19:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="section bg-flux-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sage-600 font-medium mb-4 block">Qué hacemos</span>
              <h2 className="text-4xl md:text-5xl font-display font-semibold text-flux-900 mb-4">
                Actividades para todos
              </h2>
              <p className="text-lg text-flux-600 max-w-2xl mx-auto">
                Desde running clubs hasta cafés con conversación. Encuentra tu forma de moverte y conectar.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/eventos?category=${category.id}`}
                  className="group bg-white p-6 md:p-8 rounded-2xl border border-flux-100 hover:border-sage-200 hover:shadow-md transition-all"
                >
                  <div className="text-4xl md:text-5xl mb-4">{category.emoji}</div>
                  <h3 className="text-lg md:text-xl font-display font-medium text-flux-900 group-hover:text-sage-700 transition-colors">
                    {category.label}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sage-600 font-medium mb-4 block">Nuestros valores</span>
              <h2 className="text-4xl md:text-5xl font-display font-semibold text-flux-900 mb-4">
                Lo que nos mueve
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                  🤝
                </div>
                <h3 className="text-xl font-display font-medium text-flux-900 mb-3">Comunidad primero</h3>
                <p className="text-flux-600">
                  No somos un gimnasio. Somos personas que quieren compartir experiencias y crear lazos reales.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-sand-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                  🌿
                </div>
                <h3 className="text-xl font-display font-medium text-flux-900 mb-3">Bienestar integral</h3>
                <p className="text-flux-600">
                  Cuerpo y mente van juntos. Mezclamos movimiento físico con momentos de calma y conexión.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-flux-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                  🏔️
                </div>
                <h3 className="text-xl font-display font-medium text-flux-900 mb-3">100% local</h3>
                <p className="text-flux-600">
                  Creado en Andorra, para Andorra. Aprovechamos la naturaleza increíble que nos rodea.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gradient-to-br from-sage-600 to-sage-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-white mb-6">
              Únete a la comunidad
            </h2>
            <p className="text-xl text-sage-100 mb-10 max-w-2xl mx-auto">
              El primer paso es el más importante. Apúntate a un evento y empieza a formar parte de algo especial.
            </p>
            <Link href="/eventos">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-sage-700 hover:bg-flux-50"
              >
                Explorar eventos
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
