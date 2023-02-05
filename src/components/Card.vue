<template>
  <div class="card">
    <van-image
      width="100"
      height="100"
      radius="1vw"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
    <div class="detail">
      <van-cell title="标题" is-link :clickable="false" />
      <div class="description">
        一二三四五六七八一二三四五六七八九十一二三四五六七八一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十九十九十一二三四五六七八九十
      </div>
      <div class="time"><van-icon name="clock-o" /> 2022.2.22</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* import { ref } from 'vue' */
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.card {
  width: 327px;
  /* height: calc(256vw / 375 * 100); */
  padding: 3vw 0;
  margin-bottom: 4vw;
  border-radius: 1.5vw;
  box-shadow: 0px 3px 5px #bbb;
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
    .description {
      width: 265px;
      margin-bottom: 2vw;
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
    }
  }
}
</style>
