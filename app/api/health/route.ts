import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: site.name,
      site: site.url,
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
