import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin();
const analyzeBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about/governace',
        destination: '/about/governance',
        permanent: true,
      },
    ]
  },
};

export default withSentryConfig(
  analyzeBundle(withNextIntl(nextConfig)),
  {
    silent: true,
    org: "yad-cambodia",
    project: "yad-website",
  }
);
