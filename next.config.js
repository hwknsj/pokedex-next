/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponents: true,
    optimizeCss: false
  },
  compress: false,
  typescript: {
    ignoreBuildErrors: true
  },
  // enableTelemetry: false,
  poweredByHeader: false
}

module.exports = nextConfig
