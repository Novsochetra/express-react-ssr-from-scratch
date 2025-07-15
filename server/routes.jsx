import { lazy } from "react";
import { RoutePath } from "./route-path";
const About = lazy(() => import("../client/about"));
const Home = lazy(() => import("../client/home"));
const FrontPage = lazy(() => import("../client/front-page"));

export const routes = [
  {
    path: RoutePath.ROOT,
    element: <Home />,
    moduleId: "client/home.tsx",
  },
  {
    path: RoutePath.HOME,
    element: <Home />,
    moduleId: "client/home.tsx",
  },
  {
    path: RoutePath.ABOUT,
    element: <About />,
    moduleId: "client/about.tsx",
  },
  {
    path: RoutePath.FRONT_PAGE,
    element: <FrontPage />,
    moduleId: "client/front-page.jsx",
  },
  {
    path: "/home/detail",
    element: <FrontPage />,
    moduleId: "client/front-page.jsx",
  },
];
