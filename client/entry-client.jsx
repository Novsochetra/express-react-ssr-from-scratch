import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "../server/routes";
import { startTransition } from "react";

const router = createBrowserRouter(routes);

startTransition(() =>
  hydrateRoot(
    document.getElementById("root"),
    <RouterProvider router={router} />
  )
);
