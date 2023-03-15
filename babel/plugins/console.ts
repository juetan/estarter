import parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import types from '@babel/types';
import template from '@babel/template';
import { declare } from '@babel/helper-plugin-utils';

// v1: 基本实现
export const v1 = (sourceCode: string) => {
  const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx'],
  });

  traverse(ast, {
    CallExpression(path) {
      if (
        types.isMemberExpression(path.node.callee) &&
        path.node.callee.object.name === 'console' &&
        ['log', 'info', 'debug'].includes(path.node.callee.property.name)
      ) {
        const { line, column } = path.node.loc.start;
        path.node.arguments.unshift(types.stringLiteral(`location: ${line}, ${column}`));
      }
    },
  });

  const { code } = generate(ast);

  console.log(code);
};

// v2: 简化实现
export const v2 = (sourceCode: string) => {
  const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx'],
  });

  const calleeNames = ['log', 'info', 'debug', 'error'].map((i) => `console.${i}`);

  traverse(ast, {
    CallExpression(path) {
      const calleeName = generate(path.node.callee).code;
      if (calleeNames.includes(calleeName)) {
        const { line, column } = path.node.loc.start;
        const arg = types.stringLiteral(`location: ${line}, ${column}`);
        path.node.arguments.unshift(arg);
      }
    },
  });

  const { code } = generate(ast);

  console.log(code);
};

// v3: 改为在前面生成单独的console语句
export const v3 = (sourceCode: string) => {
  const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx'],
  });

  const calleeNames = ['log', 'info', 'debug', 'error'].map((i) => `console.${i}`);

  traverse(ast, {
    CallExpression(path) {
      if (path.node.isNew) {
        return;
      }
      const calleeName = generate(path.node.callee).code;
      if (calleeNames.includes(calleeName)) {
        const { line, column } = path.node.loc.start;

        const node = template.expression(`console.log('location v3: ${line}, ${column}')`)();
        node.isNew = true;

        if (path.findParent((p) => p.isJSXElement())) {
          path.replaceWith(types.arrayExpression([node, path.node]));
          path.skip();
        } else {
          path.insertBefore(node);
        }
      }
    },
  });

  const { code } = generate(ast);

  console.log(code);
};

// v4: 改造为babel插件
export const v4 = declare((api, options, dirname) => {
  const callerNames = ['log', 'info', 'debug', 'error'];
  const calleeNames = callerNames.map((i) => `console.${i}`);
  const cache = new WeakMap();

  let order = 1;
  return {
    visitor: {
      CallExpression(path) {
        console.log(order++, path.node.loc?.start.line);
        if (types.isMemberExpression(path.node.callee)) {
          const { object, property } = path.node.callee;
          if (!types.isIdentifier(object) || !types.isIdentifier(property)) return;
          console.log(object.name, property.name, cache.has(path.node));
        }
        if (cache.has(path.node)) {
          return;
        }
        const calleeName = generate.default(path.node.callee).code;
        if (calleeNames.includes(calleeName)) {
          const { line, column } = path.node.loc.start;

          const expression = `console.log('v4: ${dirname} ${line}, ${column}')`;
          const node = template.expression(expression)();
          cache.set(node, true);

          if (path.findParent((p) => p.isJSXElement())) {
            path.replaceWith(types.arrayExpression([node, path.node]));
            path.skip();
          } else {
            path.insertBefore(node);
            path.insertAfter(node);
          }
        }
      },
    },
  };
});
