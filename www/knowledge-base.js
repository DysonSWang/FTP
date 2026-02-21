// 海南自贸港知识库 - 详细政策解读、相关法规、FAQ
// 注：所有链接使用已验证的官方核心政策 60 条真实页面

const knowledgeBase = {
    // 政策详细解读库
    policyDetails: {
        1: {
            detailedInterpretation: `**政策背景**：
海南自贸港为吸引全球高端人才，实施具有国际竞争力的人才所得税政策。

**核心内容**：
- 适用对象：在海南自贸港工作的高端人才和紧缺人才
- 税负上限：个人所得税实际税负超过 15% 的部分予以免征
- 适用企业：注册在海南自贸港并实质性运营的企业事业单位

**认定标准**：
- 高端人才：一般指年薪 30 万元以上或具有博士学位/正高级职称
- 紧缺人才：符合海南重点产业发展需求的专业技术人才
- 具体认定标准由海南省人民政府制定

**申请流程**：
1. 用人单位向所在园区/市县人才管理部门申报
2. 提交人才认定材料（学历、职称、劳动合同等）
3. 审核通过后享受个税优惠
4. 按年申报，次年汇算清缴

**政策优势**：
- 相比内地最高 45% 税率，节税效果显著
- 年薪 100 万人才可节税约 30 万元/年
- 覆盖金融、贸易、航运、旅游、高新技术等重点领域`,
            relatedPolicies: [2, 6, 21],
            faq: [
                {
                    q: "如何认定高端人才和紧缺人才？",
                    a: "高端人才一般指年薪 30 万元以上或具有博士学位/正高级职称人员；紧缺人才指符合海南重点产业发展需求的专业技术人才。具体标准由海南省制定，可咨询当地人才管理部门。"
                },
                {
                    q: "个税补贴如何申请？",
                    a: "由用人单位向所在园区或市县人才管理部门申报，提交人才认定材料，审核通过后享受优惠。按年申报，次年汇算清缴。"
                },
                {
                    q: "15% 个税优惠需要满足什么条件？",
                    a: "需在海南自贸港工作，与注册在海南的企业签订劳动合同，且个人符合高端或紧缺人才认定标准。"
                },
                {
                    q: "境外人才可以享受这个政策吗？",
                    a: "可以。境外高端人才和紧缺人才同样适用，且可享受额外的个税补贴政策。"
                }
            ]
        },
        2: {
            detailedInterpretation: `**政策背景**：
为吸引企业落户海南，自贸港对鼓励类产业企业实施 15% 企业所得税优惠税率。

**核心内容**：
- 适用企业：注册在海南自贸港并实质性运营的鼓励类产业企业
- 优惠税率：减按 15% 征收企业所得税（内地标准税率 25%）
- 收入要求：主营业务收入占企业收入总额 60% 以上

**鼓励类产业范围**：
包括 14 个大类 120+ 细分行业：
- 旅游业：旅游综合体、邮轮游艇、康养旅游等
- 现代服务业：金融、物流、会展、专业服务等
- 高新技术产业：互联网、大数据、人工智能、生物医药等
- 热带特色高效农业：种业、深海养殖等

**实质性运营要求**：
- 生产经营在海南
- 人员在海南
- 账务在海南
- 财产在海南

**申请流程**：
1. 企业主营业务属于鼓励类产业目录
2. 向税务机关申报享受优惠
3. 留存相关资料备查`,
            relatedPolicies: [1, 6, 7, 20],
            faq: [
                {
                    q: "哪些企业属于鼓励类产业？",
                    a: "包括旅游业、现代服务业、高新技术产业等 14 个大类 120+ 细分行业。可查阅《海南自由贸易港鼓励类产业目录（2024 年版）》。"
                },
                {
                    q: "如何申请 15% 企业所得税优惠？",
                    a: "企业主营业务属于鼓励类产业且收入占比超 60%，向税务机关申报享受，留存资料备查。"
                },
                {
                    q: "实质性运营的具体要求是什么？",
                    a: "企业的生产经营、人员、账务、财产等都在海南自贸港内。"
                },
                {
                    q: "主营业务收入占比如何计算？",
                    a: "鼓励类产业项目收入÷企业收入总额×100%，需超过 60%。"
                }
            ]
        }
    },

    // 相关政策法规库 - 使用官方核心政策 60 条真实链接
    relatedRegulations: [
        {
            id: "reg-001",
            title: "海南自由贸易港建设总体方案",
            titleEn: "Overall Plan for Hainan FTP Construction",
            link: "https://www.hnftp.gov.cn/zczdtx/hxzc/",
            category: "综合",
            categoryEn: "General",
            summary: "海南自贸港建设的纲领性文件，明确了自贸港建设的总体要求和政策框架",
            summaryEn: "Guiding document for Hainan FTP construction, outlining overall requirements and policy framework"
        },
        {
            id: "reg-002",
            title: "中华人民共和国海南自由贸易港法",
            titleEn: "Hainan Free Trade Port Law of the PRC",
            link: "https://www.hnftp.gov.cn/zczdtx/hxzc/",
            category: "法律",
            categoryEn: "Law",
            summary: "国家立法保障海南自贸港建设，确立了自贸港的基本制度和政策体系",
            summaryEn: "National legislation guaranteeing Hainan FTP construction, establishing basic systems and policy framework"
        },
        {
            id: "reg-003",
            title: "海南自由贸易港鼓励类产业目录（2024 年版）",
            titleEn: "Hainan FTP Encouraged Industry Catalog (2024)",
            link: "https://www.hnftp.gov.cn/zczdtx/hxzc/qysds",
            category: "产业",
            categoryEn: "Industry",
            summary: "详细列出了 14 个大类 120+ 细分行业，是享受企业所得税优惠的依据",
            summaryEn: "Lists 14 major categories and 120+ sub-sectors eligible for 15% CIT preference"
        },
        {
            id: "reg-004",
            title: "高端人才和紧缺人才个人所得税政策",
            titleEn: "IIT Policy for High-end and Urgent Talents",
            link: "https://www.hnftp.gov.cn/zczdtx/hxzc/grsds",
            category: "人才",
            categoryEn: "Talent",
            summary: "规定了人才认定标准、申请流程、补贴发放等具体内容",
            summaryEn: "Defines talent identification standards, application process, and subsidy distribution"
        },
        {
            id: "reg-005",
            title: "海南自由贸易港'零关税'清单",
            titleEn: "Hainan FTP Zero-Tariff List",
            link: "https://www.hnftp.gov.cn/zczdtx/hxzc/scsblgs",
            category: "贸易",
            categoryEn: "Trade",
            summary: "列明了可以享受零关税的原辅料、生产设备范围",
            summaryEn: "Lists raw materials and production equipment eligible for zero-tariff policy"
        },
        {
            id: "reg-006",
            title: "海南自由贸易港外商投资负面清单",
            titleEn: "Hainan FTP FDI Negative List",
            link: "https://www.hnftp.gov.cn/zczdtx/hxzc/sxzmgwstz",
            category: "投资",
            categoryEn: "Investment",
            summary: "明确了外商投资限制和禁止的领域",
            summaryEn: "Specifies restricted and prohibited sectors for foreign investment"
        },
        {
            id: "reg-007",
            title: "海南自由贸易港跨境服务贸易负面清单",
            titleEn: "Hainan FTP Cross-border Service Trade Negative List",
            link: "https://www.hnftp.gov.cn/zczdtx/hxzc/sshnzymyg",
            category: "贸易",
            categoryEn: "Trade",
            summary: "规定了跨境服务贸易的限制措施",
            summaryEn: "Specifies restrictive measures for cross-border service trade"
        },
        {
            id: "reg-008",
            title: "海南省高层次人才分类标准",
            titleEn: "Hainan High-level Talent Classification Standards",
            link: "https://www.hnftp.gov.cn/zczdtx/hxzc/zhjwzp",
            category: "人才",
            categoryEn: "Talent",
            summary: "明确了 A、B、C、D、E 五类高层次人才的认定标准",
            summaryEn: "Defines classification standards for A, B, C, D, E level high-level talents"
        },
        {
            id: "reg-009",
            title: "海南自由贸易港多功能自由贸易账户管理办法",
            titleEn: "Hainan FTP Multi-functional FT Account Management Measures",
            link: "https://www.hnftp.gov.cn/zczdtx/hxzc/gjdgn",
            category: "金融",
            categoryEn: "Finance",
            summary: "规定了 FT 账户的开立、使用和管理要求",
            summaryEn: "Specifies requirements for FT account opening, usage and management"
        },
        {
            id: "reg-010",
            title: "海南自由贸易港企业所得税优惠政策",
            titleEn: "Hainan FTP Corporate Income Tax Preference Policy",
            link: "https://www.hnftp.gov.cn/zczdtx/hxzc/qysds",
            category: "税收",
            categoryEn: "Tax",
            summary: "鼓励类企业减按 15% 征收企业所得税的优惠政策",
            summaryEn: "15% CIT preference policy for encouraged industry enterprises"
        }
    ],

    // 常见问题库
    faqDatabase: [
        {
            category: "税收优惠",
            questions: [
                {
                    q: "海南自贸港有哪些主要税收优惠政策？",
                    a: "主要包括：1) 人才个人所得税最高 15%；2) 鼓励类企业 15% 企业所得税；3) 进口设备/原辅料零关税；4) 船舶飞机增值税退税等。"
                },
                {
                    q: "企业所得税 15% 优惠如何享受？",
                    a: "企业主营业务属于鼓励类产业目录，且收入占比超 60%，注册在海南并实质性运营，向税务机关申报即可享受。"
                },
                {
                    q: "人才个税优惠需要满足什么条件？",
                    a: "在海南工作，符合高端或紧缺人才认定标准，与海南企业签订劳动合同，按年申报享受。"
                }
            ]
        },
        {
            category: "贸易自由",
            questions: [
                {
                    q: "什么是'零关税'政策？",
                    a: "对企业进口自用的生产设备、原辅料，免征进口关税、进口环节增值税和消费税。"
                },
                {
                    q: "加工增值 30% 免关税如何计算？",
                    a: "进口料件在海南加工后，增值部分超过进口料件价值 30%，进入内地销售时免征关税。"
                },
                {
                    q: "离岛免税购物额度是多少？",
                    a: "每年每人 10 万元人民币，不限次数，可购买 45 类商品。"
                }
            ]
        },
        {
            category: "投资自由",
            questions: [
                {
                    q: "外商投资负面清单有哪些限制？",
                    a: "负面清单之外的领域，外商投资享受与内资企业同等待遇。清单主要涉及国家安全、公共利益等领域。"
                },
                {
                    q: "市场准入承诺即入制如何办理？",
                    a: "企业作出符合要求的书面承诺后，即可开展相关经营活动，无需等待审批。"
                }
            ]
        },
        {
            category: "金融开放",
            questions: [
                {
                    q: "FT 账户是什么？",
                    a: "多功能自由贸易账户，可实现跨境资金自由便利流动，支持经常项目和资本项目结算。"
                },
                {
                    q: "QFLP 和 QDLP 有什么区别？",
                    a: "QFLP 是境外资金投资境内，QDLP 是境内资金投资境外。两者都为跨境投资提供便利渠道。"
                }
            ]
        }
    ]
};
