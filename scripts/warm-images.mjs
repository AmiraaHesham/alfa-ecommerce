#!/usr/bin/env node
/**
 * Warms Next.js optimized image URLs after a deployment.
 *
 * The first request for a remote product image pays the optimizer cost. On a
 * cold mobile connection that can be the LCP bottleneck. This script fetches
 * the public product pages, extracts the exact _next/image URLs the browser
 * will request, and requests them once so the CDN/Next cache is warm.
 *
 *   SEO_BASE_URL=https://alfagrouptech.com npm run seo:warm-images
 */
const BASE_URL = (process.env.SEO_BASE_URL || process.argv[2] || "http://localhost:3000").replace(/\/+$/, "");
const LIMIT = Number(process.env.WARM_IMAGE_LIMIT || 10);

async function fetchText(path) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "User-Agent": "AlfaSeoWarmup/1.0" },
  });
  if (!response.ok) throw new Error(`${path} -> ${response.status}`);
  return response.text();
}

async function mapLimit(items, limit, worker) {
  const queue = [...items];
  const workers = Array.from({ length: Math.max(1, limit) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      await worker(item);
    }
  });
  await Promise.all(workers);
}

async function main() {
  const sitemap = await fetchText("/sitemap.xml");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  let productUrls = locs.filter((url) => /\/products\/[^/]+$/.test(url));
  if (productUrls.length === 0) {
    productUrls = [...locs.filter((url) => /\/categories\/[^/]+$/.test(url))];
  }
  const selected = productUrls.slice(0, LIMIT);
  if (selected.length === 0) {
    console.log("No product URLs found in sitemap; nothing to warm.");
    return;
  }

  const optimized = new Set();
  await mapLimit(selected, 4, async (url) => {
    try {
      const html = await fetchText(new URL(url).pathname);
      for (const match of html.matchAll(/src="([^"]*\/_next\/image\?[^"]*)"/g)) {
        optimized.add(match[1].replaceAll("&amp;", "&"));
      }
      for (const match of html.matchAll(/srcSet="([^"]*)"/gi)) {
        const srcset = match[1].replaceAll("&amp;", "&");
        for (const candidate of srcset.split(",")) {
          const src = candidate.trim().split(/\s+/)[0];
          if (!src.includes("/_next/image?")) continue;
          const width = Number((src.match(/[?&]w=(\d+)/) || [])[1] || 0);
          if (width > 1080) continue;
          optimized.add(src);
        }
      }
    } catch (error) {
      console.warn(`warm page failed: ${url} ${error.message}`);
    }
  });

  let warmed = 0;
  await mapLimit([...optimized], 5, async (src) => {
    try {
      const imageUrl = src.startsWith("http") ? src : `${BASE_URL}${src}`;
      const response = await fetch(imageUrl, {
        headers: { "User-Agent": "AlfaSeoWarmup/1.0" },
      });
      if (response.ok) {
        await response.arrayBuffer();
        warmed += 1;
      }
    } catch (error) {
      console.warn(`warm image failed: ${error.message}`);
    }
  });

  console.log(JSON.stringify({ pages: selected.length, imagesWarmed: warmed }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
