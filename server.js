/**
 * 海南自贸港政策库 - AI 问答机器人后端服务
 * 使用智谱 AI (Zhipu AI) 提供政策问答功能
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5173;

// Feedback data storage (in production, use database)
const feedbackData = {
    votes: [],      // { messageId, type, timestamp, question }
    copies: [],     // { messageId, timestamp, question }
    stats: {
        totalMessages: 0,
        totalVotes: 0,
        totalCopies: 0,
        upVotes: 0,
        downVotes: 0
    }
};

// Load feedback data from file if exists
try {
    if (fs.existsSync('./feedback-data.json')) {
        const saved = JSON.parse(fs.readFileSync('./feedback-data.json', 'utf8'));
        feedbackData.stats = saved.stats || feedbackData.stats;
        feedbackData.votes = saved.votes || [];
        feedbackData.copies = saved.copies || [];
        console.log('✅ 反馈数据已加载');
    }
} catch (e) {
    console.log('⚠️  反馈数据加载失败，使用新数据');
}

// Save feedback data to file periodically
function saveFeedbackData() {
    try {
        fs.writeFileSync('./feedback-data.json', JSON.stringify(feedbackData, null, 2));
    } catch (e) {
        console.error('❌ 保存反馈数据失败:', e.message);
    }
}
// Auto-save every 5 minutes
setInterval(saveFeedbackData, 5 * 60 * 1000);
// Save on exit
process.on('exit', saveFeedbackData);
process.on('SIGINT', () => { saveFeedbackData(); process.exit(); });

// 加载知识库
let knowledgeBase = {};
try {
    knowledgeBase = require('./knowledge-base.js');
    console.log('✅ 知识库已加载');
} catch (e) {
    console.log('⚠️  知识库加载失败，使用基础政策数据');
}

// Middleware
app.use(cors());
app.use(express.json());

// Disable caching for static files (development)
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.use(express.static(path.join(__dirname)));

// Policy Data (从 policies-data.js 加载，支持 60 条核心政策)
let policies = [];
try {
    const policiesData = require('./policies-data.js');
    // policies-data.js 直接导出 policies 数组
    policies = Array.isArray(policiesData) ? policiesData : (policiesData.policies || []);
    console.log(`✅ 政策数据已加载：${policies.length} 条`);
} catch (e) {
    console.log('⚠️  政策数据加载失败，使用默认数据');
    policies = [];
}

// 如果加载失败，使用默认空数组
if (!policies || policies.length === 0) {
    policies = [
    {
        id: 2,
        category: "tax",
        categoryName: "税收优惠",
        title: "鼓励类企业实施 15% 企业所得税",
        content: "对注册在海南自由贸易港并实质性运营的鼓励类产业企业，减按 15% 征收企业所得税。鼓励类产业包括旅游业、现代服务业、高新技术产业等 14 个大类。"
    },
    {
        id: 3,
        category: "trade",
        categoryName: "贸易自由",
        title: "企业进口自用生产设备免征进口关税",
        content: "对海南自由贸易港企业进口自用的生产设备，实行'零关税'政策，免征进口关税、进口环节增值税和消费税。"
    },
    {
        id: 4,
        category: "trade",
        categoryName: "贸易自由",
        title: "离岛免税购物额度调高至每年每人 10 万元",
        content: "离岛旅客每年每人免税购物额度为 10 万元人民币，不限次数。商品品种扩大到 45 类。"
    },
    {
        id: 5,
        category: "trade",
        categoryName: "贸易自由",
        title: "进口生产原辅料免征进口关税",
        content: "对海南自由贸易港企业进口用于生产自用，或以'零关税'原辅料加工增值超过 30% 后内销的货物，免征进口关税。"
    },
    {
        id: 6,
        category: "investment",
        categoryName: "投资自由",
        title: "旅游业等企业新增境外直接投资所得免征企业所得税",
        content: "对在海南自由贸易港设立的旅游业、现代服务业、高新技术产业企业，其 2025 年前新增的境外直接投资所得，免征企业所得税。"
    },
    {
        id: 7,
        category: "investment",
        categoryName: "投资自由",
        title: "企业资本性支出可一次性税前扣除",
        content: "对在海南自由贸易港设立的企业，其资本性支出可选择在支出发生当期一次性税前扣除，或选择加速折旧和摊销。"
    },
    {
        id: 8,
        category: "finance",
        categoryName: "金融开放",
        title: "构建多功能自由贸易账户体系",
        content: "构建多功能自由贸易账户（FT 账户）体系，实现与境外资金自由便利流动。账户内资金可自由兑换。"
    },
    {
        id: 9,
        category: "finance",
        categoryName: "金融开放",
        title: "跨境贸易银行真实性审核转为事后核查",
        content: "对海南自由贸易港跨境贸易和新型国际贸易，银行真实性审核从事前审查转为事后核查。"
    },
    {
        id: 10,
        category: "personnel",
        categoryName: "人员流动",
        title: "实施更加便利的免签入境政策",
        content: "海南实施 59 国人员入境免签政策，免签停留时间延长至 30 天。"
    },
    {
        id: 11,
        category: "personnel",
        categoryName: "人员流动",
        title: "对外籍人员工作许可实行负面清单管理",
        content: "对海南自由贸易港外籍人员工作许可实行负面清单管理，清单外领域外籍人员可便捷获得工作许可。"
    },
    {
        id: 12,
        category: "transport",
        categoryName: "运输自由",
        title: "允许进出海南岛航班加注保税航油",
        content: "允许对进出海南岛的航班加注保税航油，价格参照国际市场价格，大幅降低航空公司燃油成本。"
    },
    {
        id: 13,
        category: "transport",
        categoryName: "运输自由",
        title: "建设'中国洋浦港'国际船籍港",
        content: "建立'中国洋浦港'国际船籍港制度，对在中国洋浦港登记并从事国际运输的境内建造船舶给予出口退税。"
    },
    {
        id: 14,
        category: "data",
        categoryName: "数据安全",
        title: "开展国际互联网数据交互试点",
        content: "在海南自由贸易港开展国际互联网数据交互试点，探索建立安全有序的数据跨境流动管理机制。"
    },
    {
        id: 15,
        category: "data",
        categoryName: "数据安全",
        title: "开放增值电信业务",
        content: "在海南自由贸易港扩大增值电信业务开放，取消外资股比限制，允许设立独资或合资企业。"
    },
    {
        id: 16,
        category: "industry",
        categoryName: "产业发展",
        title: "建设国际知识产权交易所",
        content: "支持海南建设国际知识产权交易所，开展知识产权交易、评估、融资等服务。"
    },
    {
        id: 17,
        category: "industry",
        categoryName: "产业发展",
        title: "建设邮轮旅游试验区",
        content: "在海南设立邮轮旅游试验区，探索邮轮旅游发展新模式，支持邮轮物资补给、维修等产业发展。"
    },
    {
        id: 18,
        category: "trade",
        categoryName: "贸易自由",
        title: "对加工增值超过 30% 的货物进入内地免征关税",
        content: "对海南自由贸易港企业生产的货物，如含进口料件加工增值超过 30%，进入内地销售时免征进口关税。"
    },
    {
        id: 19,
        category: "finance",
        categoryName: "金融开放",
        title: "支持设立财产险、人身险、再保险公司",
        content: "支持在海南自由贸易港设立各类保险机构，包括财产险、人身险、再保险公司。"
    },
    {
        id: 20,
        category: "investment",
        categoryName: "投资自由",
        title: "实行市场准入承诺即入制",
        content: "对海南自由贸易港市场准入实行承诺即入制，企业作出符合要求的承诺后，即可开展相关经营活动。"
    },
    {
        id: 21,
        category: "tax",
        categoryName: "税收优惠",
        title: "境外高端人才个人所得税补贴",
        content: "对境外高端人才在海南缴纳的个人所得税超过 15% 的部分给予补贴，补贴免征个人所得税。"
    },
    {
        id: 22,
        category: "tax",
        categoryName: "税收优惠",
        title: "船舶和飞机增值税退税",
        content: "对境内购买的船舶和飞机出口到海南自由贸易港的，实行增值税退税政策。"
    },
    {
        id: 23,
        category: "trade",
        categoryName: "贸易自由",
        title: "服务贸易跨境交付限制放宽",
        content: "在海南自由贸易港放宽服务贸易跨境交付限制，扩大服务贸易开放。"
    },
    {
        id: 24,
        category: "industry",
        categoryName: "产业发展",
        title: "建设国际教育创新试验区",
        content: "支持海南建设国际教育创新试验区，引进境外优质教育资源，允许境外理工农医类大学在海南独立办学。"
    },
    {
        id: 25,
        category: "industry",
        categoryName: "产业发展",
        title: "建设国家医疗健康旅游示范区",
        content: "支持海南建设国家医疗健康旅游示范区，博鳌乐城允许使用国际已经上市但国内未上市的药品和医疗器械。"
    },
    {
        id: 26,
        category: "finance",
        categoryName: "金融开放",
        title: "开展合格境外有限合伙人试点",
        content: "在海南开展合格境外有限合伙人（QFLP）试点，境外资金可通过 QFLP 基金投资海南企业。"
    },
    {
        id: 27,
        category: "finance",
        categoryName: "金融开放",
        title: "开展境内合格有限合伙人试点",
        content: "在海南开展境内合格有限合伙人（QDLP）试点，境内资金可通过 QDLP 基金进行境外投资。"
    },
    {
        id: 28,
        category: "personnel",
        categoryName: "人员流动",
        title: "外籍人才技术技能认可",
        content: "允许具有境外职业资格的金融、建筑、规划等领域专业人才经备案后在海南自由贸易港执业。"
    },
    {
        id: 29,
        category: "transport",
        categoryName: "运输自由",
        title: "启运港退税政策",
        content: "对从启运港出发经海南中转出口的货物，实行启运港退税政策，货物在启运港报关后即可办理退税。"
    },
    {
        id: 30,
        category: "data",
        categoryName: "数据安全",
        title: "建设国际通信出入口局",
        content: "支持海南建设国际通信出入口局，提升国际通信服务能力，优化国际互联网访问体验。"
    }
    ];
}

// Build policy context for AI (bilingual)
const policyContext = policies.map(p => 
    `【${p.categoryName}/${p.categoryNameEn}】${p.title} | ${p.titleEn}: ${p.content} | ${p.contentEn}`
).join('\n\n');

// Build knowledge base context
let knowledgeContext = '';
if (knowledgeBase.policyDetails) {
    knowledgeContext = Object.entries(knowledgeBase.policyDetails).map(([id, details]) => {
        const policy = policies.find(p => p.id === parseInt(id));
        return `
【政策 ID: ${id} - ${policy ? policy.title : '未知'}】
${details.detailedInterpretation || ''}
相关法规：${details.relatedPolicies ? details.relatedPolicies.map(rp => rp.title).join('、') : '无'}
常见问题：${details.faq ? details.faq.map(f => f.question).join('、') : '无'}
`;
    }).join('\n\n---\n\n');
}

// Add related regulations
let regulationsContext = '';
if (knowledgeBase.relatedRegulations && knowledgeBase.relatedRegulations.length > 0) {
    // Bilingual regulations context for AI knowledge
    regulationsContext = '\n【Related Regulations / 相关政策法规库】\n' + knowledgeBase.relatedRegulations.map(reg => 
        `• ${reg.title} | ${reg.titleEn || 'N/A'} (${reg.category}/${reg.categoryEn || 'N/A'}): ${reg.summary} | ${reg.summaryEn || 'N/A'} Link: ${reg.link}`
    ).join('\n');
}

const systemPrompt = `You are a Hainan Free Trade Port Policy Expert Assistant / 海南自贸港政策专家助手.

【Language Detection - 语言检测】
- If user asks in ENGLISH → respond in ENGLISH
- If user asks in CHINESE → respond in CHINESE
- Automatically match the user's language / 自动匹配用户语言

【Hainan FTP Core Policy Database / 海南自贸港核心政策库】
${policyContext}

【Policy Detailed Interpretation / 政策详细解读知识库】
${knowledgeContext}
${regulationsContext}

Answer Requirements / 回答要求:
1. Accurately cite relevant policies / 准确引用相关政策
2. Use clear language with emoji / 简洁清晰，适当使用 emoji
3. Use numbered points for multiple policies / 多条政策分点说明
4. Be honest if uncertain / 不确定请如实告知
5. Keep 300-500 words, highlight key points / 300-500 字，重点突出
6. Offer more details proactively / 主动询问是否需要更多细节
7. Cite examples for data / 涉及数据引用示例
8. Mention policy links when relevant / 提及相关政策时告知可查阅链接
9. DO NOT add "References" or "参考来源" section yourself - it will be added automatically / 不要自己添加"参考来源"部分
10. DO NOT use Markdown bold (**text**) in your response - use plain text only / 回答中不要使用粗体格式
11. DO NOT add "Related Questions" yourself - it will be added automatically / 不要自己添加"相关问题"部分

Your knowledge / 你的知识:
- 60 core policies with interpretations / 60 条核心政策及解读
- Detailed policy interpretations / 详细政策解读
- 10+ relevant policies and regulations / 10+ 项相关政策法规
- FAQ / 常见问题解答

Be professional, accurate and friendly! 🌴 / 请专业、准确、友好地回答！🌴`;

// API Routes

/**
 * Chat completion endpoint - 使用智谱 AI (支持流式输出)
 */
