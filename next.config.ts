import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  turbopack: {},

  experimental: {
    webpackBuildWorker: true,
  },
};

export default nextConfig;
