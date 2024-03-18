export type Website = {
  id: string
  title: string
  baseQueryUrl: string
  badges?: Array<{
    label: string
    tooltip: string
  }>
  chip?: {
    text: string
    size: string
  }
}

export type Websites = Website[]

export const singularSearchEngines: Websites = [
  {
    id: 'google',
    title: 'Google',
    baseQueryUrl: 'https://www.google.com/search?q=',
    // logo: GoogleLogo
    badges: [
      {
        label: '用户多',
        tooltip: '用户量超 35 亿，占全球搜索引擎市场份额 92% 以上',
      },
    ],
  },
  {
    id: 'bing',
    title: 'Bing',
    baseQueryUrl: 'https://www.bing.com/search?q=',
  },
  {
    id: 'duckduckgo',
    title: 'DuckDuckGo',
    baseQueryUrl: 'https://duckduckgo.com/?q=',
    badges: [
      {
        label: '隐私',
        tooltip: '隐私第一，不会追踪用户搜索记录',
      },
    ],
  },
  {
    id: 'baidu',
    title: '百度',
    baseQueryUrl: 'https://www.baidu.com/s?wd=',
  },
  {
    id: 'sogou',
    title: '搜狗',
    baseQueryUrl: 'https://www.sogou.com/web?query=',
    badges: [
      {
        label: '微信',
        tooltip: '可搜索微信相关内容，包括公众号文章、视频等',
      },
    ],
  },
  {
    id: '360-search',
    title: '360 搜索',
    baseQueryUrl: 'https://www.so.com/s?q=',
  },
  // {
  //   id: 'perplexity',
  //   title: 'Perplexity',
  //   baseQueryUrl: 'https://www.perplexity.ai/',
  //   chip: {
  //     text: 'AI',
  //     size: '2xl',
  //   },
  // },
  // {
  //   id: 'devv',
  //   title: 'Devv',
  //   baseQueryUrl: 'https://devv.ai/search/',
  //   chip: {
  //     text: 'AI',
  //     size: '2xl',
  //   },
  //   badges: [
  //     {
  //       label: '编程',
  //       tooltip: '专门面向程序员的 AI 搜索引擎',
  //     },
  //   ],
  // },
]

export const aiPlatforms: Websites = [
  {
    id: 'perplexity',
    title: 'Perplexity',
    baseQueryUrl: 'https://www.perplexity.ai/',
    // chip: {
    //   text: 'AI',
    //   size: '2xl',
    // },
  },
  {
    id: 'devv',
    title: 'Devv',
    baseQueryUrl: 'https://devv.ai/search/',
    // chip: {
    //   text: 'AI',
    //   size: '2xl',
    // },
    badges: [
      {
        label: '编程',
        tooltip: '专门面向程序员的 AI 搜索引擎',
      },
    ],
  },
]

export const verticalPlatforms: Websites = [
  {
    id: 'github',
    title: 'GitHub',
    baseQueryUrl: 'https://github.com/search?type=repositories&q=',
  },
  {
    id: 'x',
    title: 'X',
    baseQueryUrl: 'https://x.com/search?q=',
  },
  {
    id: 'v2ex',
    title: 'V2EX',
    baseQueryUrl: 'https://www.v2ex.com/?q=',
  },
  {
    id: 'zhihu',
    title: '知乎',
    baseQueryUrl: 'https://www.zhihu.com/search?q=',
  },
  {
    id: 'juejin',
    title: '掘金',
    baseQueryUrl: 'https://juejin.cn/search?query=',
  },
  {
    id: 'csdn',
    title: 'CSDN',
    baseQueryUrl: 'https://so.csdn.net/so/search/s.do?q=',
  },
  {
    id: 'bilibili',
    title: 'B 站',
    baseQueryUrl: 'https://search.bilibili.com/all?keyword=',
  },
]

export const multipleSearchEngines = [
  {
    id: 'chinese',
    title: '中文',
    searchEngines: [
      ...singularSearchEngines.filter((engine) =>
        ['baidu', 'sogou', '360-search'].includes(engine.id)
      ),
    ],
  },
  {
    id: 'english',
    title: 'English',
    searchEngines: [
      ...singularSearchEngines.filter((engine) =>
        ['google', 'bing', 'duckduckgo'].includes(engine.id)
      ),
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    searchEngines: [
      ...aiPlatforms.filter((engine) =>
        ['perplexity', 'devv'].includes(engine.id)
      ),
    ],
  },
]
