<template>
  <div>
    <Tab :tabs="tabs" />
  </div>
</template>

<script lang="ts" setup>
/* import { ref } from 'vue' */
import Tab from '@/components/Tab.vue'
/* 标签栏 */
type TabType = {
  title: string
  showCard: string
}
const tabs: TabType[] = [
  { title: '进行中', showCard: 'Card' },
  { title: '已结束', showCard: 'Card' },
  { title: '我的投稿', showCard: 'NormalCard' }
]
</script>

<style lang="less" scoped>
.van-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
