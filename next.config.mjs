/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = 'eval-source-map';
    }
    return config;
  },
  rewrites: () => [
    { source: '/api/:path*', destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*` },
    { source: '/map-api/:path*', destination: `${process.env.NEXT_PUBLIC_API_URL}/map-api/:path*` },
    {
      source: '/mesoor-space/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/mesoor-space/:path*`,
    },
    {
      source: '/agent-api/:path*',
      destination: `https://agent.mesoor.com/:path*`,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_HOST,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-fe.mesoor.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
