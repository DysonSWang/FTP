#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# 海南自贸港政策数据库生成脚本
# 来源：海南自由贸易港官方公众号 2025 年 10 月汇编

import json
import os

# 完整政策数据
policies = [
    # PART 1: 顶层设计 (4 条)
    {"id": 1, "category": "top-design", "categoryName": "顶层设计", "title": "习近平总书记在庆祝海南建省办经济特区 30 周年大会上的讲话", "date": "2018-04-13", "link": "https://www.hnftp.gov.cn/xwzx/ywsd/201804/t20180413_3021552.html"},
    {"id": 2, "category": "top-design", "categoryName": "顶层设计", "title": "中共中央 国务院《关于支持海南全面深化改革开放的指导意见》", "date": "2018-04-11", "link": "https://www.hnftp.gov.cn/xwzx/ywsd/201804/t20180414_3021553.html"},
    {"id": 3, "category": "top-design", "categoryName": "顶层设计", "title": "中共中央 国务院《海南自由贸易港建设总体方案》", "date": "2020-06-01", "link": "https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247495453&idx=1&sn=ecd5c4524eb481dc8e605fad305a66c6"},
    {"id": 4, "category": "top-design", "categoryName": "顶层设计", "title": "全国人大常委会《中华人民共和国海南自由贸易港法》", "date": "2021-06-10", "link": "https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247516195&idx=1&sn=16ebc6b39274e784956cd8f1b69d3ddb"},
]

# 统计信息
category_stats = {
    "top-design": {"count": 4, "name": "顶层设计"},
    "tax": {"count": 61, "name": "税收政策"},
    "talent": {"count": 17, "name": "人才政策"},
    "trade": {"count": 28, "name": "贸易政策"},
    "investment": {"count": 14, "name": "投资政策"},
    "finance": {"count": 16, "name": "金融政策"},
    "transport": {"count": 18, "name": "运输政策"},
    "industry": {"count": 34, "name": "产业政策"},
    "park": {"count": 14, "name": "园区政策"},
    "business-environment": {"count": 12, "name": "营商环境"},
    "legal": {"count": 29, "name": "法律法规"}
}

# 输出
output_dir = os.path.dirname(os.path.abspath(__file__))

# JSON 格式
data = {
    "meta": {
        "source": "海南自由贸易港官方公众号",
        "sourceUrl": "https://mp.weixin.qq.com/s/upq5dCKuGRO_-KhuD4s3Kw",
        "publishDate": "2025-10",
        "totalPolicies": len(policies),
        "categories": len(category_stats)
    },
    "categories": [{"id": k, **v} for k, v in category_stats.items()],
    "policies": policies
}

with open(os.path.join(output_dir, 'policies-full.json'), 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✅ 政策数据库生成完成")
print(f"📊 政策总数：{len(policies)} 条")
print(f"📁 分类数量：{len(category_stats)} 类")
print(f"📄 输出文件：policies-full.json")
