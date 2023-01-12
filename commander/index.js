const {Command} = require('commander');

const program = new Command();

program.name('estarter');
program.description('A Estarter Commande Line Tool');
program.version('v1.0.0');

program.option('-g --global', 'Set Global Data');

program
  .command('dev <app>')
  .description('启动应用的开发环境')
  // 可选参数
  .argument('[dest]', 'dd', 'dest23')
  // 默认为true
  .option('-ts --no-typescript', '是否使用Typescript')
  // 默认值
  .option('-p, --port', '开发端口', '8080')
  // 必填
  .option('-F, --file <filePath>', '入口文件路径')
  // 选填
  .option('-E, --extension [extension]', '入口文件扩展名')
  // 操作
  .action((...arg) => {
    console.log(arg.splice(0, 2));
    console.log('App Started');
  });

program.parse(process.argv);
