import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteJsObfuscator from "@sochetra-nov/vite-plugin-js-obfuscator";

import path from "path";

export default defineConfig({
  plugins: [
    react(),
    viteJsObfuscator({
      compact: true,
      controlFlowFlattening: true,
      debugProtection: false,
      debugProtectionInterval: 1000,
      selfDefending: true,
    }),
  ],
  base: "/public",
  build: {
    ssr: false,
    outDir: "dist/client",
    rollupOptions: {
      input: path.resolve(__dirname, "client/entry-client.jsx"),
    },
  },
});
