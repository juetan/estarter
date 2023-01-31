import { defineConfig } from "vite";
import { plugin } from "./plugin";

export default defineConfig({
  build: {
    lib: {
      entry: "module-b.ts",
      name: "Todo",
      formats: ["es"],
    },
    rollupOptions: {},
  },
  esbuild: {
    banner: "//2dsesbuild",
  },
  plugins: [plugin()],
});
