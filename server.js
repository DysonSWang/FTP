/**
 * 海南自贸港政策库 - AI 问答服务器
 * 提供政策数据查询、AI 智能问答、中英文支持
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5173;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 加载政策数据
let policiesData = { policies: [], categories: [], meta: {} };
try {
  const dataPath = path.join(__dirname, 'data', 'policies.json');
  const fileContent = fs.readFileSync(dataPath, 'utf8');
  policiesData = JSON.parse(fileContent);
  console.log(`✅ 政策数据已加载：${policiesData.policies.length} 条`);
} catch (e) {
  console.log('⚠️  政策数据加载失败，使用空数据');
  console.log('错误:', e.message);
}

// 加载知识库
let knowledgeBase = {};
try {
  const kbPath = path.join(__dirname, 'knowledge-base.js');
  const kbContent = fs.readFileSync(kbPath, 'utf8');
  const match = kbContent.match(/const knowledgeBase = ({[\s\S]*?});\s*$/m);
  if (match) {
    // 简单处理，实际应该用更好的解析方式
    console.log('✅ 知识库文件已读取');
  }
} catch (e) {
  console.log('⚠️  知识库加载失败');
}

// ==================== 智能问答引擎 ====================

/**
 * 简单的政策匹配引擎（基于关键词）
 */
function findRelevantPolicies(question) {
  const keywords = question.toLowerCase().split(/[\s,，？?]+/).filter(k => k.length > 1);
  
  const scored = policiesData.policies.map(policy => {
    let score = 0;
    const title = policy.title.toLowerCase();
    const category = policy.category.toLowerCase();
    
    keywords.forEach(keyword => {
      if (title.includes(keyword)) score += 3;
      if (category.includes(keyword)) score += 2;
      if (policy.date.includes(keyword)) score += 1;
    });
    
    return { ...policy, score };
  });
  
  return scored
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

/**
 * 生成智能回答
 */
function generateAnswer(question, relevantPolicies) {
  if (relevantPolicies.length === 0) {
    return {
      answer: "抱歉，我暂时没有找到相关政策。您可以尝试：\n1. 更换关键词搜索\n2. 浏览政策分类\n3. 联系人工客服",
      policies: []
    };
  }
  
  const topPolicy = relevantPolicies[0];
  const category = policiesData.categories.find(c => c.id === topPolicy.category);
  
  let answer = `根据您的问题，我找到了相关政策：\n\n`;
  answer += `**${topPolicy.title}**\n\n`;
  answer += `📅 发布日期：${topPolicy.date}\n`;
  answer += `📁 政策类别：${category ? category.name : topPolicy.category}\n`;
  answer += `🏛️ 政策级别：${topPolicy.level === 'national' || topPolicy.level === 'national-law' ? '国家级' : '省级'}\n\n`;
  
  if (relevantPolicies.length > 1) {
    answer += `**相关政策：**\n`;
    relevantPolicies.slice(1, 4).forEach((p, i) => {
      answer += `${i + 1}. ${p.title}\n`;
    });
  }
  
  answer += `\n🔗 您可以点击政策标题查看原文详情。`;
  
  return {
    answer,
    policies: relevantPolicies
  };
}

// ==================== API 接口 ====================

/**
 * POST /api/chat
 * AI 聊天接口（兼容原版）
 */
app.post('/api/chat', (req, res) => {
  const { message, stream = false } = req.body;
  
  if (!message) {
    return res.status(400).json({
      success: false,
      message: '请输入问题'
    });
  }
  
  const relevantPolicies = findRelevantPolicies(message);
  const result = generateAnswer(message, relevantPolicies);
  
  // 流式响应（兼容原版）
  if (stream) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    
    let i = 0;
    const chunks = result.answer.split(' ');
    
    const sendChunk = () => {
      if (i < chunks.length) {
        res.write(chunks[i] + ' ');
        i++;
        setTimeout(sendChunk, 50);
      } else {
        res.end();
      }
    };
    
    sendChunk();
  } else {
    res.json({
      success: true,
      answer: result.answer,
      policies: result.policies
    });
  }
});

/**
 * GET /api/policies
 */
app.get('/api/policies', (req, res) => {
  const { category, page = 1, limit = 20, search } = req.query;
  
  let filtered = [...policiesData.policies];
  
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  if (search) {
    const keyword = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(keyword) ||
      p.date.includes(keyword) ||
      p.category.toLowerCase().includes(keyword)
    );
  }
  
  const pageNum = parseInt(page);
  const pageSize = parseInt(limit);
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;
  
  res.json({
    success: true,
    data: filtered.slice(start, end),
    pagination: {
      page: pageNum,
      limit: pageSize,
      total,
      totalPages
    }
  });
});

