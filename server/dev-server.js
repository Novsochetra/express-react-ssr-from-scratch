// server/dev-server.ts
import fs from "node:fs";
import path from "node:path";
import express from "express";
import crypto from "node:crypto";

import { isDev, isProd, loadManifestClient } from "./helper.js";
import { middlewares } from "./middlewares/index.js";

async function startServer() {
  const app = express();

  app.use(middlewares);

  // INFO: for client side react app hydration
  setUpStaticPath(app);

  const { handleRequest } = await setUpSSR(app);

  app.use("{*splats}", async (req, res) => {
    try {
      handleRequest(req, res);
    } catch (err) {
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

function checkUserAuth(req) {
  // TODO: Implement your auth logic here
  // For example:
  return Boolean(req.cookies?.token);
}

function setUpStaticPath(app) {
  if (isProd) {
    app.use("/public", (req, res, next) => {
      express.static(path.resolve("./dist/client"))(req, res, next);
    });
    app.use("/public", express.static(path.resolve("./public")));
  }

  app.use("/robots.txt", express.static(path.resolve("./robots.txt")));
  app.get("/favicon.ico", (req, res) => {
    res.status(200).sendFile(path.resolve("./public/favicon"));
  });
}

async function setUpSSR(app) {
  if (isDev) {
    const createViteServer = (await import("vite")).createServer;
    const viteDevServer = await createViteServer({
      server: { middlewareMode: "ssr" },
      appType: "custom",
    });

    app.use(viteDevServer.middlewares);

    const ssrModule = await viteDevServer.ssrLoadModule(
      "/server/entry-server.jsx"
    );
    const entryClientFile = "/client/entry-client.jsx";

    return {
      handleRequest: (req, res) =>
        ssrModule.handleRequest(req, res, viteDevServer, entryClientFile),
    };
  } else {
    const entryServer = await import(`../dist/server/entry-server.js`);
    const manifest = loadManifestClient();
    const entryClientFile =
      "/public/" + manifest["client/entry-client.jsx"].file;
    return {
      handleRequest: (req, res) =>
        entryServer.handleRequest(req, res, null, entryClientFile),
    };
  }
}
