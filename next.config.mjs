/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // wildcard: matches any HTTPS hostname
      },
    ],
  },
};

export default nextConfig;