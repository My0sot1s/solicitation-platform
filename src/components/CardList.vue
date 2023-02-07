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
        :key="card"
        :title="tab.title"
        @click="cardClick(tab!.title)"
      />
    </div>
    <div v-else-if="tab?.showCard === 'NormalCard'">
      <NormalCard
        v-for="card in cards"
        :key="card"
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
import Card from '@/components/Card.vue'
import NormalCard from '@/components/NormalCard.vue'

defineProps({
  tab: Object as PropType<TabType>
})

const router = useRouter()
const route = useRoute()
/* 列表 */
const cards = ref<number[]>([])
const loading = ref(true)
const finished = ref(false)

// vant的bug: list未加载完时切换页面将不触发load, 手动触发第一次load
onMounted(() => {
  onLoad()
})

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      cards.value.push(cards.value.length + 1)
    }

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (cards.value.length >= 3) {
      finished.value = true
    }
  }, 300)
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
