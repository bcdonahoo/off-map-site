import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/stack',
        destination: '/approach',
        permanent: true,
      },
      {
        source: '/services/gtm-stack',
        destination: '/services/sprint',
        permanent: true,
      },
      {
        source: '/services/managed-retainer',
        destination: '/services/fractional',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
