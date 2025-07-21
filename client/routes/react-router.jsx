import { lazy } from "react";

const Home = lazy(() => import("../view/home"));
const Dashboard = lazy(() => import("../view/dashboard"));
const Login = lazy(() => import("../view/login"));
const XMenuFrontPage = lazy(() => import("../view/xmenu-frontend"));

// import Home from "../view/home";
// import Dashboard from "../view/dashboard";
// import Login from "../view/login";
// import XMenuFrontPage from "../view/xmenu-frontend";

export const routes = [
  {
    path: "/",
    element: <Home />,
    moduleId: "client/view/home.tsx",
  },
  {
    path: "/home",
    element: <Home />,
    moduleId: "client/view/home.tsx",
  },
  {
    path: "/login",
    element: <Login />,
    moduleId: "/client/view/login.tsx",
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    moduleId: "client/view/dashboard.tsx",
  },
  {
    path: "/front-page",
    element: <XMenuFrontPage />,
    moduleId: "client/view/xmenu-frontend.tsx",
  },
];
