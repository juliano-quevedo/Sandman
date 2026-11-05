import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/politica-de-privacidade.html',
        destination: '/politica-de-privacidade',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
