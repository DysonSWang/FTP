#!/bin/bash

# 海南自贸港政策库 - 快速启动脚本

echo "╔══════════════════════════════════════════════════════════╗"
echo "║     🌴 海南自由贸易港政策库 - AI 问答服务                   ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，正在安装依赖..."
    npm install
    echo ""
fi

# 检查 API Key 配置
if [ ! -f ".env" ] || ! grep -q "ZHIPU_API_KEY=." .env 2>/dev/null; then
    echo "⚠️  未配置智谱 AI API Key"
    echo ""
    echo "请选择配置方式："
    echo "  1. 前端配置 - 打开网站后在弹窗中配置（推荐个人使用）"
    echo "  2. 后端配置 - 现在编辑 .env 文件（推荐企业使用）"
    echo ""
    read -p "输入选项 (1/2): " choice
    
    if [ "$choice" = "2" ]; then
        echo "正在编辑 .env 文件..."
        nano .env
    fi
    echo ""
fi

# 停止已有服务
pkill -f "node server.js" 2>/dev/null
sleep 1

# 启动服务
echo "🚀 启动服务..."
node server.js &
SERVER_PID=$!

echo ""
echo "✅ 服务已启动！"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📱 访问地址：http://localhost:3001"
echo "🤖 API 端点：http://localhost:3001/api/chat"
echo "📊 健康检查：http://localhost:3001/api/health"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 提示："
echo "   • 首次访问会弹出 API Key 配置窗口"
echo "   • 点击右下角'🤖 政策助手'开始提问"
echo "   • 按 Ctrl+C 可停止服务（当前 PID: $SERVER_PID）"
echo ""

# 保持脚本运行
wait $SERVER_PID
