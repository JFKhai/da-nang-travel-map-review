import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tophomestay.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'benduthuyendanang.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.vietfuntravel.com.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
