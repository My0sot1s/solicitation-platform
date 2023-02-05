<template>
  <Tab :tabs="tabs" />
</template>

<script lang="ts" setup>
import Tab from '@/components/Tab.vue'
import type { TabsType } from '@/types/tab'

const tabs: TabsType = [
  { title: '未分类', showCard: 'NormalCard' },
  { title: '收藏', showCard: 'NormalCard' },
  { title: '略过', showCard: 'NormalCard' }
]
</script>

<style lang="less" scoped></style>
