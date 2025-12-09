import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'flux-default-secret-change-me'
)

export interface AdminPayload {
  id: string
  email: string
  name: string
  role: string
}

export async function signToken(payload: AdminPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as AdminPayload
  } catch {
    return null
  }
}

export async function getSession(): Promise<AdminPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('flux-admin-token')?.value

  if (!token) return null

  return verifyToken(token)
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('flux-admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: '/',
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('flux-admin-token')
}
