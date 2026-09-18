// 中继站（Relay Station · 大世界）产品数据：跨站内容分发中枢
import type { ProductInfo } from '../types';

export const relayProduct: ProductInfo = {
  id: 'relay',
  badge: '04 · 星际总线',
  icon: '🌐',
  name: '月语中继 · 大世界',
  tagline: '把每个孤独的星球都串联在一起',
  intro:
    '月言生态的跨站内容分发中枢：成员博客把说说与文章推上总线，中继站分发给所有成员，各家首页呈现一个实时更新的「大世界」。公网站点间它是路由器，内网 / NAS 站点它是公网门面。',
  siteUrl: 'https://c8.wiki/',
  siteLabel: 'c8.wiki · 线上站点',
  repoUrl: null,
  repoLabel: '暂未开放源码（后续开源）',
  closedNote: '中继站目前暂未开放源码（后续会开源），可直接使用线上 c8.wiki 实例对接；博客侧（boke）的对接能力已随主程序开源。',
  stack: ['Go 模块化单体', 'PostgreSQL', 'Redis', 'WS 实时扇出', 'html/template 服务端渲染', 'Docker Compose'],
  license: '暂未开源 · 后续开放',
  isOpenSource: false,
  features: [
    { icon: '🌍', title: '大世界聚合流', desc: '成员博客的公开说说与文章推上总线，每颗星球的首页都呈现同一个实时更新的「大世界」' },
    { icon: '🛰️', title: '内网星球桥接', desc: 'NAS 与内网部署的博客同样收发自如——中继站担任公网门面，全文与图片由总线托管' },
    { icon: '🔐', title: '自助申请对接', desc: '博客后台填入中继站地址即可申请，nonce 同步质询防冒充，key 全程隐藏保管' },
    { icon: '⚖️', title: '配额与治理', desc: '每日发布配额、媒体限额、内容红线治理、站点离线 30 天自动除名腾名额' },
    { icon: '📊', title: '运营统计', desc: '连接日志全链路打点、发布趋势、形态 / 站点占比，运营状态一目了然' },
    { icon: '🪐', title: '千站星系首页', desc: '真实成员星球向日葵布局 + 空位虚影 + 三层星闪 + 流星 + 信号脉冲，默认容量 1000 站' },
  ],
  screenshots: [
    { src: '/shots/relay-home.png', title: '星系首页', caption: '全屏星系：已连接星球 + 虚位以待，实时数据卡', tall: false },
    { src: '/shots/relay-features.png', title: '四大能力', caption: '聚合流 / 内网桥接 / 配额治理 / 自助申请', tall: false },
    { src: '/shots/relay-steps.png', title: '接入四步曲', caption: '部署 → 申请 → 点火 → 广播', tall: false },
    { src: '/shots/blog-relay-admin.png', title: '博客侧 · 中继站对接页', caption: '填入中继站地址申请对接许可，一键点火', tall: false },
  ],
  deploy: [
    {
      label: 'bash · 中继站本体（Go + PostgreSQL + Redis，docker-compose 一键起）',
      code: [
        '# 中继站暂未开源：博客侧无需部署中继站，直接对接官方实例即可',
        '# 自建中继站请联系作者获取源码；以下为博客侧接入方式：',
        '',
        '# 1. 部署月言博客（见 01 · 主站）',
        '# 2. 后台「中继站」页填入地址，例如：',
        'https://c8.wiki',
        '# 3. 点击「申请对接许可」→ 通过后「点火对接」',
      ].join('\n'),
    },
  ],
  deployNote: '协议契约以中继站 docs/02-协议规范.md 为唯一契约；public 站点申请经 nonce 质询自动验证，bridged（内网桥接）站点人工审核。',
  usage: [
    { title: '部署博客', desc: '先跑起一座月言博客（boke），进入后台「中继站」页面' },
    { title: '申请对接', desc: '填入中继站地址（如 https://c8.wiki）与站点模式，点击「申请对接许可」' },
    { title: '点火对接', desc: '收到许可后点击「点火对接」，倒计时结束、卫星与星球锁定，接入大世界' },
    { title: '开始广播', desc: '发布说说与文章，它们将实时广播到每一颗已连接的星球' },
  ],
  demo: { account: '任意 boke 站点', password: '后台「中继站」一键申请' },
};
