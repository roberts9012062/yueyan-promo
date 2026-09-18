<script setup lang="ts">
// 生态总览：中心月亮 + 四产品环绕轨道图 + 点击跳转对应区块
import { ecosystemNodes } from '../../data';
import { vReveal } from '../../directives/reveal';

/** 轨道节点定位（右上起顺时针） */
const orbitAngles: readonly number[] = [-45, 45, 135, 225];
const orbitRadius = 190;

const nodeStyle = (index: number): Record<string, string> => {
  const angle = (orbitAngles[index] * Math.PI) / 180;
  return {
    left: `${50 + (orbitRadius * Math.cos(angle)) / 4.6}%`,
    top: `${50 + (orbitRadius * Math.sin(angle)) / 4.2}%`,
  };
};
</script>

<template>
  <section id="ecosystem" class="section">
    <header class="section-head" v-reveal>
      <p class="section-eyebrow">✦ ECOSYSTEM</p>
      <h2 class="section-title">一体四面，各司其职</h2>
      <p class="section-sub">
        它们不是四个孤立的项目：博客是内容母港，插件是随身侧翼，商城是扩展仓库，中继站把所有人连成星系。
      </p>
    </header>

    <div class="orbit glass" v-reveal style="--reveal-delay: 150ms">
      <div class="core">
        <span class="core-moon">🌙</span>
        <span class="core-name">月言生态</span>
        <span class="core-sub">YUEYAN</span>
      </div>
      <div class="ring" aria-hidden="true" />
      <a
        v-for="(node, index) in ecosystemNodes"
        :key="node.anchor"
        :href="node.anchor"
        class="node"
        :style="nodeStyle(index)"
      >
        <span class="node-icon">{{ node.icon }}</span>
        <span class="node-name">{{ node.name }}</span>
        <span class="node-role">{{ node.role }}</span>
      </a>
    </div>

    <div class="flow" v-reveal style="--reveal-delay: 260ms">
      <span class="flow-step">📝 在博客写下一篇</span>
      <span class="arrow">→</span>
      <span class="flow-step">🧩 插件与商城增强创作</span>
      <span class="arrow">→</span>
      <span class="flow-step">🌐 中继站广播到每一颗星球</span>
    </div>
  </section>
</template>

<style scoped>
.orbit {
  position: relative;
  height: 520px;
  max-width: 760px;
  margin: 0 auto;
  overflow: hidden;
}

.ring {
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  border: 1px dashed rgba(125, 211, 252, 0.22);
  animation: ring-spin 46s linear infinite;
}

.ring::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 14px var(--accent);
}

@keyframes ring-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.core {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  justify-content: center;
  background: radial-gradient(circle at 36% 30%, rgba(253, 230, 138, 0.2), rgba(16, 26, 58, 0.9) 70%);
  border: 1px solid rgba(253, 230, 138, 0.3);
  box-shadow: 0 0 60px rgba(253, 230, 138, 0.16), inset 0 0 40px rgba(253, 230, 138, 0.08);
}

.core-moon {
  font-size: 44px;
  filter: drop-shadow(0 0 16px rgba(253, 230, 138, 0.6));
}

.core-name {
  font-weight: 800;
  font-size: 19px;
  margin-top: 6px;
}

.core-sub {
  font-size: 10px;
  letter-spacing: 0.42em;
  color: var(--ink-3);
}

.node {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  width: 168px;
  padding: 16px 12px;
  border-radius: 16px;
  background: var(--glass-2);
  border: 1px solid var(--line);
  text-align: center;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
}

.node:hover {
  transform: translate(-50%, -50%) scale(1.06);
  border-color: rgba(125, 211, 252, 0.5);
  box-shadow: 0 10px 40px rgba(125, 211, 252, 0.18);
}

.node-icon {
  font-size: 26px;
}

.node-name {
  font-weight: 700;
  font-size: 15px;
}

.node-role {
  font-size: 11.5px;
  color: var(--ink-3);
}

.flow {
  margin-top: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.flow-step {
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  color: var(--ink-2);
  border: 1px solid var(--line);
  background: var(--glass);
}

.arrow {
  color: var(--accent);
  font-size: 18px;
}

@media (max-width: 720px) {
  .orbit {
    height: 560px;
  }
  .ring {
    display: none;
  }
}
</style>
