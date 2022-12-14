/** @type {import('next').NextConfig} */
const dotenvLoad = require('dotenv-load');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withPWA = require('next-pwa');
dotenvLoad(process.env.NODE_ENV ?? 'development');

const nextConfig = {
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
  }
};

module.exports = withBundleAnalyzer(withPWA(nextConfig));
