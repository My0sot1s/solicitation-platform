<template>
  <div>
    <van-tabs v-model:active="active" animated swipeable shrink sticky>
      <van-tab
        v-for="tab in tabs"
        :key="tab.title"
        :title="tab.title"
        :disabled="tab.showCard === undefined"
      >
        <CardList :tab="tab" :dates="dates"> </CardList>
      </van-tab>
      <template #nav-right v-if="tabs?.[0].title !== '未分类'">
        <div class="time van-tab" @click="showCalendar = true">
          <span>选择时间</span>
          <van-icon name="notes-o" size="175%" />
        </div>
      </template>
    </van-tabs>

    <van-calendar
      type="multiple"
      :min-date="new Date(new Date().getTime() - 3600000 * 24 * 365)"
      :max-date="new Date(new Date().getTime() + 3600000 * 24 * 365)"
      v-model:show="showCalendar"
      @confirm="listFilter"
    />
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
const showCalendar = ref(false)
const dates = ref<Date[]>([])

/* 选择日期 */
function listFilter(date: Date[]) {
  // console.log(date)
  dates.value = date
  showCalendar.value = false
}
</script>

<style lang="less">
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
