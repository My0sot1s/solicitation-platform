<template>
  <div>
    <div class="tab-broad">
      <van-tabs @click-tab="handleClickTab" v-model:active="active">
        <van-tab title="进行中"></van-tab>
        <van-tab title="已结束"></van-tab>
        <van-tab title="我的投稿"></van-tab>
      </van-tabs>
      <div class="all-time van-tab van-tab--line van-tab--active">
        <div class="all-time-text">所有时间</div>
        <van-icon name="notes-o" size="175%" />
      </div>
    </div>
    <CardList
      ><component :is="showCard ? Card : NormalCard"></component
    ></CardList>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CardList from '@/components/CardList.vue'
import Card from '@/components/Card.vue'
import NormalCard from '@/components/NormalCard.vue'

/* 标签栏 */
const active = ref(0)
let showCard = ref(true)
function handleClickTab({ title }: { title: string }) {
  showCard.value = title !== '我的投稿'
}
</script>

<style lang="less" scoped>
.tab-broad {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: calc(36.5vw / 375 * 100);
  .van-tabs {
    width: calc(257vw / 375 * 100);
  }
  .all-time {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    padding-left: 5vw;
    padding-right: 5vw;
  }
}
.van-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
