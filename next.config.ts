import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  middleware: true, // Enable middleware
  crossOrigin: 'anonymous',
};

export default nextConfig;
