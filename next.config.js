/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["ipfs.moralis.io"],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
