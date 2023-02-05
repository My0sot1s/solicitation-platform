<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div v-if="tab?.showCard === 'Card'">
      <Card
        v-for="(card, index) in cards"
        :key="card"
        @click="cardClick(index)"
      />
    </div>
    <div v-else-if="tab?.showCard === 'NormalCard'">
      <NormalCard
        v-for="(card, index) in cards"
        :key="card"
        @click="cardClick(index)"
      />
    </div>
  </van-list>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { TabType } from '@/types/tab'
import Card from '@/components/Card.vue'
import NormalCard from '@/components/NormalCard.vue'
defineProps({
  tab: Object as PropType<TabType>
})

/* 列表 */
const cards = ref<number[]>([])
const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      cards.value.push(cards.value.length + 1)
    }

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (cards.value.length >= 3) {
      finished.value = true
    }
  }, 1000)
}
const cardClick = (index: number) => {
  console.log(index)
}
</script>

<style lang="less" scoped>
.van-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  margin-bottom: 65px;
}
</style>
