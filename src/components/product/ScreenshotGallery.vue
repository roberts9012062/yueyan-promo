<script setup lang="ts">
// 截图画廊：实操演示截图网格 + 点击放大灯箱（键盘 ←/→/Esc）
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { ScreenshotItem } from '../../types';
import { vReveal } from '../../directives/reveal';

const props = defineProps<{
  screenshots: readonly ScreenshotItem[];
  productName: string;
}>();

/** 拼接部署 base 前缀：截图 src 以 / 开头，GitHub Pages 子路径部署时需带上 BASE_URL */
const resolveSrc = (src: string): string => {
  const base: string = import.meta.env.BASE_URL.replace(/\/$/u, '');
  return `${base}${src}`;
};

const activeIndex = ref<number | null>(null);

const activeShot = computed<ScreenshotItem | null>((): ScreenshotItem | null =>
  activeIndex.value === null ? null : props.screenshots[activeIndex.value] ?? null,
);

const move = (delta: number): void => {
  if (activeIndex.value === null) {
    return;
  }
  const total = props.screenshots.length;
  activeIndex.value = (activeIndex.value + delta + total) % total;
};

const close = (): void => {
  activeIndex.value = null;
};

const handleKey = (event: KeyboardEvent): void => {
  if (activeIndex.value === null) {
    return;
  }
  if (event.key === 'Escape') {
    close();
  }
  if (event.key === 'ArrowRight') {
    move(1);
  }
  if (event.key === 'ArrowLeft') {
    move(-1);
  }
};

onMounted((): void => {
  window.addEventListener('keydown', handleKey);
});

onUnmounted((): void => {
  window.removeEventListener('keydown', handleKey);
});
</script>

<template>
  <div class="gallery">
    <h3 class="g-title" v-reveal>📸 实操演示截图<span class="g-note">（本页所有截图均为真实操作录制）</span></h3>

    <div class="g-grid">
      <figure
        v-for="(shot, index) in screenshots"
        :key="shot.src"
        class="g-item glass"
        :class="{ tall: shot.tall }"
        v-reveal
        :style="{ '--reveal-delay': `${index * 80}ms` }"
        @click="activeIndex = index"
      >
        <div class="g-img-wrap">
          <img :src="resolveSrc(shot.src)" :alt="`${productName}演示截图：${shot.title}`" loading="lazy" />
        </div>
        <figcaption>
          <strong>{{ shot.title }}</strong>
          <span>{{ shot.caption }}</span>
        </figcaption>
      </figure>
    </div>

    <!-- 灯箱 -->
    <div v-if="activeShot" class="lightbox" @click.self="close">
      <button class="lb-close" type="button" aria-label="关闭" @click="close">✕</button>
      <button class="lb-nav prev" type="button" aria-label="上一张" @click="move(-1)">‹</button>
      <figure class="lb-body">
        <img :src="resolveSrc(activeShot.src)" :alt="`${productName}演示截图：${activeShot.title}`" />
        <figcaption>
          <strong>{{ activeShot.title }}</strong>
          <span>{{ activeShot.caption }}</span>
        </figcaption>
      </figure>
      <button class="lb-nav next" type="button" aria-label="下一张" @click="move(1)">›</button>
    </div>
  </div>
</template>

<style scoped>
.g-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 18px;
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.g-note {
  font-size: 12.5px;
  font-weight: 400;
  color: var(--ink-3);
}

.g-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.g-item {
  overflow: hidden;
  cursor: zoom-in;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
}

.g-item:hover {
  transform: translateY(-4px);
  border-color: rgba(125, 211, 252, 0.45);
  box-shadow: 0 16px 50px rgba(5, 10, 26, 0.65);
}

.g-img-wrap {
  background: #04070f;
  border-bottom: 1px solid var(--line);
  aspect-ratio: 16 / 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.g-item.tall .g-img-wrap {
  aspect-ratio: 440 / 880;
}

.g-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

figcaption {
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

figcaption strong {
  font-size: 13.5px;
}

figcaption span {
  font-size: 12px;
  color: var(--ink-3);
}

/* ---------- 灯箱 ---------- */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 60px;
  background: rgba(3, 6, 15, 0.88);
  backdrop-filter: blur(10px);
  animation: lb-in 0.25s ease;
}

@keyframes lb-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lb-body {
  max-width: min(1100px, 100%);
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lb-body img {
  max-width: 100%;
  max-height: 78vh;
  object-fit: contain;
  border-radius: 12px;
  border: 1px solid var(--line);
  box-shadow: 0 24px 90px rgba(0, 0, 0, 0.6);
}

.lb-body figcaption {
  padding: 0;
  text-align: center;
  align-items: center;
}

.lb-body figcaption strong {
  font-size: 15px;
}

.lb-close {
  position: absolute;
  top: 18px;
  right: 22px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: rgba(16, 26, 58, 0.8);
  color: var(--ink);
  font-size: 16px;
  transition: background 0.2s;
}

.lb-close:hover {
  background: rgba(125, 211, 252, 0.2);
}

.lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: rgba(16, 26, 58, 0.8);
  color: var(--ink);
  font-size: 24px;
  line-height: 1;
  transition: background 0.2s;
}

.lb-nav:hover {
  background: rgba(125, 211, 252, 0.2);
}

.lb-nav.prev {
  left: 20px;
}

.lb-nav.next {
  right: 20px;
}

@media (max-width: 720px) {
  .lightbox {
    padding: 20px 12px;
  }
  .lb-nav {
    display: none;
  }
}
</style>
