// 产品数据聚合：四个产品区块 + 生态总览节点
import type { ProductInfo, EcosystemNode } from '../types';
import { blogProduct } from './blog';
import { extensionProduct } from './extension';
import { marketProduct } from './market';
import { relayProduct } from './relay';

export const products: readonly ProductInfo[] = [
  blogProduct,
  extensionProduct,
  marketProduct,
  relayProduct,
];

export const ecosystemNodes: readonly EcosystemNode[] = [
  { icon: '🌙', name: '月言博客', role: '内容母港 · 发布与治理', anchor: '#blog' },
  { icon: '🛰️', name: '浏览器插件', role: '侧边栏助手 · AI 与采集', anchor: '#extension' },
  { icon: '🧩', name: '插件商城', role: 'GitHub 仓库 · 站点扩展', anchor: '#market' },
  { icon: '🌐', name: '中继站', role: '星际总线 · 跨站大世界', anchor: '#relay' },
];

/** 顶部导航锚点（含部署/使用指南直达） */
export const navLinks: readonly { label: string; anchor: string }[] = [
  { label: '生态', anchor: '#ecosystem' },
  { label: '博客', anchor: '#blog' },
  { label: '插件', anchor: '#extension' },
  { label: '商城', anchor: '#market' },
  { label: '中继站', anchor: '#relay' },
  { label: '快速开始', anchor: '#quickstart' },
];
