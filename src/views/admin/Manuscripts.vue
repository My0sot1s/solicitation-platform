<template>
  <Tab :tabs="tabs" />
</template>

<script lang="ts" setup>
import Tab from '@/components/Tab.vue'
import type { TabsType } from '@/types/tab'
import { userGoing, userFinished } from '@/request/apis/user'

const tabs: TabsType = [
  { title: '未分类', showCard: 'NormalCard', api: userGoing },
  { title: '收藏', showCard: 'NormalCard', api: userGoing },
  { title: '略过', showCard: 'NormalCard', api: userGoing }
]
</script>

<style lang="less" scoped></style>
