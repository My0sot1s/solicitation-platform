<template>
  <Tab :tabs="tabs" />
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import Tab from '@/components/Tab.vue'

type TabType = {
  title: string
  showCard: string
}
const tabs: TabType[] = [
  { title: '未分类', showCard: 'NormalCard' },
  { title: '收藏', showCard: 'NormalCard' },
  { title: '赞过', showCard: 'NormalCard' }
]
</script>

<style lang="less" scoped></style>
