import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/experience",
        destination: "/work",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
