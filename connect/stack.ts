export function createStack() {
  const stack = [];

  const use = (fn: (next: () => void) => void) => {
    stack.push(fn);
  };

  const start = () => {
    let index = 0;
    console.log('stack: start');

    const next = () => {
      const fn = stack[index];
      index += 1;
      if (!fn) {
        console.log('stack: done');
        return;
      }
      fn(next);
    };

    next();
  };

  return { use, start };
}

export function run() {
  const stack = createStack();

  stack.use((next) => {
    setTimeout(() => {
      console.log('middleware 1 ');
      next();
    }, 1000);
  });

  stack.use((next) => {
    setTimeout(() => {
      console.log('middleware 2');
      next();
    }, 1000);
  });

  stack.use((next) => {
    setTimeout(() => {
      console.log('middleware 2');
      next();
    }, 1000);
  });

  stack.start();
}

// run();
