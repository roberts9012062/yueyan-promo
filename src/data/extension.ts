// 月言浏览器插件产品数据：定位、特性、部署与使用
import type { ProductInfo } from '../types';

export const extensionProduct: ProductInfo = {
  id: 'extension',
  badge: '02 · 浏览器侧翼',
  icon: '🛰️',
  name: '月言博客助手 · 浏览器插件',
  tagline: '把整座博客装进浏览器侧边栏',
  intro:
    'Chrome / Edge 双平台侧边栏助手（Manifest V3，Chromium 110+）：凭站点 URL + API Key 连接，所有数据只保存在浏览器本地。AI 问答、书签管理、右键一键发文，浏览到哪、创作到哪。',
  siteUrl: 'https://github.com/roberts9012062/yueyan-browser-extension/releases',
  siteLabel: 'Releases · 安装包下载',
  repoUrl: 'https://github.com/roberts9012062/yueyan-browser-extension',
  repoLabel: 'github.com/roberts9012062/yueyan-browser-extension',
  closedNote: null,
  stack: ['Manifest V3', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite 6', 'Chrome / Edge 110+'],
  features: [
    { icon: '🏠', title: '首页动态', desc: '站点时间线实时同步，底部快捷写说说：文字 / 图 / 视频 / 音乐 / 链接' },
    { icon: '🤖', title: 'AI 助手', desc: '多模型流式对话、联网搜索、AI 生图、网页总结、B 站视频字幕总结、区域截图识图' },
    { icon: '✨', title: '一键生成文章', desc: '「生成文章」面板自动扩写润色，标签与 SEO 由 AI 生成，一键发布到站点' },
    { icon: '🔖', title: '书签夹', desc: '本地书签树（拖拽 / 搜索 / 查重 / 失效检测），导入浏览器书签、站点导航同步、AI 识别添加' },
    { icon: '🖱️', title: '右键菜单', desc: '总结本页发布博客、收藏本页（AI 自动分类）、发说说草稿篮、截图 AI 分析' },
    { icon: '🌙', title: '月亮悬浮球', desc: '可拖动月亮桌宠：悬停快捷菜单、右键任务执行框，冷月 / 薄雾双主题跟随' },
    { icon: '🛏️', title: '发布图床三通道', desc: '文章与说说图片可选 站点服务器 / TG 图床 / CF 图床，失败自动降级' },
  ],
  screenshots: [
    { src: '/shots/ext-home.png', title: '侧边栏 · 首页动态', caption: '已连接站点：用户资料、帖子流、底部写说说（440px 侧栏实拍）', tall: true },
    { src: '/shots/ext-ai.png', title: '侧边栏 · AI 助手对话', caption: '真实调用站点 AI（deepseek-chat）流式回复，多模型可切换', tall: true },
    { src: '/shots/ext-bookmark.png', title: '侧边栏 · 书签夹', caption: '本地书签树 + 导入浏览器书签 + AI 识别添加', tall: true },
    { src: '/shots/ext-settings.png', title: '侧边栏 · 设置', caption: '站点 URL + API Key 连接、主题、发布图床配置', tall: true },
  ],
  deploy: [
    {
      label: 'Chrome / Edge · 安装官方发布包（推荐）',
      code: [
        '# 1. 打开 Releases 页面，下载最新 zip 安装包',
        'https://github.com/roberts9012062/yueyan-browser-extension/releases',
        '',
        '# 2. 解压 zip 得到扩展目录',
        '',
        '# 3. 浏览器加载：开发者模式 → 加载已解压的扩展程序 → 选择该目录',
        'Chrome: chrome://extensions',
        'Edge:   edge://extensions',
      ].join('\n'),
    },
    {
      label: 'bash · 源码构建（Node.js 20+）',
      code: [
        'git clone https://github.com/roberts9012062/yueyan-browser-extension.git',
        'cd yueyan-browser-extension',
        'npm install',
        'npm run build',
        '# 构建产物在 dist/，按上面的步骤加载到浏览器即可',
      ].join('\n'),
    },
  ],
  deployNote: '一套代码、一份产物，同时支持 Google Chrome 与 Microsoft Edge；各版本发布包由 GitHub Actions 自动构建。',
  usage: [
    { title: '生成 API Key', desc: '博客后台「接口开放」页勾选所需接口，点击「生成 Key」并复制' },
    { title: '连接站点', desc: '插件设置中填入站点地址（如 https://00b.top）与 API Key，即刻连接' },
    { title: '日常使用', desc: '侧边栏看动态、写说说；AI 助手对话、总结网页、生成文章一键发布' },
    { title: '右键加速', desc: '任意网页右键：总结本页发博客、收藏本页、截图问 AI、选中文字进草稿篮' },
  ],
  demo: { account: '任意已部署站点', password: '后台「接口开放」生成 Key' },
};
