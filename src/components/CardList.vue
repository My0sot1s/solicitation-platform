<template>
  <van-pull-refresh
    v-model="refresh.loading"
    :success-text="refresh.text"
    @refresh="onRefresh"
  >
    <van-list
      v-model:loading="loadList.loading"
      :finished="loadList.finished"
      :error="loadList.error"
      finished-text="没有更多了"
      error-text="请求失败，刷新重试"
      @load="onLoad"
    >
      <div v-if="tab?.showCard === 'Card'">
        <Card
          v-for="card in cards"
          :card="card as Activity"
          :key="card.ID"
          :title="tab.title"
          @click="
            cardClick(
              tab!.title,
              card.ID as number,
              card.ID!,
              card.ActivityName
            )
          "
        />
      </div>
      <div v-else-if="tab?.showCard === 'NormalCard'">
        <NormalCard
          v-for="card in cards"
          :card="card"
          :key="card.ID"
          @click="cardClick(tab!.title, card.ActivityID, card.ID!, card.Title)"
        />
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script lang="ts" setup>
import { ref, reactive, onActivated } from 'vue'
import { type PropType, computed } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import type { TabType } from '@/types/tab'
import type { Activity } from '@/types/activity'
import type { userForm } from '@/types/form'
import Card from '@/components/Card.vue'
import NormalCard from '@/components/NormalCard.vue'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  tab: Object as PropType<TabType>,
  dates: {
    type: Array as PropType<Date[]>
  }
})
/* 刷新 */
const refresh = reactive({
  loading: false,
  text: ''
})
const onRefresh = async () => {
  await onLoad()
  refresh.text = loadList.error ? '请求失败' : '刷新成功'
  refresh.loading = false
}

onActivated(() => {
  if (route.name === 'manuscripts') onRefresh()
})

/* 列表 */
const loadList = reactive({
  loading: false,
  finished: false,
  error: false
})

const tempCards = ref<Activity[] | userForm[]>([])
const onLoad = async () => {
  try {
    tempCards.value = await props.tab!.api()
    loadList.finished = true
    loadList.error = false
  } catch (e) {
    loadList.error = true
  }
  loadList.loading = false
}
const cards = computed(() => {
  if (props.tab?.showCard === 'Card') {
    return (tempCards.value as Activity[]).filter((e) => {
      if (!props.dates?.length) {
        return true
      } else {
        return props.dates.some((date) => {
          return date >= new Date(e.StartTime) && date <= new Date(e.EndTime)
        })
      }
    })
  } else {
    return (tempCards.value as userForm[]).filter((e) => {
      if (!props.dates?.length) {
        return true
      } else {
        return props.dates.some((date) => {
          return (
            date >= new Date(e.StartTime as string) &&
            date <= new Date(e.EndTime as string)
          )
        })
      }
    })
  }
})

/* 修改特定页面 title */
onBeforeRouteLeave((to, from) => {
  if (to.path.includes('/manuscripts') || from.path === '#/home') {
    sessionStorage.setItem('activityName', from.meta.next as string)
    to.meta.title = from.meta.next
  }
})
/* 点击卡片 */
const cardClick = (
  title: string,
  ActivityID: number,
  ID: number,
  ActivityName?: string
) => {
  if (route.path.includes('admin')) {
    /* 管理员界面 */
    if (route.path.includes('/home')) {
      if (title !== '未开始') {
        route.meta.next = ActivityName
        router.push({
          name: 'manuscripts',
          params: { ID }
        })
      }
    } else if (route.path.includes('/manuscripts')) {
      router.push({
        name: 'audit',
        params: { ID }
      })
    } else if (route.path.includes('/activitys')) {
      router.push({
        name: 'edit',
        params: { ID }
      })
    }
  } else {
    switch (title) {
      case '进行中':
        route.meta.next = `新建征稿: ${ActivityName}`
        console.log(route.meta.next)
        router.push(`/new/${ActivityID}`)
        break
      case '我的投稿':
        route.meta.next = `修改投稿: ${ActivityName}`
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
  margin-bottom: 100px;
  min-height: 80vh;
}
</style>