/**
 * GET /api/policies/stats
 */
app.get('/api/policies/stats', (req, res) => {
  const stats = {
    total: policiesData.policies.length,
    categories: {},
    levels: {
      national: 0,
      provincial: 0
    },
    latest: null,
    earliest: null
  };
  
  policiesData.categories.forEach(cat => {
    stats.categories[cat.id] = policiesData.policies.filter(p => p.category === cat.id).length;
  });
  
  policiesData.policies.forEach(p => {
    if (p.level === 'national' || p.level === 'national-law') {
      stats.levels.national++;
    } else {
      stats.levels.provincial++;
    }
  });
  
  if (policiesData.policies.length > 0) {
    const sorted = [...policiesData.policies].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    stats.latest = sorted[0].date;
    stats.earliest = sorted[sorted.length - 1].date;
  }
  
  res.json({
    success: true,
    data: stats
  });
});

/**
 * GET /api/policies/latest
 */
app.get('/api/policies/latest', (req, res) => {
  const { limit = 10 } = req.query;
  const latest = [...policiesData.policies]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, parseInt(limit));
  
  res.json({
    success: true,
    data: latest
  });
});

/**
 * GET /api/policies/search
 */
app.get('/api/policies/search', (req, res) => {
  const { q, category } = req.query;
  
  if (!q) {
    return res.json({
      success: true,
      data: [],
      message: '请输入搜索关键词'
    });
  }
  
  const keyword = q.toLowerCase();
  let results = policiesData.policies.filter(p => 
    p.title.toLowerCase().includes(keyword) ||
    p.date.includes(keyword) ||
    p.category.toLowerCase().includes(keyword)
  );
  
  if (category) {
    results = results.filter(p => p.category === category);
  }
  
  res.json({
    success: true,
    data: results,
    total: results.length,
    keyword: q
  });
});

/**
 * GET /api/policies/:id
 */
app.get('/api/policies/:id', (req, res) => {
  const policy = policiesData.policies.find(p => p.id === parseInt(req.params.id));
  
  if (!policy) {
    return res.status(404).json({
      success: false,
      message: '政策不存在'
    });
  }
  
  const related = policiesData.policies
    .filter(p => p.category === policy.category && p.id !== policy.id)
    .slice(0, 5);
  
  res.json({
    success: true,
    data: {
      ...policy,
      related
    }
  });
});

/**
 * GET /api/categories
 */
app.get('/api/categories', (req, res) => {
  const categoriesWithCount = policiesData.categories.map(cat => ({
    ...cat,
    count: policiesData.policies.filter(p => p.category === cat.id).length
  }));
  
  res.json({
    success: true,
    data: categoriesWithCount
  });
});

/**
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    policiesCount: policiesData.policies.length,
    features: ['政策查询', 'AI 问答', '中英文']
  });
});

// ==================== 前端路由 ====================

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ==================== 错误处理 ====================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '接口不存在'
  });
});

app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    success: false,
    message: '服务器内部错误'
  });
});

// ==================== 启动服务器 ====================

app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('=====================================');
  console.log('🌴 海南自贸港政策库服务器已启动');
  console.log('=====================================');
  console.log(`📊 政策总数：${policiesData.policies.length} 条`);
  console.log(`📁 分类数量：${policiesData.categories.length} 类`);
  console.log(`🌐 访问地址：http://localhost:${PORT}`);
  console.log(`🤖 AI 问答：点击页面右下角机器人图标`);
  console.log(`🌍 语言切换：页面顶部 中文/English`);
  console.log(`🔌 API 地址：http://localhost:${PORT}/api`);
  console.log('=====================================');
  console.log('');
  console.log('可用 API 接口:');
  console.log('  GET  /api/policies          - 获取所有政策');
  console.log('  GET  /api/policies/stats    - 获取统计信息');
  console.log('  GET  /api/policies/latest   - 获取最新政策');
  console.log('  GET  /api/policies/search   - 搜索政策');
  console.log('  GET  /api/policies/:id      - 获取政策详情');
  console.log('  GET  /api/categories        - 获取所有分类');
  console.log('  POST /api/chat              - AI 智能问答（流式）');
  console.log('  GET  /api/health            - 健康检查');
  console.log('=====================================');
  console.log('');
});

module.exports = app;
