/** @type {import('next').NextConfig} */
const nextConfig = {
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
