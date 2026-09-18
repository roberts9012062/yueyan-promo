<script setup lang="ts">
// 单产品区块：头部（定位 + 源码/线上入口 + 技术栈）+ 特性 + 截图 + 部署 + 使用
import type { ProductInfo } from '../../types';
import FeatureGrid from '../product/FeatureGrid.vue';
import ScreenshotGallery from '../product/ScreenshotGallery.vue';
import DeployGuide from '../product/DeployGuide.vue';
import UsageSteps from '../product/UsageSteps.vue';

defineProps<{ product: ProductInfo }>();
</script>

<template>
  <section :id="product.id" class="section product">
    <!-- 区块头 -->
    <header class="p-head" v-reveal>
      <p class="p-badge">{{ product.badge }}</p>
      <div class="p-title-row">
        <span class="p-icon">{{ product.icon }}</span>
        <h2 class="p-name">{{ product.name }}</h2>
      </div>
      <p class="p-tagline">「{{ product.tagline }}」</p>
      <p class="p-intro">{{ product.intro }}</p>

      <div class="p-links">
        <a
          v-if="product.siteUrl"
          class="p-link site"
          :href="product.siteUrl"
          target="_blank"
          rel="noopener"
        >
          🚀 {{ product.siteLabel }}
        </a>
        <a
          v-if="product.repoUrl"
          class="p-link repo"
          :href="product.repoUrl"
          target="_blank"
          rel="noopener"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          {{ product.repoLabel }}
        </a>
        <span v-else class="p-link closed">🔒 {{ product.repoLabel }}</span>
      </div>

      <p v-if="product.closedNote" class="p-closed">{{ product.closedNote }}</p>

      <ul class="p-stack">
        <li v-for="item in product.stack" :key="item">{{ item }}</li>
      </ul>
    </header>

    <!-- 演示截图（自己实操截图） -->
    <ScreenshotGallery class="p-gallery" :screenshots="product.screenshots" :product-name="product.name" />

    <!-- 特性网格 -->
    <FeatureGrid :features="product.features" />

    <!-- 部署方法 + 使用方法 -->
    <div class="p-guides">
      <DeployGuide :blocks="product.deploy" :note="product.deployNote" :product-id="product.id" />
      <UsageSteps :steps="product.usage" :demo="product.demo" :product-name="product.name" />
    </div>
  </section>
</template>

<style scoped>
.product {
  border-top: 1px solid rgba(148, 178, 226, 0.08);
}

/* 截图画廊与下方特性网格拉开距离（避免贴在一起） */
.p-gallery {
  margin-bottom: 76px;
}

.p-head {
  text-align: center;
  max-width: 780px;
  margin: 0 auto 56px;
}

.p-badge {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.3em;
  color: var(--accent);
  border: 1px solid rgba(125, 211, 252, 0.3);
  border-radius: 999px;
  padding: 5px 16px;
  margin-bottom: 20px;
  background: rgba(125, 211, 252, 0.06);
}

.p-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.p-icon {
  font-size: 40px;
  filter: drop-shadow(0 0 18px rgba(125, 211, 252, 0.4));
}

.p-name {
  font-size: clamp(26px, 3.6vw, 38px);
  font-weight: 800;
  background: linear-gradient(120deg, #f4f7ff 40%, var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.p-tagline {
  margin-top: 12px;
  font-size: 17px;
  color: var(--moon);
  letter-spacing: 0.06em;
}

.p-intro {
  margin-top: 16px;
  color: var(--ink-2);
  font-size: 15.5px;
  text-align: justify;
}

.p-links {
  margin-top: 26px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.p-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}

.p-link.site {
  color: #081120;
  background: linear-gradient(120deg, var(--moon), #fbd365);
  box-shadow: 0 6px 24px rgba(253, 230, 138, 0.28);
}

.p-link.repo {
  color: var(--ink);
  border: 1px solid var(--line);
  background: rgba(16, 26, 58, 0.6);
}

.p-link:hover {
  transform: translateY(-2px);
}

.p-link.closed {
  color: var(--ink-3);
  border: 1px dashed var(--line);
  background: none;
  cursor: default;
}

.p-closed {
  margin-top: 16px;
  font-size: 13px;
  color: var(--ink-3);
  padding: 10px 16px;
  border-radius: 12px;
  background: rgba(148, 178, 226, 0.06);
  border: 1px dashed rgba(148, 178, 226, 0.18);
}

.p-stack {
  margin-top: 22px;
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
}

.p-stack li {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--ink-3);
  padding: 4px 12px;
  border-radius: 6px;
  background: rgba(148, 178, 226, 0.08);
  border: 1px solid rgba(148, 178, 226, 0.12);
}

.p-guides {
  margin-top: 56px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  align-items: start;
}

@media (max-width: 920px) {
  .p-guides {
    grid-template-columns: 1fr;
  }
}
</style>
