<template>
  <Tab :tabs="tabs" />
</template>

<script lang="ts" setup>
import Tab from '@/components/Tab.vue'
import type { TabsType } from '@/type/tab'

const tabs: TabsType = [
  { title: '进行中', showCard: 'Card' },
  { title: '未开始', showCard: 'Card' },
  { title: '已结束', showCard: 'NormalCard' }
]
</script>

<style lang="less" scoped></style>
