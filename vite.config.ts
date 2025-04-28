import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "url"; // for __dirname replacement
import { dirname, resolve } from "path";

// Use import.meta.url to get the current directory path
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ChatWidget",
      fileName: "widget",
      formats: ["iife"], // output format for embeddable script
    },
    rollupOptions: {
      output: {
        globals: {},
      },
    },
    outDir: "dist", // specify the output folder
    emptyOutDir: true, // clean the dist folder
  },
});
