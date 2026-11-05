#!/usr/bin/env node
/**
 * HTTP-level SEO smoke test. Run against a deployed or local frontend:
 *   SEO_BASE_URL=https://alfagrouptech.com npm run seo:validate
 *
 * It intentionally uses real HTTP responses, not mocks: status codes,
 * canonical tags, titles, descriptions, H1s, JSON-LD, sitemap, robots,
 * noindex headers and the Merchant Center feed.
 */
const BASE_URL = (
  process.env.SEO_BASE_URL ||
  process.argv[2] ||
  "http://localhost:3000"
).replace(/\/+$/, "");

const failures = [];
const checks = [];
let SITE_ORIGIN = BASE_URL;

function pass(name, detail = "") {
  checks.push({ name, ok: true, detail });
}

function fail(name, detail) {
  checks.push({ name, ok: false, detail });
  failures.push(`${name}: ${detail}`);
}

async function get(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    redirect: options.redirect || "follow",
    headers: { "User-Agent": "AlfaSeoValidator/1.0" },
  });
  return response;
}

function firstMatch(text, regex) {
  const match = text.match(regex);
  return match ? match[1] : null;
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (match) => {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    },
  );
}

function normaliseUrl(value) {
  return value.replace(/\/$/, "");
}

function localPathFor(absoluteUrl) {
  const url = new URL(absoluteUrl);
  return `${url.pathname}${url.search}`;
}

function sitemapPath(absoluteUrl) {
  try {
    return new URL(absoluteUrl).pathname;
  } catch {
    return "";
  }
}

function assertSitemapXml(xml) {
  const trimmed = xml.trim();
  const problems = [];

  if (!trimmed.startsWith("<?xml")) {
    problems.push("missing XML declaration");
  }
  if (
    !/<urlset\b[^>]*xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/.test(
      trimmed,
    )
  ) {
    problems.push("missing sitemap urlset namespace");
  }
  if (!/<\/urlset>\s*$/.test(trimmed)) {
    problems.push("missing closing </urlset>");
  }

  const opens = (xml.match(/<url>/g) || []).length;
  const closes = (xml.match(/<\/url>/g) || []).length;
  if (opens !== closes) {
    problems.push(`unbalanced <url> tags (${opens} open, ${closes} close)`);
  }

  const rawAmpersand =
    /&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/.test(xml);
  if (rawAmpersand) {
    problems.push("unescaped ampersand");
  }
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(xml)) {
    problems.push("invalid XML control character");
  }

  return problems;
}

function parseRobots(text) {
  const groups = [];
  let current = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const separator = line.indexOf(":");
    if (separator < 0) continue;

    const key = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();

    if (key === "user-agent") {
      if (!current || current.hasRules) {
        current = { agents: [], allow: [], disallow: [], hasRules: false };
        groups.push(current);
      }
      current.agents.push(value);
      continue;
    }

    if ((key === "allow" || key === "disallow") && current) {
      current[key].push(value);
      current.hasRules = true;
    }
  }

  return (
    groups.find((group) => group.agents.includes("*")) ||
    groups[0] || { allow: [], disallow: [] }
  );
}

function escapeRegex(value) {
  return value.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
}

function robotsMatchLength(path, pattern) {
  if (!pattern) return 0;
  let value = pattern;
  const exactEnd = value.endsWith("$");
  if (exactEnd) value = value.slice(0, -1);

  if (!value.includes("*")) {
    return path.startsWith(value) ? value.length : 0;
  }

  const regex = new RegExp(
    `^${value.split("*").map(escapeRegex).join(".*")}${exactEnd ? "$" : ""}`,
  );
  if (!regex.test(path)) return 0;
  return value.replace(/\*/g, "").length;
}

function isAllowedByRobots(path, rules) {
  const allowLength = Math.max(
    0,
    ...rules.allow.map((pattern) => robotsMatchLength(path, pattern)),
  );
  const disallowLength = Math.max(
    0,
    ...rules.disallow.map((pattern) => robotsMatchLength(path, pattern)),
  );
  return disallowLength === 0 || allowLength >= disallowLength;
}

