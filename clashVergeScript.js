// 国内DNS服务器
const domesticNameservers = [
  "https://223.5.5.5/dns-query", // 阿里DoH
  "https://doh.pub/dns-query" // 腾讯DoH
];
// 国外DNS服务器
const foreignNameservers = [
  "https://77.88.8.8/dns-query", //YandexDNS
  "https://1.1.1.1/dns-query", // Cloudflare(主)
  "https://1.0.0.1/dns-query", // Cloudflare(备)
  "https://208.67.222.222/dns-query", // OpenDNS(主)
  "https://208.67.220.220/dns-query", // OpenDNS(备)
  "https://8.8.4.4/dns-query", // GoogleDNS  
];
// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": false,
  "prefer-h3": false,
  "respect-rules": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 追加以下条目
    "+.in-addr.arpa",
    "+.ip6.arpa",
    "time.*.com",
    "time.*.gov",
    "pool.ntp.org",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["223.5.5.5", "1.2.4.8"],//可修改成自己ISP的DNS
  "nameserver": [...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers],
  "direct-nameserver": [...domesticNameservers],
  "nameserver-policy": {
    "geosite:private,cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers,
    // 访问公司内网域名
    // '+.helloworld.com': '10.10.10.1'

  }
  // "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1"],
  // "nameserver": [...domesticNameservers, ...foreignNameservers],
  // "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  // "nameserver-policy": {
  //   "geosite:private,cn,geolocation-cn": domesticNameservers,
  //   "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
  // }
};
// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};
// 规则集配置
const ruleProviders = {
  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple.yaml"
  },
  "google": {
    ...ruleProviderCommon,
    "behavior": "classical",
    // "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Google/Google.yaml",
    "path": "./ruleset/blackmatrix7/google.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  },
  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  },
  "openai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
    "path": "./ruleset/blackmatrix7/openai.yaml"
  },
  "youtube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/YouTube/YouTube.yaml",
    "path": "./ruleset/blackmatrix7/youtube.yaml"
  },
  "netflix": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Netflix/Netflix_Classical.yaml",
    "path": "./ruleset/blackmatrix7/netflix.yaml"
  },
  "spotify": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Shopify/Shopify.yaml",
    "path": "./ruleset/blackmatrix7/spotify.yaml"
  },
  "bilibilihmt": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/BiliBiliIntl/BiliBiliIntl.yaml",
    "path": "./ruleset/blackmatrix7/Bilibilihmt.yaml"
  },
  "bahamut": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Bahamut/Bahamut.yaml",
    "path": "./ruleset/blackmatrix7/bahamut.yaml"
  },
  "gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    // "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/google-gemini.yaml",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Gemini/Gemini.yaml",
    "path": "./ruleset/blackmatrix7/gemini.yaml"
  },
  "microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    // "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/microsoft.yaml",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml",
    "path": "./ruleset/blackmatrix7/microsoft.yaml"
  },
  "tiktok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/TikTok/TikTok.yaml",
    "path": "./ruleset/blackmatrix7/tiktok.yaml"
  },
  "steamcn": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/SteamCN/SteamCN.yaml",
    "path": "./ruleset/blackmatrix7/steamcn.yaml"
  },
  "bytedance": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/ByteDance/ByteDance.yaml",
    "path": "./ruleset/blackmatrix7/bytedance.yaml"
  },
  "facebook": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Facebook/Facebook.yaml",
    "path": "./ruleset/blackmatrix7/facebook.yaml"
  },
  "claude": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Claude/Claude.yaml",
    "path": "./ruleset/blackmatrix7/claude.yaml"
  }
};
// 规则
const rules = [
  // 自定义规则
  "DOMAIN-SUFFIX,googleapis.cn,节点选择", // Google服务
  "DOMAIN-SUFFIX,gstatic.com,节点选择", // Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,节点选择", // Google Play下载服务
  "DOMAIN-SUFFIX,github.io,节点选择", // Github Pages
  "DOMAIN,v2rayse.com,节点选择", // V2rayse节点工具
  "RULE-SET,steamcn,全局直连",
  // 匹配类型, 规则集 ,代理组/连接方式
  // blackmatrix7 规则集
  "RULE-SET,claude,Claude",
  "RULE-SET,openai,OpenAI",
  "RULE-SET, facebook,Facebook",
  "RULE-SET,google,谷歌服务",
  // Loyalsoldier 规则集
  "RULE-SET,applications,全局直连",
  "RULE-SET,private,全局直连",
  "RULE-SET,reject,广告过滤",
  "RULE-SET,icloud,苹果服务",
  "RULE-SET,apple,苹果服务",
  "RULE-SET,youtube,YouTube",
  "RULE-SET,netflix,Netflix",
  "RULE-SET,spotify,Spotify",
  "RULE-SET,bilibilihmt,哔哩哔哩港澳台",
  "RULE-SET,bahamut,Bahamut",
  "RULE-SET,tiktok,TikTok",
  "RULE-SET,gemini,Gemini",
  "RULE-SET,microsoft,微软服务",
  // 通用规则
  "RULE-SET,proxy,节点选择",
  "RULE-SET,gfw,节点选择",
  "RULE-SET,tld-not-cn,节点选择",
  "RULE-SET,direct,全局直连",
  "RULE-SET,lancidr,全局直连,no-resolve",
  "RULE-SET,cncidr,全局直连,no-resolve",
  "RULE-SET,telegramcidr,电报消息,no-resolve",
  // 其他规则
  "GEOSITE,CN,全局直连",
  "GEOIP,LAN,全局直连,no-resolve",
  "GEOIP,CN,全局直连,no-resolve",
  "MATCH,漏网之鱼"
];
// 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

