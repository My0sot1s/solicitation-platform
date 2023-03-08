<template>
  <van-form @submit="onSubmit">
    <div class="input-block">
      <div class="title">您的姓名/昵称：</div>
      <van-cell-group inset>
        <van-field clickable v-model="form.Name" />
      </van-cell-group>
    </div>
    <div class="input-block">
      <div class="title">您的电话号码：</div>
      <van-cell-group inset>
        <van-field clickable v-model="form.PhoneNum" type="tel" />
      </van-cell-group>
    </div>
    <div class="input-block">
      <div class="title">内容的标题：</div>
      <van-cell-group inset>
        <van-field clickable v-model="form.Title" />
      </van-cell-group>
    </div>
    <div class="input-block">
      <div class="title">想要分享的内容（文字）：</div>
      <van-cell-group inset>
        <van-field
          clickable
          v-model="form.Content"
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
    <template v-for="index in [1, 2, 3]">
      <div class="input-block" v-show="len >= index">
        <div class="title">链接{{ index }}：</div>
        <van-cell-group inset>
          <van-field
            :right-icon="index == len ? 'close' : ''"
            @click-right-icon="del(index)"
            v-model="form[('Link-' + index) as keyof userForm] as string"
          />
        </van-cell-group>
      </div>
      <div class="input-block" v-show="len >= index">
        <div class="title">描述{{ index }}：</div>
        <van-cell-group inset>
          <van-field
            v-model="form[('Description-' + index) as keyof userForm] as string"
          />
        </van-cell-group>
      </div>
    </template>
    <div style="margin: 16px 16px 10vw 16px">
      <van-button icon="plus" size="large" @click="len++" v-show="len < 3"
        >添加更多...</van-button
      >
    </div>
    <div style="margin: 32px">
      <van-button round block type="default" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <van-back-top target=".van-form" />
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userNew } from '@/request/apis/user'
import { showFailToast } from 'vant'
import type { userForm } from '@/types/form'
import type { UploaderFileListItem } from 'vant'
const route = useRoute()
const router = useRouter()

const len = ref(1)
function del(index: number): void {
  len.value--
  form[('Description-' + index) as keyof userForm] = undefined
  form[('Link-' + index) as keyof userForm] = undefined
}

const imgs = ref<UploaderFileListItem[]>()
watch(imgs, (val) => {
  form.Photos = val!.map((item) => {
    return {
      link: item.url as string
    }
  })
  console.log(form.Photos)
})

const form: userForm = reactive({})
form.ActivityID = parseInt(route.params.ActivityID as string)

function checkName() {
  if (form.Name) {
    return true
  } else {
    showFailToast('请输入名字')
    return false
  }
}
function checkPhoneNumber() {
  if (form.PhoneNum) {
    return true
  } else {
    showFailToast('请输入电话号码')
    return false
  }
}
function checkTitle() {
  if (form.Title) {
    return true
  } else {
    showFailToast('请输入标题')
    return false
  }
}
function checkContent() {
  if (form.Content) {
    return true
  } else {
    showFailToast('请输入分享内容')
    return false
  }
}
function checkFilled() {
  return checkName() && checkPhoneNumber() && checkTitle() && checkContent()
}
const onSubmit = async () => {
  console.log('submit', form)
  if (!checkFilled()) return
  await userNew(form)
  router.back()
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
