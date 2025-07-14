import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    outDir: "dist/server",
    rollupOptions: {
      input: path.resolve(__dirname, "server/entry-server.jsx"),
    },
  },
});
