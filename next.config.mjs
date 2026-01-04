
/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: [ '10.252.72.1'],
  },
experimental: {
    swcMinify: true,
  },
};

export default nextConfig;
