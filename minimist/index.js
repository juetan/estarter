import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist';
import enquirer from 'enquirer';
import { blue, bold, green } from 'kolorist';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOGO = blue(`
 ________       ______     ______     _________   ________      ______     __  __
/_______/\\     /_____/\\   /_____/\\   /________/\\ /_______/\\    /_____/\\   /_/\\/_/\\
\\::: _  \\ \\    \\:::_ \\ \\  \\:::_ \\ \\  \\__.::.__\\/ \\__.::._\\/    \\::::_\\/_  \\ \\ \\ \\ \\
 \\::(_)  \\ \\    \\:(_) \\ \\  \\:(_) \\ \\    \\::\\ \\      \\::\\ \\      \\:\\/___/\\  \\:\\_\\ \\ \\
  \\:: __  \\ \\    \\: ___\\/   \\: ___\\/     \\::\\ \\     _\\::\\ \\__    \\:::._\\/   \\::::_\\/
   \\:.\\ \\  \\ \\    \\ \\ \\      \\ \\ \\        \\::\\ \\   /__\\::\\__/\\    \\:\\ \\       \\::\\ \\
    \\__\\/\\__\\/     \\_\\/       \\_\\/         \\__\\/   \\________\\/     \\_\\/        \\__\\/
`);

const print = (...args) => console.log(...args);

const start = async () => {
  const options = minimist(process.argv.slice(2));
  const $name = options._[0];
  const $template = options.t || options.template;

  print(LOGO);

  const answers = await enquirer.prompt([
    {
      name: 'name',
      type: 'text',
      message: '请输入你要创建的项目名称',
      initial: 'app',
      skip: () => !!$name,
    },
    {
      name: 'template',
      message: '请选择你要创建的项目类型',
      type: 'select',
      choices: [
        { name: 'vue', value: 'vue', hint: '  - 基于vite, 包含自动导入、自动路由和初始布局的vue项目模板' },
        { name: 'react', value: 'react', hint: '- React 项目' },
        { name: 'node', value: 'node', hint: ' - Node 项目' },
      ],
      initial: 0,
      skip: () => !!$template,
    },
  ]);

  const name = $name || answers.name;
  const template = $template || answers.template;

  fs.cpSync(path.join(__dirname, `./template-${template}`), path.join(process.cwd(), `./${name}`), { recursive: true });

  print(`${bold(green('\n创建完成!'))} 接下来你可以参照如下命令启动项目：`);
  print('  cd ./demo');
  print('  npm install');
  print('  npm run dev\n');
};

start().catch(console.log);
