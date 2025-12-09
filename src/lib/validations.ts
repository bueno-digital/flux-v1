import { z } from 'zod'

// Validación para crear/editar eventos
export const eventSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(100),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres').max(1000),
  category: z.string().min(1, 'Selecciona una categoría'),
  date: z.string().min(1, 'Selecciona una fecha'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de hora inválido (HH:MM)'),
  duration: z.number().int().positive().optional().nullable(),
  location: z.string().min(1, 'Selecciona una ubicación'),
  address: z.string().optional().nullable(),
  level: z.string().optional().nullable(),
  capacity: z.number().int().positive().optional().nullable(),
  imageUrl: z.string().url().optional().nullable().or(z.literal('')),
  status: z.enum(['active', 'archived', 'cancelled']).optional(),
})

export type EventInput = z.infer<typeof eventSchema>

// Validación para registro a eventos
export const registrationSchema = z.object({
  eventId: z.string().min(1, 'ID de evento requerido'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  phone: z.string().optional().nullable(),
  notes: z.string().max(500).optional().nullable(),
})

export type RegistrationInput = z.infer<typeof registrationSchema>

// Validación para login admin
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export type LoginInput = z.infer<typeof loginSchema>
