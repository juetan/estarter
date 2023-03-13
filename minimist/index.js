import cac from 'cac';
import prompts from 'prompts';
import ora from 'ora';
import { blue, green, bold } from 'kolorist';
import path from 'path';
import downloadGitRepo from 'download-git-repo';

const LOGO = `
███████╗███████╗████████╗ █████╗ ██████╗ ████████╗███████╗██████╗
██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗
█████╗  ███████╗   ██║   ███████║██████╔╝   ██║   █████╗  ██████╔╝
██╔══╝  ╚════██║   ██║   ██╔══██║██╔══██╗   ██║   ██╔══╝  ██╔══██╗
███████╗███████║   ██║   ██║  ██║██║  ██║   ██║   ███████╗██║  ██║
╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
`;

const getLOGO = ({ withVersion = true } = {}) => {
  return blue(`${LOGO}${withVersion ? '\n版本: v0.0.1\n描述: 用于初始化项目的命令行工具\n' : ''}`);
};

export const download = async (repo, dest, options = {}) => {
  return new Promise((resolve, reject) => {
    downloadGitRepo(repo, dest, options, (err) => (err ? reject(err) : resolve(null)));
  });
};

const app = cac('estarter');

export const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

app
  .command('create [name]', '创建新项目')
  .alias('init')
  .option('-t, --template <template>', '指定模板类型, 可选值: vue、react、node')
  .option('-f, --force', '强制移除已存在的目录')
  .action(async (name, options) => {
    console.log(`命令: ${blue(bold(`创建新项目 \n`))}`);

    await prompts([
      {
        type: () => (name ? null : 'text'),
        name: 'name',
        message: '请输入你要创建的项目名称',
        initial: 'my-project',
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

    // console.log(`你输入的参数为：${opts.name}`);

    const spinner = ora(bold('正在下载项目模板，请稍等...')).start();

    // await download('juetan/templator', 'demo')

    // download('juetan')
    spinner.stop();
    console.log(`${green('√')} ${bold(`项目模板下载完成 \n`)}`);

    console.log(`${bold(green('创建成功!'))} 接下来你可以参照如下命令启动项目：`);
    console.log('  cd ./demo');
    console.log('  npm install');
    console.log('  npm run dev');
    console.log('');
  });

app.command('generate <type>', '生成指定类型的模板');

// console.log(`${LOGO}`);

//   版本: v1.0.0
//  用法: estarter [选项] [命令]
//  帮助: estarter -h [命令]

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

// app.outputHelp("dd")

// app.option("-v, --version", "显示版本号", { default: false }).

app.version('0.0.1');

app.usage('用于初始化项目的命令行工具');

console.log(getLOGO());

app.parse();

// const args = minimist(process.argv.slice(2), {})

// console.log(args);
