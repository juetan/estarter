// @ts-nocheck
const { Project } = require("ts-morph");
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const sourcePath = "I:\\workspaces\\zhuji-web\\src\\api\\service\\index.ts";

const main = () => {
  let text = "";

  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(sourcePath);
  console.log(sourceFile);

  const interFace = sourceFile.getInterfaces().find((i) => i.getName() === process.argv[2]);
  if (!interFace) return;

  const children = interFace.getProperties().map((property) => {
    const dataIndex = property.getName();
    const type = property.getTypeNode().getText();
    const isOptionnal = property.getQuestionTokenNode()?.getText() === "?";
    const jsDocs = property.getJsDocs().map((i) => i.getStructure())[0];
    const title = (jsDocs?.description || dataIndex).replace("\r\n", "").replace(/（.*）/, "");

    text += `\n { \n title: '${title}', \n dataIndex: '${dataIndex}', \n },`;
  });

  fs.writeFileSync("./g.txt", text);
};

main();
