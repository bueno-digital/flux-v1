// Tipo para valores de clase CSS
type ClassValue = string | number | boolean | undefined | null | ClassValue[]

// Combinar clases CSS (implementación simple sin dependencias)
export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter((x) => typeof x === 'string' && x.length > 0)
    .join(' ')
}

// Formatear fecha en español
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Formatear fecha corta
export function formatDateShort(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  })
}

// Formatear hora
export function formatTime(time: string): string {
  return time
}

// Capitalizar primera letra
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Slugify
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

// Pluralizar
export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}

// Categorías disponibles
export const CATEGORIES = [
  { id: 'running', label: 'Running', emoji: '🏃' },
  { id: 'yoga', label: 'Yoga', emoji: '🧘' },
  { id: 'padel', label: 'Pádel', emoji: '🎾' },
  { id: 'mindfulness', label: 'Mindfulness', emoji: '🧠' },
  { id: 'social', label: 'Social', emoji: '☕' },
  { id: 'nature', label: 'Naturaleza', emoji: '🏔️' },
  { id: 'workout', label: 'Entrenamiento', emoji: '💪' },
  { id: 'swimming', label: 'Natación', emoji: '🏊' },
  { id: 'cycling', label: 'Ciclismo', emoji: '🚴' },
] as const

// Niveles disponibles
export const LEVELS = [
  { id: 'todos', label: 'Todos los niveles' },
  { id: 'principiante', label: 'Principiante' },
  { id: 'intermedio', label: 'Intermedio' },
  { id: 'avanzado', label: 'Avanzado' },
] as const

// Ubicaciones en Andorra
export const LOCATIONS = [
  'Andorra la Vella',
  'Escaldes-Engordany',
  'La Massana',
  'Ordino',
  'Canillo',
  'Encamp',
  'Sant Julià de Lòria',
] as const

// Obtener emoji de categoría
export function getCategoryEmoji(category: string): string {
  return CATEGORIES.find(c => c.id === category)?.emoji || '📌'
}

// Obtener label de categoría
export function getCategoryLabel(category: string): string {
  return CATEGORIES.find(c => c.id === category)?.label || category
}
