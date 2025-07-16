// server/entry-server.tsx
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { renderToPipeableStream } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { routes } from "./routes";
import { loadManifestServer } from "./helper.js";

export async function handleRequest(req, res, viteDevServer, clientFilePath) {
  const handler = createStaticHandler(routes);

  const context = await handler.query(
    new Request("http://localhost:3000" + req.originalUrl)
  );
  if (context instanceof Response) {
    res.status(context.status).send("Not found");
    return;
  }

  const newReq = new Request("http://localhost:3000" + req.url);
  const router = createStaticRouter(handler.dataRoutes, context);

  // Read your full HTML file
  let html = fs.readFileSync(path.resolve("public/index.html"), "utf-8");

  // Split at the ssr outlet inside the root div
  let [htmlStart, htmlEnd] = html.split("<!--ssr-outlet-->");

  // preload all css

  let preloadCss = "";

  if (!viteDevServer) {
    preloadCss = getPreloadLinksForPath(req.originalUrl);
  }

  htmlStart = htmlStart.replace("<!-- inject css -->", preloadCss);
  // Replace the script placeholder in the rest
  htmlEnd = htmlEnd.replace(
    "<!-- script -->",
    `<script async type="module" src="${clientFilePath}"></script>`
  );

  // INFO: we generate etag before adding nonce so we can making sure that the browser
  // is able to cache the file with etag, since each time we request the nonce is
  // awalys uniq
  const etag = generateETag(htmlStart + htmlEnd);

  htmlEnd = htmlEnd.replace(
    `<script async type="module" src="${clientFilePath}"></script>`,
    `<script async type="module" src="${clientFilePath}" nonce="${res.locals.nonce}"></script>`
  );

  if (viteDevServer) {
    htmlStart = await viteDevServer.transformIndexHtml(req.url, htmlStart);
    htmlEnd = await viteDevServer.transformIndexHtml(req.url, htmlEnd);
  }

  if (req.headers["if-none-match"] === etag) {
    res.status(304).end();
    return;
  }

  const stream = renderToPipeableStream(
    <StaticRouterProvider
      context={context}
      router={router}
      nonce={`${res.locals.nonce}`}
    />,
    {
      onShellReady() {
        res
          .status(200)
          .setHeader("Content-Type", "text/html")
          .setHeader("ETag", etag);
        res.write(htmlStart);
        stream.pipe(res);
        res.write(htmlEnd);
      },
      onError(err) {
        console.error("Stream error:", err);
        res.status(500).send("Internal server error");
      },
    }
  );
}

// server/entry-server.tsx

function getRouteForPath(pathname) {
  const manifest = loadManifestServer();
  return routes.find((r) => r.path === pathname);
}

function getPreloadLinksForPath(pathname) {
  const manifest = loadManifestServer();

  const route = getRouteForPath(pathname);
  if (!route || !route.moduleId) return "";

  const entry = manifest[route.moduleId];
  if (!entry) return "";

  let links = "";
  const seen = new Set();

  const addLink = (file) => {
    if (seen.has(file)) return;
    seen.add(file);

    if (file.endsWith(".css")) {
      links += `<link rel="preload" href="/public/${file}" as="style" />`;
      links += `<link rel="stylesheet" href="/public/${file}" />`;
    }
  };

  if (entry.css) entry.css.forEach(addLink);

  return links;
}

function generateETag(content) {
  return crypto.createHash("sha1").update(content).digest("hex");
}
