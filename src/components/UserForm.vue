<template>
  <van-form @submit="onSubmit">
    <FormItem title="您的姓名/昵称：">
      <van-field
        v-model="form.username"
        name="username"
        :rules="[{ required: true, message: '请输入您的姓名/昵称' }]"
      />
    </FormItem>
    <FormItem title="您的电话号码：">
      <van-field
        v-model="form.phone"
        name="phone"
        :rules="[
          {
            required: true,
            pattern: /^1\d{10}$/,
            message: '请输入正确的电话号码'
          }
        ]"
      />
    </FormItem>
    <FormItem title="内容的标题：">
      <van-field
        v-model="form.title"
        name="title"
        :rules="[{ required: true, message: '请输入标题' }]"
      />
    </FormItem>
    <FormItem title="想要分享的内容（文字）：">
      <van-field
        v-model="form.content"
        rows="3"
        autosize
        name="content"
        type="textarea"
        show-word-limit
        maxlength="300"
        :rules="[{ required: true, message: '请输入内容' }]"
      />
    </FormItem>
    <FormItem title="想要分享的内容（图片）：">
      <van-field name="imgs">
        <template #input>
          <van-uploader v-model="form.imgs" />
        </template>
      </van-field>
    </FormItem>
    <div class="button-submit">
      <van-button round block type="default" native-type="submit">
        {{ formData ? '修改' : '提交' }}
      </van-button>
    </div>
    <div v-if="formData" class="button-delete">删除投稿</div>
  </van-form>
  <van-back-top target=".van-form" />
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import FormItem from '@/components/FormItem.vue'
import type { userForm } from '@/types/form'
import { isValidKey } from '@/utils/isValidKey'

const props = defineProps<{
  formData?: userForm
}>()

const form = reactive<userForm>({
  username: '',
  phone: '',
  title: '',
  content: '',
  imgs: []
})

onMounted(() => {
  if (props.formData) {
    for (let k in form) {
      if (isValidKey(k, form)) {
        form[k] = props.formData[k]
      }
    }
  }
})

const onSubmit = (values: any) => {
  console.log('submit', values)
}
</script>

<style lang="less" scoped>
.van-form {
  /* 这里必须设置高度和overflow:auto，backtop才能生效 */
  height: calc(100vh - 46.8px);
  overflow: auto;
}

.button {
  &-submit {
    margin-top: 20px;
  }

  &-delete {
    text-align: center;
    text-decoration: underline;
    color: #999;
    margin-top: 20px;
  }
}
</style>
