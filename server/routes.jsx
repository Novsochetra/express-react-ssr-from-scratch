import { lazy } from "react";
import { RoutePath } from "./route-path";
const About = lazy(() => import("../client/about"));
const RequireAuth = lazy(() => import("../client/components/required-auth"));
const Home = lazy(() => import("../client/home"));
const HomeDetail = lazy(() => import("../client/view/home-detail"));
const FrontPage = lazy(() => import("../client/front-page"));
const Login = lazy(() => import("../client/view/login"));

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
    path: RoutePath.HOME_DETAIL,
    element: (
      <RequireAuth>
        <HomeDetail />
      </RequireAuth>
    ),
    moduleId: "client/front-page.jsx",
  },
  {
    path: RoutePath.LOGIN,
    element: <Login />,
    moduleId: "client/view/login.tsx",
  },
];
