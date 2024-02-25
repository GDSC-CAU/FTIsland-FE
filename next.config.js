/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate-plugin');
const withPlugins = require('next-compose-plugins');

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NEXT_PUBLIC_FTISLAND_NODE_ENV === 'local',
});

const nextConfig = {
  i18n: {
    locales: ['en', 'ko', 'ja', 'cmn'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  reactStrictMode: true,
};

module.exports = withPlugins([[nextTranslate], [withPWA]], nextConfig);
