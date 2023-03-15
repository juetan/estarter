import { defineConfig } from 'vite';
import plugin from './plugins/multi-env.ts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/a.ts',
      name: 'Todo',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {},
  },
  plugins: [plugin()],
});
