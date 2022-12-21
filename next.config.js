/** @type {import('next').NextConfig} */
const dotenvLoad = require('dotenv-load');
const withImages = require('next-images');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withPWA = require('next-pwa');
dotenvLoad(process.env.NODE_ENV ?? 'development');

const nextConfig = {
  eslint: {
    dirs: ['.']
  },
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  trailingSlash: true,
  poweredByHeader: false,
  experimental: {
    emotion: true
  },
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
  // compiler: {
  //   emotion:
  //     boolean |
  // {
  //? default is true. It will be disabled when build type is production.
  // sourceMap: boolean,
  //? default is 'dev-only'.
  // autoLabel: 'never' | 'dev-only' | 'always',
  //? default is '[local]'.
  // Allowed values: `[local]` `[filename]` and `[dirname]`
  // This option only works when autoLabel is set to 'dev-only' or 'always'.
  // It allows you to define the format of the resulting label.
  // The format is defined via string where variable parts are enclosed in square brackets [].
  // For example labelFormat: "my-classname--[local]", where [local] will be replaced with the name of the variable the result is assigned to.
  // labelFormat: string
  //? default is undefined.
  // This option allows you to tell the compiler what imports it should
  // look at to determine what it should transform so if you re-export
  // Emotion's exports, you can still use transforms.
  // importMap?: {
  //   [packageName: string]: {
  //     [exportName: string]: {
  //       canonicalImport?: [string, string],
  //       styledBaseImport?: [string, string],
  //     },
  //   }
  // }
  // }
  // },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: { babel: false }
        }
      ]
    });
    return config;
  }
};

module.exports = withBundleAnalyzer(withImages(withPWA(nextConfig)));
