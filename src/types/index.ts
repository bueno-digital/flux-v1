// Tipos compartidos para Flux

export interface Event {
  id: string
  title: string
  description: string
  category: string
  date: string | Date
  time: string
  duration: number | null
  location: string
  address: string | null
  level: string | null
  capacity: number | null
  imageUrl: string | null
  status: 'active' | 'archived' | 'cancelled'
  createdAt: string | Date
  updatedAt: string | Date
  registrations?: Registration[]
  _count?: {
    registrations: number
  }
}

export interface Registration {
  id: string
  eventId: string
  name: string
  email: string
  phone: string | null
  notes: string | null
  status: 'confirmed' | 'cancelled' | 'waitlist'
  createdAt: string | Date
  event?: Event
}

export interface Admin {
  id: string
  email: string
  name: string
  role: 'admin' | 'superadmin'
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Filter types
export interface EventFilters {
  category?: string
  location?: string
  date?: string
  status?: string
}
