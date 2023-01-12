const moduleName = 'juetan';
const moduleContent = (c) => `export default "${c}"`;

/** @returns { import('rollup').Plugin } */
export default function PluginVirtual(content = 'virtaul content') {
  return {
    name: 'plugin:virtual',
    resolveId(source) {
      if (source === moduleName) {
        return source;
      }
      return null;
    },
    load(id) {
      if (id === moduleName) {
        return moduleContent(content);
      }
      return null;
    },
  };
}
