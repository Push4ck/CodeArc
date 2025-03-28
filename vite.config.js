import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import NodePolyfills from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), tailwindcss(), NodePolyfills()],
  resolve: {
    alias: {
      url: "url-polyfill",
      os: "os-browserify/browser",
    },
  },
});
