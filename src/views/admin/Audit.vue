<template>
  <div class="audit">
    <div class="title">{{ article.Title }}</div>
    <div class="userInfo">
      <div class="userInfo-item userInfo__name">
        <van-icon name="contact" size="28" />
        <span>{{ article.Name }}</span>
      </div>
      <div class="userInfo-item userInfo__phone">
        <van-icon name="phone-o" size="28" />
        <span>{{ article.PhoneNum }}</span>
      </div>
    </div>
    <div class="content">
      <span>投稿内容</span>
      <div class="content__text">{{ article.Content }}</div>
      <div class="content__imgs">
        <van-image
          v-for="(img, index) in 5"
          :key="index"
          class="content__imgs--img"
          fit="fill"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <!-- <div
          v-for="(img, index) in article.Photos"
          :key="index"
          class="content__imgs--img"
        >
          <van-image width="19vw" height="19vw" fit="cover" :src="img.link" />
        </div> -->
      </div>
    </div>
    <div class="button">
      <div class="button__skip">略过</div>
      <div class="button__star">
        <van-icon name="star-o" />
        <span>收藏</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useActivity } from '@/stores/activity'

const route = useRoute()
const activityStore = useActivity()

const article = activityStore.Articles.filter(
  (item) => item.ID === parseInt(route.params.ID as string)
)[0]
</script>

<style lang="less" scoped>
.audit {
  background-color: #fff;
  height: calc(100vh - 46.8px);
  overflow: scroll;

  .title {
    font-size: 21px;
    margin: 4vh 4vw 1vh 4vw;
  }

  .userInfo {
    display: flex;
    font-size: 17px;
    padding: 2vh 6vw;
    border-bottom: 1px solid #ccc;

    & > div {
      margin-right: 10vw;
    }
  }

  .userInfo-item {
    display: flex;
    align-items: center;

    span {
      margin-left: 2vw;
    }
  }

  .content {
    padding: 4vh 6vw;

    span {
      font-size: 20px;
    }

    &__text {
      width: 100%;
      margin-top: 2vh;
      padding: 2vh 4vw;
      font-size: 16px;
      border-radius: 5px;
      box-shadow: 1px 2px 5px 2px #ddd;
      color: #666;
      background-color: #f8fafc;
    }

    &__imgs {
      margin-top: 2vh;
      display: grid;
      grid-template-columns: repeat(3, auto);
      grid-gap: 2vw;

      &--img {
        height: 28vw;
        width: 28vw;
        border-radius: 3px;
        overflow: hidden;
      }
    }
  }

  .button {
    width: 70vw;
    height: 6.5vh;
    margin: 2vh auto;
    border-radius: 10px;
    background-color: #f8fafc;
    box-shadow: 0 0 10px #ccc;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .button__skip {
      padding: 0 9vw;
    }

    .button__star {
      background-color: #fff;
      box-shadow: 0 0 10px #ccc;
      padding: 1vh 9vw;
      border-radius: 10px;

      span {
        margin-left: 2vw;
      }
    }
  }
}
</style>
