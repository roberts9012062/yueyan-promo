<script setup lang="ts">
// 页脚：生态链接汇总 + 版权声明
const year: number = new Date().getFullYear();

const links: readonly { label: string; url: string }[] = [
  { label: '月言博客 · 00b.top', url: 'https://00b.top/' },
  { label: '中继站 · c8.wiki', url: 'https://c8.wiki/' },
  { label: 'boke 源码', url: 'https://github.com/roberts9012062/boke' },
  { label: '浏览器插件源码', url: 'https://github.com/roberts9012062/yueyan-browser-extension' },
  { label: '插件库 yueyan-plugins', url: 'https://github.com/roberts9012062/yueyan-plugins' },
];
</script>

<template>
  <footer class="footer">
    <div class="f-inner">
      <p class="f-brand">🌙 月言生态 · 把每个孤独的星球都串联在一起</p>
      <nav class="f-links">
        <a v-for="link in links" :key="link.url" :href="link.url" target="_blank" rel="noopener">{{ link.label }}</a>
      </nav>
      <p class="f-copy">© {{ year }} Yueyan Ecosystem · MIT License · 本页由 Vue 3 构建，截图均为真实站点实操录制</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 80px;
  border-top: 1px solid var(--line);
  background: rgba(4, 8, 20, 0.72);
}

.f-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 44px 28px;
  text-align: center;
}

.f-brand {
  font-size: 16px;
  font-weight: 700;
}

.f-links {
  margin-top: 18px;
  display: flex;
  gap: 10px 26px;
  justify-content: center;
  flex-wrap: wrap;
}

.f-links a {
  font-size: 13px;
  color: var(--ink-2);
  transition: color 0.2s;
}

.f-links a:hover {
  color: var(--accent);
}

.f-copy {
  margin-top: 22px;
  font-size: 12px;
  color: var(--ink-3);
}
</style>
