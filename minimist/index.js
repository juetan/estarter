import cac from 'cac';
import downloadGitRepo from 'download-git-repo';
import { blue, bold, green } from 'kolorist';
import ora from 'ora';
import path from 'path';
import prompts from 'prompts';

const LOGO = blue(`
███████╗███████╗████████╗ █████╗ ██████╗ ████████╗███████╗██████╗
██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗
█████╗  ███████╗   ██║   ███████║██████╔╝   ██║   █████╗  ██████╔╝
██╔══╝  ╚════██║   ██║   ██╔══██║██╔══██╗   ██║   ██╔══╝  ██╔══██╗
███████╗███████║   ██║   ██║  ██║██║  ██║   ██║   ███████╗██║  ██║
╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝`);

const getLOGO = ({ withVersion = true, emptyLine = true, descExtra = '' } = {}) => {
  return `${LOGO}${
    withVersion ? `\n\n版本: v0.0.1\n描述: 用于初始化项目的命令行工具。${descExtra}${emptyLine ? '\n' : ''}` : ''
  }`;
};

const print = (...args) => console.log(...args);

export const download = async (repo, dest, options = {}) => {
  return new Promise((resolve, reject) => {
    downloadGitRepo(repo, dest, options, (err) => {
      err ? reject(err) : resolve(null);
    });
  });
};

const app = cac('estarter');

export const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

app
  .command('init [name]', '创建新项目')
  .alias('create')
  .option('-t, --template <template>', '指定模板类型, 可选值: vue、react、node, 默认值: vue')
  .option('-f, --force', '强制移除已存在的目录, 默认值: false')
  .action(async (name, options) => {
    print(getLOGO({ withVersion: false, emptyLine: true }));
    print(`\n命令: ${blue(bold(`创建新项目 \n`))}`);

    const opts = await prompts([
      {
        type: () => (name ? null : 'text'),
        name: 'name',
        message: '请输入你要创建的项目名称',
        initial: 'app',
      },
      {
        type: () => (options.template ? null : 'select'),
        choices: [
          { title: 'Vue', value: 'vue', description: '基于vite, 包含自动导入、自动路由和初始布局的vue项目模板' },
          { title: 'React', value: 'react', description: 'React 项目' },
          { title: 'Node', value: 'node', description: 'Node 项目' },
        ],
        name: 'template',
        message: '请选择你要创建的项目类型',
        initial: 0,
      },
      {
        type: () => (name ? null : 'text'),
        name: 'targetDir',
        message: '请选择你要创建的项目目录',
        initial: (prev, answers) => (answers.name || name ? path.join('./', answers.name || name) : '.'),
      },
    ]);

    const spinner = ora(bold('正在下载项目模板，请稍等...')).start();

    // await download('juetan/templator', path.join(".", targetDir));
    await sleep(3000);

    spinner.stop();
    print(`${green('√')} ${bold(`项目模板下载完成 \n`)}`);

    print(`${bold(green('新项目创建完成!'))} 接下来你可以参照如下命令启动项目：`);
    print('  cd ./demo');
    print('  npm install');
    print('  npm run dev\n');
  });

app.command('generate <type>', '生成指定类型的模板');

app.help((args) => {
  const result = [];

  args.forEach((arg) => {
    let { title, body } = arg;

    if (body.startsWith('estarter/')) {
      return;
    }

    if (title?.startsWith('For more info')) {
      return;
    }

    if (title === 'Usage') {
      title = '用法';
      body = body.replace('$ ', '');
    }

    if (title === 'Commands') {
      title = '命令';
    }

    if (title === 'Options') {
      title = '选项';
      body = body.replace('Display version number', '查看当前版本号');
      body = body.replace('Display this message', '查看帮助信息');
      body = `${body}\n`;
    }

    result.push({ title, body });
  });

  return result;
});

app.usage('用于初始化项目的命令行工具');

console.log(getLOGO());

app.parse();
