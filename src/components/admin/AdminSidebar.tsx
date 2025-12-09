'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { AdminPayload } from '@/lib/auth'

interface AdminSidebarProps {
  admin: AdminPayload
}

export function AdminSidebar({ admin }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const links = [
    { href: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/admin/eventos', label: 'Eventos', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { href: '/admin/registros', label: 'Registros', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-flux-100 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-flux-100">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sage-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <div>
            <div className="font-display font-semibold text-flux-900">Flux</div>
            <div className="text-xs text-flux-500">Panel Admin</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-sage-100 text-sage-700'
                      : 'text-flux-600 hover:bg-flux-50 hover:text-flux-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                  </svg>
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-flux-100">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 bg-flux-200 rounded-full flex items-center justify-center">
            <span className="text-flux-600 font-medium">
              {admin.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-flux-900 truncate">{admin.name}</div>
            <div className="text-xs text-flux-500 truncate">{admin.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-flux-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
