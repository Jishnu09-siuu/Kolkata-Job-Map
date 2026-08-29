/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevents double mount effects with Leaflet in dev
  images: {
    domains: ['images.unsplash.com', 'logo.clearbit.com', 'raw.githubusercontent.com'],
  },
};

module.exports = nextConfig;