app.post('/api/chat', async (req, res) => {
    console.log('📩 Chat request received:', req.body);
    try {
        const { message, history = [], stream = false } = req.body;

        if (!message) {
            console.log('❌ No message in request');
            return res.status(400).json({ error: 'Message is required' });
        }
        console.log('✅ Processing message:', message.substring(0, 50));

        const apiKey = process.env.ZHIPU_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ 
                error: 'API Key 未配置',
                tip: '请在 .env 文件中配置 ZHIPU_API_KEY'
            });
        }

        // Detect user language from message
        const isEnglish = /[a-zA-Z]{3,}/.test(message);
        
        // Add reference sources with language support - only include valid links
        const relatedRegs = knowledgeBase.relatedRegulations || [];
        const sources = relatedRegs.slice(0, 3).filter(reg => reg.link && reg.link.startsWith('http')).map(reg => {
            const title = isEnglish && reg.titleEn ? reg.titleEn : reg.title;
            return `• [${title}](${reg.link})`;
        }).join('\n');
        
        const sourcesSection = isEnglish 
            ? `\n\n---\n\n📚 References:\n${sources || '• Hainan FTP Policy Database'}`
            : `\n\n---\n\n📚 参考来源：\n${sources || '• 海南自由贸易港政策库'}`;

        // Add related questions to encourage further interaction (each on separate line for easier parsing)
        const relatedQuestions = isEnglish
            ? `\n\n---\n\n💡 You may also want to know:\n• How to apply for the 15% tax preference?\n• What are the eligibility criteria for talents?\n• Which industries are encouraged?\n• How to open an FT account?`
            : `\n\n---\n\n💡 您可能还想了解：\n• 如何申请 15% 税收优惠？\n• 人才认定标准是什么？\n• 哪些行业属于鼓励类？\n• 如何开立 FT 账户？`;

        // If streaming requested, use Server-Sent Events
        if (stream) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.setHeader('X-Accel-Buffering', 'no');

            // Call Zhipu AI API with stream=true
            const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'glm-4-flash',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...history.slice(-10),
                        { role: 'user', content: message }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000,
                    stream: true
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Zhipu API Error:', errorData);
                res.write(`data: ${JSON.stringify({ error: errorData })}\n\n`);
                res.end();
                return;
            }

            // Stream the response
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullContent = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data:')) {
                        const data = line.slice(5).trim();
                        if (data === '[DONE]') continue;
                        
                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content || '';
                            if (content) {
                                fullContent += content;
                                res.write(`data: ${JSON.stringify({ content, done: false })}\n\n`);
                            }
                        } catch (e) {
                            // Ignore parse errors
                        }
                    }
                }
            }

            // Add sources and related questions at the end
            const finalMessage = fullContent + sourcesSection + relatedQuestions;
            res.write(`data: ${JSON.stringify({ content: '', done: true, fullMessage: finalMessage })}\n\n`);
            res.end();
            return;
        }

        // Non-streaming: regular JSON response
        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'glm-4-flash',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...history.slice(-10),
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Zhipu API Error:', errorData);
            throw new Error(`智谱 AI API 请求失败：${response.status}`);
        }

        const data = await response.json();
        let botReply = data.choices?.[0]?.message?.content || '抱歉，我暂时无法回答这个问题。';
        botReply = botReply + sourcesSection + relatedQuestions;

        res.json({ 
            success: true, 
            message: botReply,
            model: data.model,
            usage: data.usage,
            sources: relatedRegs.slice(0, 3)
        });

    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

