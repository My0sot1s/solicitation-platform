<template>
  <van-form @submit="onSubmit" validate-first>
    <FormItem title="起止日期">
      <van-field
        v-model="form.dateRange"
        name="startDate"
        right-icon="calendar-o"
        readonly
        :rules="[{ required: true, message: '请选择起止日期' }]"
        @click="calendar.show = true"
      />
    </FormItem>
    <FormItem title="题目：">
      <van-field
        v-model="form.title"
        name="title"
        :rules="[{ required: true, message: '请输入标题' }]"
      />
    </FormItem>
    <FormItem title="描述：">
      <van-field
        v-model="form.description"
        name="description"
        rows="3"
        autosize
        clearable
        type="textarea"
        show-word-limit
        :rules="[{ required: true, message: '请输入描述信息' }]"
        maxlength="300"
      />
    </FormItem>
    <FormItem title="封面图片：">
      <van-field
        name="cover"
        :rules="[{ required: true, message: '请选择封面图片' }]"
      >
        <template #input>
          <van-uploader v-model="form.cover" :max-count="1" />
        </template>
      </van-field>
    </FormItem>
    <div class="button-submit">
      <van-button round block type="default" native-type="submit">
        {{ formData ? '提交更改' : '提交' }}
      </van-button>
    </div>
    <div v-if="formData" class="button-delete" @click="delActivity">
      删除活动
    </div>
  </van-form>
  <van-back-top target=".van-form" />
  <van-calendar
    type="range"
    v-model:show="calendar.show"
    @confirm="onConfirm"
  />
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import FormItem from '@/components/FormItem.vue'
import type { adminForm } from '@/types/form'
import { isValidKey } from '@/utils/isValidKey'

const props = defineProps<{
  formData?: adminForm
}>()
/* 表单 */
const form = reactive<adminForm>({
  dateRange: '',
  title: '',
  description: '',
  cover: []
})
/* 日历 */
const calendar = reactive<{
  show: boolean
  type: string
}>({
  show: false,
  type: ''
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
/* 日期确认 */
const onConfirm = (date: Array<Date>) => {
  calendar.show = false
  form.dateRange = `${date[0].toLocaleDateString()}——${date[1].toLocaleDateString()}`
}
/* 表单提交 */
const onSubmit = (values: any) => {
  console.log('submit', values)
}
/* 删除活动 */
const delActivity = () => {
  console.log('delete')
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
