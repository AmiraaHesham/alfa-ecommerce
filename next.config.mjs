
/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: [ '10.65.77.1'],
  },
experimental: {
    swcMinify: true,
  },
};

export default nextConfig;
