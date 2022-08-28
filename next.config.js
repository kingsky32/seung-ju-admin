/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.experiments.topLevelAwait = true;
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: '@graphql-tools/webpack-loader',
    });
    return config;
  },
};

module.exports = nextConfig;
