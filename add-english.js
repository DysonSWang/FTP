// 为 policies-data.js 批量添加英文翻译
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'policies-data.js');
let content = fs.readFileSync(filePath, 'utf8');

// 简单的翻译映射（核心字段）
const translations = {
    '税收优惠': 'Tax Incentives',
    '贸易自由': 'Trade Freedom',
    '投资自由': 'Investment Freedom',
    '金融开放': 'Financial Opening-up',
    '人员流动': 'Personnel Mobility',
    '运输自由': 'Transport Freedom',
    '数据安全': 'Data Security',
    '产业发展': 'Industry Development',
    '人才个人所得税最高 15%': 'Top Individual Income Tax Rate of 15% for Talents',
    '鼓励类企业实施 15% 企业所得税': '15% Corporate Income Tax for Encouraged Enterprises',
    '企业进口自用生产设备免征进口关税': 'Import Duty Exemption for Self-use Production Equipment',
};

console.log('Note: Full translation requires manual review.');
console.log('Adding English fields structure to policies...');

// 这个脚本需要手动完善翻译
console.log('Please use a translation API or manually translate the policies.');
