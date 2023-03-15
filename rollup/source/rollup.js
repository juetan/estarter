import { rollup } from 'rollup';

const build = await rollup({
  input: 'index.js',
});

const { output } = await build.generate({
  format: 'esm',
});

console.log(output);
