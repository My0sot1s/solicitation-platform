<template>
  <div class="card">
    <van-image
      width="100"
      height="100"
      radius="1vw"
      :src="card?.ActivityPhotos?.[0].Link"
    />
    <div class="detail">
      <van-cell :title="card?.ActivityName" is-link :clickable="false" />
      <div class="description">
        {{ card?.Description }}
      </div>
      <div class="time"><van-icon name="clock-o" />{{ date }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import type { PropType } from 'vue'
import type { Activity } from '@/types/activity'

const props = defineProps({
  card: Object as PropType<Activity>
})

const date = computed(() => {
  const date0 = new Date(props.card!.EndTime)
  return `${date0.getFullYear()}.${date0.getMonth() + 1}.${date0.getDate()}`
})
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.card {
  width: 327px;
  /* height: calc(256vw / 375 * 100); */
  padding: 11.25px 0;
  margin-bottom: 15px;
  border-radius: 5.625px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07), 0 1px 4px rgba(0, 0, 0, 0.07);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .van-image {
    width: 303px !important;
    height: 138px !important;
  }
  .detail {
    width: 303px;
    .van-cell {
      padding-left: 0;
      padding-right: 0;
      font-size: larger;
      color: #475569;
    }
    .van-cell:after {
      border-bottom: 0px;
    }
    .description {
      width: 265px;
      margin-bottom: 7.5px;
      color: #cbd5e1;
      font-size: small;
      /* max-height: calc(48vw / 375 * 100); */
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow-wrap: break-word;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .time {
      float: right;
      color: #cbd5e1;
      :first-child {
        margin-right: 3.75px;
        color: #cbd5e1;
      }
    }
  }
}
</style>
