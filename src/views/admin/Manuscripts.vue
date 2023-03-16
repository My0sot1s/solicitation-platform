<template>
  <Tab :tabs="tabs" />
</template>

<script lang="ts" setup>
import Tab from '@/components/Tab.vue'
import type { TabsType } from '@/types/tab'
import { getDetail } from '@/request/apis/admin'
import { useRoute } from 'vue-router'
import type { userForm } from '@/types/form'
import type { Activity } from '@/types/activity'
import { useActivity } from '@/stores/activity'

const tabs: TabsType = [
  { title: '未分类', showCard: 'NormalCard', api: filterArticles(1) },
  { title: '收藏', showCard: 'NormalCard', api: filterArticles(2) },
  { title: '略过', showCard: 'NormalCard', api: filterArticles(3) }
]

const route = useRoute()
const activityStore = useActivity()
let activity: Activity

function filterArticles(status: number) {
  return async function () {
    if (!activity) {
      activity = await getDetail(parseInt(route.params.ID as string))
      // 保存，供稿件审核是直接获取，减少请求
      activityStore.$state = activity
    }
    return activity.Articles.filter(
      (article: userForm) => article.Status === status
    )
  }
}
</script>

<style lang="less" scoped></style>
