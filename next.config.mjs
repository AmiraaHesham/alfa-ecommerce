
/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: [ '10.13.110.1'],
  },
experimental: {
    swcMinify: true,
  },
};

export default nextConfig;
