// server/entry-server.tsx
import fs from "node:fs";
import path from "node:path";
import { renderToPipeableStream } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { routes } from "./routes";

export async function handleRequest(req, res, viteDevServer, clientFilePath) {
  const handler = createStaticHandler(routes);

  const context = await handler.query(
    new Request("http://localhost:3000" + req.originalUrl)
  );
  if (context instanceof Response) {
    res.status(context.status).send("Not found");
    return;
  }
  const router = createStaticRouter(handler.dataRoutes, context);
  // Read your full HTML file
  let html = fs.readFileSync(path.resolve("public/index.html"), "utf-8");

  // Split at the ssr outlet inside the root div
  let [htmlStart, htmlEnd] = html.split("<!--ssr-outlet-->");
  // Replace the script placeholder in the rest
  htmlEnd = htmlEnd.replace(
    "<!-- script -->",
    `<script async type="module" src="${clientFilePath}"></script>`
  );

  if (viteDevServer) {
    htmlStart = await viteDevServer.transformIndexHtml(req.url, htmlStart);
    htmlEnd = await viteDevServer.transformIndexHtml(req.url, htmlEnd);
  }

  const stream = renderToPipeableStream(
    <StaticRouterProvider context={context} router={router} />,
    {
      onShellReady() {
        res.status(200).setHeader("Content-Type", "text/html");
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
