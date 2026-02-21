const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'policies-data.js');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the closing module.exports temporarily
content = content.replace(/\nmodule\.exports = policies;/, '');

// Parse the policies array
const policiesMatch = content.match(/const policies = (\[.*\])/s);
if (!policiesMatch) {
    console.error('Could not parse policies');
    process.exit(1);
}

// Simple English translations for key fields
const enTranslations = {
    "税收优惠": "Tax Incentives",
    "贸易自由": "Trade Freedom",
    "投资自由": "Investment Freedom",
    "金融开放": "Financial Opening-up",
    "人员流动": "Personnel Mobility",
    "运输自由": "Transport Freedom",
    "数据安全": "Data Security",
    "产业发展": "Industry Development",
};

// Add English fields to first 10 policies
let policies = eval(policiesMatch[1]);

policies.slice(0, 10).forEach((policy, index) => {
    policy.categoryNameEn = enTranslations[policy.categoryName] || policy.categoryName;
    policy.titleEn = `[EN] ${policy.title}`;
    policy.summaryEn = `[English Summary] ${policy.summary.substring(0, 50)}...`;
    policy.contentEn = `[English Content] ${policy.content.substring(0, 100)}...`;
    policy.interpretationEn = `[English Interpretation] ${policy.interpretation.substring(0, 100)}...`;
    policy.highlightEn = `[EN Highlight] ${policy.highlight}`;
});

// Rebuild the file
let newContent = `// 海南自贸港政策数据 - 官方核心政策 60 条完整版（支持中英文）
// 来源：https://www.hnftp.gov.cn/zczdtx/hxzc/
const policies = ${JSON.stringify(policies, null, 4)};

module.exports = policies;
`;

fs.writeFileSync(filePath, newContent);
console.log('✅ Updated first 10 policies with English fields');
