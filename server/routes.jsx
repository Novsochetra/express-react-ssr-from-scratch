import { lazy } from "react";
import { RoutePath } from "./route-path";
const About = lazy(() => import("../client/about"));
const Home = lazy(() => import("../client/home"));
const FrontPage = lazy(() => import("../client/front-page"));

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
  {
    path: RoutePath.FRONT_PAGE,
    element: <FrontPage />,
    loader: async () => {
      return { message: "Hello from SSR!" };
    },
  },
];
