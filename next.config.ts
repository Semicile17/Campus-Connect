/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  // If you're using static generation
  output: 'standalone', // or 'export' for static sites
}

module.exports = nextConfig