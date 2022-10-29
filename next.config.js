/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    URL_BACKEND: "https://fazzpay-rose.vercel.app",
    URL_CLOUDINARY:
      "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
