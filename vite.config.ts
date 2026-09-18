import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Vite 配置：Vue 3 单页宣传站，开发 5273 端口
// base 指向 GitHub Pages 仓库子路径（仓库名 yueyan-promo），本地 dev 不受影响
export default defineConfig({
  plugins: [vue()],
  base: '/yueyan-promo/',
  server: {
    port: 5273,
    host: true,
  },
});
