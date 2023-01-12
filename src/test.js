const add = (x, y) => {
  return x + y;
};

const sub = (x, y) => {
  return x - y;
};

// global.add = add;
// @ts-ignore
global.sub = sub;

// export { add, sub }
