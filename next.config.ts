import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // First-party image proxy: app/api/image serves external images from our origin
  // so ad blockers (which block third-party image domains) do not affect article thumbnails.
  async headers() {
    return [
      {
        source: "/api/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
