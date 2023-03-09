<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    :error="error"
    finished-text="没有更多了"
    error-text="请求失败，刷新重试"
    @load="onLoad"
  >
    <div v-if="tab?.showCard === 'Card'">
      <Card
        v-for="card in cards"
        :card="card as ActivityList"
        :key="card.ID"
        :title="tab.title"
        @click="cardClick(tab!.title, card.ID as number)"
      />
    </div>
    <div v-else-if="tab?.showCard === 'NormalCard'">
      <NormalCard
        v-for="card in cards"
        :card="card"
        :key="card.ID"
        @click="cardClick(tab!.title, card.ActivityID, card.ID)"
      />
    </div>
  </van-list>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { TabType } from '@/types/tab'
import type { ActivityList } from '@/types/activityList'
import type { userForm } from '@/types/form'
import Card from '@/components/Card.vue'
import NormalCard from '@/components/NormalCard.vue'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  tab: Object as PropType<TabType>
})

/* 列表 */
const loading = ref(false)
const finished = ref(false)
const error = ref(false)
const cards = ref<ActivityList[] | userForm[]>()

const onLoad = async () => {
  try {
    cards.value = await props.tab!.api()
    console.log(cards.value)

    finished.value = true
  } catch (e) {
    error.value = true
  }
  loading.value = false
}

const cardClick = (title: string, ActivityID: number, ID?: number) => {
  if (route.path.includes('admin')) {
    /* 管理员界面 */
    if (route.path.includes('/home')) {
      if (title !== '未开始') {
        router.push({
          name: 'manuscripts',
          params: { ID: 1 }
        })
      }
    } else if (route.path.includes('/manuscripts')) {
      router.push('/admin/audit')
    } else if (route.path.includes('/setting')) {
      router.push('/admin/Edit')
    }
  } else {
    switch (title) {
      case '进行中':
        router.push(`/new/${ActivityID}`)
        break
      case '我的投稿':
        router.push(`/my-submission/${ActivityID}/?ID=${ID}`)
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
