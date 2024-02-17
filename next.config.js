/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
});

const config = {
  reactStrictMode: true,
};

const nextConfig = withPWA(config);

module.exports = nextConfig;
