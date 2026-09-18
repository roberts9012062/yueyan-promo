// B 站视频总结演示截图：模拟右键「总结本页」的真实链路（写 exec_task_v1 + yy-exec-offer 探测），
// 在 B 站视频页触发插件抓 AI 字幕 → 站点 AI 总结 → 富文本编辑器，截取执行过程与完成态。
// 前置：需要 B 站登录态（AI 字幕仅登录可见）——脚本会打开登录页等待人工扫码。
// 运行：YUEYAN_API_KEY=oa_xxx bash scripts/capture-bili.sh
import { createRequire } from 'node:module';
import { mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('O:/package/obj/newobj1/boke/frontend/package.json');
const { chromium } = require('playwright');

const HERE = dirname(fileURLToPath(import.meta.url));
const EXT_PATH = 'O:/package/obj/newobj1/boke/dist/browser-extension';
const OUT_DIR = resolve(HERE, '..', 'public', 'shots');
const PROFILE = resolve(HERE, '.ext-profile-bili');
const MANIFEST = resolve(EXT_PATH, 'manifest.json');

// 演示站点凭据（环境变量传入，不落文件）
const SITE = 'https://00b.top';
const API_KEY = process.env.YUEYAN_API_KEY ?? '';
if (API_KEY === '') {
  console.error('[capture-bili] 缺少环境变量 YUEYAN_API_KEY（站点后台「接口开放」生成后设置）');
  process.exit(1);
}

// 候选 B 站视频（TED 演讲类，内容适合总结成文章；登录态下 AI 字幕覆盖率高）
const CANDIDATE_VIDEOS = [
  { url: 'https://www.bilibili.com/video/BV1UbyZB9ERb/', label: 'TED演讲' },
  { url: 'https://www.bilibili.com/video/BV1hwbg6XEJS/', label: 'TED演讲备选' },
];

/** 给演示构建产物注入全域主机权限（等价安装时勾选「允许访问所有网站」；finally 恢复） */
const grantHostPermissions = () => {
  const original = readFileSync(MANIFEST, 'utf-8');
  const json = JSON.parse(original);
  json.host_permissions = ['http://*/*', 'https://*/*'];
  writeFileSync(MANIFEST, JSON.stringify(json, null, 2));
  return () => writeFileSync(MANIFEST, original);
};

const main = async () => {
  mkdirSync(OUT_DIR, { recursive: true });
  rmSync(PROFILE, { recursive: true, force: true });
  const restore = grantHostPermissions();

  // Playwright 无头模式不支持扩展加载，须有头运行
  const context = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1480, height: 900 },
    args: [
      `--disable-extensions-except=${EXT_PATH}`,
      `--load-extension=${EXT_PATH}`,
    ],
  });

  try {
    const worker =
      context.serviceWorkers()[0] ??
      (await context.waitForEvent('serviceworker', { timeout: 20000 }));

    // 预置插件连接配置
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

    // 打开 B 站登录页，Node 侧轮询 SESSDATA cookie 等待人工扫码（最长 5 分钟）
    const loginPage = await context.newPage();
    await loginPage.goto('https://passport.bilibili.com/login');
    console.log('[capture-bili] >>> 请在弹出的浏览器窗口中，用 B 站 App 扫码登录（最长等待 5 分钟）…');
    const loginDeadline = Date.now() + 300_000;
    let loggedIn = false;
    while (Date.now() < loginDeadline) {
      const cookies = await context.cookies('https://www.bilibili.com/');
      if (cookies.some((c) => c.name === 'SESSDATA' && c.value !== '')) {
        loggedIn = true;
        break;
      }
      await new Promise((r) => setTimeout(r, 3000));
    }
    if (!loggedIn) {
      throw new Error('等待 B 站扫码登录超时（5 分钟）');
    }
    console.log('[capture-bili] ✓ 检测到 B 站登录态（SESSDATA），开始演示流程');
    // 登录后补一跳刷新页面上下文 cookie，确保视频页请求携带完整登录态
    await loginPage.goto('https://www.bilibili.com/', { timeout: 45_000, waitUntil: 'domcontentloaded' });

    // 打开候选视频页（探测到页面加载完成即可，不依赖播放开始）
    const page = await context.newPage();
    let opened = false;
    for (const video of CANDIDATE_VIDEOS) {
      try {
        await page.goto(video.url, { timeout: 45_000, waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(4000);
        opened = true;
        console.log(`[capture-bili] ✓ 已打开视频：${video.label} ${video.url}`);
        break;
      } catch {
        console.log(`[capture-bili] 视频打开失败，换下一个候选：${video.label}`);
      }
    }
    if (!opened) {
      throw new Error('所有候选视频均打开失败');
    }

    // 复刻右键「总结本页」投递链路：写 exec_task_v1 → 向视频标签页发 yy-exec-offer
    const offered = await worker.evaluate(async () => {
      const tabs = await chrome.tabs.query({ url: '*://www.bilibili.com/video/*' });
      const tab = tabs[0];
      if (tab === undefined || tab.id === undefined || tab.url === undefined) {
        return false;
      }
      const nonce = crypto.randomUUID();
      await chrome.storage.local.set({
        exec_task_v1: {
          kind: 'summary',
          nonce,
          target: 'ball',
          createdAt: Date.now(),
          tabId: tab.id,
          pageUrl: tab.url,
          pageTitle: tab.title ?? tab.url,
        },
      });
      try {
        const reply = await chrome.tabs.sendMessage(tab.id, { type: 'yy-exec-offer', nonce });
        return typeof reply === 'object' && reply !== null && reply.ok === true;
      } catch {
        return false;
      }
    });
    console.log(`[capture-bili] 任务投递：${offered ? '执行框已展开' : '投递失败（无内容脚本应答）'}`);

    // 抓拍执行过程卡（字幕抓取/AI 总结进行中）
    await page.waitForTimeout(6000);
    await page.screenshot({ path: resolve(OUT_DIR, 'ext-bili-running.png') });
    console.log('[capture-bili] ✓ 已截执行过程');

    // 等待富文本编辑器出现（AI 总结 + 标题/标签生成完成），最长 3 分钟
    const editorFrame = page.frameLocator('iframe');
    try {
      await editorFrame.locator('text=发布').first().waitFor({ timeout: 180_000 });
      console.log('[capture-bili] ✓ 编辑器已就绪');
    } catch {
      console.log('[capture-bili] 编辑器等待超时，尝试直接截当前状态');
    }
    await page.waitForTimeout(1500);
    await page.screenshot({ path: resolve(OUT_DIR, 'ext-bili-editor.png') });
    console.log('[capture-bili] ✓ 已截编辑器完成态');

    await loginPage.close();
  } finally {
    await context.close();
    rmSync(PROFILE, { recursive: true, force: true });
    restore();
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