async function validatePage(path, expectedType) {
  const response = await get(path);
  const html = await response.text();
  const url = new URL(path, BASE_URL).toString();

  if (response.status !== 200) {
    fail(`${path} status`, `expected 200, got ${response.status}`);
    return null;
  }
  pass(`${path} status`, "200");

  const title = firstMatch(html, /<title>([^<]*)<\/title>/);
  if (!title || title.trim().length < 5) fail(`${path} title`, "missing or too short");
  else pass(`${path} title`, title);

  const description = firstMatch(
    html,
    /<meta name="description" content="([^"]*)"/,
  );
  if (!description || description.trim().length < 30) {
    fail(`${path} description`, "missing or too short");
  } else {
    pass(`${path} description`, `${description.length} chars`);
  }

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)]
    .map((match) => match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (h1s.length !== 1) fail(`${path} h1`, `expected exactly 1, got ${h1s.length}`);
  else pass(`${path} h1`, h1s[0]);

  const canonical = firstMatch(html, /rel="canonical" href="([^"]*)"/);
  const expectedCanonical = new URL(path, SITE_ORIGIN).toString();
  if (!canonical) fail(`${path} canonical`, "missing");
  else if (normaliseUrl(canonical) !== normaliseUrl(expectedCanonical)) {
    fail(`${path} canonical`, `expected ${expectedCanonical}, got ${canonical}`);
  } else {
    pass(`${path} canonical`, canonical);
  }

  const blocks = jsonLdBlocks(html);
  if (blocks.some((block) => block === null)) {
    fail(`${path} JSON-LD`, "invalid JSON");
  } else if (blocks.length === 0) {
    fail(`${path} JSON-LD`, "no JSON-LD blocks");
  } else {
    pass(`${path} JSON-LD`, blocks.map((block) => block["@type"]).join(", "));
  }

  if (expectedType) {
    const types = blocks.flatMap((block) =>
      Array.isArray(block?.["@graph"])
        ? block["@graph"].map((node) => node["@type"])
        : [block?.["@type"]],
    );
    if (!types.includes(expectedType)) {
      fail(`${path} schema type`, `expected ${expectedType}, got ${types.join(", ")}`);
    } else {
      pass(`${path} schema type`, expectedType);
    }
  }

  return { html, blocks, url };
}

async function validateSitemapUrl(loc) {
  const path = localPathFor(loc);
  const response = await get(path, { redirect: "manual" });
  const html = await response.text();

  if (response.status !== 200) {
    fail(`sitemap ${path} status`, `expected 200, got ${response.status}`);
    return;
  }
  pass(`sitemap ${path} status`, "200");

  const canonical = firstMatch(html, /rel="canonical" href="([^"]*)"/);
  if (!canonical) {
    fail(`sitemap ${path} canonical`, "missing");
  } else if (normaliseUrl(canonical) !== normaliseUrl(loc)) {
    fail(`sitemap ${path} canonical`, `expected ${loc}, got ${canonical}`);
  } else {
    pass(`sitemap ${path} canonical`, canonical);
  }

  const productOrCategory = /^\/products\/[^/]+$/.test(path) ||
    /^\/categories\/[^/]+$/.test(path);
  if (!productOrCategory) return;

  const title = firstMatch(html, /<title>([^<]*)<\/title>/);
  if (!title || title.trim().length < 5) {
    fail(`sitemap ${path} title`, "missing or too short");
  }
  const description = firstMatch(
    html,
    /<meta name="description" content="([^"]*)"/,
  );
  if (!description || description.trim().length < 30) {
    fail(`sitemap ${path} description`, "missing or too short");
  }
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)]
    .map((match) => match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (h1s.length !== 1) {
    fail(`sitemap ${path} h1`, `expected exactly 1, got ${h1s.length}`);
  }
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const index = nextIndex++;
      if (index >= items.length) return;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );
  return results;
}

