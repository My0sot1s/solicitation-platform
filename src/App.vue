<template>
  <div id="app">
    <van-nav-bar
      placeholder
      :left-text="(route.meta.title as string)"
      :left-arrow="route.meta.title !== '稿件征集'"
      @click-left="onClickLeft"
    />
    <router-view v-slot="{ Component }">
      <transition name="van-fade">
        <!-- Component inside <Transition> renders non-element root node that cannot be animated.  -->
        <div><component :is="Component" /></div>
      </transition>
    </router-view>
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
*::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}

* {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 微软雅黑;
  color: #475569;
}
/* 回到顶部按钮的图案颜色 */
.van-back-top__icon {
  color: white;
}

:root:root {
  --van-tabbar-height: 60px;
  --van-tabbar-item-icon-size: 30px;
  --van-field-icon-size: 30px;
  --van-field-clear-icon-size: 25px;
}

#app {
  // background-color: #eff2f5;
  background: linear-gradient(to bottom, #fff, #eff2f5);
  width: 100vw;
  height: 100vh;
  overflow: scroll;
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

.van-tabbar {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  &-item {
    border-radius: inherit;
    z-index: 9;

    &__icon {
      .new-icon {
        height: 60px;
        margin-bottom: 20px;
        z-index: 9;
      }
    }
  }
}

.van-tabbar-item--active .van-icon {
  color: #1989fa;
}
</style>
