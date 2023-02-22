/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./src/shared/NextImageLoader.tsx",
  },
};

module.exports = nextConfig;
