import { createServer } from "vite";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { setupMockServer } from "../mock/server.js";
import { developmentBaseUrl } from "../mock/conf.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function setupViteDevServer() {
  const server = await createServer({
    configFile: path.join(__dirname, "..", "vite.config.js"),
    root: path.join(__dirname, ".."),
    server: {
      port: 1234,
      proxy: {
        "/api": {
          target: developmentBaseUrl,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });

  await server.listen();

  server.printUrls();
}

setupMockServer();
await setupViteDevServer();
