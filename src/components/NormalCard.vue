<template>
  <div>
    <van-cell-group>
      <van-cell
        @click="toMyList()"
        title="日常稿件征集活动！"
        value="2022.2.22"
        label="光盘行动！"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function toMyList() {
  router.push({ path: '/my_list' })
}
</script>

<style lang="less" scoped>
.van-cell-group {
  width: 100vw;
}
</style>
