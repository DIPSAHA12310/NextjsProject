
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/NextjsProject",

  trailingSlash: true,

  experimental: {
    agentFeedback: true,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
        pathname: "/**",
      },
    ],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
