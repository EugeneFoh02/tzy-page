import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'], // Add Google's profile image domain here
  },
  /* other config options here */
};

export default nextConfig;
