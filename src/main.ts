import { createApp } from 'vue'
import App from './App.vue'
import Router from './utils/router';

// 在桌面端将mouse事件转变为移动端touch事件
import '@vant/touch-emulator';
// 引入组件样式
import 'vant/lib/index.css';
const app = createApp(App)

app.use(Router)

app.mount('#app')
