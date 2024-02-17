/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NEXT_PUBLIC_FTISLAND_NODE_ENV === 'local',
});

const config = {
  reactStrictMode: true,
};

const nextConfig = withPWA(config);

module.exports = nextConfig;
