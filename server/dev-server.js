// server/dev-server.ts
import fs from "node:fs";
import path from "node:path";
import express from "express";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import { RoutePathValues } from "./route-path.js";

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
  let entryServer;
  if (isDev) {
    viteDevServer = await createViteServer({
      server: { middlewareMode: "ssr" },
      appType: "custom",
    });

    app.use(viteDevServer.middlewares);
  }

  // INFO: for client side react app hydration
  if (!isDev) {
    app.use("/public", express.static(path.resolve("./dist/client")));
    app.use("/public", express.static(path.resolve("./public")));
  }

  app.use("/robots.txt", express.static(path.resolve("./robots.txt")));
  app.get("/favicon.ico", (req, res) => {
    res.status(200).sendFile(path.resolve("./public/favicon"));
  });

  if (!isDev) {
    entryServer = await import(`../dist/server/entry-server.js`);
  }

  app.use("{*splats}", async (req, res) => {
    const url = req.originalUrl;
    try {
      // Check if it's a valid app route
      const path = req.originalUrl.split("?")[0];
      const isKnownRoute = RoutePathValues.includes(url);

      if (!isKnownRoute) {
        return res.status(404).send("Not Found");
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
        entryClientFile = "/public/" + manifest["client/entry-client.jsx"].file;
        entryServer.handleRequest(req, res, null, entryClientFile);
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
