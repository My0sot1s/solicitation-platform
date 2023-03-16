<template>
  <AdminForm :form-data="formData" />
</template>

<script lang="ts" setup>
import AdminForm from '@/components/AdminForm.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getDetail } from '@/request/apis/admin'
import type { Activity } from '@/types/activity'

const route = useRoute()

const formData = ref<Activity>()

onMounted(async () => {
  const ID = parseInt(route.params.ID as string)
  const detail = await getDetail(ID)
  formData.value = detail
})
</script>

<style lang="less" scoped></style>
