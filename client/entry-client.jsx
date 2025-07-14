import React from "react";
import { hydrateRoot } from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  createMemoryRouter,
  Router,
  RouterProvider,
} from "react-router";
import { routes } from "../server/routes";

const router = createBrowserRouter(routes);

hydrateRoot(
  document.getElementById("root"),
  <RouterProvider router={router} />
);
