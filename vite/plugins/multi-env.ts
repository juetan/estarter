import { Plugin } from 'vite';

export default function multiEnvPlugin(): Plugin {
  return {
    name: 'multi-env',
    enforce: 'pre',

    async resolveId(id, importer, options) {
      const resolvedId = await this.resolve(id, importer, { ...options, skipSelf: true });
      if (resolvedId && resolvedId.id.endsWith('b.ts')) {
        return resolvedId.id.replace('b.ts', 'b.er.ts');
      }
      return null;
    },
  };
}
