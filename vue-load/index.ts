import express from 'express';
import fs from 'fs/promises';
import { parse, compileScript, compileTemplate, compileStyle, SFCTemplateCompileOptions } from 'vue/compiler-sfc';

const app = express();

const replaceVue = (content: string) => content.replace(/from ('|")vue('|")/, `from '/vue'`);

app.get('/', async (req, res) => {
  const content = await fs.readFile('./index.html', 'utf-8');
  res.header('Content-Type', 'text/html');
  res.end(content);
});

app.get('/main.ts', async (req, res) => {
  const content = await fs.readFile('./main.ts', 'utf-8');
  res.header('Content-Type', 'text/javascript');
  res.end(replaceVue(content));
});

app.get('/vue', async (req, res) => {
  const content = await fs.readFile('../node_modules/vue/dist/vue.esm-browser.prod.js', 'utf-8');
  res.header('Content-Type', 'text/javascript');
  res.end(content);
});

app.get('/App.vue', async (req, res) => {
  const content = await fs.readFile('./App.vue', 'utf-8');

  const { descriptor } = parse(content);

  const templateOptions: SFCTemplateCompileOptions = {
    id: 'data-v-pref',
    filename: 'App.vue',
    isProd: true,
    source: descriptor.template.content,
    scoped: true,
    slotted: true,
    compilerOptions: {
      scopeId: 'data-v-pref',
    },
  };

  const script = compileScript(descriptor, { id: 'pref', templateOptions });

  const template = compileTemplate({
    ...templateOptions,
    compilerOptions: { scopeId: 'data-v-pref', bindingMetadata: script.bindings },
  });

  let styles = descriptor.styles
    .map((style) => {
      const css = compileStyle({ id: 'data-v-pref', source: style.content, filename: 'App.vue', scoped: true });
      return css.code;
    })
    .join('\n');

  res.header('Content-Type', 'text/javascript');

  if (/type=template/.test(req.url)) {
    return res.end(replaceVue(template.code));
  }

  if (/type=style/.test(req.url)) {
    styles = `
      const style = document.createElement('style');
      style.innerHTML = ${JSON.stringify(styles)};
      document.head.appendChild(style);
    `;
    return res.end(styles);
  }

  const contents = `
    import { render } from '/App.vue?type=template';
    import '/App.vue?type=style';
    ${replaceVue(script.content.replace('export default', 'const _default_ ='))};

    _default_.render = render;

    export default _default_;
  `;

  res.end(replaceVue(contents));
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});

// 模拟@vite/plugin-vue插件加载vue文件的过程。

// parse(code) 会返回一个 SFCDescriptor 对象, 包含
// template: SFCBlock;
// script: SFCBlock;
// styles: SFCBlock[];
// customBlocks: SFCBlock[];

// 访问/ 时，返回index.html,
// 并且在index.html中引入main.ts,
// main.ts中引入App.vue。
// App.vue 返回 script 的内容, 并且在script中加载template和style。template和style中也引用了vue。
// 其中template 以 /App.vue?type=template 的方式返回。
// style 以 /App.vue?type=style 的方式返回。
// 共涉及到三个文件的处理，分别是index.html, main.ts, App.vue。实际上有6个请求，分别是
// /index.html
// /main.ts,
// /vue
// /App.vue
// /App.vue?type=template
// /App.vue?type=style。

// TODO:
// css scoped;
// script setup;
