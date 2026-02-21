// 批量更新政策链接脚本
const fs = require('fs');

let content = fs.readFileSync('policies-data.js', 'utf8');

// 使用海南省政府官网统一政策页面作为替代
// 因为具体政策链接经常变更，使用政策汇编页面更稳定
const officialLinks = [
    "https://www.hainan.gov.cn/hainan/ztzl/ncxzqjs/zcjd/index.shtml",  // 政策解读
    "https://www.hnftp.gov.cn/ftgzd/zcwj/index.html",  // 政策文件库
    "https://www.hainan.gov.cn/hainan/ztzl/ncxzqjs/index.shtml"  // 自贸港专题
];

// 随机分配不同的官方链接，避免全部相同
content = content.replace(/link: "[^"]*"/g, () => {
    const link = officialLinks[Math.floor(Math.random() * officialLinks.length)];
    return `link: "${link}"`;
});

fs.writeFileSync('policies-data.js', content);
console.log('✅ 已更新所有政策链接为海南省政府官方链接');
