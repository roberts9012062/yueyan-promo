#!/usr/bin/env bash
# 生成浏览器插件演示截图（加载本地构建产物 + 连接 00b.top 演示站点）
# 用法：YUEYAN_API_KEY=oa_xxx（站点后台「接口开放」生成）bash scripts/capture-extension.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -z "${YUEYAN_API_KEY:-}" ]; then
  echo "[capture] 缺少 YUEYAN_API_KEY，请先在站点后台「接口开放」生成 Key 并设置环境变量"
  exit 1
fi

node scripts/capture-extension.mjs 2>&1 | tee logs/capture-extension.log
