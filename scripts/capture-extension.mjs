// 浏览器插件演示截图脚本：以持久化上下文加载本地构建产物，
// 预置站点连接配置与演示书签后，逐个标签页截图输出到 public/shots/。
// 依赖复用 boke 前端的 playwright（含浏览器二进制），本仓库不重复安装。
import { createRequire } from 'node:module';
import { mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('O:/package/obj/newobj1/boke/frontend/package.json');
const { chromium } = require('playwright');

const HERE = dirname(fileURLToPath(import.meta.url));
const EXT_PATH = 'O:/package/obj/newobj1/boke/dist/browser-extension';
const OUT_DIR = resolve(HERE, '..', 'public', 'shots');
const PROFILE = resolve(HERE, '.ext-profile');

// 演示站点与开放接口 Key：站点地址固定，Key 从环境变量读取（真实凭据不落仓库文件）
// 生成方式：站点后台「接口开放」勾选接口 → 生成 Key → 运行前 export YUEYAN_API_KEY=oa_xxx
const SITE = 'https://00b.top';
const API_KEY = process.env.YUEYAN_API_KEY ?? '';

if (API_KEY === '') {
  console.error('[capture] 缺少环境变量 YUEYAN_API_KEY（在站点后台「接口开放」页生成后设置）');
  process.exit(1);
}

/** 等待面板处于已连接就绪状态（头像与动态列表渲染完成） */
const waitReady = async (page) => {
  await page.waitForSelector('button[aria-label="设置"]', { timeout: 20000 });
  await page.waitForTimeout(2500);
};

/** 预置演示书签树（文件夹 + 站点导航），让书签夹截图有内容 */
const seedBookmarks = async (worker) => {
  await worker.evaluate(async () => {
    const folder = await chrome.bookmarks.create({
      parentId: '1',
      title: '月言生态',
    });
    const children = [
      { title: '月言插件库 yueyan-plugins', url: 'https://github.com/roberts9012062/yueyan-plugins' },
      { title: '浏览器插件源码', url: 'https://github.com/roberts9012062/yueyan-browser-extension' },
    ];
    for (const child of children) {
      await chrome.bookmarks.create({ parentId: folder.id, ...child });
    }
    await chrome.bookmarks.create({ parentId: '1', title: '月言 · 月色微博客', url: 'https://00b.top/' });
    await chrome.bookmarks.create({ parentId: '1', title: '中继站 · 大世界', url: 'https://c8.wiki/' });
  });
};

const main = async () => {
  mkdirSync(OUT_DIR, { recursive: true });
  rmSync(PROFILE, { recursive: true, force: true });

  // Playwright 无头模式不支持扩展加载，须有头运行（截图期间会短暂弹出浏览器窗口）
  const context = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 440, height: 880 },
    args: [
      `--disable-extensions-except=${EXT_PATH}`,
      `--load-extension=${EXT_PATH}`,
    ],
  });

  try {
    // 从 service worker 解析扩展 ID，并写入连接配置
    const worker =
      context.serviceWorkers()[0] ??
      (await context.waitForEvent('serviceworker', { timeout: 20000 }));
    const extId = worker.url().split('/')[2];
    await worker.evaluate(async ([baseUrl, apiKey]) => {
      await chrome.storage.local.set({
        plugin_settings_v1: {
          apiBaseUrl: baseUrl,
          apiKey,
          theme: 'cool-moon',
          showBall: true,
          autoSyncNav: true,
          publishImageBed: 'none',
          cfBedUrl: '',
          cfBedKey: '',
        },
      });
    }, [SITE, API_KEY]);
    await seedBookmarks(worker);

    const page = await context.newPage();
    await page.goto(`chrome-extension://${extId}/src/sidepanel/index.html`);
    await waitReady(page);

    // 首页：站点动态 + 底部写说说
    await page.screenshot({ path: resolve(OUT_DIR, 'ext-home.png') });

    // AI 助手：发起一条真实对话，等流式回复完成后截图
    await page.getByRole('button', { name: 'AI 助手', exact: true }).click();
    await page.waitForTimeout(1500);
    const box = page.locator('textarea').first();
    if (await box.count() > 0) {
      await box.fill('用一句话介绍月言博客');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(12000);
    }
    await page.screenshot({ path: resolve(OUT_DIR, 'ext-ai.png') });

    // 书签夹：本地书签树 + AI 识别添加入口
    await page.getByRole('button', { name: '书签', exact: true }).click();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: resolve(OUT_DIR, 'ext-bookmark.png') });

    // 设置面板：站点连接 + 发布图床三通道配置
    await page.getByRole('button', { name: '首页', exact: true }).click();
    await page.locator('button[aria-label="设置"]').click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: resolve(OUT_DIR, 'ext-settings.png') });
  } finally {
    await context.close();
    rmSync(PROFILE, { recursive: true, force: true });
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
