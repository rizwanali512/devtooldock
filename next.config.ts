import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/category/developer-utilities",
        destination: "/developer-utilities",
        permanent: true,
      },
      {
        // Legacy category slug; the real hub page is /text-tools
        source: "/category/text-tools",
        destination: "/text-tools",
        permanent: true,
      },
      {
        source: "/tools/:tool",
        destination: "/:tool",
        permanent: true,
      },
      {
        source: "/legal-tools/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
