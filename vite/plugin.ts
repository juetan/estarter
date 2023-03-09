import fs, { readFileSync } from "fs";
import { basename, join } from "path";
import { ResolvedConfig } from "vite";
import { PluginOption, loadEnv } from "vite";
const MODULE_ID = "virtual:app.ts";
const MODULE_CONTENT = `export const sub = (x: number, y: number) => x - y;`;

const includeExtesion = [".js", ".ts", ".jsx", ".tsx", ".vue", ".json"];

export const plugin = (): PluginOption => {
  const assets: string[] = [];
  let config: ResolvedConfig;

  return {
    name: "vite-plugin-a",
    enforce: "pre",

    // https://cn.vitejs.dev/guide/api-plugin.html#configresolved
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    // https://rollupjs.org/plugin-development/#resolveid
    async resolveId(id, importer, options) {
      console.log(arguments);

      // 自定义模块(不存在的路径)
      if (id === "app") {
        return MODULE_ID;
      }

      // 外部模块(不需要打包)
      if (id === "path") {
        return {
          external: true,
          id: "path",
        };
      }

      // 加载同一文件名不同后缀的文件
      const ext = config.env.VITE_EXTENSION;
      if (ext) {
        const resolution = await this.resolve(id, importer, { skipSelf: true, ...options });
        const targetPath = resolution?.id.replace(/\.([^\.]*?)$/, `.${ext}.$1`);
        console.log({ targetPath });

        if (targetPath && fs.existsSync(targetPath)) {
          return targetPath;
        }
      }
    },

    // load(id) {
    //   if (id === MODULE_ID) {
    //     return { code: MODULE_CONTENT };
    //   }
    //   if (id.endsWith(".png")) {
    //     return join(".", id);
    //   }
    // },

    // transform(code, id) {
    //   if (id === "virtual:app.ts") {
    //     return code + "export const a = 1;";
    //   }
    //   if (id.endsWith(".png")) {
    //     assets.push(id);
    //     return `export default "${id}"`;
    //   }
    //   return code;
    // },

    // configureServer(server) {
    //   server.middlewares.use("/config", (req, res) => {
    //     res.write("todo");
    //     res.end();
    //   });
    // },

    // renderChunk(code, chunk) {
    //   console.log(code);
    //   console.log(chunk);
    //   return code;
    // },

    // async generateBundle(options, bundle) {
    //   console.log(bundle);
    //   this.emitFile({
    //     type: "asset",
    //     source: readFileSync(assets[0]),
    //     name: "d113",
    //     fileName: basename(assets[0]),
    //   });
    // },
  };
};
