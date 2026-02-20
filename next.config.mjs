/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
  basePath: isGithubActions ? "/PoloCrypto" : "",
  assetPrefix: isGithubActions ? "/PoloCrypto/" : undefined,
}

export default nextConfig
