import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flux - Comunidad de Bienestar en Andorra',
  description: 'Únete a Flux, la comunidad de bienestar y conexión en Andorra. Running clubs, yoga, naturaleza, y más.',
  keywords: ['bienestar', 'andorra', 'comunidad', 'running', 'yoga', 'wellness', 'fitness'],
  openGraph: {
    title: 'Flux - Comunidad de Bienestar en Andorra',
    description: 'Únete a Flux, la comunidad de bienestar y conexión en Andorra.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