// 程序入口
function main(config) {
  const originConfig = config;
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "节点选择",
      "type": "select",
      "include-all": true,
      "proxies": ["延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "延迟选优",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      "proxies": ["HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    {
      ...groupBaseOption,
      "name": "故障转移",
      "type": "fallback",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "YouTube",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "全局直连"],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "Netflix",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "全局直连"],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://www.clashverge.dev/assets/icons/netflix.svg"
    },
    {
      ...groupBaseOption,
      "name": "电报消息",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
    {
      ...groupBaseOption,
      "name": "TikTok",
      "type": "select",
      "include-all": true,
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "全局直连"],
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/shindgewongxj/WHATSINStash@master/icon/tiktok.png"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      ...groupBaseOption,
      "name": "哔哩哔哩港澳台",
      "type": "select",
      "proxies": ["HK", "TW"],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/Bili.png"
    },
    {
      ...groupBaseOption,
      "name": "Bahamut",
      "type": "select",
      "proxies": ["TW"],
      "include-all": true,
      "filter": "(?i)台|tw|TW",
      "icon": "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/Bahamut.png"
    },
    {
      ...groupBaseOption,
      "name": "Spotify",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "全局直连"],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/shindgewongxj/WHATSINStash@master/icon/spotify.png"
    },
    {
      ...groupBaseOption,
      "url": "https://openai.com",
      "expected-status": "200",
      "name": "OpenAI",
      "proxies": ["SG", "HK", "TW", "JP", "KR", "US", "DE", "FR", "UK", "全局直连"],
      "type": "select",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
    },
    {
      ...groupBaseOption,
      "name": "Gemini",
      "proxies": ["US", "SG", "HK", "TW", "JP", "KR", "US", "DE", "FR", "UK", "全局直连"],
      "type": "select",
      "include-all": true,
      "icon": "https://cdn.jsdelivr.net/gh/guaishouxiaoqi/icons@master/Color/Gemini.png"
    },
    {
      ...groupBaseOption,
      "url": "https://claude.com",
      "expected-status": "200",
      "name": "Claude",
      "type": "select",
      "proxies": ["SG", "TW", "HK", "JP", "KR", "US", "DE", "FR", "UK", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/claude.svg"
    },
    {
      ...groupBaseOption,
      "name": "Facebook",
      "url": "https://fbcdn.net",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/facebook.svg"
    },

    {
      ...groupBaseOption,
      "name": "广告过滤",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局直连",
      "type": "select",
      "proxies": ["DIRECT", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
    },
    {
      ...groupBaseOption,
      "name": "HK",
      "type": "url-test",
      "include-all": true,
      "filter": "香港|HK|🇭🇰",
      "tolerance": 50,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "TW",
      "type": "url-test",
      "include-all": true,
      "filter": "台湾|TW|🇹🇼",
      "tolerance": 50,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Taiwan.png"
    },
    {
      ...groupBaseOption,
      "name": "JP",
      "type": "url-test",
      "include-all": true,
      "filter": "日本|JP|🇯🇵",
      "tolerance": 50,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "KR",
      "type": "url-test",
      "include-all": true,
      "filter": "韩国|KR|🇰🇷",
      "tolerance": 50,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Korea.png"
    },
    {
      ...groupBaseOption,
      "name": "US",
      "type": "url-test",
      "include-all": true,
      "filter": "美国|US|🇺🇸",
      "tolerance": 50,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png"
    },
    {
      ...groupBaseOption,
      "name": "DE",
      "type": "url-test",
      "include-all": true,
      "filter": "德国|DE|🇩🇪",
      "tolerance": 50,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Germany.png"
    },
    {
      ...groupBaseOption,
      "name": "SG",
      "type": "url-test",
      "include-all": true,
      "filter": "新加坡|SG|🇸🇬",
      "tolerance": 50,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "UK",
      "type": "url-test",
      "include-all": true,
      "filter": "英国|GB|🇬🇧",
      "exclude-filter": "Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      "tolerance": 50,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_Kingdom.png"
    },
    {
      ...groupBaseOption,
      "name": "漏网之鱼",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "filter": "^(?!.*(官网|套餐|流量|异常|剩余)).*$",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;
  // 添加判断
  if (config["proxies"]) {
    config["proxies"].forEach(proxy => {
      // 为每个节点设置 udp = true
      proxy.udp = true
    })
  }
  // 返回修改后的配置
  return config;
  // reset
  // return originConfig;
}
