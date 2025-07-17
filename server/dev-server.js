// server/dev-server.ts
import fs from "node:fs";
import path from "node:path";
import express from "express";
import crypto from "node:crypto";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import { RoutePath, RoutePathValues } from "./route-path.js";
import { isDev, isProd, loadManifestClient } from "./helper.js";
import { requestIdMiddleware } from "./middlewares/request-id.middleware.js";
import { httpLogger } from "./middlewares/logger.middleware.js";
import { nonceMiddleware } from "./middlewares/nonce.middleware.js";
import { helmetMiddleware } from "./middlewares/helmet.middleware.js";

async function startServer() {
  const app = express();

  app.use(requestIdMiddleware());
  app.use(httpLogger());
  app.use(nonceMiddleware());
  // INFO: temporary disable helmet, since we are hosting on digital ocean,
  // and causing error (Cross-Origin-Opener-Policy, Content-Security-Policy, Strict-Transport-Security, X-Frame-Options)
  // because we are access with ip instead of domain
  // app.use(helmetMiddleware());
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
  if (isProd) {
    app.use("/public", express.static(path.resolve("./dist/client")));
    app.use("/public", express.static(path.resolve("./public")));
  }

  app.use("/robots.txt", express.static(path.resolve("./robots.txt")));
  app.get("/favicon.ico", (req, res) => {
    res.status(200).sendFile(path.resolve("./public/favicon"));
  });

  if (isProd) {
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
        entryClientFile = "/client/entry-client.jsx";
        handleRequest(req, res, viteDevServer, entryClientFile);
      } else {
        const manifest = loadManifestClient();
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
    const pattern = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀  Dev server running at:

     http://localhost:3000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
    console.log(pattern);
  });
}

startServer();
