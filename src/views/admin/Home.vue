<template>
  <div class="tabs">
    <van-tabs v-model:active="active" animated swipeable shrink sticky>
      <van-tab
        v-for="tab in tabs"
        :key="tab.title"
        :title="tab.title"
        :disabled="tab.showCard === undefined"
      >
        <CardList>
          <component :is="tab.showCard === 'Card' ? Card : NormalCard" />
        </CardList>
      </van-tab>
      <template #nav-right>
        <div class="time van-tab">
          <span>所有时间</span>
          <van-icon name="notes-o" size="175%" />
        </div>
      </template>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CardList from '@/components/CardList.vue'
import Card from '@/components/Card.vue'
import NormalCard from '@/components/NormalCard.vue'

const active = ref(0)
const tabs = ref([
  { title: '进行中', showCard: 'Card' },
  { title: '已结束', showCard: 'Card' },
  { title: '我的投稿', showCard: 'NormalCard' }
])
</script>

<style lang="less" scoped>
.tabs {
  // display: flex;
  // flex-direction: column;

  .time {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > span {
      margin-right: 5px;
    }
  }
}
</style>
