import path from "path";
import fs from "fs-extra";
import inquirer from "inquirer";
import { fileURLToPath } from "url";

const askOverride = async () => {
  const { override } = await new inquirer.prompt([
    {
      name: "override",
      type: "list",
      message: "The project is already existed, remove it?",
      choices: [
        {
          name: "yes",
          value: true,
        },
        {
          name: "no",
          value: false,
        },
      ],
    },
  ]);
  return override;
};

export default async (projectName, options) => {
  const target = path.join(process.cwd(), projectName);
  const { force } = options;

  if (fs.existsSync(target)) {
    if (force) {
      fs.removeSync(target);
    } else {
      const override = await askOverride();
      if (!override) return;
      fs.removeSync(target);
    }
  }

  fs.mkdirSync(target);

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../..",
    "template-vue"
  );

  /** 复制目录 */
  function copyDir(source, target) {
    fs.mkdir(target, { recursive: true });
    for (const file of fs.readdirSync(source)) {
      const sourceFile = path.resolve(source, file);
      const targetFile = path.resolve(target, file);
      copy(sourceFile, targetFile);
    }
  }

  /** 复制文件或目录 */
  function copy(source, target) {
    const stat = fs.statSync(source);
    if (stat.isDirectory()) {
      copyDir(source, target);
    } else {
      fs.copyFileSync(source, target);
    }
  }

  /** 写入文件 */
  const write = (file, content) => {
    const targetPath = path.join(target, file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  for (const file of files) {
    write(file);
  }

  console.log('\n Congratulations! Now run: \n');
  console.log(`  cd ${projectName}`);
  console.log(`  npm install`);
  console.log(`  npm run dev \n`);
};
