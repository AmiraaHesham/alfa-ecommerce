import sitemap, { buildSitemapEntries, SITEMAP_URL_LIMIT } from "../app/sitemap";
import robots, { DISALLOW_PATHS, SITEMAP_PATH } from "../app/robots";
import { getSeoSitemap } from "../lib/api";
import { SITE_URL } from "../lib/seo";

jest.mock("../lib/api", () => ({
  getSeoSitemap: jest.fn(),
}));

const catalogue = {
  products: [
    {
      slug: "senator-lens-two-exit",
      lastModified: "2026-06-03T13:41:54.124171",
    },
    {
      slug: "senator",
      lastModified: "2026-11-01T11:27:17.237279",
    },
    // Duplicate slugs must never create duplicate sitemap URLs.
    {
      slug: "senator-lens-two-exit",
      lastModified: "2026-06-04T00:00:00",
    },
    { slug: "", lastModified: "2026-06-04T00:00:00" },
    { slug: null },
    { slug: "Not A Valid Slug" },
  ],
  categories: [
    {
      slug: "receivers",
      lastModified: "2026-11-04T23:51:16.374689",
    },
    {
      slug: "receivers",
      lastModified: "2026-11-04T23:51:16.374689",
    },
    { slug: "cables", lastModified: "not-a-date" },
    { slug: "" },
  ],
};

function urls(entries) {
  return entries.map((entry) => entry.url);
}

function blockedByRobots(path) {
  return DISALLOW_PATHS.some((rule) => path.startsWith(rule));
}

beforeEach(() => {
  getSeoSitemap.mockReset();
});

describe("robots.txt configuration", () => {
  it("allows public pages and points at the absolute production sitemap", () => {
    const config = robots();
    const rule = config.rules[0];

    expect(rule.userAgent).toBe("*");
    expect(rule.allow).toBe("/");
    expect(config.sitemap).toBe(`${SITE_URL}${SITEMAP_PATH}`);
    expect(new URL(config.sitemap).protocol).toBe("https:");
    expect(new URL(config.sitemap).pathname).toBe("/sitemap.xml");
    expect(config.host).toBeUndefined();
  });

  it("does not block products, categories, images or required assets", () => {
    const publicPaths = [
      "/",
      "/products",
      "/products/senator-lens-two-exit",
      "/categories/receivers",
      "/user/about",
      "/images/items/item-images/lens.jpg",
      "/_next/static/chunks/main.js",
      "/_next/image?url=%2Fimages%2Flogo.png&w=640&q=75",
    ];

    for (const path of publicPaths) {
      expect(blockedByRobots(path)).toBe(false);
    }
  });

  it("disallows admin, auth, APIs, cart/checkout and private user pages", () => {
    const privatePaths = [
      "/admin/Products",
      "/api/public/items/5",
      "/signin",
      "/signup",
      "/forgotpassword",
      "/confirmedemail",
      "/email-failed",
      "/checkout",
      "/user/cart",
      "/user/profile",
      "/user/wishlist",
      "/user/ordershistory",
      "/user/orderdetails/1",
      "/user/returnorders",
      "/user/returnorderdetails/1",
      "/user/search/test",
      "/__reviews-preview",
    ];

    for (const path of privatePaths) {
      expect(blockedByRobots(path)).toBe(true);
    }
  });
});

describe("XML sitemap generation", () => {
  it("includes static pages, categories and products with canonical URLs", () => {
    const entries = buildSitemapEntries(catalogue);
    const entryUrls = urls(entries);

    expect(entryUrls).toContain(SITE_URL);
    expect(entryUrls).not.toContain(`${SITE_URL}/`);
    expect(entryUrls).toContain(`${SITE_URL}/products`);
    expect(entryUrls).toContain(`${SITE_URL}/user/about`);
    expect(entryUrls).toContain(`${SITE_URL}/categories/receivers`);
    expect(entryUrls).toContain(`${SITE_URL}/categories/cables`);
    expect(entryUrls).toContain(`${SITE_URL}/products/senator-lens-two-exit`);
    expect(entryUrls).toContain(`${SITE_URL}/products/senator`);
    expect(entryUrls.every((url) => url.startsWith("https://"))).toBe(true);
    expect(entryUrls.every((url) => !url.includes("localhost"))).toBe(true);
  });

  it("uses unique SEO slugs and never emits duplicates or legacy paths", () => {
    const entries = buildSitemapEntries(catalogue);
    const entryUrls = urls(entries);

    expect(new Set(entryUrls).size).toBe(entryUrls.length);
    expect(
      entryUrls.filter(
        (url) => url === `${SITE_URL}/products/senator-lens-two-exit`,
      ),
    ).toHaveLength(1);
    expect(
      entryUrls.filter((url) => url === `${SITE_URL}/categories/receivers`),
    ).toHaveLength(1);
    expect(entryUrls.some((url) => url.includes("/user/productdetails/"))).toBe(
      false,
    );
    expect(
      entryUrls.some((url) => url.includes("/user/products/category/")),
    ).toBe(false);
    expect(entryUrls.some((url) => url.includes("alfa_ecommerce_seo_verify"))).toBe(
      false,
    );
    expect(entries.length).toBeLessThanOrEqual(SITEMAP_URL_LIMIT);
  });

  it("keeps valid lastmod dates and ignores invalid ones", () => {
    const entries = buildSitemapEntries(catalogue);
    const product = entries.find(
      (entry) => entry.url === `${SITE_URL}/products/senator`,
    );
    const categoryWithoutDate = entries.find(
      (entry) => entry.url === `${SITE_URL}/categories/cables`,
    );

    expect(product.lastModified).toBeInstanceOf(Date);
    expect(Number.isNaN(product.lastModified.getTime())).toBe(false);
    expect(categoryWithoutDate.lastModified).toBeUndefined();
  });

  it("reads the sitemap from the current catalogue API on every request", async () => {
    getSeoSitemap.mockResolvedValueOnce({
      products: [
        { slug: "senator", lastModified: "2026-11-01T11:27:17.237279" },
      ],
      categories: [{ slug: "receivers", lastModified: "2026-11-04T23:51:16" }],
    });

    const first = await sitemap();
    expect(urls(first)).toContain(`${SITE_URL}/products/senator`);
    expect(urls(first)).not.toContain(
      `${SITE_URL}/products/senator-lens-two-exit`,
    );

    // A database change (product removed, different product added) must be
    // reflected by the next sitemap request, not a stale build-time list.
    getSeoSitemap.mockResolvedValueOnce({
      products: [
        {
          slug: "senator-lens-two-exit",
          lastModified: "2026-06-03T13:41:54.124171",
        },
      ],
      categories: [{ slug: "lenses", lastModified: "2026-06-03T13:41:54" }],
    });

    const second = await sitemap();
    expect(urls(second)).toContain(
      `${SITE_URL}/products/senator-lens-two-exit`,
    );
    expect(urls(second)).not.toContain(`${SITE_URL}/products/senator`);
    expect(urls(second)).toContain(`${SITE_URL}/categories/lenses`);
    expect(urls(second)).not.toContain(`${SITE_URL}/categories/receivers`);
    expect(getSeoSitemap).toHaveBeenCalledTimes(2);
  });

  it("fails safe when the catalogue API is unavailable", async () => {
    getSeoSitemap.mockRejectedValueOnce(new Error("API unavailable"));

    await expect(sitemap()).rejects.toThrow("API unavailable");
  });
});
