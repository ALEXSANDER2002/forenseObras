/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mapa-da-obra-producao.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'www.sydle.com',
      },
      {
        protocol: 'https',
        hostname: 'ctcinfra.com.br',
      },
    ],
  },
}

export default nextConfig
