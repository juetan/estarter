import { parse, compileScript, compileTemplate, compileStyle, MagicString  } from "vue/compiler-sfc";
import fs from "fs";

const uid = () => Math.random().toString(36).slice(2, 12);
const code = fs.readFileSync("./button.vue", { encoding: "utf-8" });

const start = async () => {
  // 解析vue文件
  const { descriptor } = parse(code);

  const id = uid();
  const hasScoped = descriptor.styles.some(i => i.scoped)
  const scopeId = hasScoped && `data-v-${id}`
  const templateOptions = {
    id,
    source: descriptor.template?.content || '',
    filename: descriptor.filename,
    hasScoped,
    scopeId,
    slotted: descriptor.slotted,
    compileOptions: {
      scopeId,
      mode: 'module'
    }
  }

  // 编译script
  const script = compileScript(descriptor, { id, templateOptions,  });

  // 编译template
  const template = compileTemplate(templateOptions)

  // 编译style，可能有多个style
  const styles = descriptor.styles.map(style => {
    return compileStyle({
      id,
      filename: descriptor.filename,
      source: style.content,
      scoped: style.scoped,
    })
  })

  console.log(script);

  fs.writeFileSync("./code.js", `${template.code} \n ${script.content}`);
};

const demo = () => {
  const str = new MagicString(code);

  str.appendLeft(0, 'const code = "123"; \n');

  console.log(str.generateMap());

  console.log(str.toString());
}

demo();
