// @ts-nocheck

// import { add as add1 } from "./module-a";
import png from "./123.png";
import { sub } from "app";
import { join } from "path";

console.log('start');

const add = async () => {
  return await import("./" + "module" + "-a");
};

export { add, sub, join, png };
