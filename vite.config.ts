import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Vite 配置：Vue 3 单页宣传站，开发 5273 端口
// base 为根路径：站点已绑定自定义域 bg0.top（GitHub Pages 根路径部署）
export default defineConfig({
  plugins: [vue()],
  base: '/',
  server: {
    port: 5273,
    host: true,
  },
});
