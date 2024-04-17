import withPWAInit from "@ducanh2912/next-pwa";
import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { createSecureHeaders } from "next-secure-headers";

const withIntl = createNextIntlPlugin();
const withAnalyser = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
const withPWA = withPWAInit({
  disable: false, // Set to true if you want to disable next-pwa (e.g., for development)
  register: true, // Automatically register the service worker
  dest: "/public", // Output directory of the service worker
  reloadOnOnline: true, // Reload the app when it has gone back online

  // Caching options
  cacheStartUrl: true, // Turn on caching for the start URL
  dynamicStartUrl: true, // Allow for dynamic start URL based on different states
  cacheOnFrontEndNav: true, // Enable additional route caching when users navigate through pages with next/link
  dynamicStartUrlRedirect: true, // Specify the redirected URL for dynamic start URL

  aggressiveFrontEndNavCaching: true, // Cache every <link rel="stylesheet" /> and <script /> on frontend navigation

  // Offline fallback
  fallbacks: { document: "/~offline" }, // Fallback for offline mode

  workboxOptions: {
    disableDevLogs: true, // Disable Workbox's logging
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  transpilePackages: ["three"],
  crossOrigin: "anonymous",
  poweredByHeader: false,
  reactStrictMode: true,
  optimizeFonts: true,
  swcMinify: true,
  compress: true,
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/upload/**"
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development"
    }
  },
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders(),
      },
    ];
  },
};

export default withAnalyser(withIntl(withPWA(nextConfig)));
