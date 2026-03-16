import type { NextConfig } from "next";

const repoName = "sarava-radio-streaming";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: `/${repoName}`,
  },
};

export default nextConfig;
