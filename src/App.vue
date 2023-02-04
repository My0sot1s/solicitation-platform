<template>
  <div id="app">
    <van-nav-bar
      :left-text="(route.meta.title as string)"
      :left-arrow="route.meta.title !== '稿件征集'"
      @click-left="onClickLeft"
    />
    <transition name="van-fade">
      <RouterView />
    </transition>
    <van-tabbar
      route
      v-if="route.path.includes('admin') && route.meta.title === '稿件征集'"
    >
      <van-tabbar-item icon="home-o" to="/admin/home" />
      <van-tabbar-item>
        <template #icon>
          <img
            src="./assets/new.png"
            class="new-icon"
            @click="router.push('/admin/new')"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/admin/setting" />
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const onClickLeft = () => {
  if (route.meta.title !== '稿件征集') {
    history.back()
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root:root {
  --van-tabbar-height: 60px;
  --van-tabbar-item-icon-size: 30px;
}

#app {
  // background-color: #eff2f5;
  background: linear-gradient(to bottom, #fff, #eff2f5);
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
  color: #475569 !important;
}

.van-tabbar-item {
  z-index: 9;

  &__icon {
    .new-icon {
      height: 60px;
      margin-bottom: 20px;
      z-index: 9;
    }
  }
}
</style>
