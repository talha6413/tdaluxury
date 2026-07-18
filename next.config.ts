import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
];

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [72, 75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },

  async redirects() {
    return [
      { source: "/hakkımızda", destination: "/hakkimizda", permanent: true },
      { source: "/iletişim", destination: "/iletisim", permanent: true },
      {
        source: "/kalıcı-makyaj",
        destination: "/kalici-makyaj",
        permanent: true,
      },
      {
        source: "/bölgesel-incelme",
        destination: "/bolgesel-incelme",
        permanent: true,
      },
      {
        source: "/iğneli-epilasyon",
        destination: "/igneli-epilasyon",
        permanent: true,
      },
      {
        source: "/kirpik-lifting",
        destination: "/kas-kirpik/kirpik-lifting",
        permanent: true,
      },
      {
        source: "/erkek-lazer-epilasyon",
        destination: "/lazer-epilasyon/erkek-lazer-epilasyon",
        permanent: true,
      },
      {
        source: "/kadin-lazer-epilasyon",
        destination: "/lazer-epilasyon/kadin-lazer-epilasyon",
        permanent: true,
      },
      {
        source: "/microblading",
        destination: "/kalici-makyaj/microblading",
        permanent: true,
      },
      {
        source: "/dudak-renklendirme",
        destination: "/kalici-makyaj/dudak-renklendirme",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
