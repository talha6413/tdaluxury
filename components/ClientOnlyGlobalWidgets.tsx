"use client";

import dynamic from "next/dynamic";

const FloatingContactDock = dynamic(
  () => import("@/components/FloatingContactDock"),
  {
    ssr: false,
    loading: () => null,
  }
);

const GlobalMobileBookingBar = dynamic(
  () => import("@/components/GlobalMobileBookingBar"),
  {
    ssr: false,
    loading: () => null,
  }
);

const CookieConsent = dynamic(
  () => import("@/components/CookieConsent"),
  {
    ssr: false,
    loading: () => null,
  }
);

const ConversionTracker = dynamic(
  () => import("@/components/analytics/ConversionTracker"),
  {
    ssr: false,
    loading: () => null,
  }
);

const Analytics = dynamic(
  () => import("@/components/analytics/Analytics"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function ClientOnlyGlobalWidgets() {
  return (
    <>
      <FloatingContactDock />
      <GlobalMobileBookingBar />
      <CookieConsent />
      <ConversionTracker />
      <Analytics />
    </>
  );
}
