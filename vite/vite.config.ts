import { defineConfig } from "vite";
import { plugin } from "./plugin";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '.'
      }
    ]
  },
  build: {
    lib: {
      entry: "a.module.ts",
      name: "Todo",
      formats: ["es"],
      fileName: 'index'
    },
    rollupOptions: {},
  },
  esbuild: {
    // banner: "//2dsesbuild",
  },
  plugins: [plugin()],
});
