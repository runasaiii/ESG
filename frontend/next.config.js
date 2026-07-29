/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async rewrites() {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn(
        '[next.config.js] WARNING: NEXT_PUBLIC_API_URL is not set. ' +
        'Falling back to http://localhost:8000 — API calls will fail unless the backend is reachable there.'
      );
    }
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/:path*`,
      },
    ];
  },
}

module.exports = nextConfig