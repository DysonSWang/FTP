# APK 构建经验教训总结

## 📊 概览

- **总尝试次数**: 16 次
- **总耗时**: 约 3 小时
- **最终状态**: ✅ 成功
- **构建工具**: GitHub Actions + Capacitor + Gradle

---

## 🚨 遇到的问题

### 问题 1: Java 版本不匹配（构建 #1-14）

**错误信息**:
```
invalid source release: 21
JAVA_HOME='/opt/hostedtoolcache/Java_Temurin-Hotspot_jdk/17.0.18-8/x64'
```

**原因**:
- GitHub Actions 环境默认使用 Java 17
- Capacitor 生成的 Android 项目默认配置为 Java 21
- `android/app/build.gradle` 中的 `sourceCompatibility` 和 `targetCompatibility` 设置为 21

**尝试的解决方案**（前 14 次构建）:
1. ✅ `npm ci` → `npm install`（解决 lock 文件问题）
2. ✅ 使用 `sed` 命令替换 Java 21 → Java 17
3. ✅ 添加 `gradle.properties` 强制指定 Java 路径
4. ❌ 多次调整 sed 命令的匹配模式

**为什么前 14 次失败**:
- `android/` 目录是动态生成的（`npx cap add android`）
- sed 命令没有正确匹配到实际的 Gradle 配置格式
- Capacitor 默认生成的 Java 版本配置可能有多种格式

---

### 问题 2: Capacitor Android 库编译失败（构建 #15）

**错误信息**:
```
Execution failed for task ':capacitor-android:compileDebugJavaWithJavac'
```

**原因**:
- 不是项目代码问题
- 是 `capacitor-android` 库本身的编译问题
- 旧版本 Capacitor 与 Gradle/Java 版本不兼容

**关键发现**:
- Gradle 运行了 1 分 24 秒才失败
- 说明 Java 版本配置已经生效
- 问题出在依赖库层面，不是项目配置

---

### 问题 3: YAML 语法错误（构建 #13）

**错误信息**:
```
Invalid workflow file - You have an error in your yaml syntax on line 75
```

**原因**:
- 在 YAML 中使用了复杂的 heredoc 语法（`<< 'GRADLE'`）
- YAML 对缩进和特殊字符敏感

**解决**:
- 简化 shell 脚本
- 移除复杂的 heredoc 嵌套

---

## ✅ 最终成功方案（构建 #16）

### 关键修复

```yaml
# 1. 使用最新版 Capacitor
- name: Install Capacitor (Latest Stable)
  run: |
    npm install @capacitor/core@latest @capacitor/cli@latest @capacitor/android@latest

# 2. 更新 Gradle 到兼容版本
- name: Update Gradle Wrapper
  run: |
    cd android
    sed -i 's/distributionUrl=.*/distributionUrl=https\:\/\/services.gradle.org\/distributions\/gradle-8.0.2-all.zip/' gradle/wrapper/gradle-wrapper.properties

# 3. 添加 AndroidX 支持
- name: Create gradle.properties
  run: |
    cd android
    cat > gradle.properties << 'EOF'
    org.gradle.java.home=/opt/hostedtoolcache/Java_Temurin-Hotspot_jdk/17.0.18-8/x64
    org.gradle.jvmargs=-Xmx2048m
    android.useAndroidX=true
    android.enableJetifier=true
    EOF
```

### 为什么这次成功

1. **最新版 Capacitor** - 修复了已知的兼容性问题
2. **Gradle 8.0.2** - 与 Capacitor 最新版兼容
3. **AndroidX 支持** - 启用 AndroidX 和 Jetifier
4. **Java 17 配置** - 正确匹配 GitHub Actions 环境

---

## 📝 经验教训

### 1. 优先升级依赖，而不是降级环境

**教训**: 
- 前 15 次尝试都在尝试"降级"Java 版本来适配旧版 Capacitor
- 最终成功是因为"升级"Capacitor 来适配现代环境

**建议**:
- 遇到兼容性问题时，优先考虑升级依赖到最新版
- 最新版通常修复了已知的兼容性问题

### 2. 查看详细错误日志至关重要

**教训**:
- 前 14 次构建都在修复 Java 版本问题
- 第 15 次构建显示真正的问题是 `capacitor-android` 编译失败
- 如果有完整日志，可能提前 5-6 次构建就能定位问题

