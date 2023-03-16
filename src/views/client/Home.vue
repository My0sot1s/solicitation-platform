<template>
  <div>
    <Tab :tabs="tabs" />
  </div>
</template>

<script lang="ts" setup>
import Tab from '@/components/Tab.vue'
import type { TabsType } from '@/types/tab'
import { onMounted } from 'vue'
import { userGoing, userFinished, myArticle } from '@/request/apis/user'

const tabs: TabsType = [
  { title: '进行中', showCard: 'Card', api: userGoing },
  { title: '已结束', showCard: 'Card', api: userFinished },
  { title: '我的投稿', showCard: 'NormalCard', api: myArticle }
]
onMounted(async () => {
  /* const list = await userGoing()
  console.log(list)
  const list2 = await userFinished()
  console.log(list2) */
})
</script>

<style lang="less" scoped></style>
