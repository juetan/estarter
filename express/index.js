import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(2020, () => {
  console.log('App is running at http://127.0.0.1:2020/');
});
