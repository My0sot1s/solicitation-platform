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
        <CardList type="XXX">
          <template v-slot="{ cards }">
            <div v-if="tab.showCard === 'Card'">
              <Card
                v-for="(card, index) in cards"
                :key="card"
                @click="cardClick(index)"
              />
            </div>
            <div v-else-if="tab.showCard === 'NormalCard'">
              <NormalCard
                v-for="(card, index) in cards"
                :key="card"
                @click="cardClick(index)"
              />
            </div>
          </template>
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
import type { TabsType } from '@/type/tab'

/* 接口或对象字面类型可以包含从其他文件导入的类型引用
，但是，传递给 defineProps 的泛型参数本身不能是一个导入的类型 */
defineProps({
  tabs: {
    type: Array as PropType<TabsType>
  }
})

const emits = defineEmits(['cardClick'])

/* 标签栏 */
const active = ref(0)

/* 切换tab */
const changeTab = (_: number, title: string) => {
  console.log(title)
}
/* 点击卡片 */
const cardClick = (index: number) => {
  emits('cardClick', index)
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
