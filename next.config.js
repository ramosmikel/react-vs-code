module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: '/_next/image',
    domains: ['multi-monaco.s3.eu-west-2.amazonaws.com'],
    loader: 'default',
  },
  experimental: { optimizeCss: true },
  webpack(config) {
    return config;
  },
};
