import React, { lazy } from "react";
import { RoutePath } from "./route-path";
import Home from "../client/home";
import About from "../client/about";

export const routes = [
  {
    path: RoutePath.ROOT,
    element: <Home />,
    loader: async () => {
      return { message: "Hello from SSR!" };
    },
  },
  {
    path: RoutePath.HOME,
    element: <Home />,
    loader: async () => {
      return { message: "Hello from SSR!" };
    },
  },
  {
    path: RoutePath.ABOUT,
    element: <About />,
    loader: async () => {
      return { message: "Hello from SSR!" };
    },
  },
];
