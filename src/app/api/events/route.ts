import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { eventSchema } from '@/lib/validations'
import { getSession } from '@/lib/auth'

// GET /api/events - Listar eventos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const status = searchParams.get('status') || 'active'
    const upcoming = searchParams.get('upcoming') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')
    const page = parseInt(searchParams.get('page') || '1')

    const where: Record<string, unknown> = {}

    if (category) where.category = category
    if (location) where.location = location
    if (status !== 'all') where.status = status
    if (upcoming) where.date = { gte: new Date() }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { date: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          _count: {
            select: { registrations: true },
          },
        },
      }),
      prisma.event.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener eventos' },
      { status: 500 }
    )
  }
}

// POST /api/events - Crear evento (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validation = eventSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const data = validation.data
    const event = await prisma.event.create({
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
        status: data.status || 'active',
      },
    })

    return NextResponse.json({ success: true, data: event }, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { success: false, error: 'Error al crear evento' },
      { status: 500 }
    )
  }
}
