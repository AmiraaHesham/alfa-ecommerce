
/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname:"192.168.1.33",
      },
    ],
  },
  experimental: {
    swcMinify: true,
  },
};

export default nextConfig;