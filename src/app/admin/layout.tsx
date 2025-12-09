import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if we're on the login page
  // The layout wraps all admin pages, but login shouldn't require auth
  return <>{children}</>
}

// Middleware-style auth check (for protected pages)
export async function checkAdminAuth() {
  const session = await getSession()
  if (!session) {
    redirect('/admin/login')
  }
  return session
}
