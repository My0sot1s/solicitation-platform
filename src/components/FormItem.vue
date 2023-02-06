<template>
  <div class="form-item">
    <div class="title">{{ title }}</div>
    <van-cell-group inset>
      <slot></slot>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style lang="less" scoped>
.form-item {
  display: flex;
  flex-direction: column;
  .title {
    padding: 13px 16px;
  }
}
.van-cell-group {
  border: 1px solid #e2e8f0;
}
</style>
