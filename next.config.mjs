/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "209.50.228.90",
      },
      {
        protocol: "https",
        hostname: "209.50.228.90",
      },
      {
        protocol: "https",
        hostname: "alfagrouptech.com",
      },
      {
        protocol: "https",
        hostname: "www.alfagrouptech.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "souq.alfagroup.it.com",
      },
    ],
  },
  experimental: {
    swcMinify: true,
  },
  async headers() {
    const noIndexFollow = [
      { key: "X-Robots-Tag", value: "noindex, follow" },
    ];
    const noIndexNoFollow = [
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ];

    return [
      { source: "/admin/:path*", headers: noIndexNoFollow },
      { source: "/signin", headers: noIndexNoFollow },
      { source: "/signup", headers: noIndexNoFollow },
      { source: "/forgotpassword", headers: noIndexNoFollow },
      { source: "/confirmedemail", headers: noIndexNoFollow },
      { source: "/email-failed", headers: noIndexNoFollow },
      { source: "/user/cart/:path*", headers: noIndexNoFollow },
      { source: "/user/profile/:path*", headers: noIndexNoFollow },
      { source: "/user/wishlist/:path*", headers: noIndexNoFollow },
      { source: "/user/ordershistory/:path*", headers: noIndexNoFollow },
      { source: "/user/orderdetails/:path*", headers: noIndexNoFollow },
      { source: "/user/returnorders/:path*", headers: noIndexNoFollow },
      { source: "/user/returnorderdetails/:path*", headers: noIndexNoFollow },
      { source: "/__reviews-preview/:path*", headers: noIndexNoFollow },
      { source: "/user/search/:path*", headers: noIndexFollow },
      { source: "/user/products/section/:path*", headers: noIndexFollow },
    ];
  },
};

export default nextConfig;
