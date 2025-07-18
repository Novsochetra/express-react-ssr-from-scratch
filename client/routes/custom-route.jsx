import { lazy } from "react";

const Home = lazy(() => import("../view/home"));
const Dashboard = lazy(() => import("../view/dashboard"));
const Login = lazy(() => import("../view/login"));
const XMenuFrontPage = lazy(() => import("../view/xmenu-frontend"));

export const routes = new Map([
  ["/", { element: <Home />, moduleId: "client/view/home.tsx" }],
  ["/home", { element: <Home />, moduleId: "client/view/home.tsx" }],
  ["/login", { element: <Login />, moduleId: "/client/view/login.tsx" }],
  [
    "/dashboard",
    { element: <Dashboard />, moduleId: "client/view/dashboard.tsx" },
  ],
  [
    "/front-page",
    { element: <XMenuFrontPage />, moduleId: "client/view/xmenu-frontend.tsx" },
  ],
]);

export function getPageComponent(path) {
  if (routes.has(path)) {
    return routes.get(path).element;
  }

  return <h1>404 Not Found</h1>;
}
