
/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: [ '10.78.199.1'],
  },
experimental: {
    swcMinify: true,
  },
};

export default nextConfig;
