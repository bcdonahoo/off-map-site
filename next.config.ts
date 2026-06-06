import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/legal',
        destination: '/',
        permanent: true,
      },
      {
        source: '/stack',
        destination: '/approach',
        permanent: true,
      },
      // Retired offerings — redirect to closest current equivalent
      {
        source: '/services/audit',
        destination: '/book',
        permanent: false,
      },
      {
        source: '/services/sprint',
        destination: '/book',
        permanent: false,
      },
      // Legacy slug redirects kept in case of inbound links
      {
        source: '/services/gtm-stack',
        destination: '/book',
        permanent: true,
      },
      {
        source: '/services/managed-retainer',
        destination: '/book',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
