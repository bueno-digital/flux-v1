'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al iniciar sesión')
      }

      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-flux-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-sage-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h1 className="text-2xl font-display font-semibold text-flux-900">
            Panel de Administración
          </h1>
          <p className="text-flux-500 mt-2">Flux - Comunidad de Bienestar</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl border border-flux-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="admin@flux.ad"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Contraseña"
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" loading={loading} className="w-full">
              Iniciar sesión
            </Button>
          </form>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-sage-50 rounded-xl text-center">
          <p className="text-sm text-sage-700">
            <strong>Demo:</strong> admin@flux.ad / flux2024
          </p>
        </div>
      </div>
    </div>
  )
}
