<template>
  <Tab :tabs="tabs" />
</template>

<script lang="ts" setup>
import Tab from '@/components/Tab.vue'
import type { TabsType } from '@/types/tab'
import { getDetail } from '@/request/apis/admin'
import { useRoute } from 'vue-router'
import type { userForm } from '@/types/form'

const route = useRoute()

async function getUncategorized(): Promise<userForm[]> {
  const articles = await getDetail(parseInt(route.params.ID as string))
  return articles.filter((article) => article.Operator === '0')
}
async function getCollected(): Promise<userForm[]> {
  const articles = await getDetail(parseInt(route.params.ID as string))
  return articles.filter((article) => article.Operator === '0')
}
async function getSkipped(): Promise<userForm[]> {
  const articles = await getDetail(parseInt(route.params.ID as string))
  return articles.filter((article) => article.Operator === '0')
}

const tabs: TabsType = [
  { title: '未分类', showCard: 'NormalCard', api: getUncategorized },
  { title: '收藏', showCard: 'NormalCard', api: getCollected },
  { title: '略过', showCard: 'NormalCard', api: getSkipped }
]
</script>

<style lang="less" scoped></style>
