export const singularSearchEngines = [
  {
    id: 'google',
    title: 'Google',
    baseQueryUrl: 'https://www.google.com/search?q=',
    // logo: GoogleLogo
  },
  {
    id: 'bing',
    title: 'Bing',
    baseQueryUrl: 'https://www.bing.com/search?q=',
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
  },
  {
    id: '360-search',
    title: '360 搜索',
    baseQueryUrl: 'https://www.so.com/s?q=',
  },
  {
    id: 'duckduckgo',
    title: 'DuckDuckGo',
    baseQueryUrl: 'https://duckduckgo.com/?q=',
  },
  {
    id: 'perplexity',
    title: 'Perplexity',
    baseQueryUrl: 'https://www.perplexity.ai/',
    chip: {
      text: 'AI',
      size: '2xl',
    },
  },
  {
    id: 'devv',
    title: 'Devv',
    baseQueryUrl: 'https://devv.ai/search/',
    chip: {
      text: 'AI',
      size: '2xl',
    },
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
      ...singularSearchEngines.filter((engine) =>
        ['perplexity', 'devv'].includes(engine.id)
      ),
    ],
  },
]
