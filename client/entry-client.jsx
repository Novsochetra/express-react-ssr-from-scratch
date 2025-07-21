import { startTransition } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { hydrateRoot } from "react-dom/client";
import { routes } from "./routes/react-router";

const router = createBrowserRouter(routes);

startTransition(() =>
  hydrateRoot(
    document.getElementById("root"),
    <RouterProvider router={router} />
  )
);
