/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'your-cdn.com',    
 },
      
    ],
  },
  
experimental: {
    swcMinify: true,
  },
};

export default nextConfig;
