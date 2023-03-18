<template>
  <div>
    <div @click="router.push('/admin/activitys')" class="item">
      征稿活动编辑
    </div>
    <div @click="router.push('/admin/manageAdmin')" class="item">
      管理员设置
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="less" scoped>
.item {
  display: flex;
  align-items: center;
  margin: 3vh auto;
  width: 86vw;
  padding-left: 4vw;
  height: 8vh;
  border-radius: 10px;
  box-shadow: 1px 1px 10px #ccc;
  font-size: 2.2vh;
  color: #555;
}
</style>
