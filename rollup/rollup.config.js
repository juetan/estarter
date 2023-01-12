import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import juetan from './plugin/vitural';

/**  @type { import('rollup').RollupOptions } */
const buildOptions = {
  input: ['source/index.js', 'source/util.js'],
  output: [
    {
      dir: 'target/esm',
      format: 'esm',
    },
    {
      dir: 'target/cjs',
      format: 'cjs',
    },
  ],
  plugins: [resolve(), commonjs(), json(), juetan('plugin juetan')],
};

export default buildOptions;
