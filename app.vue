<template>
  <div>
    <UNotifications />
    <div class="flex flex-col items-center mt-[10vh] mb-[5vh]">
      <UInputMenu type="text" v-model="selected" :query="q" size="xl" :ui="{ icon: { trailing: { pointer: '' } } }"
        placeholder="输入搜索关键词" icon="i-heroicons-magnifying-glass-20-solid" class="w-[50vw]" :color="inputColor"
        @input="handleInputChange" nullable :search="search" :loading="loading" option-attribute="value"
        :search-attributes="['value']" autofocus :debounce="0" @update:query="handleUpdateQuery"
        :popper="{ open: true }">
        <template #trailing>
          <UButton v-show="q || selected?.value" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
            :padded="false" @click="clear" />
        </template>
        <template #empty>
          <div class="flex justify-center">
            请输入搜索关键词
          </div>
        </template>
        <template #option="{ option: entrance }">
          <div class="flex h-[100%]">
            <div class="flex-1">
              {{ entrance.template }}
            </div>
            &nbsp;&nbsp;&nbsp;
            <UBadge v-if="entrance.badge">{{ entrance.badge.text }}</UBadge>
          </div>
        </template>
      </UInputMenu>
      <!-- <UPopover v-model:open="open">
        <div></div>
        <template #panel>
          <div class="p-4">
            hhhhh
          </div>
        </template>
      </UPopover> -->
    </div>
    <div class="flex justify-center">
      单引擎搜索：
    </div>
    <div class="search-engine-card">
      <template v-for="searchEngine in singularSearchEngines" :key="searchEngine.id">
        <UChip :show="!!searchEngine.chip" :text="searchEngine.chip?.text" :size="searchEngine.chip?.size">
          <UCard @click="enableOpen(openInNewTab)(searchEngine.id)" class="card">
            <!-- <component :is="searchEngine.logo" /> -->
            <!-- <IconGoogleLogoSvg /> -->
            <!-- {{ searchEngine.logo }} -->
            <div class="flex justify-center">
              {{ searchEngine.title }}
            </div>
          </UCard>
        </UChip>
      </template>
    </div>
    <div class="flex justify-center mt-[5vh]">
      多引擎搜索：
    </div>
    <div class="mt-[5vh] flex justify-center gap-5 cursor-pointer">
      <UCard v-for="searchEngineGroup in multipleSearchEngines" :key="searchEngineGroup.id" class="w-[25vw]" @click="
        enableOpen(openMulInNewTab)(searchEngineGroup.searchEngines.map(engine => engine.id))
        ">
        <template #header>
          {{ searchEngineGroup.title }}
        </template>
        <div class="flex flex-col items-center gap-2">
          <div v-for="(searchEngine, index) in searchEngineGroup.searchEngines" :key="index"
            class="flex justify-center">
            {{ searchEngine.title }}
          </div>
        </div>
      </UCard>
    </div>
    <footer class="fixed bottom-0 w-[100vw]">
      <UCard :ui="{
        rounded: 'rounded-none rounded-t-lg',
        body: {
          padding: 'px-3 py-4 sm:p-4'
        }
      }">
        <p class="flex justify-center">
          <UButton :padded="true" color="gray" variant="link" target="_blank" to="https://wukaipeng.com/">
            吴楷鹏 &copy; {{ new Date().getFullYear() }}
          </UButton>
          <UButton :padded="true" color="gray" variant="link" target="_blank" to="https://wukaipeng.com/">|</UButton>
          <UButton :padded="true" color="gray" variant="link" target="_blank"
            to="https://github.com/Penggeor/mul-search">
            GitHub</UButton>
        </p>
      </UCard>
    </footer>
  </div>
</template>
<script lang="tsx" setup>
// import IconGoogleLogoSvg from "~/assets/logo/294675_google_icon.svg"
import { localStorage } from '@boombox/storage';
import { singularSearchEngines, multipleSearchEngines } from './search-engines'

