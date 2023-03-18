<template>
  <div>
    <van-cell-group>
      <van-cell :title="activityName" :value="date" is-link>
        <template #title v-if="!activityName">
          <van-text-ellipsis :content="props.card?.Name" />
        </template>
        <template #label v-if="props.card?.Title">
          <van-text-ellipsis :content="props.card?.Title" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Activity } from '@/types/activity'
import type { userForm } from '@/types/form'
import { computed } from 'vue'
import { isActivity } from '@/utils/checkType'

const props = defineProps({
  card: Object as PropType<Activity | userForm>
})

const activityName = computed(() => {
  if (isActivity(props.card!)) {
    return props.card.ActivityName
  } else {
    // props.card.Activities 可能为空
    return Array.isArray(props.card?.Activities) &&
      props.card!.Activities!.length > 0
      ? props.card?.Activities[0].ActivityName
      : ''
  }
})

const date = computed(() => {
  if (props.card?.EndTime == '-1') return '长期任务'
  const date0 = new Date(props.card!.UpdatedAt as string)
  return `${date0.getFullYear()}.${date0.getMonth() + 1}.${date0.getDate()}`
})
</script>

<style lang="less" scoped>
.van-cell-group {
  width: 100vw;
}
</style>
