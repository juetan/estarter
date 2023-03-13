// @ts-nocheck

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const template = require('@babel/template').default;
const { declare } = require('@babel/helper-plugin-utils');

const sourceCode = `
  console.log(1);

  function func() {
      console.info(2);
  }

  export default class Clazz {
      say() {
          console.debug(3);
      }
      render() {
          return <div>{console.error(4)}</div>
      }
  }
`;

// v1: 基本实现
const v1 = (sourceCode) => {
  const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx'],
  });

  traverse(ast, {
    CallExpression(path, state) {
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
const v2 = (sourceCode) => {
  const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx'],
  });

  const calleeNames = ['log', 'info', 'debug', 'error'].map((i) => `console.${i}`);

  traverse(ast, {
    CallExpression(path, state) {
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
const v3 = (sourceCode) => {
  const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx'],
  });

  const calleeNames = ['log', 'info', 'debug', 'error'].map((i) => `console.${i}`);

  traverse(ast, {
    CallExpression(path, state) {
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
const v4 = declare((api, options, dirname) => {
  const { types, template } = api;
  const callerNames = ['log', 'info', 'debug', 'error'];
  const calleeNames = callerNames.map((i) => `console.${i}`);

  console.log(options);
  return {
    visitor: {
      CallExpression(path, state) {
        if (path.node.isNew) {
          return;
        }
        const calleeName = generate(path.node.callee).code;
        if (calleeNames.includes(calleeName)) {
          const { line, column } = path.node.loc.start;

          const expression = `console.log('v4: ${dirname} ${line}, ${column}')`;
          const node = template.expression(expression)();
          node.isNew = true;

          if (path.findParent((p) => p.isJSXElement())) {
            path.replaceWith(types.arrayExpression([node, path.node]));
            path.skip();
          } else {
            path.insertBefore(node);
          }
        }
      },
    },
  };
});

// v3(sourceCode);

exports.plugin = v4;
