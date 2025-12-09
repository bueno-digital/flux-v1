import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { registrationSchema } from '@/lib/validations'
import { getSession } from '@/lib/auth'

// GET /api/registrations - Listar todos los registros (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('eventId')
    const limit = parseInt(searchParams.get('limit') || '100')

    const where: Record<string, unknown> = {}
    if (eventId) where.eventId = eventId

    const registrations = await prisma.registration.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        event: {
          select: { title: true, date: true },
        },
      },
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

// POST /api/registrations - Registrarse a un evento (público)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = registrationSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const data = validation.data

    // Verificar que el evento existe y está activo
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
      include: { _count: { select: { registrations: true } } },
    })

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Evento no encontrado' },
        { status: 404 }
      )
    }

    if (event.status !== 'active') {
      return NextResponse.json(
        { success: false, error: 'Este evento ya no está disponible' },
        { status: 400 }
      )
    }

    // Verificar capacidad
    if (event.capacity && event._count.registrations >= event.capacity) {
      return NextResponse.json(
        { success: false, error: 'El evento está completo' },
        { status: 400 }
      )
    }

    // Verificar si ya está registrado
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        eventId_email: {
          eventId: data.eventId,
          email: data.email,
        },
      },
    })

    if (existingRegistration) {
      return NextResponse.json(
        { success: false, error: 'Ya estás registrado en este evento' },
        { status: 400 }
      )
    }

    // Crear registro
    const registration = await prisma.registration.create({
      data: {
        eventId: data.eventId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        notes: data.notes,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: registration,
        message: '¡Te has registrado correctamente!',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating registration:', error)
    return NextResponse.json(
      { success: false, error: 'Error al registrarse' },
      { status: 500 }
    )
  }
}
