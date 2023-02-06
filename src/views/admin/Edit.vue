<template>
  <AdminForm :form-data="form" />
</template>

<script lang="ts" setup>
import AdminForm from '@/components/AdminForm.vue'
import { reactive } from 'vue'
import type { adminForm } from '@/types/form'

const form = reactive<adminForm>({
  dateRange: '2023/2/6——2023/3/26',
  title: '光盘行动稿件征集活动！',
  description:
    '在生活中经常会遇到许多有意思的事，不妨将他记录下来，并整理成文字、图片、视频等将它投入这个栏目中，或许会向大家一起分享哦',
  cover: [{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }]
})
</script>

<style lang="less" scoped></style>
