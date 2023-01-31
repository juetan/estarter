import { readFileSync } from "fs";
import { basename, join } from "path";
import { PluginOption } from "vite";
const MODULE_ID = "virtual:app.ts";
const MODULE_CONTENT = `export const sub = (x: number, y: number) => x - y;`;

export const plugin = (): PluginOption => {
  const assets: string[] = [];

  return {
    name: "vite-plugin-a",
    enforce: "pre",

    resolveId(id) {
      if (id === "app") {
        return MODULE_ID;
      }
      if (id === "path") {
        return {
          external: true,
          id: "path",
        };
      }
    },

    load(id) {
      if (id === MODULE_ID) {
        return { code: MODULE_CONTENT };
      }
      if (id.endsWith(".png")) {
        return join(".", id);
      }
    },

    transform(code, id) {
      if (id === "virtual:app.ts") {
        return code + "export const a = 1;";
      }
      if (id.endsWith(".png")) {
        assets.push(id);
        return `export default "${id}"`;
      }
      return code;
    },

    configureServer(server) {
      server.middlewares.use("/config", (req, res) => {
        res.write("todo");
        res.end();
      });
    },

    renderChunk(code, chunk) {
      console.log(code);
      console.log(chunk);
      return code;
    },

    async generateBundle(options, bundle) {
      console.log(bundle);
      this.emitFile({
        type: "asset",
        source: readFileSync(assets[0]),
        name: "d113",
        fileName: basename(assets[0]),
      });
    },
  };
};
