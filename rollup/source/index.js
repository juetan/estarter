// @ts-nocheck
// import { add } from "./a";
// import b from './b.png';

const todo = async () => {
  const { add } = await import('./a');
  return add(1, 2);
};

console.log(todo(1, 2));
