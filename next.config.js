/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:slug((?!coming-soon).*)',
        destination: '/coming-soon',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
