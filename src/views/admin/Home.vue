<template>
  <Tab :tabs="tabs" />
</template>

<script lang="ts" setup>
import Tab from '@/components/Tab.vue'
import type { TabsType } from '@/types/tab'
import { userGoing, userFinished } from '@/request/apis/user'

const tabs: TabsType = [
  { title: '进行中', showCard: 'Card', api: userGoing },
  { title: '未开始', showCard: 'Card', api: userGoing },
  { title: '已结束', showCard: 'Card', api: userFinished }
]
</script>

<style lang="less" scoped></style>
