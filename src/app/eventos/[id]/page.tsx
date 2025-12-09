import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { RegistrationForm } from '@/components/events/RegistrationForm'
import { prisma } from '@/lib/prisma'
import { formatDate, getCategoryEmoji, getCategoryLabel } from '@/lib/utils'

interface Props {
  params: Promise<{ id: string }>
}

async function getEvent(id: string) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  })

  return event
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params
  const event = await getEvent(id)

  if (!event || event.status !== 'active') {
    notFound()
  }

  const spotsLeft = event.capacity
    ? event.capacity - event._count.registrations
    : null

  const isFull = spotsLeft !== null && spotsLeft <= 0

  return (
    <>
      <Header />
      <main className="min-h-screen bg-flux-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link
              href="/eventos"
              className="text-flux-500 hover:text-flux-700 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a eventos
            </Link>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header Card */}
              <div className="bg-white rounded-2xl border border-flux-100 overflow-hidden mb-6">
                {/* Hero */}
                <div className="relative h-48 md:h-64 bg-gradient-to-br from-sage-100 to-sand-100 flex items-center justify-center">
                  <span className="text-7xl md:text-8xl">{getCategoryEmoji(event.category)}</span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="sage">{getCategoryLabel(event.category)}</Badge>
                    {event.level && <Badge variant="outline">{event.level}</Badge>}
                    {isFull && <Badge variant="sand">Completo</Badge>}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-display font-semibold text-flux-900 mb-4">
                    {event.title}
                  </h1>

                  <p className="text-flux-600 text-lg leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Details Card */}
              <div className="bg-white rounded-2xl border border-flux-100 p-6 md:p-8">
                <h2 className="text-xl font-display font-medium text-flux-900 mb-6">
                  Detalles del evento
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Date */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-flux-500 mb-1">Fecha</div>
                      <div className="font-medium text-flux-900 capitalize">
                        {formatDate(event.date)}
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-sand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-flux-500 mb-1">Hora</div>
                      <div className="font-medium text-flux-900">
                        {event.time}
                        {event.duration && (
                          <span className="text-flux-500 font-normal">
                            {' '}({event.duration} min)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-flux-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-flux-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-flux-500 mb-1">Ubicación</div>
                      <div className="font-medium text-flux-900">{event.location}</div>
                      {event.address && (
                        <div className="text-sm text-flux-500">{event.address}</div>
                      )}
                    </div>
                  </div>

                  {/* Capacity */}
                  {event.capacity && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-flux-500 mb-1">Plazas</div>
                        <div className="font-medium text-flux-900">
                          {isFull ? (
                            <span className="text-sand-600">Completo</span>
                          ) : (
                            <>
                              {spotsLeft} disponibles
                              <span className="text-flux-500 font-normal"> de {event.capacity}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <RegistrationForm
                  eventId={event.id}
                  eventTitle={event.title}
                  isFull={isFull}
                />

                {/* Info */}
                <div className="mt-6 p-4 bg-sage-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-sage-700">
                      Al registrarte, recibirás información del evento por email.
                      El registro es gratuito y sin compromiso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
