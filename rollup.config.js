import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import isBuiltIn from 'is-builtin-module';
import { terser } from 'rollup-plugin-terser';

/** @type {import('rollup').RollupOptions} */
export default {
  input: "./src/index.js",
  output: {
    file: "./dist/index.js",
    plugins: [terser()]
  },
  plugins: [
    json(),
    nodeResolve({
      resolveOnly: (module) => module === 'string_decoder' || !isBuiltIn(module),
      preferBuiltins: false,
      exportConditions: ["node"]
    }),
    commonjs()
  ]
}