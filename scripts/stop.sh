#!/usr/bin/env bash
# 停止宣传站开发服务
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -f .pids/dev.pid ]; then
  pid=$(cat .pids/dev.pid)
  if kill "$pid" 2>/dev/null; then
    echo "[stop] 已停止 dev 服务（pid $pid）"
  else
    echo "[stop] pid $pid 已不在运行"
  fi
  rm -f .pids/dev.pid
else
  echo "[stop] 未发现运行中的服务"
fi
