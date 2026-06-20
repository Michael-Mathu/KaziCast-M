import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/profile",
        destination: "/dashboard/profile",
        permanent: true,
      },
      {
        source: "/profile/edit",
        destination: "/dashboard/profile",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
