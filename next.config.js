// @ts-check

const path = require("path");

const locale = process.env.NEXT_PUBLIC_BUILD_LOCALE || "en-US";
const defaultLocale = "en-US";

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: locale === defaultLocale ? "" : `/${locale}`,
  turbopack: {
    resolveAlias: {
      "i18n:messages": `./messages/${locale}.json`,
    },
  },
  webpack: (config) => {
    config.resolve.alias["i18n:messages"] = path.resolve(
      `./messages/${locale}.json`,
    );
    return config;
  },
};

module.exports = nextConfig;
