const dotenv = require('dotenv');
const withTM = require('next-transpile-modules')(['react-syntax-highlighter']);

// Load environment variables from a specific file in the parent directory
dotenv.config({ path: '../.env' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
};

module.exports = withTM({
  ...nextConfig,
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    domains: [
      'am3pap004files.storage.live.com',
      'onedrive.live.com',
      'firebasestorage.googleapis.com',
      'models.readyplayer.me',
      'images.bannerbear.com',
      'files.stripe.com',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /.svg$/i,
      issuer: /.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
