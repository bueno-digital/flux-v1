'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface RegistrationFormProps {
  eventId: string
  eventTitle: string
  isFull: boolean
}

export function RegistrationForm({ eventId, eventTitle, isFull }: RegistrationFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          ...formData,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al registrarse')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-sage-50 rounded-2xl p-6 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-display font-medium text-sage-800 mb-2">
          ¡Te has registrado!
        </h3>
        <p className="text-sage-600 mb-4">
          Nos vemos en <strong>{eventTitle}</strong>. Recibirás un recordatorio por email.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Volver al evento
        </Button>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div className="bg-white rounded-2xl border border-flux-100 p-6">
        <h3 className="text-lg font-display font-medium text-flux-900 mb-2">
          ¿Te apuntas?
        </h3>
        <p className="text-flux-600 text-sm mb-4">
          Reserva tu plaza y forma parte de la comunidad Flux.
        </p>
        <Button
          onClick={() => setIsOpen(true)}
          variant="primary"
          className="w-full"
          disabled={isFull}
        >
          {isFull ? 'Evento completo' : 'Reservar plaza'}
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-flux-100 p-6">
      <h3 className="text-lg font-display font-medium text-flux-900 mb-4">
        Reservar plaza
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre *"
          id="name"
          type="text"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <Input
          label="Email *"
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <Input
          label="Teléfono (opcional)"
          id="phone"
          type="tel"
          placeholder="+376 123 456"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="flex-1"
          >
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  )
}
