// 月言插件库（yueyan-plugins）产品数据：站点侧插件商城
import type { ProductInfo } from '../types';

export const marketProduct: ProductInfo = {
  id: 'market',
  badge: '03 · 站点扩展',
  icon: '🧩',
  name: '月言插件库 · 站点插件商城',
  tagline: 'GitHub 仓库驱动的插件生态',
  intro:
    '月言博客的官方插件仓库：站点后台「插件商城」直接读取 GitHub 仓库清单，兼容性校验后一键安装 / 启用 / 卸载。TG 图床、音乐、B 站视频、导航、SEO……你的博客，随装随强。',
  siteUrl: 'https://github.com/roberts9012062/yueyan-plugins',
  siteLabel: 'github.com/roberts9012062/yueyan-plugins',
  repoUrl: 'https://github.com/roberts9012062/yueyan-plugins',
  repoLabel: 'github.com/roberts9012062/yueyan-plugins（源码即商城）',
  closedNote: null,
  stack: ['GitHub 清单驱动', 'Casbin 钩子系统', '6 插入点钩子框架', '故障隔离', 'bpk 插件包'],
  features: [
    { icon: '🖼️', title: 'TG / CF 图床', desc: '文章图片直传 Telegram 或 Cloudflare R2，不占站点存储，浏览器插件共用同一图床' },
    { icon: '🎵', title: '音乐插件', desc: '网易云音乐 / QQ 音乐：搜索、外链、文章配乐一条龙' },
    { icon: '📺', title: 'B 站视频', desc: '文章嵌入 B 站播放器块，扫码登录获取高清资源' },
    { icon: '🧭', title: '精品导航', desc: '站点导航页：分类 / 标签 / 私有收藏，浏览器插件书签可双向同步' },
    { icon: '📈', title: 'SEO / 统计', desc: 'SEO 优化器 + 站点统计 Pro：访问趋势、来源分析、CSV 导出' },
    { icon: '🛡️', title: '评论反垃圾', desc: '敏感词、频率、AI 三重防线，垃圾评论自动进审核' },
    { icon: '🔊', title: 'TTS 朗读', desc: '文章文本转语音朗读，访客「听文章」' },
    { icon: '💾', title: '备份助手', desc: '应用级备份打包 / 恢复 / 过期清理，跨平台 bpk 包' },
  ],
  screenshots: [
    { src: '/shots/blog-plugin-market.png', title: '后台 · 插件商城', caption: '读取 GitHub 仓库清单，兼容性校验后一键安装', tall: false },
    { src: '/shots/blog-admin-dashboard.png', title: '已装插件动态侧栏', caption: '插件在后台注入管理入口：备份、音乐、导航、统计……', tall: false },
  ],
  deploy: [
    {
      label: '无需单独部署 · 商城即 GitHub 仓库',
      code: [
        '# 插件商城不需要部署任何服务：',
        '# 月言博客后台「插件商城」默认读取官方仓库清单',
        'https://github.com/roberts9012062/yueyan-plugins',
        '',
        '# 自建镜像 / 私有插件库：克隆本仓库，修改清单后托管到自己的 GitHub',
        'git clone https://github.com/roberts9012062/yueyan-plugins.git',
      ].join('\n'),
    },
  ],
  deployNote: '每个插件目录自带 manifest 与说明；开发手册见 boke 仓库 docs/（插件开发文档），后台「插件开发文档」入口可查。',
  usage: [
    { title: '打开商城', desc: '博客后台 → 插件 → 插件商城：浏览 13+ 官方插件' },
    { title: '一键安装', desc: '点击安装：自动下载、兼容性校验、钩子注册，失败自动回滚' },
    { title: '启用配置', desc: '在「我的插件」或动态侧栏入口配置各插件（填 Key、扫码登录等）' },
    { title: '随时卸载', desc: '不再需要就卸载，钩子框架故障隔离，插件崩溃不影响主站' },
  ],
  demo: null,
};
