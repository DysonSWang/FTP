#!/bin/bash

# 海南自贸港政策库 - Android APK 快速构建脚本

echo "🚀 海南自贸港政策库 - Android APK 构建工具"
echo "=========================================="

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi
echo "✅ Node.js: $(node -v)"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi
echo "✅ npm: $(npm -v)"

# 检查 Java
if ! command -v java &> /dev/null; then
    echo "❌ Java 未安装，请先安装 JDK 17+"
    exit 1
fi
echo "✅ Java: $(java -version 2>&1 | head -1)"

# 检查 Android SDK
if [ -z "$ANDROID_HOME" ] && [ -z "$ANDROID_SDK_ROOT" ]; then
    echo "⚠️  未设置 ANDROID_HOME 环境变量"
    echo "   请设置：export ANDROID_HOME=/path/to/android/sdk"
    exit 1
fi
echo "✅ Android SDK: $ANDROID_HOME"

# 安装依赖
echo ""
echo "📦 安装依赖..."
npm install

# 同步 Capacitor
echo ""
echo "🔄 同步 Capacitor..."
npx cap sync android

# 构建 APK
echo ""
echo "🔨 构建 APK..."
cd android
chmod +x gradlew
./gradlew assembleDebug

# 检查构建结果
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo ""
    echo "✅ APK 构建成功！"
    echo "📍 位置：android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "📱 安装到手机:"
    echo "   adb install app/build/outputs/apk/debug/app-debug.apk"
else
    echo ""
    echo "❌ APK 构建失败"
    exit 1
fi
