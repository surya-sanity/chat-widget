import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["iife"],
      name: "ChatWidget",
      fileName: () => "widget.js", // 👈 Force file name
    },
  },
});
