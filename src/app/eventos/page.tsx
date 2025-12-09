import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EventCard } from '@/components/events/EventCard'
import { EventFilters } from '@/components/events/EventFilters'
import { prisma } from '@/lib/prisma'
import type { Event } from '@/types'

interface Props {
  searchParams: Promise<{
    category?: string
    location?: string
  }>
}

async function getEvents(category?: string, location?: string): Promise<Event[]> {
  const where: Record<string, unknown> = {
    status: 'active',
    date: { gte: new Date() },
  }

  if (category) where.category = category
  if (location) where.location = location

  const events = await prisma.event.findMany({
    where,
    orderBy: { date: 'asc' },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  })

  return events as unknown as Event[]
}

export default async function EventsPage({ searchParams }: Props) {
  const params = await searchParams
  const events = await getEvents(params.category, params.location)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-flux-50 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-flux-900 mb-4">
              Próximos eventos
            </h1>
            <p className="text-lg text-flux-600 max-w-2xl">
              Encuentra tu próxima actividad y únete a la comunidad Flux.
              Todos los niveles son bienvenidos.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <Suspense fallback={<div className="h-32 bg-white rounded-2xl animate-pulse" />}>
              <EventFilters />
            </Suspense>
          </div>

          {/* Events Grid */}
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-display font-medium text-flux-900 mb-2">
                No hay eventos disponibles
              </h3>
              <p className="text-flux-600 mb-6">
                {params.category || params.location
                  ? 'Prueba a cambiar los filtros para ver más eventos.'
                  : 'Pronto añadiremos nuevos eventos. ¡Vuelve a visitarnos!'}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
