<template>
  <UserForm />
</template>

<script lang="ts" setup>
import UserForm from '@/components/UserForm.vue'
import { reactive } from 'vue'
import type { userForm } from '@/types/form'

const form = reactive<userForm>({
  username: 'string',
  phone: 'string',
  title: 'string',
  content: 'string',
  imgs: [{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }]
})
</script>

<style lang="less" scoped></style>
