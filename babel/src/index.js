// @ts-nocheck

console.log(1);

export function func() {
  console.info(2);
}

export default class Clazz {
  static say() {
    console.debug(3);
  }

  static render() {
    return <div>{console.error(4)}</div>;
  }
}
