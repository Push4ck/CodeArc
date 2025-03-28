import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    EnvironmentPlugin(["NODE_ENV"]), // Add environment variables you use
  ],
});
