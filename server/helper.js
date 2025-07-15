import fs from "node:fs";
import path from "node:path";

export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";

export const cache = new Map();

export function loadManifestClient() {
  if (!isDev) {
    if (!cache.get("manifestClient")) {
      const manifestPath = path.resolve("./dist/client/.vite/manifest.json");
      cache.set(
        "manifestClient",
        JSON.parse(fs.readFileSync(manifestPath, "utf-8"))
      );
      return cache.get("manifestClient");
    }
  }

  return cache.get("manifestClient");
}

export function loadManifestServer() {
  if (!isDev) {
    if (!cache.get("manifestServer")) {
      const manifestPath = path.resolve("./dist/server/.vite/manifest.json");
      cache.set(
        "manifestServer",
        JSON.parse(fs.readFileSync(manifestPath, "utf-8"))
      );

      return cache.get("manifestServer");
    }
  }

  return cache.get("manifestServer");
}
