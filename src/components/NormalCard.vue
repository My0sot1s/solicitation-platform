<template>
  <div>
    <van-cell-group>
      <van-cell
        :title="props.card?.ActivityName || ''"
        :value="date"
        :label="props.card?.Title"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { ActivityList } from '@/types/activityList'
import type { userForm } from '@/types/form'
import { computed } from 'vue'
const props = defineProps({
  card: Object as PropType<ActivityList | userForm>
})

const date = computed(() => {
  const date0 = new Date(props.card!.UpdatedAt as string)
  return `${date0.getFullYear()}.${date0.getMonth() + 1}.${date0.getDate()}`
})
console.log(props.card, props.card?.Title)
</script>

<style lang="less" scoped>
.van-cell-group {
  width: 100vw;
}
</style>
