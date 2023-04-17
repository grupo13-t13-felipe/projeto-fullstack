/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com", "cdn.appdealersites.com.br"],
    formats: ["image/webp"]
  }
}

module.exports = nextConfig
