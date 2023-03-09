import express from 'express';

const app = express();

app.get('/', function getHome(req, res) {
  res.send('hello world');
});

app.post('/posts/:id', function getPost(req, res) {});

app.listen(2020, () => {
  console.log('App is running at http://127.0.0.1:2020/');
});

/**
 * express = createApplication => app app.get => router.route => layer { ...layer, route  } => new Route
 *
 */

// router
// const _router = {
//   params: {},
//   stack: [
//     // Layer
//     {
//       path: undefined,
//       params: undefined,
//       // Route
//       route: {
//         path: '/posts/:id',
//         methods: {
//           post: true,
//         },
//         stack: [
//           // Layer
//           {
//             path: undefined,
//             method: 'post',
//             handle: () => {}
//           }
//         ],
//         get() {
//           this.stack.push(layer);
//         }
//       }
//     }
//   ]
// }