<script setup lang="ts">
// 特性网格：图标 + 标题 + 描述 的玻璃卡片阵列
import type { FeatureItem } from '../../types';

defineProps<{ features: readonly FeatureItem[] }>();
</script>

<template>
  <div class="grid">
    <article v-for="(item, index) in features" :key="item.title" class="card glass" v-reveal :style="{ '--reveal-delay': `${index * 70}ms` }">
      <span class="icon">{{ item.icon }}</span>
      <h3>{{ item.title }}</h3>
      <p>{{ item.desc }}</p>
    </article>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.card {
  padding: 22px 20px;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(125, 211, 252, 0.4);
  box-shadow: 0 14px 44px rgba(5, 10, 26, 0.6);
}

.icon {
  font-size: 26px;
  display: inline-block;
  filter: drop-shadow(0 0 12px rgba(125, 211, 252, 0.35));
}

h3 {
  margin-top: 12px;
  font-size: 16px;
  font-weight: 700;
}

p {
  margin-top: 8px;
  font-size: 13.5px;
  color: var(--ink-2);
  line-height: 1.65;
}
</style>
