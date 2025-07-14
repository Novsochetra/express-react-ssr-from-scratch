import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router";
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
export {
  About as default
};
