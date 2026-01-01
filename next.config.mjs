
/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: [ '10.53.3.1'],
  },
experimental: {
    swcMinify: true,
  },
};

export default nextConfig;
