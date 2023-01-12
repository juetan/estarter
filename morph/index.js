// @ts-nocheck
const {Project} = require('ts-morph');
const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, './code/source.ts');
const target = path.join(__dirname, './code/target.json');

const project = new Project();
const sourceFile = project.addSourceFileAtPath(source);

const transform = () => {
  if (!sourceFile) return [];

  const interfaces = sourceFile.getInterfaces();
  return interfaces.map((item) => {
    const name = item.getName();
    const children = item.getProperties().map((property) => {
      const name = property.getName();
      const type = property.getTypeNode().getText();
      const isOptionnal = property.getQuestionTokenNode()?.getText() === '?';
      const jsDocs = property.getJsDocs().map((i) => i.getStructure())[0];

      return {name, type, isOptionnal, jsDocs};
    });
    return {name, children};
  });
};

const data = transform();
console.log(data);

fs.writeFileSync(target, JSON.stringify(data));
