import { compile, createApp, h } from 'vue';
import App from './App.vue';

// const app = createApp({
//   render() {
//     return h('div', null, 'hello world');
//   },
// });

const app = createApp(App);

app.mount('#app');
