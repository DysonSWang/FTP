# 🌴 海南自贸港政策库 - 部署指南

## 快速部署（3 步启动）

```bash
# 1. 克隆代码
git clone git@github.com:DysonSWang/FTP.git
cd FTP/hainan-policy

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 填入智谱 AI API Key

# 4. 启动服务
node server.js
```

访问：http://localhost:5173

---

## 📋 环境要求

| 项目 | 版本 | 检查命令 |
|------|------|---------|
| Node.js | v16+ | `node -v` |
| npm | v8+ | `npm -v` |
| 端口 | 5173 可用 | `lsof -ti:5173` |

---

## 🔑 配置文件

### .env 环境变量

```bash
# 智谱 AI API Key（必需）
# 申请地址：https://open.bigmodel.cn/
ZHIPU_API_KEY=your_api_key_here

# 服务端口（可选，默认 5173）
PORT=5173

# 服务器外网 IP（可选，用于 APK 连接）
SERVER_IP=你的服务器公网IP
```

---

## 🚀 生产环境部署

### 方案 1：PM2 进程管理（推荐）

```bash
# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start server.js --name hainan-policy

# 开机自启
pm2 startup
pm2 save

# 查看日志
pm2 logs hainan-policy

# 重启服务
pm2 restart hainan-policy
```

### 方案 2：Systemd 服务

```bash
# 创建服务文件
sudo nano /etc/systemd/system/hainan-policy.service
```

```ini
[Unit]
Description=Hainan FTP Policy Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/hainan-policy
ExecStart=/usr/bin/node server.js
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

```bash
# 启动服务
sudo systemctl enable hainan-policy
sudo systemctl start hainan-policy
sudo systemctl status hainan-policy
```

### 方案 3：Docker 部署

```bash
# 构建镜像
docker build -t hainan-policy .

# 启动容器
docker run -d \
  --name hainan-policy \
  -p 5173:5173 \
  --restart always \
  -e ZHIPU_API_KEY=your_key \
  hainan-policy
```

---

## 📱 APK 构建

### GitHub Actions 自动构建

1. 推送代码到 `master` 分支
2. GitHub Actions 自动触发构建
3. 在 [Actions](https://github.com/DysonSWang/FTP/actions) 下载 APK

### 本地构建

```bash
# 安装 Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# 构建前端
npm run build

# 同步到 Android
npx cap sync android

# 打开 Android Studio
npx cap open android
```

---

## 🔧 故障排查

### 服务无法启动

```bash
# 检查端口占用
lsof -ti:5173 | xargs kill -9

# 检查 Node 版本
node -v  # 需要 v16+

# 重新安装依赖
rm -rf node_modules package-lock.json
npm install
```

### AI 问答无响应

```bash
# 检查智谱 API Key
cat .env | grep ZHIPU

# 测试 API 连接
curl https://open.bigmodel.cn/api/paas/v4/chat/completions \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"glm-4-flash","messages":[{"role":"user","content":"test"}]}'
```

### 外网无法访问

```bash
# 检查防火墙
sudo ufw allow 5173

# 检查服务器 IP
curl ifconfig.me

# 测试外网访问
curl http://你的服务器IP:5173
```

---

## 📊 监控与维护

### 服务监控脚本

```bash
# 运行监控脚本
./monitor-service.sh

# 查看监控日志
tail -f monitor.log
```

### 日志查看

```bash
# 后端日志
tail -f hainan-backend.log

# PM2 日志
pm2 logs hainan-policy

# 系统日志
journalctl -u hainan-policy -f
```

---

## 🎯 演示准备

### 演示前检查

```bash
# 1. 服务状态
curl -sI http://localhost:5173 | head -3

# 2. AI 问答测试
curl -X POST http://localhost:5173/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"测试","stream":false}'

# 3. 政策数据
curl http://localhost:5173/api/policies | head -20
```

### 演示数据

- **政策数量**: 60 条
- **政策分类**: 8 个
- **AI 模型**: 智谱 GLM-4-Flash
- **响应时间**: < 2 秒

---

## 📞 技术支持

| 问题类型 | 联系方式 |
|---------|---------|
| 部署问题 | 查看本文档 |
| API 问题 | 智谱 AI 文档 |
| 代码问题 | GitHub Issues |

---

## 📄 许可证

MIT License

---

**最后更新**: 2026-02-22  
**当前版本**: v1.0.0
