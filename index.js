import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(2020, () => {
  console.log('App is running at http://127.0.0.1:2020/');
});

const listToTree = (list) => {
  const result = [];
  const map = {};
  for (const item of list) {
    const {id, pid} = item;
    if (!map[id]) {
      map[id] = [];
    }
    if (pid === 0) {
      result.push(item);
    } else {
      map[pid] ? map[pid].push(item) : (map[pid] = [item]);
    }
    item.children = map[id];
  }
  return result;
};
