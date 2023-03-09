import fs from "fs";
import path from "path";

export const readDirTree = (dirPath) => {
  const names = fs.readdirSync(dirPath);
  return names.map((name) => {
    const children = [];
    const filePath = path.join(dirPath, name);
    if (fs.statSync(filePath).isDirectory()) {
      children.push(...readDirTree(filePath));
    }
    return { name, path: filePath, children };
  });
};

const a = readDirTree(path.resolve("../rollup"));
console.log(JSON.stringify(a));
