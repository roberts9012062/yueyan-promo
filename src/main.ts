// 应用入口：挂载根组件、全局注册滚动进场指令并引入全局样式
import { createApp } from 'vue';
import App from './App.vue';
import { vReveal } from './directives/reveal';
import './styles/main.css';

const app = createApp(App);
app.directive('reveal', vReveal);
app.mount('#app');
