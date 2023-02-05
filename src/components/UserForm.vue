<template>
  <van-form @submit="onSubmit" class="form">
    <div class="input-block">
      <div class="title">您的姓名/昵称：</div>
      <van-cell-group inset>
        <van-field v-model="username" name="用户名" />
      </van-cell-group>
    </div>
    <div class="input-block">
      <div class="title">您的电话号码：</div>
      <van-cell-group inset>
        <van-field v-model="username" name="用户名" />
      </van-cell-group>
    </div>
    <div class="input-block">
      <div class="title">内容的标题：</div>
      <van-cell-group inset>
        <van-field v-model="username" name="用户名" />
      </van-cell-group>
    </div>
    <div class="input-block">
      <div class="title">想要分享的内容（文字）：</div>
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="3"
          autosize
          type="textarea"
          show-word-limit
          maxlength="300"
        />
      </van-cell-group>
    </div>
    <div class="input-block">
      <div class="title">想要分享的内容（图片）：</div>
      <van-cell-group inset>
        <van-field name="uploader">
          <template #input>
            <van-uploader v-model="imgs" />
          </template>
        </van-field>
      </van-cell-group>
    </div>
    <div style="margin: 16px">
      <van-button round block type="default" native-type="submit">
        提交
      </van-button>
    </div>
    <van-back-top target=".form" />
  </van-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const username = ref('')
const message = ref('')
const imgs = ref([
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }
])
const onSubmit = (values: any) => {
  console.log('submit', values)
}
</script>

<style lang="less" scoped>
.van-form {
  /* 这里必须设置高度和overflow:auto，backtop才能生效 */
  height: 80vh;
  overflow: auto;
  .input-block {
    display: flex;
    flex-direction: column;
    .title {
      padding: 13px 16px;
    }
  }
  .van-back-top {
    color: white !important;
  }
}
.van-cell-group {
  border: 1px solid #e2e8f0;
}
</style>