/**
 * Get all policies
 */
app.get('/api/policies', (req, res) => {
    res.json({ success: true, policies });
});

/**
 * Search policies
 */
app.get('/api/policies/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.json({ success: true, policies: [] });
    }

    const query = q.toLowerCase();
    const filtered = policies.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query)
    );

    res.json({ success: true, policies: filtered });
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        status: 'running',
        timestamp: new Date().toISOString(),
        policies_count: policies.length,
        feedback_stats: feedbackData.stats
    });
});

/**
 * Submit feedback (vote or copy)
 */
app.post('/api/feedback', (req, res) => {
    try {
        const { type, messageId, question } = req.body;
        
        if (!type || !messageId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const timestamp = new Date().toISOString();
        
        if (type === 'up' || type === 'down') {
            // Vote feedback
            feedbackData.votes.push({
                messageId,
                type,
                question: question || '',
                timestamp
            });
            feedbackData.stats.totalVotes++;
            feedbackData.stats.totalMessages++;
            if (type === 'up') {
                feedbackData.stats.upVotes++;
            } else {
                feedbackData.stats.downVotes++;
            }
            console.log(`📊 投票反馈：${type === 'up' ? '👍' : '👎'} - ${question || 'N/A'}`);
        } else if (type === 'copy') {
            // Copy feedback
            feedbackData.copies.push({
                messageId,
                question: question || '',
                timestamp
            });
            feedbackData.stats.totalCopies++;
            console.log(`📊 复制反馈：📋 - ${question || 'N/A'}`);
        }
        
        saveFeedbackData();
        
        res.json({ 
            success: true, 
            message: 'Feedback recorded',
            stats: feedbackData.stats
        });
        
    } catch (error) {
        console.error('Feedback error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

/**
 * Get feedback statistics (admin only)
 */
app.get('/api/feedback/stats', (req, res) => {
    // In production, add authentication here
    res.json({ 
        success: true, 
        stats: feedbackData.stats,
        recentVotes: feedbackData.votes.slice(-20),
        recentCopies: feedbackData.copies.slice(-20)
    });
});

/**
 * Export feedback data (admin only)
 */
app.get('/api/feedback/export', (req, res) => {
    // In production, add authentication here
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="feedback-' + new Date().toISOString().split('T')[0] + '.json"');
    res.json(feedbackData);
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════╗
║     🌴 海南自由贸易港政策库 - AI 问答服务                   ║
╠══════════════════════════════════════════════════════════╣
║  本地访问：http://localhost:${PORT}                        ║
║  API 端点：http://localhost:${PORT}/api/chat               ║
║  政策数量：${policies.length} 条                              ║
║  AI 模型：智谱 GLM-4-Flash                                 ║
╚══════════════════════════════════════════════════════════╝
    `);
});
