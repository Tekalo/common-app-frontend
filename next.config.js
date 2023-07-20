/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: 'src/lib/imageLoader.ts',
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/sign-up',
        destination: '/sign-up/applicants',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
