import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
