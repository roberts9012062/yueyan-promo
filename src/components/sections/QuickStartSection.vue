<script setup lang="ts">
// 快速开始：五分钟接入路线 + 全部源码仓库汇总表
import { products } from '../../data';
import { vReveal } from '../../directives/reveal';

const route: readonly { step: string; desc: string; link: string; linkLabel: string }[] = [
  { step: '克隆博客源码', desc: 'git clone boke 仓库，初始化数据库并启动双端', link: 'https://github.com/roberts9012062/boke', linkLabel: 'boke 仓库' },
  { step: '安装浏览器插件', desc: '下载 Release 安装包加载到 Chrome / Edge，填站点地址与 API Key', link: 'https://github.com/roberts9012062/yueyan-browser-extension/releases', linkLabel: '插件 Releases' },
  { step: '逛插件商城', desc: '博客后台「插件商城」一键安装 TG 图床、音乐、SEO 等 13+ 插件', link: 'https://github.com/roberts9012062/yueyan-plugins', linkLabel: 'yueyan-plugins' },
  { step: '点火对接大世界', desc: '后台「中继站」填入 c8.wiki，申请许可后点火，内容广播全星系', link: 'https://c8.wiki/', linkLabel: 'c8.wiki' },
];
</script>

<template>
  <section id="quickstart" class="section">
    <header class="section-head" v-reveal>
      <p class="section-eyebrow">✦ QUICK START</p>
      <h2 class="section-title">五分钟，点亮你的星球</h2>
      <p class="section-sub">全部源码开放在 GitHub，跟着四步走，从零拥有完整的月言生态。</p>
    </header>

    <ol class="route">
      <li v-for="(item, index) in route" :key="item.step" class="r-item glass" v-reveal :style="{ '--reveal-delay': `${index * 90}ms` }">
        <span class="r-no">{{ index + 1 }}</span>
        <h3>{{ item.step }}</h3>
        <p>{{ item.desc }}</p>
        <a :href="item.link" target="_blank" rel="noopener">{{ item.linkLabel }} ↗</a>
      </li>
    </ol>

    <!-- 源码仓库汇总 -->
    <div class="repos glass" v-reveal>
      <h3 class="repo-title">🗂️ 全部源码仓库一览</h3>
      <table class="repo-table">
        <thead>
          <tr><th>产品</th><th>线上地址</th><th>源码仓库</th><th>协议</th></tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td class="c-name">{{ product.icon }} {{ product.name }}</td>
            <td>
              <a v-if="product.siteUrl" :href="product.siteUrl" target="_blank" rel="noopener">{{ product.siteLabel }} ↗</a>
              <span v-else class="dim">—</span>
            </td>
            <td>
              <a v-if="product.repoUrl" :href="product.repoUrl" target="_blank" rel="noopener">{{ product.repoLabel }} ↗</a>
              <span v-else class="dim">🔒 {{ product.repoLabel }}</span>
            </td>
            <td class="c-license">
              <span class="chip" :class="{ off: !product.isOpenSource }">{{ product.license }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="repo-note">点击仓库链接即可查看全部源码、提交历史与发布包；本宣传页所有截图均为线上站点与本地构建的真实操作录制。</p>
    </div>
  </section>
</template>

<style scoped>
.route {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 16px;
  margin-bottom: 54px;
}

.r-item {
  position: relative;
  padding: 24px 20px;
  transition: transform 0.25s, border-color 0.25s;
}

.r-item:hover {
  transform: translateY(-4px);
  border-color: rgba(125, 211, 252, 0.4);
}

.r-no {
  position: absolute;
  top: -14px;
  left: 18px;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
  color: #06121f;
  background: linear-gradient(120deg, var(--accent), var(--moon));
  box-shadow: 0 6px 20px rgba(125, 211, 252, 0.35);
}

.r-item h3 {
  font-size: 15.5px;
  margin-top: 8px;
}

.r-item p {
  margin-top: 8px;
  font-size: 13px;
  color: var(--ink-2);
  min-height: 60px;
}

.r-item a {
  font-size: 13px;
  color: var(--accent);
}

.r-item a:hover {
  text-decoration: underline;
}

.repos {
  padding: 28px 26px;
  overflow-x: auto;
}

.repo-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 18px;
}

.repo-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 680px;
}

.repo-table th {
  text-align: left;
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--ink-3);
  font-weight: 600;
  padding: 12px 14px;
  border-bottom: 1px solid var(--line);
  white-space: nowrap;
}

.repo-table td {
  padding: 20px 14px;
  font-size: 13.5px;
  border-bottom: 1px solid rgba(148, 178, 226, 0.08);
  vertical-align: middle;
}

.repo-table tr:last-child td {
  border-bottom: none;
}

.repo-table a {
  color: var(--accent);
  word-break: break-all;
}

.repo-table a:hover {
  text-decoration: underline;
}

.c-name {
  font-weight: 600;
  white-space: nowrap;
}

.c-license {
  white-space: nowrap;
}

.dim {
  color: var(--ink-3);
}

.chip {
  display: inline-block;
  font-size: 11px;
  font-family: var(--font-mono);
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(52, 211, 153, 0.1);
  border: 1px solid rgba(52, 211, 153, 0.3);
  color: var(--accent-3);
  white-space: nowrap;
}

.chip.off {
  background: rgba(148, 178, 226, 0.08);
  border-color: rgba(148, 178, 226, 0.25);
  color: var(--ink-3);
}

.repo-note {
  margin-top: 16px;
  font-size: 13px;
  color: var(--ink-3);
}
</style>
