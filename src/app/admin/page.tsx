import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { Button } from '@/components/ui/Button'

async function getStats() {
  const now = new Date()

  const [totalEvents, activeEvents, upcomingEvents, totalRegistrations] = await Promise.all([
    prisma.event.count(),
    prisma.event.count({ where: { status: 'active' } }),
    prisma.event.count({ where: { status: 'active', date: { gte: now } } }),
    prisma.registration.count(),
  ])

  const recentRegistrations = await prisma.registration.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      event: { select: { title: true } },
    },
  })

  const upcomingEventsList = await prisma.event.findMany({
    where: { status: 'active', date: { gte: now } },
    take: 5,
    orderBy: { date: 'asc' },
    include: { _count: { select: { registrations: true } } },
  })

  return {
    totalEvents,
    activeEvents,
    upcomingEvents,
    totalRegistrations,
    recentRegistrations,
    upcomingEventsList,
  }
}

export default async function AdminDashboard() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const stats = await getStats()

  return (
    <div className="flex min-h-screen bg-flux-50">
      <AdminSidebar admin={session} />

      <main className="flex-1 p-8">
        <AdminHeader
          title="Dashboard"
          description="Resumen de la actividad de Flux"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-flux-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-flux-500 text-sm">Total eventos</p>
                <p className="text-3xl font-display font-semibold text-flux-900 mt-1">
                  {stats.totalEvents}
                </p>
              </div>
              <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-flux-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-flux-500 text-sm">Próximos eventos</p>
                <p className="text-3xl font-display font-semibold text-flux-900 mt-1">
                  {stats.upcomingEvents}
                </p>
              </div>
              <div className="w-12 h-12 bg-sand-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-sand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-flux-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-flux-500 text-sm">Total registros</p>
                <p className="text-3xl font-display font-semibold text-flux-900 mt-1">
                  {stats.totalRegistrations}
                </p>
              </div>
              <div className="w-12 h-12 bg-flux-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-flux-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-flux-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-flux-500 text-sm">Eventos activos</p>
                <p className="text-3xl font-display font-semibold text-flux-900 mt-1">
                  {stats.activeEvents}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl border border-flux-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-medium text-flux-900">
                Próximos eventos
              </h2>
              <Link href="/admin/eventos">
                <Button variant="ghost" size="sm">Ver todos</Button>
              </Link>
            </div>

            {stats.upcomingEventsList.length > 0 ? (
              <div className="space-y-4">
                {stats.upcomingEventsList.map((event) => (
                  <Link
                    key={event.id}
                    href={`/admin/eventos/${event.id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-flux-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sage-100 rounded-lg flex items-center justify-center text-lg">
                        {event.category === 'running' ? '🏃' :
                         event.category === 'yoga' ? '🧘' :
                         event.category === 'padel' ? '🎾' :
                         event.category === 'mindfulness' ? '🧠' :
                         event.category === 'social' ? '☕' :
                         event.category === 'nature' ? '🏔️' : '📌'}
                      </div>
                      <div>
                        <div className="font-medium text-flux-900">{event.title}</div>
                        <div className="text-sm text-flux-500">
                          {new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} · {event.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-flux-500">
                      {event._count.registrations} inscritos
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-flux-500 text-center py-8">No hay eventos próximos</p>
            )}
          </div>

          {/* Recent Registrations */}
          <div className="bg-white rounded-2xl border border-flux-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-medium text-flux-900">
                Últimos registros
              </h2>
              <Link href="/admin/registros">
                <Button variant="ghost" size="sm">Ver todos</Button>
              </Link>
            </div>

            {stats.recentRegistrations.length > 0 ? (
              <div className="space-y-4">
                {stats.recentRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-flux-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-flux-100 rounded-full flex items-center justify-center">
                        <span className="text-flux-600 font-medium">
                          {reg.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-flux-900">{reg.name}</div>
                        <div className="text-sm text-flux-500">{reg.event.title}</div>
                      </div>
                    </div>
                    <div className="text-xs text-flux-400">
                      {new Date(reg.createdAt).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-flux-500 text-center py-8">No hay registros recientes</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
