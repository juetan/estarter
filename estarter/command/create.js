import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import {fileURLToPath} from 'url';
import chalk from 'chalk';

const askOverride = async () => {
  const {override} = await inquirer.prompt([
    {
      name: 'override',
      type: 'confirm',
      message: '检测到文件夹已存在，是否移除?',
      default: true,
      validate: (input) => '已退出',
    },
  ]);
  return override;
};

export default async (dirName, options) => {
  const dirPath = path.join(process.cwd(), dirName);
  const {force} = options;

  if (fs.existsSync(dirPath)) {
    if (force) {
      fs.removeSync(dirPath);
    } else {
      const override = await askOverride();
      if (!override) return;
      fs.removeSync(dirPath);
    }
  }
  fs.mkdirSync(dirPath);

  const cwd = fileURLToPath(import.meta.url);
  const templateDir = path.resolve(cwd, '../../template-vue');

  function copy(fromPath, destPath) {
    const stat = fs.statSync(fromPath);
    if (stat.isFile()) {
      fs.copyFileSync(fromPath, destPath);
    }
    if (stat.isDirectory()) {
      fs.mkdirSync(destPath, {recursive: true});
      for (const fileName of fs.readdirSync(fromPath)) {
        const iFromPath = path.resolve(fromPath, fileName);
        const iDestPath = path.resolve(destPath, fileName);
        copy(iFromPath, iDestPath);
      }
    }
  }
  copy(templateDir, dirPath);

  console.log(`\n ${chalk.green('创建完成，现在你可以运行以下命令：')} \n`);
  console.log(` cd ${dirName}`);
  console.log(` npm install`);
  console.log(` npm run dev \n`);
};
