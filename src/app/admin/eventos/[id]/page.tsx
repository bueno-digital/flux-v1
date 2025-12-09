'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { CATEGORIES, LOCATIONS, LEVELS, formatDate } from '@/lib/utils'
import type { Event, Registration } from '@/types'

interface Props {
  params: Promise<{ id: string }>
}

export default function EditEventPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [event, setEvent] = useState<Event | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    address: '',
    level: '',
    capacity: '',
    status: 'active',
  })

  useEffect(() => {
    fetchEvent()
    fetchRegistrations()
  }, [id])

  const fetchEvent = async () => {
    const res = await fetch(`/api/events/${id}`)
    const data = await res.json()
    if (data.success) {
      setEvent(data.data)
      const e = data.data
      setFormData({
        title: e.title,
        description: e.description,
        category: e.category,
        date: new Date(e.date).toISOString().split('T')[0],
        time: e.time,
        duration: e.duration?.toString() || '',
        location: e.location,
        address: e.address || '',
        level: e.level || '',
        capacity: e.capacity?.toString() || '',
        status: e.status,
      })
    }
  }

  const fetchRegistrations = async () => {
    const res = await fetch(`/api/events/${id}/registrations`)
    const data = await res.json()
    if (data.success) {
      setRegistrations(data.data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          duration: formData.duration ? parseInt(formData.duration) : null,
          capacity: formData.capacity ? parseInt(formData.capacity) : null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al actualizar evento')
      }

      router.push('/admin/eventos')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar evento')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.')) {
      return
    }

    setDeleting(true)

    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al eliminar evento')
      }

      router.push('/admin/eventos')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar evento')
      setDeleting(false)
    }
  }

  const handleDeleteRegistration = async (regId: string) => {
    if (!confirm('¿Eliminar este registro?')) return

    try {
      await fetch(`/api/registrations/${regId}`, { method: 'DELETE' })
      fetchRegistrations()
    } catch (err) {
      console.error(err)
    }
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-flux-50 flex items-center justify-center">
        <div className="animate-pulse text-flux-500">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-flux-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-display font-semibold text-flux-900">
              Editar evento
            </h1>
            <Button variant="outline" onClick={handleDelete} loading={deleting} className="text-red-600 hover:bg-red-50">
              Eliminar
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-flux-100 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Título del evento *"
                  id="title"
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
                    required
                  />

                  <Select
                    label="Ubicación *"
                    id="location"
                    options={LOCATIONS.map(l => ({ value: l, label: l }))}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <Input
                  label="Dirección específica"
                  id="address"
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
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Select
                    label="Nivel"
                    id="level"
                    options={LEVELS.map(l => ({ value: l.id, label: l.label }))}
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  />

                  <Input
                    label="Plazas"
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  />

                  <Select
                    label="Estado *"
                    id="status"
                    options={[
                      { value: 'active', label: 'Activo' },
                      { value: 'archived', label: 'Archivado' },
                      { value: 'cancelled', label: 'Cancelado' },
                    ]}
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl">
                    {error}
                  </div>
                )}

                <Button type="submit" variant="primary" loading={loading} className="w-full">
                  Guardar cambios
                </Button>
              </form>
            </div>
          </div>

          {/* Registrations */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-flux-100 p-6">
              <h2 className="text-lg font-display font-medium text-flux-900 mb-4">
                Registros ({registrations.length})
              </h2>

              {registrations.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {registrations.map((reg) => (
                    <div
                      key={reg.id}
                      className="flex items-center justify-between p-3 bg-flux-50 rounded-xl"
                    >
                      <div>
                        <div className="font-medium text-flux-900 text-sm">{reg.name}</div>
                        <div className="text-xs text-flux-500">{reg.email}</div>
                        {reg.phone && <div className="text-xs text-flux-400">{reg.phone}</div>}
                      </div>
                      <button
                        onClick={() => handleDeleteRegistration(reg.id)}
                        className="text-flux-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-flux-500 text-sm text-center py-4">
                  No hay registros aún
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
