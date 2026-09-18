// 月言博客（boke）产品数据：定位、特性、部署与使用
import type { ProductInfo } from '../types';

export const blogProduct: ProductInfo = {
  id: 'blog',
  badge: '01 · 主站',
  icon: '🌙',
  name: '月言 · 月色微博客',
  tagline: '写短句，收声音，偶尔录一点夜色',
  intro:
    '以短句（≤2000 字）与图片、音频、视频为载体的安静社区。前台是慢节奏的双主题时间线，后台是五级角色、SEO、AI 与插件系统一应俱全的完整治理中枢。',
  siteUrl: 'https://00b.top/',
  siteLabel: '00b.top · 线上站点',
  repoUrl: 'https://github.com/roberts9012062/boke',
  repoLabel: 'github.com/roberts9012062/boke',
  closedNote: null,
  stack: ['Go 1.26 + Gin', 'PostgreSQL', 'Redis', 'Next.js 15.4', 'React 19', 'Tailwind CSS v4', 'Casbin RBAC'],
  features: [
    { icon: '✍️', title: '四形态创作', desc: '文字 / 图片（9 张压缩）/ 录音 / 视频发帖，标签、可见性、草稿箱、编辑已发布帖子一应俱全' },
    { icon: '🌗', title: '冷月 / 薄雾双主题', desc: '即时切换、跟随系统；阅读字号、内容密度、减少动效等无障碍外观设置' },
    { icon: '💬', title: '楼中楼评论 + 匿名评论', desc: '两级评论、匿名昵称防刷、AI 异步预审，高风险自动进审核队列' },
    { icon: '🛡️', title: '五级角色后台', desc: '超级管理员 / 编辑 / 作者 / 访客 / 受限访客，14 个资源域权限矩阵 + 审计留痕' },
    { icon: '🔍', title: 'SEO 模块', desc: '健康度扫描、SERP 预览、批量修复、sitemap.xml + robots.txt、编辑页 AI 摘要' },
    { icon: '🤖', title: 'AI 多供应商', desc: 'OpenAI 兼容：deepseek / qwen / kimi / glm / openai，摘要、自动标签、评论审核三场景' },
    { icon: '🧩', title: 'GitHub 插件商城', desc: '仓库驱动的插件安装 / 启用 / 卸载 + 钩子扩展框架（6 插入点、故障隔离）' },
    { icon: '📊', title: '报表与备份', desc: '7/30 日四维趋势、CSV 导出、应用级 JSON/ZIP 备份与媒体库打包' },
  ],
  screenshots: [
    { src: '/shots/blog-home.png', title: '前台时间线 · 薄雾主题', caption: '推荐 / 关注双流 + 文图影音过滤，右侧热门话题', tall: false },
    { src: '/shots/blog-home-dark.png', title: '前台时间线 · 冷月主题', caption: '一键切换深色夜空，主题跟随系统', tall: false },
    { src: '/shots/blog-admin-login.png', title: '后台登录页', caption: '管理员独立入口，建议开启二次验证', tall: false },
    { src: '/shots/blog-admin-dashboard.png', title: '管理后台 · 仪表盘', caption: '7 日指标环比、互动趋势图、内容分布、待处理块', tall: false },
    { src: '/shots/blog-plugin-market.png', title: '后台 · 插件商城', caption: 'GitHub 仓库驱动，一键安装 13+ 站点插件', tall: false },
    { src: '/shots/blog-ai-settings.png', title: '后台 · AI 设置', caption: '多供应商配置 + 摘要 / 标签 / 评论审核三场景', tall: false },
    { src: '/shots/blog-open-api.png', title: '后台 · 接口开放', caption: '勾选接口生成 API Key，供浏览器插件等外部应用调用', tall: false },
  ],
  deploy: [
    {
      label: 'bash · 源码部署（PostgreSQL + Go 1.26+ + Node.js 20+）',
      code: [
        '# 1. 克隆源码并准备环境变量（填写数据库连接与 JWT_SECRET）',
        'git clone https://github.com/roberts9012062/boke.git',
        'cd boke && cp .env.example .env',
        '',
        '# 2. 初始化数据库（26 表 + 种子数据 + 管理员账号）',
        './scripts/init-db.sh',
        './scripts/seed-admin.sh',
        '',
        '# 3. 启动双端（后端 :8080，前端 :3000，日志统一输出 logs/）',
        './scripts/dev-server.sh --daemon',
        './scripts/dev-frontend.sh --daemon',
        '',
        '# 4. 停止全部服务',
        './scripts/stop-all.sh',
      ].join('\n'),
    },
    {
      label: 'bash · Docker Compose 一键编排（含 PostgreSQL / Redis / SearXNG）',
      code: [
        'cd boke',
        'docker compose up -d',
        '# 浏览器访问 http://localhost:3000 即可完成初始化',
      ].join('\n'),
    },
  ],
  deployNote: 'SMTP 与 AI 为可选配置，不填不影响核心功能；初始管理员账号由 seed 脚本创建，见仓库 README。',
  usage: [
    { title: '注册与登录', desc: '注册自动生成用户名，支持邮箱或用户名登录；JWT 静默刷新，找回密码走邮件令牌' },
    { title: '发帖创作', desc: '点右上角「发帖」：写文字、传图片、录音频、发视频，设置标签与可见性，可存草稿' },
    { title: '互动社交', desc: '点赞收藏、楼中楼评论、关注流、私信、通知角标、话题与搜索' },
    { title: '后台治理', desc: '管理员从页脚进管理后台：仪表盘、内容审核、用户治理、SEO、AI、插件商城' },
  ],
  demo: null,
};
