import { program } from 'commander';
import create from './command/create.js';

program.name('estarter');
program.description('Estarter 是1个快速创建项目模板的命令行工具');
program.version('1.0.0');

program
  .command('create <project-name>')
  .description('创建1个Estarter项目')
  .option('-f, --force', '强制覆盖已存在的目录')
  .action(create);

program.parse(process.argv);
