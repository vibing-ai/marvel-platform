const dotenv = require("dotenv");
const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]);

// Load environment variables from a specific file in the parent directory
dotenv.config({ path: "../.env" });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
  
  eslint: {
    ignoreDuringBuilds: true,
  }

};

module.exports = withTM({
  ...nextConfig,
  images: {
    unoptimized: true,
    formats: ["image/webp"],
    domains: [
      "am3pap004files.storage.live.com",
      "onedrive.live.com",
      "firebasestorage.googleapis.com",
      "models.readyplayer.me",
      "images.bannerbear.com",
      "files.stripe.com",
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack(config, { dev, isServer }) {
    config.module.rules.push({
      test: /.svg$/i,
      issuer: /.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }

    return config;
  },
});
