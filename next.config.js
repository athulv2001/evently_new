/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Temporarily disable React Strict Mode for debugging
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/**', // Allow all paths under this hostname
      },
      {
        protocol: 'https',
        hostname: '0fj5hw4b00.ufs.sh',
        pathname: '/**', // Allow all paths under this hostname
      },
    ],
  },
}

module.exports = nextConfig
