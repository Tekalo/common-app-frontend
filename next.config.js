/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: "experimental-edge",
  },
  images: {
    loader: "custom",
    loaderFile: "./src/shared/NextImageLoader.js",
  },
};

module.exports = nextConfig;
