import connect from 'connect';

const app = connect();

app.use((req, res, next) => {
  console.log('middleware 1');
  next();
});

app.use('/demo', (req, res, next) => {
  console.log('middleware 2');
  res.write('middleware 2\n');
  res.end('hello world');
  next();
});

app.use('/posts/', (req, res) => {
  console.log('posts/:id');
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.end('<span>hello, </span> 你好');
});

app.listen(3030, () => {
  console.log('App is running');
});
