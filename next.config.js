/** @type {import('next').NextConfig} */
const dotenvLoad = require('dotenv-load');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withPWA = require('next-pwa');
dotenvLoad(process.env.NODE_ENV ?? 'development');

const nextConfig = {
  webpack5: true,
  eslint: {
    dirs: ['.']
  },
  basePath: '',
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  trailingSlash: true,
  poweredByHeader: false,
  env: {
    NEXT_SITE_URL: process.env.NEXT_SITE_URL || 'http://localhost:3000'
  },
  devIndicators: {
    autoPrerender: false
  },
  pwa: {
    disable: process.env.NODE_ENV === 'production' ? false : true,
    dest: 'public',
    register: true,
    skipWaiting: true
  },

  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions.poll = 1000;
      config.watchOptions.aggregateTimeout = 300;
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};

module.exports = withBundleAnalyzer(withPWA(nextConfig));
