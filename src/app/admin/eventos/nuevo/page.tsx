'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { CATEGORIES, LOCATIONS, LEVELS } from '@/lib/utils'

export default function NewEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '10:00',
    duration: '',
    location: '',
    address: '',
    level: '',
    capacity: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          duration: formData.duration ? parseInt(formData.duration) : null,
          capacity: formData.capacity ? parseInt(formData.capacity) : null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al crear evento')
      }

      router.push('/admin/eventos')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear evento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-flux-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/eventos"
            className="text-flux-500 hover:text-flux-700 transition-colors inline-flex items-center gap-2 mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a eventos
          </Link>
          <h1 className="text-3xl font-display font-semibold text-flux-900">
            Nuevo evento
          </h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-flux-100 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Título del evento *"
              id="title"
              placeholder="Ej: Running Club - Ruta del río"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-flux-700 mb-1.5">
                Descripción *
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-flux-200 rounded-xl text-flux-900 placeholder-flux-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe el evento, qué incluye, qué llevar..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Select
                label="Categoría *"
                id="category"
                options={CATEGORIES.map(c => ({ value: c.id, label: `${c.emoji} ${c.label}` }))}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Selecciona categoría"
                required
              />

              <Select
                label="Ubicación *"
                id="location"
                options={LOCATIONS.map(l => ({ value: l, label: l }))}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Selecciona ubicación"
                required
              />
            </div>

            <Input
              label="Dirección específica (opcional)"
              id="address"
              placeholder="Ej: Parc Central, junto a la fuente"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />

            <div className="grid md:grid-cols-3 gap-6">
              <Input
                label="Fecha *"
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />

              <Input
                label="Hora *"
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />

              <Input
                label="Duración (min)"
                id="duration"
                type="number"
                placeholder="60"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Select
                label="Nivel (opcional)"
                id="level"
                options={LEVELS.map(l => ({ value: l.id, label: l.label }))}
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                placeholder="Selecciona nivel"
              />

              <Input
                label="Plazas disponibles"
                id="capacity"
                type="number"
                placeholder="Sin límite"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl">
                {error}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Link href="/admin/eventos" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" variant="primary" loading={loading} className="flex-1">
                Crear evento
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
