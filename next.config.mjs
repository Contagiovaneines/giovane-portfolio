/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production"
const enableStrictTransport = process.env.ENABLE_STRICT_TRANSPORT === "true"

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.github.com https://api.open-meteo.com https://geocoding-api.open-meteo.com",
  "frame-src 'self' https://open.spotify.com",
  "worker-src 'self' blob:",
  "media-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
  ...(isProduction && enableStrictTransport ? ["upgrade-insecure-requests"] : []),
].join("; ")

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(self), geolocation=(self), microphone=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
]

if (isProduction && enableStrictTransport) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  })
}

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
