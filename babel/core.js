// @ts-nocheck
const { transformFileSync } = require('@babel/core');
const path = require('path');
const { plugin: consolePlugin } = require('./plugin-console');

const result = transformFileSync(path.join(__dirname, './code/source.js'), {
  plugins: [[consolePlugin, { dd: 123 }]],
  parserOpts: {
    sourceType: 'unambiguous',
    plugins: ['jsx'],
  },
});

console.log(result.code);
