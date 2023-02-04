<template>
  <div>
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
      <template #nav-right v-if="tabs?.[0].title !== '未分类'">
        <div class="time van-tab">
          <span>所有时间</span>
          <van-icon name="notes-o" size="175%" />
        </div>
      </template>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import type { PropType } from 'vue'
import CardList from '@/components/CardList.vue'
import Card from '@/components/Card.vue'
import NormalCard from '@/components/NormalCard.vue'

type TabType = {
  title: string
  showCard: string
}
/* 接口或对象字面类型可以包含从其他文件导入的类型引用
，但是，传递给 defineProps 的泛型参数本身不能是一个导入的类型 */

const props = defineProps({
  tabs: {
    type: Array as PropType<TabType[]>
  }
})
console.log(props.tabs)

/* 标签栏 */
const active = ref(0)
</script>

<style lang="less" scoped>
.van-tabs {
  .time {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > span {
      margin-right: 5px;
    }
  }
}
.van-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
