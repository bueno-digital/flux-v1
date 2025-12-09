import { NextResponse } from 'next/server'
import { clearSessionCookie } from '@/lib/auth'

export async function POST() {
  try {
    await clearSessionCookie()
    return NextResponse.json({ success: true, message: 'Sesión cerrada' })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al cerrar sesión' },
      { status: 500 }
    )
  }
}
