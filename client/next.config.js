/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
    formats: ["image/webp", "encrypted-tbn0.gstatic.com"]
  }
}

module.exports = nextConfig
