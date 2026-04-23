
/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname:"209.50.228.90",
      },
    ],
  },
  experimental: {
    swcMinify: true,
  },
};

export default nextConfig;