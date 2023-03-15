// @ts-nocheck
import { transformFileSync } from '@babel/core';
import path from 'path';
import { v4 } from './plugins/console.ts';

const result = transformFileSync(path.join('./src/index.js'), {
  plugins: [[v4, { dd: 123 }]],
  parserOpts: {
    sourceType: 'unambiguous',
    plugins: ['jsx'],
  },
});

console.log(result.code);
