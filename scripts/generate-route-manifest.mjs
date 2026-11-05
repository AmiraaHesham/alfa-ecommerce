import fs from "node:fs";
import path from "node:path";

const appDir = path.resolve("app");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function routeFor(file) {
  const relative = path.relative(appDir, file).replaceAll("\\", "/");
  const withoutPage = relative.replace(/\/?page\.jsx?$/, "");
  const segments = withoutPage
    .split("/")
    .filter(Boolean)
    .filter((segment) => !/^\(.*\)$/.test(segment));
  return "/" + segments.join("/");
}

const routes = walk(appDir)
  .filter((file) => /(^|\/)page\.jsx?$/.test(file.replaceAll("\\", "/")))
  .map(routeFor)
  .filter((route) => !route.startsWith("/_"))
  .sort((a, b) => a.localeCompare(b));

const manifest = {
  generatedFrom: "frontend/app/**/page.jsx",
  routes,
  api: {
    forgotPassword: {
      method: "POST",
      path: "/api/auth/forgot-password",
    },
    resetPassword: {
      method: "PUT",
      path: "/api/auth/rest-forget-password",
    },
    changePassword: {
      method: "PUT",
      path: "/api/users/reset-password",
    },
    confirmEmail: {
      method: "GET",
      path: "/api/auth/confirm-email",
    },
  },
};

fs.writeFileSync("route-manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote route-manifest.json with ${routes.length} routes`);
