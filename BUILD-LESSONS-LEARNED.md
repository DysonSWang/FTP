# 海南自贸港政策库 - APK 构建经验总结

## 📋 完整问题清单与解决方案

### 问题 1: Java 版本不兼容
**错误**: `error: cannot access JavaVersion.VERSION_21`

**原因**: Capacitor 默认使用 Java 21，但 GitHub Actions 配置的是 Java 17

**解决**:
```yaml
- name: Fix Capacitor Java Version BEFORE sync
  run: |
    sed -i 's/VERSION_21/VERSION_17/g' node_modules/@capacitor/android/capacitor/build.gradle
```

**关键点**: 必须在 `npx cap sync` **之前**修改

---

### 问题 2: Android SDK 版本过低
**错误**: `error: cannot find symbol VANILLA_ICE_CREAM`

**原因**: SDK 34 没有这个常量，需要升级到 SDK 35

**解决**:
```yaml
- name: Create variables.gradle
  run: |
    cat > android/variables.gradle << 'EOF'
    ext {
        compileSdkVersion = 35
        targetSdkVersion = 35
    }
    EOF
```

---

### 问题 3: YAML heredoc 语法错误
**错误**: GitHub Actions 解析 YAML 失败

**原因**: 在 YAML 中使用 `<< 'EOF'`  heredoc 语法导致解析问题

**解决**: 改用 `echo` 或直接 `cat > file << 'EOF'` 在 `run` 命令中

**关键点**: YAML 中的多行命令要用 `|` 或 `>`，不要用 heredoc

---

### 问题 4: Git 合并冲突
**错误**: `error: Your local changes to the following files would be overwritten by merge`

**原因**: 本地 `android/` 目录与远程冲突

**解决**:
```yaml
- name: Add Android
  run: |
    rm -rf android
    npx cap add android
```

**关键点**: 每次构建都删除 `android/` 目录重新生成

---

### 问题 5: API 路径错误（相对路径）
**错误**: APK 提示 `network error failed to fetch`

**原因**: 前端使用相对路径 `/api/chat`，APK 无法访问本地服务器

**解决**:
```javascript
// index.html 第 353-360 行
const response = await fetch('http://120.48.16.193:5173/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, stream: false })
});
```

**关键点**: APK 必须使用**绝对 URL**访问外部服务器

---

### 问题 6: 网络安全配置缺失 ⭐ 最重要
**错误**: `net::ERR_CLEARTEXT_NOT_PERMITTED`

**原因**: Android 9+ 默认禁止 HTTP 明文传输，必须配置 `network_security_config`

**解决**:
```yaml
- name: Add Network Security Config
  run: |
    cd android/app/src/main
    mkdir -p res/xml
    cat > res/xml/network_security_config.xml << 'EOF'
    <?xml version="1.0" encoding="utf-8"?>
    <network-security-config>
        <base-config cleartextTrafficPermitted="true">
            <trust-anchors>
                <certificates src="system" />
            </trust-anchors>
        </base-config>
        <domain-config cleartextTrafficPermitted="true">
            <domain includeSubdomains="true">120.48.16.193</domain>
        </domain-config>
    </network-security-config>
    EOF

- name: Update AndroidManifest.xml
  run: |
    cd android/app/src/main
    sed -i 's/<application/<application\n        android:networkSecurityConfig="@xml\/network_security_config"/' AndroidManifest.xml
```

**关键点**: 
- GitHub Actions 会重新生成 `android/` 目录，配置必须在 workflow 中添加
- 不能依赖本地的 `android/` 目录

---

### 问题 7: 上传步骤引用错误
**错误**: `Upload` 步骤失败，`conclusion: failure`

**原因**: 引用了不存在的步骤输出 `${{ steps.version.outputs.package-json }}`

**解决**:
```yaml
- name: Upload APK
  uses: actions/upload-artifact@v4
  with:
    name: hainan-policy-v1.0.0-build1  # 直接使用静态版本号
    path: android/app/build/outputs/apk/debug/app-debug.apk
    retention-days: 30
```

---

## ✅ 最终成功配置

### 核心配置文件

#### 1. `.github/workflows/build-apk.yml`
关键步骤顺序：
1. Setup Node.js & Java
2. Install Dependencies
3. Setup Android
4. **Fix Capacitor Java Version** ( BEFORE sync!)
5. Create www (copy frontend files)
6. Init Capacitor (with version info)
7. Add Android (rm -rf first!)
8. Create variables.gradle (SDK 35)
9. Sync
10. Setup gradle.properties
11. Rewrite app/build.gradle
12. **Add Network Security Config** ⭐
13. **Update AndroidManifest.xml** ⭐
14. Build
15. Upload APK

#### 2. `capacitor.config.json`
```json
{
  "appId": "com.hainan.ftp.policy",
  "appName": "海南自贸港政策库",
  "version": "1.0.0",
  "versionCode": 1,
  "server": {
    "url": "http://120.48.16.193:5173",
    "cleartext": true
  },
  "android": {
    "allowMixedContent": true,
    "webContentsDebuggingEnabled": true
  }
}
```

#### 3. `index.html` (API 调用)
```javascript
// 必须使用绝对 URL
const API_URL = 'http://120.48.16.193:5173/api/chat';
const response = await fetch(API_URL, { ... });
```

---

## 🎯 关键教训

### 1. Android 网络安全是首要问题
- Android 9+ 默认禁止 HTTP
- 必须配置 `network_security_config.xml`
- 必须在 `AndroidManifest.xml` 中引用
- **GitHub Actions 会重新生成 android 目录，配置必须在 workflow 中**

### 2. 版本管理要清晰
- `package.json`: `version` + `versionCode`
- `capacitor.config.json`: 同步版本信息
- APK 文件名包含版本号

### 3. 绝对路径 vs 相对路径
- APK 是独立应用，不能用相对路径
- 必须使用完整 URL: `http://IP:PORT/api/xxx`

### 4. 构建顺序很重要
- Java 版本修改 → **在 sync 之前**
- 网络配置 → **在 build 之前**
- 删除 android 目录 → **在 cap add 之前**

### 5. 服务器配置
- 后端必须允许 CORS: `app.use(cors())`
- 服务器必须外网可访问
- 保持服务运行（后台进程）

---

## 📝 快速检查清单

下次构建前检查：

- [ ] `package.json` 版本号已更新
- [ ] `index.html` 使用绝对 API URL
- [ ] workflow 包含网络安全配置步骤
- [ ] workflow 在 sync 前修复 Java 版本
- [ ] 服务器正在运行且外网可访问
- [ ] 后端 CORS 已启用
- [ ] Git 提交前删除 `android/` 目录（或 .gitignore）

---

## 🔗 相关资源

- GitHub Actions: https://github.com/DysonSWang/FTP/actions
- 服务器地址: http://120.48.16.193:5173
- 文档位置: `/root/.openclaw/workspace/hainan-policy/RELEASES.md`

---

**最后更新**: 2026-02-22  
**当前版本**: v1.0.0 (build 1)  
**构建次数**: 36 次（最终成功）
