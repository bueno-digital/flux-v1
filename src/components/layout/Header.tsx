'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-flux-50/80 backdrop-blur-md border-b border-flux-100">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sage-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="font-display font-semibold text-xl text-flux-900">Flux</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/eventos" className="text-flux-600 hover:text-flux-900 transition-colors">
            Eventos
          </Link>
          <Link href="/#about" className="text-flux-600 hover:text-flux-900 transition-colors">
            Sobre nosotros
          </Link>
          <Link href="/#activities" className="text-flux-600 hover:text-flux-900 transition-colors">
            Actividades
          </Link>
          <Link href="/eventos">
            <Button variant="primary" size="sm">
              Ver eventos
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-flux-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-flux-100 px-4 py-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/eventos"
              className="text-flux-700 hover:text-flux-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link
              href="/#about"
              className="text-flux-700 hover:text-flux-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre nosotros
            </Link>
            <Link
              href="/#activities"
              className="text-flux-700 hover:text-flux-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Actividades
            </Link>
            <Link href="/eventos" onClick={() => setIsMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                Ver eventos
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
