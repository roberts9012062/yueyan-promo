#!/usr/bin/env bash
# 生成 B 站视频总结演示截图（真实右键链路 + 站点 AI 总结）
# 需要人工在弹出的浏览器窗口扫码登录 B 站（AI 字幕仅登录可见）
# 用法：YUEYAN_API_KEY=oa_xxx bash scripts/capture-bili.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -z "${YUEYAN_API_KEY:-}" ]; then
  echo "[capture-bili] 缺少 YUEYAN_API_KEY，请先在站点后台「接口开放」生成 Key 并设置环境变量"
  exit 1
fi

node scripts/capture-bili.mjs 2>&1 | tee logs/capture-bili.log
