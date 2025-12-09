'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { CATEGORIES, LOCATIONS } from '@/lib/utils'

export function EventFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category') || ''
  const currentLocation = searchParams.get('location') || ''

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/eventos?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/eventos')
  }

  const hasFilters = currentCategory || currentLocation

  return (
    <div className="bg-white rounded-2xl border border-flux-100 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Category Filter */}
        <div className="flex-1">
          <label htmlFor="category" className="block text-sm font-medium text-flux-700 mb-1.5">
            Categoría
          </label>
          <select
            id="category"
            value={currentCategory}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full px-4 py-2.5 bg-flux-50 border border-flux-200 rounded-xl text-flux-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
          >
            <option value="">Todas las categorías</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex-1">
          <label htmlFor="location" className="block text-sm font-medium text-flux-700 mb-1.5">
            Ubicación
          </label>
          <select
            id="location"
            value={currentLocation}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="w-full px-4 py-2.5 bg-flux-50 border border-flux-200 rounded-xl text-flux-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
          >
            <option value="">Todas las ubicaciones</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2.5 text-flux-600 hover:text-flux-900 hover:bg-flux-100 rounded-xl transition-colors text-sm font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Category Pills (Mobile friendly) */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => updateFilter('category', '')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !currentCategory
              ? 'bg-sage-600 text-white'
              : 'bg-flux-100 text-flux-600 hover:bg-flux-200'
          }`}
        >
          Todos
        </button>
        {CATEGORIES.slice(0, 6).map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateFilter('category', cat.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              currentCategory === cat.id
                ? 'bg-sage-600 text-white'
                : 'bg-flux-100 text-flux-600 hover:bg-flux-200'
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}
