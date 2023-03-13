import connect from 'connect';
import http from 'http';

console.log(http.METHODS);

const app = connect();

app.use(function middleware1(req, res, next) {
  console.log('middleware 1');
  // res.write("middleware 1\n");
  next();
});

app.use('/demo', function middleware2(req, res, next) {
  console.log('middleware 2');
  res.write('middleware 2\n');
  res.end('hello world');
  next();
});

app.use('/posts/', (req, res) => {
  console.log('posts/:id');
  // res.write("posts/:id\n")
  // next();
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.end('<span>hello, </span> 你好');
});

app.listen(3030, () => {
  console.log('App is running');
});

export function createStack() {
  const stack = [];

  const use = (fn) => {
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
