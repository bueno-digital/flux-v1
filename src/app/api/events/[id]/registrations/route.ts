import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/events/[id]/registrations - Obtener registros de un evento (admin only)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = await params
    const registrations = await prisma.registration.findMany({
      where: { eventId: id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: registrations })
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener registros' },
      { status: 500 }
    )
  }
}
