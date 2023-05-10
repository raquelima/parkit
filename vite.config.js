import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteYaml from "@modyfi/vite-plugin-yaml";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteYaml()],
  test: {
    environment: "jsdom",
    setupFiles: "./test/setup.js",
  },
  server: {
    host: true,
  },
});
