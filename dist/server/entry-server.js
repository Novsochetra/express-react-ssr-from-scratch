import { jsx } from "react/jsx-runtime";
import fs from "node:fs";
import path from "node:path";
import { renderToPipeableStream } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import { lazy } from "react";
const RoutePath = {
  ROOT: "/",
  HOME: "/home",
  ABOUT: "/about"
};
const About = lazy(() => import("./assets/about-1vuKIyOm.js"));
const Home = lazy(() => import("./assets/home-BpqYs7nO.js"));
const routes = [
  {
    path: RoutePath.ROOT,
    element: /* @__PURE__ */ jsx(Home, {}),
    loader: async () => {
      return { message: "Hello from SSR!" };
    }
  },
  {
    path: RoutePath.HOME,
    element: /* @__PURE__ */ jsx(Home, {}),
    loader: async () => {
      return { message: "Hello from SSR!" };
    }
  },
  {
    path: RoutePath.ABOUT,
    element: /* @__PURE__ */ jsx(About, {}),
    loader: async () => {
      return { message: "Hello from SSR!" };
    }
  }
];
async function handleRequest(req, res, viteDevServer, clientFilePath) {
  const handler = createStaticHandler(routes);
  const context = await handler.query(
    new Request("http://localhost:3000" + req.originalUrl)
  );
  if (context instanceof Response) {
    res.status(context.status).send("Not found");
    return;
  }
  const router = createStaticRouter(handler.dataRoutes, context);
  let html = fs.readFileSync(path.resolve("public/index.html"), "utf-8");
  let [htmlStart, htmlEnd] = html.split("<!--ssr-outlet-->");
  htmlEnd = htmlEnd.replace(
    "<!-- script -->",
    `<script async type="module" src="${clientFilePath}"><\/script>`
  );
  if (viteDevServer) {
    htmlStart = await viteDevServer.transformIndexHtml(req.url, htmlStart);
    htmlEnd = await viteDevServer.transformIndexHtml(req.url, htmlEnd);
  }
  const stream = renderToPipeableStream(
    /* @__PURE__ */ jsx(StaticRouterProvider, { context, router }),
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
      }
    }
  );
}
export {
  handleRequest
};
