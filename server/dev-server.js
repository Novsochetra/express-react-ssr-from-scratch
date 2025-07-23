// server/dev-server.ts
import fs from "node:fs";
import path from "node:path";
import express from "express";
import https from "node:https";

import { isDev, isProd, loadManifestClient } from "./helper.js";
import { middlewares } from "./middlewares/index.js";
import { routeValidator } from "./validator/route-validator.js";
import { getLocalIPAddress } from "./lib/utils/network.js";
import { getDirname } from "./lib/utils/fs.js";
import { router } from "./routes/index.js";
import { loadAppConfig } from "./bootstrap/config.js";

const appConfigs = loadAppConfig();
const CACHE_DIR = path.resolve(getDirname(), appConfigs.images.cacheFolder);

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

async function startServer() {
  const app = express();

  app.disable("x-powered-by");

  app.use(middlewares);

  // INFO: for client side react app hydration
  setUpStaticPath(app);

  const { handleRequest } = await setUpSSR(app);

  app.use(router);

  app.use("{*splats}", routeValidator, async (req, res) => {
    try {
      handleRequest(req, res);
    } catch (err) {
      res.status(500).end(err instanceof Error ? err.message : String(err));
    }
  });

  const server = https.createServer(
    {
      key: fs.readFileSync("ssl/key.pem"),
      cert: fs.readFileSync("ssl/cert.pem"),
    },
    app
  );

  server.listen(appConfigs?.server?.port || 3001, () => {
    const pattern = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀  Dev server running at:

    https://localhost:${appConfigs?.server?.port || 3001}
    https://${getLocalIPAddress()}:${appConfigs?.server?.port || 3001}
      
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
    console.log(pattern);
  });
}

startServer();

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
