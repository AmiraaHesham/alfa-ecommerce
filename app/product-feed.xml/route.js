import { getProductFeedUrl } from "../../lib/api";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(getProductFeedUrl(), {
      cache: "no-store",
      headers: { Accept: "application/xml" },
    });

    if (!response.ok) {
      return new Response("Product feed is temporarily unavailable.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const xml = await response.text();
    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return new Response("Product feed is temporarily unavailable.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
