<template>
  <van-form @submit="onSubmit" validate-first>
    <FormItem title="起止日期">
      <van-field
        v-model="dateRange"
        name="startDate"
        right-icon="calendar-o"
        readonly
        :rules="[{ required: true, message: '请选择起止日期' }]"
        @click="calendar.show = true"
      />
    </FormItem>
    <FormItem title="题目：">
      <van-field
        v-model="form.ActivityName"
        name="title"
        :rules="[{ required: true, message: '请输入标题' }]"
      />
    </FormItem>
    <FormItem title="描述：">
      <van-field
        v-model="form.Description"
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
          <!-- <van-uploader v-model="form.cover" :max-count="1" /> -->
          <van-uploader :max-count="1" :after-read="uploadImg" />
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
    :max-date="new Date(new Date().getTime() + 365 * 24 * 3600 * 1000)"
    :show-confirm="false"
    @confirm="onConfirm"
  >
    <template #footer>
      <div class="footer">
        <van-button round block type="primary" @click="longTerm"
          >长期任务</van-button
        >
      </div>
    </template>
  </van-calendar>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import FormItem from '@/components/FormItem.vue'
import type { adminForm } from '@/types/form'
import { isValidKey } from '@/utils/isValidKey'
import type { UploaderFileListItem } from 'vant'

const props = defineProps<{
  formData?: adminForm
}>()
/* 表单 */
const form = reactive<adminForm>({
  ActivityName: '',
  Description: '',
  Photos: [{ Link: '' }],
  EndTime: 0,
  StartTime: 0,
  SenderName: ''
})
const dateRange = ref('')
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
    dateRange.value = `${new Date(
      form.StartTime
    ).toLocaleDateString()}——${new Date(form.EndTime).toLocaleDateString()}`
  }
})
/* 日期确认 */
const onConfirm = (date: Array<Date>) => {
  calendar.show = false
  dateRange.value = `${date[0].toLocaleDateString()}——${date[1].toLocaleDateString()}`
  form.StartTime = date[0].getTime()
  form.EndTime = date[1].getTime()
}
/* 点击长期任务 */
const longTerm = () => {
  dateRange.value = '长期任务'
  calendar.show = false
}
/* 选择图片 */
const uploadImg = (items: UploaderFileListItem | UploaderFileListItem[]) => {
  console.log(items)
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

.footer {
  display: flex;
  justify-content: space-around;
}
</style>
