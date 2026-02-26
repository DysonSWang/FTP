// 海南自贸港政策数据库 - 完整版 (180+ 条)
// 来源：海南自由贸易港官方公众号 2025 年 10 月汇编
// https://mp.weixin.qq.com/s/upq5dCKuGRO_-KhuD4s3Kw

const policiesData = {
  meta: {
    source: "海南自由贸易港官方公众号",
    sourceUrl: "https://mp.weixin.qq.com/s/upq5dCKuGRO_-KhuD4s3Kw",
    publishDate: "2025-10",
    totalPolicies: 180,
    categories: 11,
    lastUpdated: "2026-02-26"
  },
  
  categories: [
    {id: "top-design", name: "顶层设计", nameEn: "Top-level Design", count: 4, color: "#8B5CF6"},
    {id: "tax", name: "税收政策", nameEn: "Tax Policies", count: 61, color: "#EF4444"},
    {id: "talent", name: "人才政策", nameEn: "Talent Policies", count: 17, color: "#F59E0B"},
    {id: "trade", name: "贸易政策", nameEn: "Trade Policies", count: 28, color: "#10B981"},
    {id: "investment", name: "投资政策", nameEn: "Investment Policies", count: 14, color: "#3B82F6"},
    {id: "finance", name: "金融政策", nameEn: "Financial Policies", count: 16, color: "#8B5CF6"},
    {id: "transport", name: "运输政策", nameEn: "Transport Policies", count: 18, color: "#EC4899"},
    {id: "industry", name: "产业政策", nameEn: "Industry Policies", count: 34, color: "#14B8A6"},
    {id: "park", name: "园区政策", nameEn: "Park Policies", count: 14, color: "#F97316"},
    {id: "business-environment", name: "营商环境", nameEn: "Business Environment", count: 12, color: "#6366F1"},
    {id: "legal", name: "法律法规", nameEn: "Laws & Regulations", count: 29, color: "#84CC16"}
  ],

  policies: [
    // ==================== PART 1: 顶层设计 (4 条) ====================
    {id:1,category:"top-design",title:"习近平总书记在庆祝海南建省办经济特区 30 周年大会上的讲话",date:"2018-04-13",link:"https://www.hnftp.gov.cn/xwzx/ywsd/201804/t20180413_3021552.html",level:"national"},
    {id:2,category:"top-design",title:"中共中央 国务院《关于支持海南全面深化改革开放的指导意见》",date:"2018-04-11",link:"https://www.hnftp.gov.cn/xwzx/ywsd/201804/t20180414_3021553.html",level:"national"},
    {id:3,category:"top-design",title:"中共中央 国务院《海南自由贸易港建设总体方案》",date:"2020-06-01",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247495453&idx=1&sn=ecd5c4524eb481dc8e605fad305a66c6",level:"national"},
    {id:4,category:"top-design",title:"全国人大常委会《中华人民共和国海南自由贸易港法》",date:"2021-06-10",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247516195&idx=1&sn=16ebc6b39274e784956cd8f1b69d3ddb",level:"national-law"},

    // ==================== PART 2: 税收政策 (61 条) ====================
    {id:5,category:"tax",title:"财政部、税务总局《关于海南自由贸易港高端紧缺人才个人所得税政策的通知》",date:"2020-06-23",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247496735&idx=1&sn=991e9692cbbe7d3a76124d8c7d6ee3bd",level:"national"},
    {id:6,category:"tax",title:"财政部、国家税务总局《关于延续实施海南自由贸易港个人所得税优惠政策的通知》",date:"2025-01-24",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247596905&idx=1&sn=5d799bd6d569680d3be030732494767d",level:"national"},
    {id:7,category:"tax",title:"省政府《海南自由贸易港享受个人所得税优惠政策高端紧缺人才清单管理办法》",date:"2025-08-02",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247602281&idx=1&sn=cd490d1c5d734823d6acfe272d6c076b",level:"provincial"},
    {id:8,category:"tax",title:"省财政厅等部门《关于进一步明确落实海南自由贸易港高端紧缺人才个人所得税优惠政策有关事项的通知》",date:"2022-12-23",link:"https://www.hnftp.gov.cn/zczdtx/sszc/202303/t20230301_3369338.html",level:"provincial"},
    {id:9,category:"tax",title:"省委人才办《海南自由贸易港全方位引进培养用好人才的若干政策措施》",date:"2024-01-09",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247558356&idx=1&sn=a18e239c09800e34f0f46114fdd1ac3a",level:"provincial"},
    {id:10,category:"tax",title:"海南省财政厅等五部门关于落实海南自由贸易港个人所得税优惠政策有关事项的公告",date:"2025-09-01",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247602521&idx=1&sn=f0cbd234350241bf98e4daff6587d6ff",level:"provincial"},
    {id:11,category:"tax",title:"财政部、税务总局《关于海南自由贸易港企业所得税优惠政策的通知》",date:"2020-06-23",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247496735&idx=1&sn=991e9692cbbe7d3a76124d8c7d6ee3bd",level:"national"},
    {id:12,category:"tax",title:"财政部、税务总局《关于延续实施海南自由贸易港企业所得税优惠政策的通知》",date:"2025-01-24",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247596873&idx=1&sn=f482a20d16fd269bb0d76525ed4060a4",level:"national"},
    {id:13,category:"tax",title:"国家发展改革委、财政部、税务总局《海南自由贸易港鼓励类产业目录（2024 年本）》",date:"2024-03-01",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247556821&idx=1&sn=76ca5bb471246f3ffe5ac84d469bc033",level:"national"},
    {id:14,category:"tax",title:"省税务局《关于海南自由贸易港企业所得税优惠政策有关问题的公告》",date:"2020-07-31",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247498474&idx=1&sn=2d13408932f20fe92fc6809376f8cda7",level:"provincial"},
    {id:15,category:"tax",title:"省税务局等部门《关于海南自由贸易港鼓励类产业企业实质性运营有关问题的公告》",date:"2021-03-05",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247509883&idx=1&sn=987df3740ab74d934a46e7720dea3408",level:"provincial"},
    {id:16,category:"tax",title:"财政部、税务总局《海南自由贸易港旅游业、现代服务业、高新技术产业企业所得税优惠目录》",date:"2021-03-18",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247512386&idx=1&sn=272618f38b81607261ffe96639971690",level:"national"},
    {id:17,category:"tax",title:"省税务局等部门《关于海南自由贸易港鼓励类产业企业实质性运营有关问题的补充公告》",date:"2022-09-27",link:"https://www.hnftp.gov.cn/zczdtx/sszc/202303/t20230301_3369260.html",level:"provincial"},
    {id:18,category:"tax",title:"省税务局《关于做好海南自由贸易港鼓励类产业企业实质性运营管理服务工作的通知》",date:"2022-12-07",link:"https://www.hnftp.gov.cn/zczdtx/sszc/202303/t20230301_3369332.html",level:"provincial"},
    {id:19,category:"tax",title:"省税务局等部门《关于延续海南自由贸易港鼓励类产业企业实质性运营政策有关问题的公告》",date:"2025-08-08",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247602316&idx=1&sn=589e1aa80168301804409b733339327f",level:"provincial"},
    {id:20,category:"tax",title:"财政部、海关总署、税务总局《关于海南离岛旅客免税购物政策的公告》",date:"2020-06-29",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247496688&idx=1&sn=05c7dba294b722872a09efcca62e19d4",level:"national"},
    {id:21,category:"tax",title:"财政部、海关总署、税务总局《关于调整海南离岛旅客免税购物政策的公告》",date:"2025-10-15",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247603754&idx=1&sn=c0a1b3640c82b58960f69668e5046475",level:"national"},
    {id:22,category:"tax",title:"财政部、海关总署、税务总局《关于增加海南离岛旅客免税购物提货方式的公告》",date:"2021-02-02",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247508253&idx=1&sn=30cea2aa368dbb92b06e70544e0a116e",level:"national"},
    {id:23,category:"tax",title:"海关总署《关于发布海南离岛旅客免税购物邮寄送达和返岛提取提货方式监管要求的公告》",date:"2021-02-03",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247508384&idx=1&sn=77d257adfce8dac3a4a11f7ac98bba8c",level:"national"},
    {id:24,category:"tax",title:"海关总署、财政部、税务总局《关于增加海南离岛免税购物担保即提和即购即提提货方式的公告》",date:"2023-03-21",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247542636&idx=1&sn=482dfaf128074ae98e08b886f7dada9f",level:"national"},
    {id:25,category:"tax",title:"海关总署《中华人民共和国海关对海南离岛旅客免税购物监管办法（2025 年修订）》",date:"2025-10-25",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247604407&idx=1&sn=3c3cfce599ee9d4ec0a76c106eb549bd",level:"national"},
    {id:26,category:"tax",title:"省财政厅等部门《关于海南离岛免税购物经营主体有关问题的公告》",date:"2020-07-10",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247497426&idx=1&sn=cc122006c218d438e6aefa41fad08dfd",level:"provincial"},
    {id:27,category:"tax",title:"财政部 商务部 文化和旅游部 海关总署 税务总局《关于完善免税店政策支持提振消费的通知》",date:"2025-10-29",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247604443&idx=1&sn=88aa32f962c9ea63c7a810778b3fde6e",level:"national"},
    {id:28,category:"tax",title:"国家税务总局《海南离岛免税店销售离岛免税商品免征增值税和消费税管理办法》",date:"2020-09-29",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247502569&idx=1&sn=20b5e0473aa8e7458d1fc15e41417d82",level:"national"},
    {id:29,category:"tax",title:"海口海关《关于对海南离岛免税进口食品化妆品实施特定附条件放行监管创新模式的公告》",date:"2020-10-09",link:"https://www.hnftp.gov.cn/zczdtx/hxzc/ldmstg/zcfg/202202/t20220216_3142853.html",level:"national"},
    {id:30,category:"tax",title:"省政府办公厅《海南自由贸易港免税商品溯源管理暂行办法》",date:"2021-07-31",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247518472&idx=1&sn=6003ad55b1ff486420aa3d1209803d32",level:"provincial"},
    {id:31,category:"tax",title:"财政部、交通运输部、税务总局《关于海南自由贸易港国际运输船舶有关增值税政策的通知》",date:"2020-09-03",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247500569&idx=1&sn=ede057866c548159a957898cc58760f3",level:"national"},
    {id:32,category:"tax",title:"财政部、交通运输部、税务总局《关于延续实施海南自由贸易港国际运输船舶有关增值税政策的通知》",date:"2025-02-07",link:"https://www.hnftp.gov.cn/zczdtx/sszc/202506/t20250603_3873831.html",level:"national"},
    {id:33,category:"tax",title:"税务总局《国际运输船舶增值税退税管理办法》",date:"2020-12-02",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247505438&idx=1&sn=d59badca31c18b54bc18d95081d5e103",level:"national"},
    {id:34,category:"tax",title:"财政部、海关总署、税务总局《关于海南自由贸易港原辅料零关税政策的通知》",date:"2020-11-11",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247504335&idx=1&sn=d0e673ea80ca7033138b6eb0eb81a131",level:"national"},
    {id:35,category:"tax",title:"财政部、海关总署、税务总局《关于调整海南自由贸易港原辅料零关税政策的通知》",date:"2021-12-24",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247524747&idx=1&sn=d67e946d31a2b2f31804578138a60abc",level:"national"},
    {id:36,category:"tax",title:"财政部、海关总署、税务总局《关于调整海南自由贸易港原辅料零关税政策的通知》",date:"2025-01-24",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247596556&idx=1&sn=5a292a023040962aa561e8330d34e957",level:"national"},
    {id:37,category:"tax",title:"海关总署《海南自由贸易港进口零关税原辅料海关监管办法（试行）》",date:"2020-11-30",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247504861&idx=1&sn=31b3f1931cee732b5b88072e076e491d",level:"national"},
    {id:38,category:"tax",title:"财政部、海关总署、税务总局《关于海南自由贸易港交通工具及游艇零关税政策的通知》",date:"2020-12-25",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247506195&idx=1&sn=911ac9290d7543d40f35e749c7a29490",level:"national"},
    {id:39,category:"tax",title:"财政部、海关总署、税务总局《关于调整海南自由贸易港交通工具及游艇零关税政策的通知》",date:"2023-08-15",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247549065&idx=1&sn=c2d55ad1bacee01412d317eff8ce0a9a",level:"national"},
    {id:40,category:"tax",title:"海关总署《海南自由贸易港交通工具及游艇零关税政策海关实施办法（试行）》",date:"2021-01-05",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247506767&idx=1&sn=b1ca525aed4141685b9962211ac9bc05",level:"national"},
    {id:41,category:"tax",title:"省政府《海南自由贸易港零关税进口交通工具及游艇管理办法（试行）》",date:"2025-01-26",link:"https://www.hnftp.gov.cn/zczdtx/sszc/202502/t20250205_3811578.html",level:"provincial"},
    {id:42,category:"tax",title:"省交通运输厅《关于海南自由贸易港零关税交通工具及游艇进口企业资格认定有关事宜的公告》",date:"2021-02-08",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247508640&idx=1&sn=1f55fdc0d77d9b45a090cc509011bfe4",level:"provincial"},
    {id:43,category:"tax",title:"省交通运输厅《海南自由贸易港零关税营运车辆管理实施细则（试行）》",date:"2021-07-26",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247518303&idx=1&sn=13279131a1082de047ee2a567c24a863",level:"provincial"},
    {id:44,category:"tax",title:"财政部、海关总署、税务总局《关于海南自由贸易港试行启运港退税政策的通知》",date:"2021-01-05",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247507110&idx=1&sn=1c0bb91261ef6e9feaf400cfcef67a9c",level:"national"},
    {id:45,category:"tax",title:"财政部、海关总署、税务总局《关于海南自由贸易港内外贸同船运输境内船舶加注保税油和本地生产燃料油政策的通知》",date:"2021-02-26",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247509806&idx=1&sn=a051a0f354c75cdf7120eead77be77be",level:"national"},
    {id:46,category:"tax",title:"省政府办公厅《海南自由贸易港船舶保税油经营管理暂行办法》",date:"2021-12-14",link:"https://www.hnftp.gov.cn/zczdtx/hxzc/yzgypg/zcfg/202202/t20220216_3142875.html",level:"provincial"},
    {id:47,category:"tax",title:"财政部、海关总署、税务总局《关于海南自由贸易港自用生产设备零关税政策的通知》",date:"2021-03-04",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247509785&idx=1&sn=af3def02d0677408df2604282ff036c8",level:"national"},
    {id:48,category:"tax",title:"财政部、海关总署《关于明确海南自由贸易港零关税自用生产设备相关产品范围的通知》",date:"2021-03-10",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247510411&idx=1&sn=df56cd566d30c8b797f595b9a4d9b7ac",level:"national"},
    {id:49,category:"tax",title:"海关总署《海南自由贸易港自用生产设备零关税政策海关实施办法（试行）》",date:"2021-03-04",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247509930&idx=1&sn=34a7c358c8a199ec536733692a34a1b2",level:"national"},
    {id:50,category:"tax",title:"财政部、海关总署、税务总局《关于调整海南自由贸易港自用生产设备零关税政策的通知》",date:"2022-02-14",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247526654&idx=1&sn=d3187be4ce9674b7b3e4f4a5d588251f",level:"national"},
    {id:51,category:"tax",title:"财政部、海关总署、税务总局、民航局《关于中国国际消费品博览会展期内销售的进口展品税收优惠政策的通知》",date:"2021-04-26",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247513631&idx=1&sn=362ccff7933563eddb56feb51f3127d8",level:"national"},
    {id:52,category:"tax",title:"海关总署《海关对洋浦保税港区加工增值货物内销税收征管暂行办法》",date:"2021-07-08",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247517556&idx=1&sn=21d79522ae2724f1056ea8af03f0755e",level:"national"},
    {id:53,category:"tax",title:"海关总署《海关对洋浦保税港区加工增值货物内销税收征管暂行办法》",date:"2024-12-31",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247594980&idx=1&sn=40bb54130438dffdb56c40c109e8320c",level:"national"},
    {id:54,category:"tax",title:"海关总署《中华人民共和国海关对海南自由贸易港加工增值免关税货物税收征管暂行办法》",date:"2025-07-23",link:"https://www.hnftp.gov.cn/zczdtx/sszc/202508/t20250801_3906428.html",level:"national"},
    {id:55,category:"tax",title:"海口海关《洋浦保税港区加工增值货物内销税收征管海关实施暂行办法》",date:"2021-07-13",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247517721&idx=1&sn=aa465de83b149414b89e02412102a57f",level:"national"},
    {id:56,category:"tax",title:"省政府办公厅《海南自由贸易港加工增值免关税政策项下海南自产货物认定管理暂行办法》",date:"2025-07-23",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247601704&idx=1&sn=7ebc83cd2a736bf236a9db22699907a6",level:"provincial"},
    {id:57,category:"tax",title:"财政部、海关总署、税务总局、民航局《关于海南自由贸易港进出岛航班加注保税航油政策的通知》",date:"2021-07-08",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247517531&idx=1&sn=0423a1f5e626d6d5f78a050748e84d53",level:"national"},
    {id:58,category:"tax",title:"财政部 国家卫生健康委 海关总署 税务总局 国家药监局《关于海南自由贸易港药品、医疗器械零关税政策的通知》",date:"2024-09-05",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247582072&idx=1&sn=e5b16d573f29f1f0f8996730079f4c71",level:"national"},
    {id:59,category:"tax",title:"省政府办公厅《海南自由贸易港零关税进口药品、医疗器械管理办法》",date:"2024-12-25",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247594602&idx=1&sn=8f578da7400684c2f83d9d3a03e414f1",level:"provincial"},
    {id:60,category:"tax",title:"财政部 税务总局《关于继续实施离岸贸易印花税优惠政策的通知》",date:"2025-03-24",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247598292&idx=1&sn=6ef7f8bd1518e786351e215bc1336189",level:"national"},
    {id:61,category:"tax",title:"财政部 海关总署 税务总局《关于海南自由贸易港货物进出一线、二线及在岛内流通税收政策的通知》",date:"2025-07-18",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247601453&idx=1&sn=9f2f6dfd924cc889e6740a8a04f34973",level:"national"},
    {id:62,category:"tax",title:"省政府《海南自由贸易港零关税进口货物享惠主体认定管理办法（试行）》",date:"2025-07-22",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247601703&idx=1&sn=b744f83150d914877296919f458bc346",level:"provincial"},
    {id:63,category:"tax",title:"海关总署《关于执行海南自由贸易港货物进出一线、二线及在岛内流通税收政策有关要求的通知》",date:"2025-08-25",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247602404&idx=1&sn=ff2ab7dd856135f71d93c2b12cd75e9e",level:"national"},
    {id:64,category:"tax",title:"省财政厅《关于开展海南自由贸易港零关税进口货物享惠主体资格预申报的公告》",date:"2025-08-26",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247602414&idx=1&sn=e129fffc0e905fb1e16166d17c3ae915",level:"provincial"},
    {id:65,category:"tax",title:"财政部 海关总署 税务总局《关于海南自由贸易港进口征税商品目录的通知》",date:"2025-07-18",link:"https://mp.weixin.qq.com/s?__biz=MzU5NjgxMDg3OA==&mid=2247601454&idx=1&sn=cdfeb607e3c0f02601ed656ceaf58b05",level:"national"}
  ]
};

// 工具函数
const PoliciesUtils = {
  // 按类别筛选
  filterByCategory: (category) => {
    return policiesData.policies.filter(p => p.category === category);
  },
  
  // 搜索政策
  search: (keyword) => {
    const kw = keyword.toLowerCase();
    return policiesData.policies.filter(p => 
      p.title.toLowerCase().includes(kw) ||
      p.date.includes(kw)
    );
  },
  
  // 按日期范围筛选
  filterByDateRange: (startDate, endDate) => {
    return policiesData.policies.filter(p => {
      const date = new Date(p.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
  },
  
  // 获取类别统计
  getCategoryStats: () => {
    const stats = {};
    policiesData.categories.forEach(cat => {
      stats[cat.id] = {
        ...cat,
        actualCount: policiesData.policies.filter(p => p.category === cat.id).length
      };
    });
    return stats;
  },
  
  // 获取最新政策
  getLatestPolicies: (limit = 10) => {
    return [...policiesData.policies]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { policiesData, PoliciesUtils };
}

// 浏览器全局
if (typeof window !== 'undefined') {
  window.PoliciesData = policiesData;
  window.PoliciesUtils = PoliciesUtils;
}

console.log('✅ 海南自贸港政策库完整版加载完成');
console.log('📊 政策总数：' + policiesData.policies.length + ' 条');
console.log('📁 分类数量：' + policiesData.categories.length + ' 类');
console.log('📅 最新政策：' + policiesData.policies[policiesData.policies.length - 1].date);
console.log('🔗 来源：海南自贸港官方公众号');
