// @ts-nocheck
const { transformFileSync } = require("@babel/core");
const { plugin: consolePlugin } = require("./plugin-console");
const path = require("path");

const result = transformFileSync(path.join(__dirname, "./code/source.js"), {
  plugins: [[consolePlugin, { dd: 123 }]],
  parserOpts: {
    sourceType: "unambiguous",
    plugins: ["jsx"],
  },
});

console.log(result.code);

/**
 * JS Parser 历史
 * esprima 基于SpiderMonkey的AST标准, 后来形成Estree标准 => acorn解析器(A tiny, fast JavaScript parser, written completely in JavaScript)
 * espree Eslint Fork自esprima
 * acorn Estree标准的实现
 *
 * 其他： terser typescript
 */
