import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'sage' | 'sand' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-flux-100 text-flux-700',
    sage: 'bg-sage-100 text-sage-700',
    sand: 'bg-sand-100 text-sand-700',
    outline: 'border border-flux-300 text-flux-600',
  }

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}