**建议**:
- 始终添加 `--stacktrace --info` 获取详细错误
- 使用 `tail -200` 输出完整错误上下文
- 不要猜测错误原因，要看完整日志

### 3. 动态生成的代码需要特殊处理

**教训**:
- `android/` 目录是 `npx cap add android` 动态生成的
- 每次构建都会重新生成，配置可能变化
- sed 命令的匹配模式需要覆盖多种格式

**建议**:
- 对于动态生成的代码，优先在生成后修改配置文件
- 或者使用模板/配置来影响生成过程

### 4. 版本兼容性矩阵很重要

**教训**:
- Capacitor、Gradle、Java、Android SDK 之间有复杂的依赖关系
- 旧版本组合可能有未知的兼容性问题

**建议**:
- 查阅官方文档的版本兼容性矩阵
- 使用最新稳定版通常最安全
- 记录成功使用的版本组合

### 5. 添加调试输出

**教训**:
- 第 15 次构建添加了调试输出，帮助定位了真正问题
- 之前的构建不知道 sed 命令是否真正生效

**建议**:
- 在 CI/CD 中添加关键步骤的调试输出
- 显示修改前后的配置对比
- 使用 `grep` 验证修改结果

---

## 🎯 最佳实践清单

### GitHub Actions + Capacitor + Android

```yaml
# ✅ 推荐配置

# Node.js 版本
node-version: '22'

# Java 版本（GitHub Actions 默认）
java-version: '17'

# Capacitor 版本
@capacitor/core@latest
@capacitor/cli@latest
@capacitor/android@latest

# Gradle 版本
gradle-8.0.2 或更高

# gradle.properties 配置
org.gradle.java.home=/opt/hostedtoolcache/Java_Temurin-Hotspot_jdk/17.0.18-8/x64
org.gradle.jvmargs=-Xmx2048m
android.useAndroidX=true
android.enableJetifier=true
```

### 调试技巧

```bash
# 显示 Gradle 配置
grep -n "VERSION_\|sourceCompatibility\|targetCompatibility" build.gradle

# 显示修改前后对比
echo "=== 修改前 ==="
cat build.gradle
# 执行修改...
echo "=== 修改后 ==="
cat build.gradle

# 详细构建输出
./gradlew assembleDebug --no-daemon --stacktrace --info 2>&1 | tail -200
```

---

## 📈 构建时间线

| 构建 # | 状态 | 问题 | 耗时 |
|--------|------|------|------|
| 1-5 | ❌ | 各种配置问题 | ~30 分钟 |
| 6 | ❌ | `npm ci` 无 lock 文件 | ~5 分钟 |
| 7-12 | ❌ | Java 21 vs 17 | ~60 分钟 |
| 13 | ❌ | YAML 语法错误 | ~5 分钟 |
| 14 | ❌ | Java 版本修复不生效 | ~8 分钟 |
| 15 | ❌ | capacitor-android 编译失败 | ~8 分钟 |
| **16** | ✅ | **升级 Capacitor + Gradle** | **~10 分钟** |

**总计**: ~126 分钟（约 2 小时）

---

## 🔮 未来建议

### 如果要继续优化

1. **生成分发版本** - 配置签名生成 Release APK
2. **自动化发布** - 使用 GitHub Releases 自动上传 APK
3. **测试自动化** - 添加单元测试和 UI 测试
4. **多环境构建** - Debug/Release/Staging 分离
5. **版本管理** - 自动递增 versionCode

### 如果遇到问题

1. **先看完整日志** - 不要猜测
2. **检查版本兼容性** - 查阅官方文档
3. **优先升级依赖** - 而不是降级环境
4. **使用最新版** - 通常修复了已知问题
5. **添加调试输出** - 便于定位问题

---

## 📚 参考资源

- [Capacitor 官方文档](https://capacitorjs.com/docs)
- [GitHub Actions for Android](https://github.com/android-actions/setup-android)
- [Gradle 用户指南](https://docs.gradle.org/current/userguide/userguide.html)
- [Android 构建配置](https://developer.android.com/studio/build)

---

**最后更新**: 2026-02-22
**作者**: OpenClaw
**项目**: 海南自贸港政策库 (FTP)
