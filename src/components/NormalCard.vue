<template>
  <div>
    <van-cell-group>
      <van-cell
        title="日常稿件征集活动！"
        value="2022.2.22"
        label="光盘行动！"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
</script>

<style lang="less" scoped>
.van-cell-group {
  width: 100vw;
  margin-top: calc(-30vw / 375 * 100);
}
</style>
