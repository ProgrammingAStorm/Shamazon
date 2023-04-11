/** @type {import('next').NextConfig} */
const rewrites = () => {
  return [
    {
      source: "/graphql/:path*",
      destination: "https://localhost:7088/grapgql/:path*",
    },
  ];
};

const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '/',
  },
  //output: "export",
  rewrites
}

module.exports = nextConfig
