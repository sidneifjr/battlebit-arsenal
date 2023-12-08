/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  skipWaiting: true,
  register: true,
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = withPWA(nextConfig)
