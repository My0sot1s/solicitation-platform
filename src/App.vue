<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
const onClickLeft = () => {
  if (route.name !== '稿件征集') {
    history.back()
  }
}
const route = useRoute()
console.log(route.name)
</script>

<template>
  <div id="app">
    <van-nav-bar
      :left-text="(route.name as string)"
      :left-arrow="route.name !== '稿件征集'"
      @click-left="onClickLeft"
    />
    <RouterView />
  </div>
</template>

<style lang="less">
#app {
  background-color: #eff2f5;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
}

/* 适配软键盘弹出 */
.van-nav-bar {
  z-index: 999 !important;
  height: 45px;
  .van-nav-bar__content {
    height: 45px !important;
  }
  .van-nav-bar__left {
    height: 45px !important;
    .van-nav-bar__arrow {
      font-size: 5vw !important;
    }
    .van-nav-bar__text {
      font-size: 5vw !important;
    }
  }
}

.van-nav-bar__left > * {
  white-space: nowrap;
  font-size: 5vw;
  color: black !important;
}
</style>
