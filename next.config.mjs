
/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: [ '10.142.64.1'],
  },
experimental: {
    swcMinify: true,
  },
};

export default nextConfig;
