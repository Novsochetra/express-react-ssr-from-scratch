import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/public",
  build: {
    ssr: false,
    outDir: "dist/client",
    rollupOptions: {
      input: path.resolve(__dirname, "client/entry-client.jsx"),
    },
  },
});
