/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '/',
  },
}

module.exports = nextConfig
