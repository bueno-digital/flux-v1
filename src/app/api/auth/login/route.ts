import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken, setSessionCookie } from '@/lib/auth'
import { loginSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = loginSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, password } = validation.data

    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    const validPassword = await bcrypt.compare(password, admin.password)

    if (!validPassword) {
      return NextResponse.json(
        { success: false, error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    const token = await signToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    })

    await setSessionCookie(token)

    return NextResponse.json({
      success: true,
      data: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al iniciar sesión' },
      { status: 500 }
    )
  }
}
