# 海南自贸港政策库 - Android APK 构建指南

## 📱 项目说明

本项目已将 Web 应用转换为 Android 应用，使用 Capacitor 框架打包。

## 🛠️ 构建方式

### 方式一：使用 GitHub Actions 自动构建（推荐）

项目已配置 GitHub Actions，每次 push 到 main 分支会自动构建 APK。

### 方式二：本地构建

#### 1. 环境要求

- **JDK 17+**: [下载](https://adoptium.net/)
- **Android Studio**: [下载](https://developer.android.com/studio)
- **Android SDK**: API 33 (Android 13)
- **Gradle**: 8.0+

#### 2. 安装依赖

```bash
# 克隆项目
git clone git@github.com:DysonSWang/FTP.git
cd hainan-policy

# 安装 Node 依赖
npm install

# 同步 Capacitor
npx cap sync android
```

#### 3. 使用 Android Studio 构建

```bash
# 用 Android Studio 打开项目
open android  # Mac
# 或
studio android  # Linux

# 在 Android Studio 中:
# 1. File -> Open -> 选择 android 目录
# 2. 等待 Gradle 同步完成
# 3. Build -> Build Bundle(s) / APK(s) -> Build APK(s)
```

#### 4. 命令行构建（需要配置环境变量）

```bash
# 设置环境变量
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# 进入 Android 项目目录
cd android

# 使用 Gradle Wrapper 构建
./gradlew assembleDebug

# APK 输出位置:
# android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📦 预构建 APK（推荐）

由于构建环境复杂，建议使用以下在线服务构建：

### 选项 1: GitHub Actions
1. 推送代码到 GitHub
2. Actions 会自动构建 APK
3. 在 Releases 下载

### 选项 2: 在线构建服务
- **Volta Build**: https://volta.build/
- **Appetize**: https://appetize.io/
- **Expo Application Services**: https://expo.dev/eas

---

## 🔧 配置说明

### capacitor.config.json

```json
{
  "appId": "com.hainan.ftp.policy",
  "appName": "海南自贸港政策库",
  "webDir": "www",
  "server": {
    "url": "http://120.48.16.193:5173",
    "cleartext": true
  }
}
```

**重要配置**:
- `appId`: 应用包名
- `appName`: 应用显示名称
- `server.url`: 后端 API 地址（生产环境请修改）

---

## 📱 应用特性

- ✅ 60 条海南自贸港核心政策
- ✅ AI 智能问答（智谱 GLM-4-Flash）
- ✅ 中英文双语支持
- ✅ 流式输出
- ✅ 离线访问（部分功能）
- ✅ 原生导航体验

---

## 🚀 部署到手机

### 方法 1: USB 调试
1. 手机开启开发者选项和 USB 调试
2. 连接电脑
3. Android Studio -> Run -> Run 'app'

### 方法 2: 直接安装 APK
1. 将 APK 传输到手机
2. 允许安装未知来源应用
3. 点击 APK 安装

---

## ⚠️ 注意事项

1. **API Key**: 生产环境请将 API Key 放在后端，不要打包到 APK
2. **HTTPS**: 生产环境建议使用 HTTPS
3. **权限**: 应用需要网络权限（已自动配置）

---

## 📞 技术支持

如有问题，请联系开发者或查看 Capacitor 文档：
- https://capacitorjs.com/docs
- https://developer.android.com/studio/intro

---

## 📄 许可证

MIT License
