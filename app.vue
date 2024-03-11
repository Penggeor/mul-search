<template>
  <div>
    <UNotifications/>
    <div class="flex justify-center mt-[10vh] mb-[5vh]">
      <UInput type="text" v-model="q" size="xl" :ui="{ icon: { trailing: { pointer: '' } } }"
              placeholder="输入搜索关键词"
              icon="i-heroicons-magnifying-glass-20-solid" class="w-[50vw]" :color="inputColor"
              @input="handleInputChange">
        <template #trailing>
          <UButton v-show="q !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
                   @click="q = ''"/>
        </template>
      </UInput>
    </div>
    <div class="flex justify-center">
      单引擎搜索：
    </div>
    <div class="search-engine-card">
      <UCard v-for="searchEngine in singularSearchEngines" :key="searchEngine.title"
             @click="enableOpen(openInNewTab)(searchEngine.baseQueryUrl + q)" class="card">
        <!-- <component :is="searchEngine.logo" /> -->
        <!-- <IconGoogleLogoSvg /> -->
        <!-- {{ searchEngine.logo }} -->
        <div class="flex justify-center">
          {{ searchEngine.title }}
        </div>
      </UCard>
    </div>
    <div class="flex justify-center mt-[5vh]">
      多引擎搜索：
    </div>
    <div class="mt-[5vh] flex justify-center gap-5 cursor-pointer">
      <UCard v-for="searchEngineGroup in multipleSearchEngines" :key="searchEngineGroup.tag" class="w-[25vw]" @click="
        enableOpen(openMulInNewTab)(searchEngineGroup.searchEngines.map(engine => engine.baseQueryUrl + q))
        ">
        <template #header>
          {{ searchEngineGroup.tag }}
        </template>
        <div class="flex flex-col items-center gap-2">
          <div v-for="(searchEngine, index) in searchEngineGroup.searchEngines" :key="index"
               class="flex justify-center">
            {{ searchEngine.title }}
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
<script lang="tsx" setup>
// import IconGoogleLogoSvg from "~/assets/logo/294675_google_icon.svg"

const toast = useToast()
const q = ref("");
const inputColor = ref("primary")

const handleInputChange = () => {
  if (inputColor.value !== 'primary') {
    inputColor.value = 'primary'
  }
}


const singularSearchEngines = [
  {
    title: "Google",
    baseQueryUrl: "https://www.google.com/search?q=",
    // logo: GoogleLogo
  },
  {
    title: "Bing",
    baseQueryUrl: "https://www.bing.com/search?q="
  },
  {
    title: "百度",
    baseQueryUrl: "https://www.baidu.com/s?wd="
  },
  {
    title: "搜狗",
    baseQueryUrl: "https://www.sogou.com/web?query="
  },
  {
    title: "360 搜索",
    baseQueryUrl: "https://www.so.com/s?q="
  },
  {
    title: "DuckDuckGo",
    baseQueryUrl: "https://duckduckgo.com/?q="
  },
  {
    title: "Wiki",
    baseQueryUrl: "https://en.wikipedia.org/wiki/"
  }
]

const multipleSearchEngines = [
  {
    tag: "中文",
    searchEngines: [
      ...singularSearchEngines.filter(engine => ["百度", "搜狗", "360 搜索"].includes(engine.title))
    ]
  },
  {
    tag: "英文",
    searchEngines: [
      ...singularSearchEngines.filter(engine => ["Google", "Bing", "DuckDuckGo", "Wiki"].includes(engine.title))
    ]
  }
]

const enableOpen = (f: (...args: any) => void) => {
  if (q.value === '') {
    inputColor.value = 'red'
    return () => {
    }
  }
  return f
}

const openInNewTab = (url: string) => {
  window.open(url, '_blank');
}

const openMulInNewTab = (urls: string[]) => {
  toast.add({title: '如果无法打开多个标签，请解除浏览器弹出限制', timeout: 6000})
  urls.map(url => {
    openInNewTab(url)
  });
}

</script>
<style scoped>
.search-engine-card {
  display: flex;
  flex-wrap: wrap;
  max-width: 60vw;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
  cursor: pointer;
}

.search-engine-card .card {
  width: 10vw;
}
</style>