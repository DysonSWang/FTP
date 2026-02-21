# 🔑 智谱 AI API Key 配置指南

## 获取 API Key

### 步骤 1: 访问智谱 AI 开放平台
打开浏览器访问：**https://open.bigmodel.cn/**

### 步骤 2: 注册/登录
- 新用户：点击右上角"注册"，使用手机号或邮箱注册
- 已有账号：直接登录

### 步骤 3: 进入控制台
登录后，点击右上角头像 → "控制台"

### 步骤 4: 创建 API Key
1. 在左侧菜单选择 "API 密钥管理"
2. 点击 "创建新的 API 密钥"
3. 输入密钥名称（如：hainan-policy）
4. 点击确认创建

### 步骤 5: 复制 API Key
- 创建成功后会显示 API Key
- **立即复制保存**（只会显示一次）
- 格式类似：`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxx`

---

## 配置方式

### 方式 1: 前端配置（推荐个人/演示使用）

1. 打开网站：http://localhost:3001
2. 首次访问会弹出配置窗口
3. 粘贴 API Key 到输入框
4. 点击"保存并启用"

**优点**：
- ✅ 简单快捷
- ✅ 无需修改服务器配置
- ✅ 适合个人使用和演示

**缺点**：
- ⚠️ API Key 存储在浏览器本地
- ⚠️ 不适合公开网站

---

### 方式 2: 后端配置（推荐企业/生产使用）

1. 编辑 `.env` 文件：
```bash
nano /root/.openclaw/workspace/hainan-policy/.env
```

2. 填入你的 API Key：
```env
ZHIPU_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxx
```

3. 重启服务：
```bash
# 找到并停止当前进程
pkill -f "node server.js"

# 重新启动
cd /root/.openclaw/workspace/hainan-policy
node server.js &
```

**优点**：
- ✅ API Key 存储在服务器端
- ✅ 更安全
- ✅ 适合生产环境

**缺点**：
- ⚠️ 需要服务器访问权限
- ⚠️ 重启服务需要重新配置

---

## 免费额度说明

### 新用户福利
- 注册即送 **¥25 体验金**
- 有效期 30 天

### glm-4-flash 价格
- **输入**: ¥0.001 / 千 tokens
- **输出**: ¥0.004 / 千 tokens

### 使用量估算
以典型问答为例：
- 用户问题：50 tokens
- AI 回答：200 tokens
- 单次成本：约 ¥0.001（不到 1 分钱）

**¥25 体验金大约可以使用 2000+ 次问答**

---

## 充值说明（如需要）

1. 进入控制台 → "充值中心"
2. 选择充值金额（最低 ¥10）
3. 支持微信、支付宝支付
4. 充值后自动抵扣使用

---

## 查看使用量

1. 进入控制台 → "用量统计"
2. 可查看：
   - 每日调用次数
   - Token 消耗量
   - 费用明细
   - 剩余余额

---

## 常见问题

### Q: API Key 泄露了怎么办？
A: 立即在控制台删除该 Key，重新创建新的 Key

### Q: 额度用完了怎么办？
A: 可以充值或等待下月免费额度（如有活动）

### Q: 支持哪些模型？
A: 
- glm-4-flash（推荐，性价比高）
- glm-4（性能更强）
- glm-4-plus（专业场景）
- glm-3-turbo（已逐步淘汰）

### Q: 调用频率有限制吗？
A: 
- 免费版：10 次/秒
- 充值后：可申请提高限额

### Q: 可以商用吗？
A: 可以，智谱 AI 支持商业应用

---

## 技术支持

- **官方文档**: https://open.bigmodel.cn/dev/api
- **API 文档**: https://open.bigmodel.cn/dev/api#chat
- **社区论坛**: https://open.bigmodel.cn/community
- **客服邮箱**: support@zhipuai.cn

---

## 回到项目

配置完成后，返回网站开始使用：
**http://localhost:3001**

点击右下角的 **"🤖 政策助手"** 按钮，开始提问吧！
