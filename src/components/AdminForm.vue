<template>
  <div>
    <van-form @submit="onSubmit" validate-first scroll-to-error>
      <FormItem title="征稿方：">
        <van-field
          v-model="form.SenderName"
          name="target"
          placeholder="请输入征稿方"
          :rules="[{ required: true, message: '请输入征稿方' }]"
        />
      </FormItem>
      <FormItem title="起止日期">
        <van-field
          v-model="dateRange"
          name="dateRange"
          right-icon="calendar-o"
          readonly
          placeholder="请选择起止日期"
          :rules="[{ required: true, message: '请选择起止日期' }]"
          @click="calendar.show = true"
        />
      </FormItem>
      <FormItem title="题目：">
        <van-field
          v-model="form.ActivityName"
          name="title"
          placeholder="请输入征稿主题"
          :rules="[{ required: true, message: '请输入征稿主题' }]"
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
          placeholder="请输入详细描述"
          :rules="[{ required: true, message: '请输入详细描述' }]"
          maxlength="300"
        />
      </FormItem>
      <FormItem title="封面图片：">
        <van-field
          name="cover"
          :rules="[{ required: true, message: '请选择封面图片' }]"
        >
          <template #input>
            <van-uploader
              v-model="imgFile"
              :max-count="1"
              :after-read="uploadImg"
            />
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
    <!-- 日历 -->
    <van-calendar
      type="range"
      ref="calendarElm"
      v-model:show="calendar.show"
      :max-date="new Date(new Date().getTime() + 365 * 24 * 3600 * 1000)"
      :show-confirm="false"
      @confirm="confirmDate"
    >
      <template #footer>
        <div class="calendar--footer">
          <van-button round block type="primary" @click="longTerm">
            长期任务
          </van-button>
        </div>
      </template>
    </van-calendar>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, computed } from 'vue'
import FormItem from '@/components/FormItem.vue'
import type { Activity } from '@/types/activity'
import type { activityForm } from '@/types/form'
import type { CalendarInstance, UploaderFileListItem } from 'vant'
import {
  uploadFile,
  newActivity,
  updateActivity,
  deleteActivity
} from '@/request/apis/admin'
import { showConfirmDialog } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
  formData?: Activity
}>()
/* 表单 */
const form = reactive<activityForm>({
  SenderName: '',
  ActivityName: '',
  Description: '',
  StartTime: 0,
  EndTime: 0,
  Photos: [
    {
      Link: ''
    }
  ]
})
const dateRange = computed(() => {
  if (!form?.EndTime) return ''
  else if (new Date(form.EndTime) >= new Date('3000/1/1')) return '长期任务'
  else
    return `${new Date(form.StartTime).toLocaleDateString()}——${new Date(
      form.EndTime
    ).toLocaleDateString()}`
})
/* 日历 */
const calendarElm = ref<CalendarInstance>()
const calendar = reactive<{
  show: boolean
  type: string
}>({
  show: false,
  type: ''
})
/* 日期确认 */
const confirmDate = (date: Array<Date>) => {
  form.StartTime = date[0].getTime()
  form.EndTime = date[1].getTime()
  calendar.show = false
}
/* 点击长期任务 */
const longTerm = () => {
  calendarElm.value!.reset()
  form.StartTime = Date.now()
  form.EndTime = new Date('5000/1/1').getTime()
  calendar.show = false
}
/* 如果有传入formData则复制到form中 */
watch(
  () => props.formData,
  () => {
    if (props.formData) {
      form.ActivityName = props.formData.ActivityName
      form.Description = props.formData.Description
      form.StartTime = new Date(props.formData.StartTime).getTime()
      form.EndTime = new Date(props.formData.EndTime).getTime()
      form.SenderName = props.formData.SenderName
      const Link = props.formData.ActivityPhotos[0].Link
      form.Photos = [{ Link }]
      imgFile.value = [{ url: Link }]
    }
  }
)
/* 选择图片 */
const imgFile = ref<UploaderFileListItem[]>()
const uploadImg = async (
  items: UploaderFileListItem | UploaderFileListItem[]
) => {
  if (!Array.isArray(items) && items.file) {
    imgFile.value![0].status = 'uploading'
    const res = await uploadFile(items.file)
    if (res.code === 200) {
      form.Photos[0].Link = res.data.url
      imgFile.value![0].status = 'done'
    } else {
      imgFile.value![0].status = 'failed'
    }
  }
}
/* 表单提交 */
const onSubmit = () => {
  showConfirmDialog({
    title: '确认提交',
    message: '提交后可在设置界面进行更改'
  }).then(async () => {
    let res: boolean
    if (props.formData?.ID) {
      res = await updateActivity(props.formData.ID, form)
    } else {
      res = await newActivity(form)
    }
    if (res) {
      setTimeout(() => {
        router.back()
      }, 300)
    }
  })
}
/* 删除活动 */
const delActivity = () => {
  showConfirmDialog({
    title: '确认删除',
    message: '删除后不可找回！'
  }).then(async () => {
    let res = await deleteActivity(props.formData!.ID)
    if (res) {
      setTimeout(() => {
        router.back()
      }, 300)
    }
  })
}
</script>

<style lang="less" scoped>
.van-form {
  /* 这里必须设置高度和overflow:auto，backtop才能生效 */
  height: calc(100vh - 46.8px);
  overflow: auto;
  padding-bottom: 100px;
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

.calendar--footer {
  display: flex;
  justify-content: space-around;
}
</style>
