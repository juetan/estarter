const { Project } = require("ts-morph");
const { SyntaxKind } = require("ts-morph");

const sourcePath = "I:\\workspaces\\zhuji-web\\src\\api\\service\\index.ts";

const main = () => {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(sourcePath);

  const members = sourceFile.getClass("Api")?.getProperties();
  const map1 = {};
  const interfaces = sourceFile.getInterfaces();

  members?.forEach((member) => {
    const L1Name = member.getName();
    const initer = member.getInitializer();
    if (!initer?.isKind(SyntaxKind.ObjectLiteralExpression)) return;

    initer?.getProperties().forEach((i) => {
      if (!i.isKind(SyntaxKind.PropertyAssignment)) return;
      const L2Name = i.getName();
      const fn = i.getInitializer();
      if (!fn?.isKind(SyntaxKind.ArrowFunction)) return;
      const fnBody = fn.getBody();
      if (!fnBody.isKind(SyntaxKind.CallExpression)) return;

      const arg1 = fnBody.getTypeArguments()[0];
      if (!arg1.isKind(SyntaxKind.TypeReference)) return;
      const b = interfaces.find((i) => i.getName() === arg1.getText());
      if (!b?.isKind(SyntaxKind.InterfaceDeclaration)) return;
      const data = b.getProperty("data");
      if (!data?.isKind(SyntaxKind.PropertySignature)) return;
      const dataNode = data.getTypeNode();
      if (!dataNode?.isKind(SyntaxKind.TypeReference)) return;
      const intface = interfaces.find((i) => i.getName() === dataNode.getText());
      const d2 = intface?.getProperty("list");
      if (!d2?.isKind(SyntaxKind.PropertySignature)) return;
      const d3 = interfaces.find((i) => i.getName() === d2?.getTypeNode()?.getText().replace('\[\]', ''));
      // console.log( d2?.getTypeNode()?.getText())



      const resTypes = d3?.getProperties().map((property) => {
        const dataIndex = property.getName();
        const jsDocs = property.getJsDocs().map((i) => i.getStructure())[0];
        const title = (typeof jsDocs?.description === "string" ? jsDocs.description : dataIndex)
          .replace("\r\n", "")
          .replace(/（.*）/, "");
        return { title, dataIndex };
      });

      const prop = `api.${L1Name}.${L2Name}`
      if(!map1[prop]) {
        map1[prop] = {}
      }

      // map1[`api.${L1Name}.${L2Name}`] = fnBody.getTypeArguments()[0].getText();
      map1[prop] = resTypes;
    });
  });

  console.log(map1, Object.keys(map1).length);
};

main();
