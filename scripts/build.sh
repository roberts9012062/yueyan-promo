#!/usr/bin/env bash
# 生产构建（类型检查 + 产物输出 dist/）
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p logs

if [ ! -d node_modules ]; then
  echo "[build] 首次运行，安装依赖..."
  npm install 2>&1 | tee logs/install.log
fi

npm run build 2>&1 | tee logs/build.log
echo "[build] 构建完成，产物在 dist/"
