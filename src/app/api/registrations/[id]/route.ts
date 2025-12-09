import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// DELETE /api/registrations/[id] - Eliminar registro (admin only)
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
    await prisma.registration.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'Registro eliminado' })
  } catch (error) {
    console.error('Error deleting registration:', error)
    return NextResponse.json(
      { success: false, error: 'Error al eliminar registro' },
      { status: 500 }
    )
  }
}

// PATCH /api/registrations/[id] - Actualizar estado del registro (admin only)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
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
    const { status } = body

    if (!['confirmed', 'cancelled', 'waitlist'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Estado inválido' },
        { status: 400 }
      )
    }

    const registration = await prisma.registration.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({ success: true, data: registration })
  } catch (error) {
    console.error('Error updating registration:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar registro' },
      { status: 500 }
    )
  }
}
