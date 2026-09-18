<script setup lang="ts">
// 首屏：月亮升起 + 大标题 + 生态数据卡 + 两条在线入口
import { vReveal } from '../../directives/reveal';

const stats: readonly { value: string; label: string }[] = [
  { value: '4', label: '生态组件' },
  { value: '13+', label: '官方插件' },
  { value: '1000', label: '星系容量' },
  { value: 'MIT', label: '开源协议' },
];
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-moon" aria-hidden="true" />
    <div class="hero-inner">
      <p class="eyebrow" v-reveal>YUEYAN ECOSYSTEM · 月言生态全家桶</p>
      <h1 class="title" v-reveal style="--reveal-delay: 120ms">
        写短句，收声音<br />把每个孤独的<span class="hl">星球</span>串联在一起
      </h1>
      <p class="sub" v-reveal style="--reveal-delay: 240ms">
        月言是一套完整开源的博客生态：月色微博客 · 浏览器侧边栏助手 · GitHub 插件商城 · 跨站中继大世界。
        从写作到分发，每一层都开放源码，每一环都可自己部署。
      </p>
      <div class="actions" v-reveal style="--reveal-delay: 360ms">
        <a class="btn primary" href="https://00b.top/" target="_blank" rel="noopener">🌙 访问线上站点</a>
        <a class="btn ghost" href="https://c8.wiki/" target="_blank" rel="noopener">🌐 看看大世界星系</a>
      </div>
      <dl class="stats" v-reveal style="--reveal-delay: 480ms">
        <div v-for="item in stats" :key="item.label" class="stat glass">
          <dt>{{ item.value }}</dt>
          <dd>{{ item.label }}</dd>
        </div>
      </dl>
    </div>
    <a class="scroll-hint" href="#ecosystem" aria-label="向下滚动">
      <span class="mouse" /><span class="hint-text">向下探索生态</span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 28px 80px;
  overflow: hidden;
}

/* 悬浮大月亮 */
.hero-moon {
  position: absolute;
  top: 8%;
  right: 12%;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 34%, #fffbeb, #fde68a 46%, #d9a53f 78%, #8a6420);
  box-shadow:
    0 0 90px rgba(253, 230, 138, 0.4),
    0 0 220px rgba(253, 230, 138, 0.18),
    inset -26px -18px 60px rgba(120, 72, 20, 0.45);
  opacity: 0.9;
  animation: moon-float 9s ease-in-out infinite alternate;
}

.hero-moon::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(26px 20px at 30% 28%, rgba(140, 96, 34, 0.32), transparent 70%),
    radial-gradient(34px 26px at 62% 55%, rgba(140, 96, 34, 0.26), transparent 70%),
    radial-gradient(20px 16px at 46% 74%, rgba(140, 96, 34, 0.3), transparent 70%);
}

@keyframes moon-float {
  from { transform: translateY(-10px); }
  to { transform: translateY(14px); }
}

.hero-inner {
  position: relative;
  max-width: 860px;
  text-align: center;
}

.eyebrow {
  font-size: 13px;
  letter-spacing: 0.42em;
  color: var(--accent);
  margin-bottom: 22px;
}

.title {
  font-size: clamp(34px, 6vw, 62px);
  font-weight: 800;
  line-height: 1.28;
  letter-spacing: 0.01em;
  text-shadow: 0 4px 40px rgba(125, 211, 252, 0.25);
}

.title .hl {
  background: linear-gradient(120deg, var(--moon), #fff3c4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.sub {
  margin: 26px auto 0;
  max-width: 640px;
  color: var(--ink-2);
  font-size: 16.5px;
}

.actions {
  margin-top: 40px;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 30px;
  border-radius: 999px;
  font-size: 15.5px;
  font-weight: 700;
  transition: transform 0.22s, box-shadow 0.22s, background 0.22s;
}

.btn.primary {
  color: #081120;
  background: linear-gradient(120deg, var(--moon), #fbd365 60%, var(--accent));
  box-shadow: 0 8px 32px rgba(253, 230, 138, 0.32);
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(253, 230, 138, 0.45);
}

.btn.ghost {
  color: var(--ink);
  border: 1px solid var(--line);
  background: rgba(125, 211, 252, 0.07);
  backdrop-filter: blur(8px);
}

.btn.ghost:hover {
  transform: translateY(-2px);
  background: rgba(125, 211, 252, 0.14);
}

.stats {
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.stat {
  padding: 20px 12px;
  text-align: center;
}

.stat dt {
  font-size: 30px;
  font-weight: 800;
  background: linear-gradient(120deg, #f4f7ff, var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stat dd {
  margin-top: 4px;
  font-size: 13px;
  color: var(--ink-3);
}

.scroll-hint {
  position: absolute;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--ink-3);
}

.mouse {
  width: 22px;
  height: 36px;
  border: 1.5px solid currentColor;
  border-radius: 12px;
  position: relative;
}

.mouse::after {
  content: '';
  position: absolute;
  top: 7px;
  left: 50%;
  width: 3px;
  height: 7px;
  border-radius: 2px;
  background: currentColor;
  transform: translateX(-50%);
  animation: wheel 1.8s ease-in-out infinite;
}

@keyframes wheel {
  0%, 100% { opacity: 0.2; transform: translate(-50%, 0); }
  50% { opacity: 1; transform: translate(-50%, 8px); }
}

.hint-text {
  font-size: 12px;
  letter-spacing: 0.2em;
}

@media (max-width: 720px) {
  .hero-moon {
    width: 200px;
    height: 200px;
    right: -30px;
    top: 6%;
    opacity: 0.55;
  }
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
