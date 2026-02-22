#!/bin/bash
# 海南政策服务监控脚本
# 每 5 分钟检查一次，服务停止则自动重启

LOG_FILE="/root/.openclaw/workspace/hainan-policy/monitor.log"
SERVER_DIR="/root/.openclaw/workspace/hainan-policy"
PORT=5173

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> $LOG_FILE
}

check_service() {
    # 检查端口是否被占用
    if lsof -ti:$PORT > /dev/null 2>&1; then
        log "✅ 服务运行正常 (端口 $PORT)"
        return 0
    else
        log "❌ 服务未运行，正在重启..."
        return 1
    fi
}

start_service() {
    cd $SERVER_DIR
    
    # 清理旧日志
    > hainan-backend.log
    
    # 启动服务
    nohup node server.js > hainan-backend.log 2>&1 &
    PID=$!
    
    sleep 3
    
    # 验证启动
    if lsof -ti:$PORT > /dev/null 2>&1; then
        log "✅ 服务已启动 (PID: $PID)"
        return 0
    else
        log "❌ 服务启动失败"
        return 1
    fi
}

# 主逻辑
log "===== 开始检查服务 ====="

if ! check_service; then
    start_service
fi

# 测试 API
if curl -s http://localhost:$PORT > /dev/null 2>&1; then
    log "✅ API 测试通过"
else
    log "❌ API 测试失败"
fi

log "===== 检查完成 ====="
