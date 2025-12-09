import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { formatDateShort, getCategoryEmoji, getCategoryLabel } from '@/lib/utils'
import type { Event } from '@/types'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const spotsLeft = event.capacity
    ? event.capacity - (event._count?.registrations || 0)
    : null

  const isFull = spotsLeft !== null && spotsLeft <= 0

  return (
    <Link href={`/eventos/${event.id}`} className="group block">
      <article className="bg-white rounded-2xl border border-flux-100 overflow-hidden hover:shadow-lg hover:border-sage-200 transition-all duration-300">
        {/* Header with category color */}
        <div className="relative h-32 bg-gradient-to-br from-sage-50 to-sand-50 flex items-center justify-center">
          <span className="text-5xl">{getCategoryEmoji(event.category)}</span>

          {/* Date badge */}
          <div className="absolute top-4 left-4 bg-white rounded-xl px-3 py-2 text-center shadow-sm">
            <div className="text-xs text-flux-500 uppercase">
              {new Date(event.date).toLocaleDateString('es-ES', { weekday: 'short' })}
            </div>
            <div className="text-lg font-semibold text-flux-900">
              {formatDateShort(event.date)}
            </div>
          </div>

          {/* Status badges */}
          <div className="absolute top-4 right-4 flex gap-2">
            {isFull && (
              <Badge variant="sand" size="sm">Completo</Badge>
            )}
            {spotsLeft !== null && spotsLeft > 0 && spotsLeft <= 5 && (
              <Badge variant="sage" size="sm">{spotsLeft} plazas</Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" size="sm">{getCategoryLabel(event.category)}</Badge>
            {event.level && (
              <Badge variant="default" size="sm">{event.level}</Badge>
            )}
          </div>

          <h3 className="text-lg font-display font-medium text-flux-900 mb-2 group-hover:text-sage-700 transition-colors">
            {event.title}
          </h3>

          <p className="text-flux-500 text-sm line-clamp-2 mb-4">
            {event.description}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-flux-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
