/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preparado para futuras imágenes externas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
