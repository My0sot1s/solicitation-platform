<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <div v-if="tab?.showCard === 'Card'">
      <Card
        v-for="card in cards"
        :card="card"
        :key="card.ID"
        :title="tab.title"
        @click="cardClick(tab!.title)"
      />
    </div>
    <div v-else-if="tab?.showCard === 'NormalCard'">
      <NormalCard
        v-for="card in cards"
        :key="card.ID"
        @click="cardClick(tab!.title)"
      />
    </div>
  </van-list>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { PropType } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { TabType } from '@/types/tab'
import type { activityList } from '@/request/apis/types'
import Card from '@/components/Card.vue'
import NormalCard from '@/components/NormalCard.vue'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  tab: Object as PropType<TabType>
})

/* 列表 */
/* const cards = ref<number[]>([]) */
const loading = ref(true)
const finished = ref(false)
const cards = ref<activityList[]>()

// vant的bug: list未加载完时切换页面将不触发load, 手动触发第一次load
onMounted(() => {
  onLoad()
})

const onLoad = async () => {
  cards.value = await props.tab!.api()
  loading.value = false
  finished.value = true
}
const cardClick = (title: string) => {
  if (route.path.includes('admin')) {
    /* 管理员界面 */
    if (route.path.includes('/home')) {
      if (title !== '未开始') {
        router.push('/admin/Manuscripts')
      }
    } else if (route.path.includes('/Manuscripts')) {
      router.push('/admin/audit')
    } else if (route.path.includes('/setting')) {
      router.push('/admin/Edit')
    }
  } else {
    switch (title) {
      case '进行中':
        router.push('/new')
        break
      case '我的投稿':
        router.push('/my_submission')
        break
    }
  }
}
</script>

<style lang="less" scoped>
.van-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  margin-bottom: 65px;
  min-height: 80vh;
}
</style>
