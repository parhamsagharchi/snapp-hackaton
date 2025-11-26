import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const config = {
    build: {
      commonjsOptions: {
        include: ["tailwind.config.js", "node_modules/**"],
      },
    },
    optimizeDeps: {
      include: ["tailwind-config"],
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "tailwind-config": fileURLToPath(
          new URL("./tailwind.config.js", import.meta.url)
        ),
      },
    },
    server: {
      host: true,
      port: 3000,
      open: true,
    },
    preview: {
      host: true,
      port: 3000,
      open: true,
    },
  };

  return defineConfig(config);
};
