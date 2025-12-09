import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { eventSchema } from '@/lib/validations'
import { getSession } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/events/[id] - Obtener evento por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    })

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Evento no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: event })
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener evento' },
      { status: 500 }
    )
  }
}

// PUT /api/events/[id] - Actualizar evento (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const validation = eventSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const data = validation.data
    const event = await prisma.event.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        date: new Date(data.date),
        time: data.time,
        duration: data.duration,
        location: data.location,
        address: data.address,
        level: data.level,
        capacity: data.capacity,
        imageUrl: data.imageUrl || null,
        status: data.status,
      },
    })

    return NextResponse.json({ success: true, data: event })
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar evento' },
      { status: 500 }
    )
  }
}

// DELETE /api/events/[id] - Eliminar evento (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = await params
    await prisma.event.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'Evento eliminado' })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { success: false, error: 'Error al eliminar evento' },
      { status: 500 }
    )
  }
}
