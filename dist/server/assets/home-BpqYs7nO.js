import { jsx, jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from "react";
import { Link } from "react-router";
const HomeSideBar = () => {
  return /* @__PURE__ */ jsx("p", { children: "Home Sidebar" });
};
const HomeContent = lazy(() => import("./home-content-CyIwB8x-.js"));
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
export {
  Home as default
};
