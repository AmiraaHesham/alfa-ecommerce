import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function routeFor(file, appDir) {
  const relative = path.relative(appDir, file).replaceAll("\\", "/");
  const withoutPage = relative.replace(/\/?page\.jsx?$/, "");
  const segments = withoutPage
    .split("/")
    .filter(Boolean)
    .filter((segment) => !/^\(.*\)$/.test(segment));
  return "/" + segments.join("/");
}

describe("frontend route manifest", () => {
  it("matches the actual app router page tree", () => {
    const appDir = path.resolve(__dirname, "../app");
    const actual = walk(appDir)
      .filter((file) => /(^|\/)page\.jsx?$/.test(file.replaceAll("\\", "/")))
      .map((file) => routeFor(file, appDir))
      .filter((route) => !route.startsWith("/_"))
      .sort((a, b) => a.localeCompare(b));

    const manifest = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../route-manifest.json"), "utf8"),
    );

    expect(manifest.routes).toEqual(actual);
    expect(manifest.routes).toEqual(
      expect.arrayContaining([
        "/forgotpassword",
        "/confirmedemail",
        "/email-failed",
      ]),
    );
  });

  it("pins the password API methods and paths", () => {
    const manifest = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../route-manifest.json"), "utf8"),
    );

    expect(manifest.api.forgotPassword).toEqual({
      method: "POST",
      path: "/api/auth/forgot-password",
    });
    expect(manifest.api.resetPassword).toEqual({
      method: "PUT",
      path: "/api/auth/rest-forget-password",
    });
    expect(manifest.api.changePassword).toEqual({
      method: "PUT",
      path: "/api/users/reset-password",
    });
  });
});
