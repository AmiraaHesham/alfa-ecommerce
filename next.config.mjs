
/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname:"localhost",
      },
    ],
  },
  experimental: {
    swcMinify: true,
  },
};

export default nextConfig;