#!/usr/bin/env bash
# 开发模式启动宣传站（后台运行，日志输出 logs/dev.log）
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p logs

if [ ! -d node_modules ]; then
  echo "[dev] 首次运行，安装依赖..."
  npm install 2>&1 | tee logs/install.log
fi

nohup npm run dev > logs/dev.log 2>&1 &
echo $! > .pids/dev.pid
echo "[dev] 已启动（pid $(cat .pids/dev.pid)），日志：logs/dev.log"
echo "[dev] 访问 http://localhost:5273"