async function main() {
  const sitemapResponse = await get("/sitemap.xml");
  const sitemap = await sitemapResponse.text();

  if (sitemapResponse.status !== 200) {
    fail("sitemap status", String(sitemapResponse.status));
  } else {
    pass("sitemap status", "200");
  }

  const sitemapContentType = sitemapResponse.headers.get("content-type") || "";
  if (!/xml/i.test(sitemapContentType)) {
    fail("sitemap content-type", sitemapContentType || "missing");
  } else {
    pass("sitemap content-type", sitemapContentType);
  }

  const xmlProblems = assertSitemapXml(sitemap);
  if (xmlProblems.length > 0) {
    fail("sitemap XML", xmlProblems.join("; "));
  } else {
    pass("sitemap XML", "well-formed urlset");
  }

  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (locs.length > 0) {
    try {
      SITE_ORIGIN = new URL(locs[0]).origin;
    } catch {
      // Keep BASE_URL when the sitemap contains a malformed URL.
    }
  }
  if (locs.length < 5) fail("sitemap entries", `only ${locs.length} URLs`);
  else pass("sitemap entries", `${locs.length} URLs`);

  if (new Set(locs).size !== locs.length) {
    fail("sitemap uniqueness", "duplicate URLs found");
  } else {
    pass("sitemap uniqueness", "no duplicates");
  }

  const invalidProtocols = locs.filter((loc) => {
    try {
      return new URL(loc).protocol !== "https:";
    } catch {
      return true;
    }
  });
  if (invalidProtocols.length > 0) {
    fail("sitemap HTTPS", invalidProtocols.slice(0, 3).join(", "));
  } else {
    pass("sitemap HTTPS", "all URLs use https");
  }

  const forbiddenHosts =
    /(^localhost$|^127\.|^0\.0\.0\.0$|\.local$|\.test$|\.dev$|staging|souq\.alfagroup\.it\.com|alfa[-_]ecommerce)/i;
  const badOrigins = locs.filter((loc) => {
    try {
      const url = new URL(loc);
      return forbiddenHosts.test(url.hostname) || forbiddenHosts.test(url.href);
    } catch {
      return true;
    }
  });
  if (badOrigins.length > 0) {
    fail("sitemap non-production URLs", badOrigins.slice(0, 3).join(", "));
  } else {
    pass("sitemap non-production URLs", "none");
  }

  const origins = new Set(
    locs.flatMap((loc) => {
      try {
        return [new URL(loc).origin];
      } catch {
        return [];
      }
    }),
  );
  if (origins.size !== 1 || !origins.has(SITE_ORIGIN)) {
    fail("sitemap origin", [...origins].join(", ") || "missing");
  } else {
    pass("sitemap origin", SITE_ORIGIN);
  }

  const lastModValues = [
    ...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g),
  ].map((match) => match[1]);
  const invalidLastMods = lastModValues.filter((value) =>
    Number.isNaN(new Date(value).getTime()),
  );
  if (invalidLastMods.length > 0) {
    fail("sitemap lastmod", invalidLastMods.slice(0, 3).join(", "));
  } else {
    pass("sitemap lastmod", `${lastModValues.length} valid dates`);
  }
  const now = Date.now();
  const futureLastMods = lastModValues.filter(
    (value) => new Date(value).getTime() > now + 24 * 60 * 60 * 1000,
  );
  if (futureLastMods.length > 0) {
    fail("sitemap future lastmod", futureLastMods.slice(0, 3).join(", "));
  }

  const legacyPaths = locs.filter((loc) => {
    const path = sitemapPath(loc);
    return (
      path.startsWith("/user/productdetails/") ||
      path.startsWith("/user/products/category/") ||
      path.startsWith("/user/products/section/")
    );
  });
  if (legacyPaths.length > 0) {
    fail("sitemap legacy URLs", legacyPaths.slice(0, 3).join(", "));
  } else {
    pass("sitemap legacy URLs", "none");
  }

  const productLocs = locs.filter((loc) =>
    /^\/products\/[^/]+$/.test(sitemapPath(loc)),
  );
  const categoryLocs = locs.filter((loc) =>
    /^\/categories\/[^/]+$/.test(sitemapPath(loc)),
  );
  const badProductSlugs = productLocs.filter(
    (loc) => !/^\/products\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sitemapPath(loc)),
  );
  const badCategorySlugs = categoryLocs.filter(
    (loc) => !/^\/categories\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sitemapPath(loc)),
  );
  if (badProductSlugs.length > 0) {
    fail("sitemap product slugs", badProductSlugs.slice(0, 3).join(", "));
  } else {
    pass("sitemap product slugs", `${productLocs.length} canonical SEO-code URLs`);
  }
  if (badCategorySlugs.length > 0) {
    fail("sitemap category slugs", badCategorySlugs.slice(0, 3).join(", "));
  } else {
    pass("sitemap category slugs", `${categoryLocs.length} canonical SEO-code URLs`);
  }

  const productLoc = productLocs[0];
  const categoryLoc = categoryLocs[0];

  await validatePage("/", null);

  if (productLoc) {
    await validatePage(new URL(productLoc).pathname, "Product");
  } else {
    fail("sitemap product", "no product URL found");
  }

  if (categoryLoc) {
    await validatePage(new URL(categoryLoc).pathname, "CollectionPage");
  } else {
    fail("sitemap category", "no category URL found");
  }

  await mapLimit(locs, 6, validateSitemapUrl);

  const robotsResponse = await get("/robots.txt");
  const robots = await robotsResponse.text();
  if (robotsResponse.status !== 200) {
    fail("robots status", String(robotsResponse.status));
  } else {
    pass("robots status", "200");
  }

  const robotsContentType = robotsResponse.headers.get("content-type") || "";
  if (!/text\/plain/i.test(robotsContentType)) {
    fail("robots content-type", robotsContentType || "missing");
  } else {
    pass("robots content-type", robotsContentType);
  }

  const rules = parseRobots(robots);
  const sitemapDirective = robots
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*$/, "").trim())
    .find((line) => /^sitemap\s*:/i.test(line));
  if (!sitemapDirective) {
    fail("robots sitemap", "missing Sitemap directive");
  } else {
    const sitemapUrl = sitemapDirective.slice(sitemapDirective.indexOf(":") + 1).trim();
    try {
      const parsed = new URL(sitemapUrl);
      if (
        parsed.protocol !== "https:" ||
        parsed.pathname !== "/sitemap.xml" ||
        parsed.origin !== SITE_ORIGIN
      ) {
        fail("robots sitemap", sitemapUrl);
      } else {
        pass("robots sitemap", sitemapUrl);
      }
    } catch {
      fail("robots sitemap", `invalid URL: ${sitemapUrl}`);
    }
  }

  if (rules.disallow.includes("/") || rules.disallow.includes("/*")) {
    fail("robots site-wide block", "Disallow: / found");
  } else {
    pass("robots site-wide block", "public site allowed");
  }

  const publicRobotsPaths = [
    "/",
    "/products",
    "/products/senator-lens-two-exit",
    "/categories/receivers",
    "/user/about",
    "/images/items/item-images/lens.jpg",
    "/_next/static/chunks/main.js",
    "/_next/image?url=%2Fimages%2Flogo.png&w=640&q=75",
  ];
  const blockedPublicPaths = publicRobotsPaths.filter(
    (path) => !isAllowedByRobots(path, rules),
  );
  if (blockedPublicPaths.length > 0) {
    fail("robots public paths", blockedPublicPaths.join(", "));
  } else {
    pass("robots public paths", "products, categories, images and assets allowed");
  }

  const privateRobotsPaths = [
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
  const allowedPrivatePaths = privateRobotsPaths.filter((path) =>
    isAllowedByRobots(path, rules),
  );
  if (allowedPrivatePaths.length > 0) {
    fail("robots private paths", allowedPrivatePaths.join(", "));
  } else {
    pass("robots private paths", "admin, auth, API, cart and private pages disallowed");
  }

  const blockedSitemapUrls = locs.filter(
    (loc) => !isAllowedByRobots(sitemapPath(loc), rules),
  );
  if (blockedSitemapUrls.length > 0) {
    fail("robots blocks sitemap URLs", blockedSitemapUrls.slice(0, 3).join(", "));
  } else {
    pass("robots blocks sitemap URLs", "none");
  }

  const searchResponse = await get("/user/search/test");
  const searchRobots = searchResponse.headers.get("x-robots-tag") || "";
  if (!/noindex/i.test(searchRobots)) fail("search noindex header", searchRobots || "missing");
  else pass("search noindex header", searchRobots);

  const adminResponse = await get("/admin/Products");
  const adminRobots = adminResponse.headers.get("x-robots-tag") || "";
  if (!/noindex/i.test(adminRobots)) fail("admin noindex header", adminRobots || "missing");
  else pass("admin noindex header", adminRobots);

  const feedResponse = await get("/product-feed.xml");
  const feed = await feedResponse.text();
  if (feedResponse.status !== 200) fail("feed status", String(feedResponse.status));
  else pass("feed status", "200");
  if (!/<rss[^>]*xmlns:g=/.test(feed)) fail("feed root", "missing Google RSS namespace");
  else pass("feed root", "valid Google RSS root");
  if (!/<g:price>[0-9.]+ EGP<\/g:price>/.test(feed)) {
    fail("feed price", "no valid EGP price");
  } else {
    pass("feed price", "present");
  }

  const uniqueErrors = [...new Set(failures)];
  console.log(JSON.stringify({ baseUrl: BASE_URL, checks, failures: uniqueErrors }, null, 2));

  if (uniqueErrors.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
