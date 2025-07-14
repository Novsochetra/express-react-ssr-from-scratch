import { jsx, jsxs } from "react/jsx-runtime";
import fs from "node:fs";
import path from "node:path";
import { renderToPipeableStream } from "react-dom/server";
import { Link, createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import { lazy, Suspense, useState } from "react";
const RoutePath = {
  ROOT: "/",
  HOME: "/home",
  ABOUT: "/about"
};
const HomeSideBar = () => {
  return /* @__PURE__ */ jsx("p", { children: "Home Sidebar" });
};
const HomeContent = lazy(() => import("./assets/home-content-CyIwB8x-.js"));
function Home() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      "h1",
      {
        onClick: () => {
          console.log("HI");
        },
        children: "Home (SSR) other"
      }
    ),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(Link, { to: "/about", children: "About" }),
    /* @__PURE__ */ jsx(HomeSideBar, {}),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("p", { children: "loading content...." }), children: /* @__PURE__ */ jsx(HomeContent, {}) })
  ] });
}
function About() {
  const [counter, setCounter] = useState(0);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "About (SSR)",
      /* @__PURE__ */ jsx(Link, { to: "/home", children: "home" })
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          setCounter((prev) => ++prev);
        },
        children: "+"
      }
    ),
    /* @__PURE__ */ jsx("p", { children: counter }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          setCounter((prev) => --prev);
        },
        children: "-"
      }
    )
  ] });
}
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
  let [htmlS, htmlE] = html.split("<!--ssr-outlet-->");
  htmlE = htmlE.replace(
    "<!-- script -->",
    `<script async type="module" src="${clientFilePath}"><\/script>`
  );
  if (viteDevServer) {
    htmlStart = await viteDevServer.transformIndexHtml(req.url, htmlS);
    htmlEnd = await viteDevServer.transformIndexHtml(req.url, htmlE);
  }
  const stream = renderToPipeableStream(
    /* @__PURE__ */ jsx(StaticRouterProvider, { context, router }),
    {
      onShellReady() {
        res.status(200).setHeader("Content-Type", "text/html");
        res.write(htmlS);
        stream.pipe(res);
        res.write(htmlE);
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
