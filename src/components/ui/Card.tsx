import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-flux-100 overflow-hidden ${
        hover ? 'transition-shadow hover:shadow-md' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`p-6 border-b border-flux-100 ${className}`}>{children}</div>
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}
