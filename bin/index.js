#! /usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import create from "../lib/create.js";
import pkg from "../package.json" assert { type: "json" };

program.name("gostarter").usage("<command> [option]").version(pkg.version);

program
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "override trage directory if it exists")
  .action(create);

program
  .command("config [value]")
  .description("inspect or modify the config")
  .option("-g, --get <key>", "get config by key")
  .option("-s, --set <key> <value>", "set config with key and value")
  .option("-d, --delete <key>", "delete config by key")
  .action((value, keys) => {
    console.log(value, keys);
  });

program.on("--help", () => {
  console.log();
  console.log(
    `Run ${chalk.cyan(
      "gostarter <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});

program.parse(process.argv);
