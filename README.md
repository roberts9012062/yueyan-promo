# 月言生态 · 滚动产品介绍页

> 用 Vue 3 实现的单页滚动宣传站，介绍月言生态四件套：**月言博客（boke）**、**月言浏览器插件**、**月言插件库（yueyan-plugins）**、**中继站 · 大世界（Relay Station）**。

每个产品区块包含：产品定位、线上入口、**源码仓库直达链接**、真实操作演示截图（可点击放大）、部署方法（终端代码块 + 一键复制）、使用方法（步骤时间线 + 演示账号）。

## 快速开始

```bash
./scripts/dev.sh    # 启动开发服务（后台，日志 logs/dev.log）→ http://localhost:5273
./scripts/stop.sh   # 停止
./scripts/build.sh  # 生产构建（类型检查 + 产物 dist/）
```

## 生态地址速查

| 产品 | 线上地址 | 源码仓库 |
|---|---|---|
| 月言博客 | <https://00b.top/> | <https://github.com/roberts9012062/boke> |
| 浏览器插件 | Releases 下载 | <https://github.com/roberts9012062/yueyan-browser-extension> |
| 插件库（商城） | 后台「插件商城」 | <https://github.com/roberts9012062/yueyan-plugins> |
| 中继站 · 大世界 | <https://c8.wiki/> | 暂未开放源码 |

## 目录结构

```
Blog promotion/
├── index.html               # 单页入口
├── src/
│   ├── App.vue              # 区块组装（星空背景 + 各 section）
│   ├── main.ts              # 入口：全局注册 v-reveal 指令
│   ├── types.ts             # 产品数据强类型定义
│   ├── data/                # 四个产品的内容数据（特性/部署/使用/截图清单）
│   ├── components/
│   │   ├── layout/          # 顶部导航（滚动进度条）、页脚
│   │   ├── sections/        # 首屏、生态轨道图、产品区块、快速开始
│   │   └── product/         # 特性网格、截图画廊（灯箱）、部署、使用步骤
│   ├── directives/reveal.ts # IntersectionObserver 滚动进场动画
│   └── styles/main.css      # 月夜星空主题全局样式
├── public/shots/            # 全部演示截图（真实站点实操录制）
├── scripts/                 # 启停 / 构建 / 插件截图脚本（唯一运行入口）
└── docs/                    # 正式文档（截图清单与再生成说明）
```

## 演示截图的来源与再生成

页面上所有截图均为真实操作录制，清单与再生成方法见 [`docs/截图清单与再生成.md`](docs/截图清单与再生成.md)。其中浏览器插件四张截图由 `./scripts/capture-extension.sh` 加载本地构建产物、连接线上站点自动生成（复用 boke 前端的 playwright 依赖）。

## 技术栈

Vue 3.5（`<script setup>` + TS）· Vite 6 · 原生 IntersectionObserver 动效（零动画库依赖）· 纯 CSS 星空/月亮主题。
