import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.cache = false; // Disable Webpack caching
    return config;
  },
};

export default nextConfig;
