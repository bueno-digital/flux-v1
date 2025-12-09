import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

// GET /api/stats - Estadísticas del dashboard (admin only)
export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const now = new Date()

    const [
      totalEvents,
      activeEvents,
      upcomingEvents,
      totalRegistrations,
      recentRegistrations,
    ] = await Promise.all([
      prisma.event.count(),
      prisma.event.count({ where: { status: 'active' } }),
      prisma.event.count({ where: { status: 'active', date: { gte: now } } }),
      prisma.registration.count(),
      prisma.registration.count({
        where: {
          createdAt: {
            gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // últimos 7 días
          },
        },
      }),
    ])

    // Registros por categoría
    const registrationsByCategory = await prisma.event.findMany({
      where: { status: 'active' },
      select: {
        category: true,
        _count: { select: { registrations: true } },
      },
    })

    const categoryStats = registrationsByCategory.reduce(
      (acc, event) => {
        acc[event.category] = (acc[event.category] || 0) + event._count.registrations
        return acc
      },
      {} as Record<string, number>
    )

    return NextResponse.json({
      success: true,
      data: {
        totalEvents,
        activeEvents,
        upcomingEvents,
        totalRegistrations,
        recentRegistrations,
        categoryStats,
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener estadísticas' },
      { status: 500 }
    )
  }
}
