import type { NextConfig } from "next";
import os from "node:os";

/**
 * Hostnames allowed to request `/_next/*` in development (Next.js 15+).
 * Without this, opening the dev server via a LAN IP (e.g. http://192.168.x.x:3000)
 * can 404 `/_next/static/css/app/layout.css` and spam the terminal.
 */
function devAllowedOrigins(): string[] {
  const set = new Set<string>(["devtooldock.com", "www.devtooldock.com"]);
  for (const entries of Object.values(os.networkInterfaces())) {
    if (!entries) continue;
    for (const e of entries) {
      if (e.internal || e.family !== "IPv4") continue;
      set.add(e.address);
    }
  }
  const extra = process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const h of extra ?? []) set.add(h);
  return [...set];
}

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV !== "production"
    ? { allowedDevOrigins: devAllowedOrigins() }
    : {}),
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
        source: "/blog/how-to-format-json",
        destination: "/blog/how-to-format-json-online",
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
