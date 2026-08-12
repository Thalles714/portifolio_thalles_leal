import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        workflow: resolve(import.meta.dirname, "projects/workflow/index.html"),
        nitido: resolve(import.meta.dirname, "projects/nitido/index.html")
      }
    }
  }
});
