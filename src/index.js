<<<<<<< HEAD
// import minimist from 'minimist'
// import {add, sub} from './test.js';
require('./test.js')

console.log(add(1, 2), sub(1, 3));
=======
<<<<<<<< HEAD:src/index.js
import chalk from "chalk";
import { program } from "commander";
import create from "./create.js";


program.name("gostarter").usage("<command> [option]").version('1.0.0');
========
import chalk from 'chalk';
import {program} from 'commander';
import create from '../lib/create.js';

program.name('estarter').usage('<command> [option]').version('1.0.0');
>>>>>>>> 3c2c2a6135b27d38d311f9f7f5d1ead20856a9a9:bin/index.js

program
  .command('create <project-name>')
  .description('create a new project')
  .option('-f, --force', 'override trage directory if it exists')
  .action(create);

program
  .command('config [value]')
  .description('inspect or modify the config')
  .option('-g, --get <key>', 'get config by key')
  .option('-s, --set <key> <value>', 'set config with key and value')
  .option('-d, --delete <key>', 'delete config by key')
  .action((value, keys) => {
    console.log(value, keys);
  });

program.on('--help', () => {
  console.log();
  console.log(
    `Run ${chalk.cyan(
      'estarter <command> --help',
    )} for detailed usage of given command.`,
  );
  console.log();
});

program.parse(process.argv);
>>>>>>> 3c2c2a6135b27d38d311f9f7f5d1ead20856a9a9
