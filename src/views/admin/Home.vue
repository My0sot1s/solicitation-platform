<template>
  <Tab :tabs="tabs" @card-click="toAudit" />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Tab from '@/components/Tab.vue'
import type { TabsType } from '@/type/tab'

const router = useRouter()

const tabs: TabsType = [
  { title: '进行中', showCard: 'Card' },
  { title: '未开始', showCard: 'Card' },
  { title: '已结束', showCard: 'NormalCard' }
]

const toAudit = (index: number) => {
  console.log('card-index', index)
  router.push('/admin/audit')
}
</script>

<style lang="less" scoped></style>
