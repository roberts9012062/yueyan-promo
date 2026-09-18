// 全局类型定义：产品区块数据结构（强类型，禁止裸 any）

/** 特性条目：图标 + 标题 + 描述 */
export interface FeatureItem {
  readonly icon: string;
  readonly title: string;
  readonly desc: string;
}

/** 演示截图：文件名 + 标题 + 说明 */
export interface ScreenshotItem {
  readonly src: string;
  readonly title: string;
  readonly caption: string;
  /** 垂直长图（浏览器侧边栏截图）按侧栏高度展示 */
  readonly tall: boolean;
}

/** 代码块：终端命令或配置说明 */
export interface CodeBlock {
  readonly label: string;
  readonly code: string;
}

/** 使用步骤：序号自动生成 */
export interface UsageStep {
  readonly title: string;
  readonly desc: string;
}

/** 演示账号信息 */
export interface DemoAccount {
  readonly account: string;
  readonly password: string;
}

/** 单个产品区块的完整数据 */
export interface ProductInfo {
  readonly id: string;
  readonly badge: string;
  readonly icon: string;
  readonly name: string;
  readonly tagline: string;
  readonly intro: string;
  readonly siteUrl: string | null;
  readonly siteLabel: string;
  readonly repoUrl: string | null;
  readonly repoLabel: string;
  readonly closedNote: string | null;
  /** 开源协议展示文案（如 MIT；闭源产品为「暂未开源」类文案） */
  readonly license: string;
  /** 是否已开源（决定协议徽章配色） */
  readonly isOpenSource: boolean;
  readonly stack: readonly string[];
  readonly features: readonly FeatureItem[];
  readonly screenshots: readonly ScreenshotItem[];
  readonly deploy: readonly CodeBlock[];
  readonly deployNote: string;
  readonly usage: readonly UsageStep[];
  readonly demo: DemoAccount | null;
}

/** 生态总览节点（关系图用） */
export interface EcosystemNode {
  readonly icon: string;
  readonly name: string;
  readonly role: string;
  readonly anchor: string;
}
