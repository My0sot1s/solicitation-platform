<template>
  <van-form @submit="onSubmit">
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
  </van-form>
  <van-back-top target=".van-form" />
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
  height: calc(100vh - 46.8px);
  overflow: auto;
  .input-block {
    display: flex;
    flex-direction: column;
    .title {
      padding: 13px 16px;
    }
  }
  .input-block > :nth-child(2) {
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07), 0 1px 4px rgba(0, 0, 0, 0.07);
  }
  .van-button {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
.van-cell-group {
  border: 1px solid #e2e8f0;
}
</style>
