// server/dev-server.ts
import fs from "node:fs";
import path from "node:path";
import express from "express";
import compression from "compression";
import { createServer as createViteServer } from "vite";

let cache = {
  manifestClient: null,
  manifestServer: null,
};

function loadManifest() {
  if (!isDev) {
    if (!cache.manifestClient) {
      const manifestPath = path.resolve("./dist/client/.vite/manifest.json");
      cache.manifestClient = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      return cache.manifestClient;
    }
  }

  return cache.manifestClient;
}

const isDev = process.env.NODE_ENV === "development";

async function startServer() {
  const app = express();

  app.use(compression());

  let viteDevServer;
  if (isDev) {
    viteDevServer = await createViteServer({
      server: { middlewareMode: "ssr" },
      appType: "custom",
    });

    app.use(viteDevServer.middlewares);
  }

  app.use("/", express.static(path.resolve("./dist/client")));
  app.use("/favicon", express.static(path.resolve("./public/favicon")));

  app.use("/{*splats}", async (req, res) => {
    const url = req.originalUrl;
    try {
      if (
        url.startsWith("/favicon.ico") ||
        url.startsWith("/client/") ||
        url.match(/\.(js|css|png|jpg|svg)$/) ||
        url.match(/\.well\-known/)
      ) {
        return res.status(200).end();
      }

      let entryClientFile;

      let handleRequest;
      if (isDev) {
        const ssrModule = await viteDevServer.ssrLoadModule(
          "/server/entry-server.jsx"
        );
        handleRequest = ssrModule.handleRequest;
        entryClientFile = "./client/entry-client.jsx";

        handleRequest(req, res, viteDevServer, entryClientFile);
      } else {
        const manifest = loadManifest();
        entryClientFile = manifest["client/entry-client.jsx"].file;
        const mod = await import(`../dist/server/entry-server.js`);
        mod.handleRequest(req, res, null, entryClientFile);
      }
    } catch (err) {
      if (viteDevServer) {
        viteDevServer.ssrFixStacktrace(err);
      }
      console.error("ERROR : ", err);
      res.status(500).end(err instanceof Error ? err.message : String(err));
    }
  });

  app.listen(3000, () => {
    console.log("🚀 Dev server at http://localhost:3000");
  });
}

startServer();
