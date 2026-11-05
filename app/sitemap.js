import { getSeoSitemap } from "../lib/api";
import { SITE_URL } from "../lib/seo";

export const revalidate = 1800;
export const dynamic = "force-dynamic";

// The sitemap protocol allows up to 50,000 URLs / 50 MB per file. The current
// catalogue is far below that limit, so one file is the correct, crawlable
// format. Split into a sitemap index only when this limit is approached.
export const SITEMAP_URL_LIMIT = 50000;

const STATIC_ENTRIES = [
  {
    // Match the homepage canonical exactly (no trailing slash).
    url: SITE_URL,
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${SITE_URL}/products`,
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/user/about`,
    changeFrequency: "monthly",
    priority: 0.4,
  },
];

function validDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function validSlug(value) {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function dedupe(entries) {
  const seen = new Set();
  return entries.filter((entry) => {
    const key = entry.url.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Builds the public sitemap from the backend catalogue response. Only current,
 * canonical slugs are emitted: old/redirected slugs are never returned by the
 * backend sitemap query. Empty/inactive categories are excluded there too.
 */
export function buildSitemapEntries(data = {}) {
  const categoryEntries = (data.categories || [])
    .filter((category) => validSlug(category?.slug))
    .map((category) => ({
      url: `${SITE_URL}/categories/${encodeURIComponent(category.slug)}`,
      lastModified: validDate(category.lastModified),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const productEntries = (data.products || [])
    .filter((product) => validSlug(product?.slug))
    .map((product) => ({
      url: `${SITE_URL}/products/${encodeURIComponent(product.slug)}`,
      lastModified: validDate(product.lastModified),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return dedupe([...STATIC_ENTRIES, ...categoryEntries, ...productEntries]);
}

export default async function sitemap() {
  const data = await getSeoSitemap();
  return buildSitemapEntries(data);
}
