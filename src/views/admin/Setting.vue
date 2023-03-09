<template>
  <Tab :tabs="tabs" />
</template>

<script lang="ts" setup>
import Tab from '@/components/Tab.vue'
import type { TabsType } from '@/types/tab'
import {
  adminGoing,
  adminNotStarted,
  adminFinished
} from '@/request/apis/admin'

const tabs: TabsType = [
  { title: '进行中', showCard: 'NormalCard', api: adminGoing },
  { title: '未开始', showCard: 'NormalCard', api: adminNotStarted },
  { title: '已结束', showCard: 'NormalCard', api: adminFinished }
]
</script>

<style lang="less" scoped></style>
