import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { Badge } from '@/components/ui/Badge'
import { formatDateShort } from '@/lib/utils'

async function getRegistrations() {
  return prisma.registration.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      event: {
        select: { title: true, date: true, time: true },
      },
    },
  })
}

export default async function AdminRegistrationsPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const registrations = await getRegistrations()

  return (
    <div className="flex min-h-screen bg-flux-50">
      <AdminSidebar admin={session} />

      <main className="flex-1 p-8">
        <AdminHeader
          title="Registros"
          description="Todos los registros a eventos de la comunidad"
        />

        {/* Registrations Table */}
        <div className="bg-white rounded-2xl border border-flux-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-flux-100 bg-flux-50">
                  <th className="text-left px-6 py-4 text-sm font-medium text-flux-600">Participante</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-flux-600">Contacto</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-flux-600">Evento</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-flux-600">Fecha evento</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-flux-600">Registro</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-flux-600">Estado</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-flux-50 hover:bg-flux-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-flux-100 rounded-full flex items-center justify-center">
                          <span className="text-flux-600 font-medium">
                            {reg.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="font-medium text-flux-900">{reg.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-flux-900 text-sm">{reg.email}</div>
                      {reg.phone && <div className="text-flux-500 text-xs">{reg.phone}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-flux-900">{reg.event.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-flux-900">{formatDateShort(reg.event.date)}</div>
                      <div className="text-sm text-flux-500">{reg.event.time}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-flux-500">
                      {new Date(reg.createdAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          reg.status === 'confirmed' ? 'sage' :
                          reg.status === 'waitlist' ? 'sand' : 'default'
                        }
                      >
                        {reg.status === 'confirmed' ? 'Confirmado' :
                         reg.status === 'waitlist' ? 'Lista espera' : 'Cancelado'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {registrations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-flux-900 mb-2">No hay registros</h3>
              <p className="text-flux-500">Los registros aparecerán aquí cuando los usuarios se apunten a eventos</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
