<template>
  <div>
    <van-tabs
      v-model:active="active"
      animated
      swipeable
      shrink
      sticky
      @change="changeTab"
    >
      <van-tab
        v-for="tab in tabs"
        :key="tab.title"
        :title="tab.title"
        :disabled="tab.showCard === undefined"
      >
        <!-- CardList根据tab类型请求数据，接受 CardList 传来的数据渲染Card -->
        <CardList type="XXX" :tab="tab"> </CardList>
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
import { ref } from 'vue'
import type { PropType } from 'vue'
import CardList from '@/components/CardList.vue'
import type { TabsType } from '@/types/tab'

defineProps({
  tabs: {
    type: Array as PropType<TabsType>
  }
})

/* 标签栏 */
const active = ref(0)

/* 切换tab */
const changeTab = (_: number, title: string) => {
  console.log(title)
}
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
</style>
