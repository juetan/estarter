const fs = require('fs');
const _path = require('path');
const args = process.argv.slice(2);
const [source = '.', FileMatch, FileReplace, DirMatch, DirReplace] = args;
const path = (p) => _path.join(source, p);

/**
 * 路径
 * 目录：匹配正则，替换内容
 * 文件：匹配正则，替换内容
 */

const files = fs.readdirSync(source);
console.log(files);
console.log(args);

const Pattern = {
  Directory: {
    match: new RegExp(DirMatch || ''),
    replace: DirReplace || '',
  },
  File: {
    match: new RegExp(FileMatch) || '',
    replace: FileReplace || '',
  },
};
console.log(Pattern);

const work = () => {
  const rename = (f, {match: m, replace: r}) =>
    fs.renameSync(path(f), path(f.replace(m, r)));

  files.forEach((file) => {
    const stat = fs.statSync(path(file));
    if (stat.isDirectory()) {
      rename(file, Pattern.Directory);
    }
    if (stat.isFile()) {
      rename(file, Pattern.File);
    }
  });
};

// work();