type SearchSelectItem = {
  value: string
  template: string
  callback: (...args: any[]) => void
  badge?: {
    text: string
  }
}

const STORAGE_KEY = 'statistic'
const storage = (localStorage.getItem(STORAGE_KEY) || {
  frequentUsedSearchEngine: {}
}) as {
  frequentUsedSearchEngine: {
    [key: string]: number
  }
}

const toast = useToast()
const q = ref("");
const inputColor = ref("primary")
const loading = ref(false)
// const open = ref(false)
const selected = ref<SearchSelectItem | null>(null)

const aggregateSearchResults = ref<Array<SearchSelectItem>>([])
async function search(q: string) {
  aggregateSearchResults.value = []

  if (q === '') return aggregateSearchResults.value

  loading.value = true
  try {
    const isWebsite = (q: string) => {
      return q.match(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
    }
    if (isWebsite(q)) {
      aggregateSearchResults.value.push({
        value: q,
        template: `打开网址 ${q}`,
        callback: () => {
          const qWithHttp = q.startsWith('http') ? q : `http://${q}`
          window.open(qWithHttp, '_blank');
        }
      })
    }

    // Get the first frequent used search engine
    if (Object.keys(storage.frequentUsedSearchEngine).length === 0) {
      // Use first item of singularSearchEngines
      aggregateSearchResults.value.push({
        value: q,
        template: `使用 ${singularSearchEngines[0].title} 搜索 ${q}`,
        callback: () => {
          openInNewTab(singularSearchEngines[0].id)
        }
      })
    } else {
      const sortedFrequentUsedSearchEngine = Object.entries(storage.frequentUsedSearchEngine).sort((a, b) => b[1] - a[1])
      const firstFrequentUsedSearchEngine = singularSearchEngines.find(engine => engine.id === sortedFrequentUsedSearchEngine[0][0])
      aggregateSearchResults.value.push({
        value: q,
        template: `使用 ${firstFrequentUsedSearchEngine!.title} 搜索 ${q}`,
        callback: () => {
          openInNewTab(firstFrequentUsedSearchEngine!.id)
        },
        badge: {
          text: '最近常用',
        }
      })
    }

    return aggregateSearchResults.value
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleInputChange = () => {
  if (inputColor.value !== 'primary') {
    inputColor.value = 'primary'
  }
}

watch(selected, (newVal) => {
  console.log()
  if (newVal) {
    newVal.callback()
  }
})

// watch(q, (newVal) => {
//   if (newVal === '') {
//     open.value = false
//   } else {
//     open.value = true
//   }
// })

const handleUpdateQuery = (query: string) => {
  console.log('query', query)
  console.log('selected', selected.value)
  if (query === '' && selected.value === null) {
    return
  }

  q.value = query
}

const enableOpen = (f: (...args: any) => void) => {
  if (q.value === '') {
    inputColor.value = 'red'
    toast.add({ title: '请输入搜索关键词', timeout: 1200 })
    return () => {
    }
  }
  return f
}

const clear = () => {
  q.value = ''
  selected.value = null
}

const openInNewTab = (id: string) => {
  const target = singularSearchEngines.find(engine => engine.id === id)

  const query = q.value || selected?.value?.value
  if (!query) {
    toast.add({ title: '请输入搜索关键词', timeout: 1200 })
    return
  }

  window.open(target?.baseQueryUrl + query, '_blank');

  if (storage.frequentUsedSearchEngine[id]) {
    storage.frequentUsedSearchEngine[id]++
  } else {
    storage.frequentUsedSearchEngine[id] = 1
  }
  localStorage.setItem(STORAGE_KEY, storage)
}

const openMulInNewTab = (ids: string[]) => {
  toast.add({ title: '如果无法打开多个标签，请解除浏览器弹出限制', timeout: 6000 })
  ids.map(id => {
    openInNewTab(id)
  })
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