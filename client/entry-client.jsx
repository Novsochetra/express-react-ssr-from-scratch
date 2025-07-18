import { hydrateRoot } from "react-dom/client";
import { startTransition } from "react";
import { getPageComponent } from "./routes/custom-route";

const Page = getPageComponent(window.__SSR_PATH__); // Injected from server

startTransition(() => hydrateRoot(document.getElementById("root"), Page));
