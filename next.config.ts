import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Since this is a user GitHub Pages site (username.github.io), no basePath needed
  // For project pages, you would use basePath: '/repository-name'
};

export default nextConfig;
