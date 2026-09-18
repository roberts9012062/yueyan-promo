<script setup lang="ts">
// 顶部导航：毛玻璃吸顶 + 滚动进度条 + 锚点导航
import { onMounted, onUnmounted, ref } from 'vue';
import { navLinks } from '../../data';

const progress = ref<number>(0);
const scrolled = ref<boolean>(false);

const handleScroll = (): void => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = max > 0 ? window.scrollY / max : 0;
  scrolled.value = window.scrollY > 24;
};

onMounted((): void => {
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted((): void => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header class="topbar" :class="{ solid: scrolled }">
    <div class="bar-inner">
      <a class="brand" href="#top">
        <span class="brand-moon">🌙</span>
        <span class="brand-text">月言生态<em>YUEYAN ECOSYSTEM</em></span>
      </a>
      <nav class="nav">
        <a v-for="link in navLinks" :key="link.anchor" :href="link.anchor">{{ link.label }}</a>
      </nav>
      <a class="cta" href="https://github.com/roberts9012062/boke" target="_blank" rel="noopener">
        <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
        源码
      </a>
    </div>
    <div class="progress" :style="{ transform: `scaleX(${progress})` }" />
  </header>
</template>

<style scoped>
.topbar {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  background: transparent;
  transition: background 0.35s ease, box-shadow 0.35s ease;
}

.topbar.solid {
  background: rgba(6, 10, 24, 0.82);
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--line);
}

.bar-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 28px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 28px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.brand-moon {
  font-size: 22px;
  filter: drop-shadow(0 0 12px rgba(253, 230, 138, 0.55));
}

.brand-text {
  font-weight: 700;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.brand-text em {
  font-style: normal;
  font-size: 9px;
  letter-spacing: 0.3em;
  color: var(--ink-3);
}

.nav {
  display: flex;
  gap: 4px;
  margin-left: auto;
  overflow-x: auto;
}

.nav a {
  padding: 7px 13px;
  border-radius: 999px;
  font-size: 14px;
  color: var(--ink-2);
  white-space: nowrap;
  transition: color 0.2s, background 0.2s;
}

.nav a:hover {
  color: var(--ink);
  background: rgba(125, 211, 252, 0.1);
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 600;
  color: #06121f;
  background: linear-gradient(120deg, var(--accent), var(--moon));
  box-shadow: 0 4px 20px rgba(125, 211, 252, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 26px rgba(125, 211, 252, 0.5);
}

.progress {
  height: 2px;
  transform-origin: 0 50%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2), var(--moon));
}

@media (max-width: 720px) {
  .nav {
    display: none;
  }
  .bar-inner {
    padding: 0 18px;
  }
}
</style>
