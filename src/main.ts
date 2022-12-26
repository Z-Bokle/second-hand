import { createApp } from 'vue'
import App from './App.vue'
import Router from './utils/router';

// 在桌面端将mouse事件转变为移动端touch事件
import '@vant/touch-emulator';
// 引入组件样式
import 'vant/lib/index.css';
import { createPinia } from 'pinia';
const app = createApp(App)
const pinia = createPinia()
app.use(Router)
app.use(pinia)

app.mount('#app')
