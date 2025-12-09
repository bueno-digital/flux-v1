import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getCategoryEmoji, getCategoryLabel, formatDateShort } from '@/lib/utils'

async function getEvents() {
  return prisma.event.findMany({
    orderBy: { date: 'desc' },
    include: { _count: { select: { registrations: true } } },
  })
}

export default async function AdminEventsPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const events = await getEvents()

  return (
    <div className="flex min-h-screen bg-flux-50">
      <AdminSidebar admin={session} />

      <main className="flex-1 p-8">
        <AdminHeader
          title="Eventos"
          description="Gestiona los eventos de la comunidad"
          actions={
            <Link href="/admin/eventos/nuevo">
              <Button variant="primary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nuevo evento
              </Button>
            </Link>
          }
        />

        {/* Events Table */}
        <div className="bg-white rounded-2xl border border-flux-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-flux-100 bg-flux-50">
                  <th className="text-left px-6 py-4 text-sm font-medium text-flux-600">Evento</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-flux-600">Fecha</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-flux-600">Ubicación</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-flux-600">Registros</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-flux-600">Estado</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-flux-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-flux-50 hover:bg-flux-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getCategoryEmoji(event.category)}</span>
                        <div>
                          <div className="font-medium text-flux-900">{event.title}</div>
                          <div className="text-sm text-flux-500">{getCategoryLabel(event.category)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-flux-900">{formatDateShort(event.date)}</div>
                      <div className="text-sm text-flux-500">{event.time}</div>
                    </td>
                    <td className="px-6 py-4 text-flux-600">{event.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-flux-900">{event._count.registrations}</span>
                        {event.capacity && (
                          <span className="text-flux-500">/ {event.capacity}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          event.status === 'active' ? 'sage' :
                          event.status === 'archived' ? 'default' : 'sand'
                        }
                      >
                        {event.status === 'active' ? 'Activo' :
                         event.status === 'archived' ? 'Archivado' : 'Cancelado'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/eventos/${event.id}`}>
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </Link>
                        <Link href={`/eventos/${event.id}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            Ver
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-flux-900 mb-2">No hay eventos</h3>
              <p className="text-flux-500 mb-4">Crea tu primer evento para empezar</p>
              <Link href="/admin/eventos/nuevo">
                <Button variant="primary">Crear evento</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
