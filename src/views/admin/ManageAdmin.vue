<template>
  <div id="manageAdmin">
    <van-list
      v-model="loadList.loading"
      :finished="loadList.finished"
      @load="onLoad"
    >
      <van-swipe-cell
        v-for="(item, index) in list"
        :key="item.StuNum"
        :name="item.StuNum"
      >
        <van-cell
          :border="false"
          :title="item.Note ? item.Note : item.StuNum"
          :value="item.IsSuperAdmin === 1 ? '超级管理员' : '管理员'"
        />
        <template #right>
          <van-button
            @click="delAdmin(index, item)"
            square
            type="danger"
            text="删除"
          />
        </template>
      </van-swipe-cell>
    </van-list>
    <van-button
      id="add"
      type="primary"
      round
      icon="plus"
      @click="showPopup = true"
    />
    <van-popup round id="popup" v-model:show="showPopup">
      <div class="title">添加管理员</div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="form.StuNum"
          name="学号"
          label="学号："
          :rules="[
            { required: true, message: '请输入学号' },
            { pattern: /^\d{10,11}$/, message: '请输入正确的学号' }
          ]"
        />
        <van-field
          v-model="form.Note"
          name="备注名"
          label="备注名："
          :rules="[{ required: true, message: '请填写备注名' }]"
        />
        <van-cell title="超级管理员">
          <van-switch v-model="checked" />
        </van-cell>
        <div style="margin: 16px">
          <van-button type="primary" round block native-type="submit">
            提交
          </van-button>
        </div>
      </van-form></van-popup
    >
  </div>
</template>

<script lang="ts" setup>
import type { addAdminForm } from '@/types/form'
import { getAdminList, addAdmin, deleteAdmin } from '@/request/apis/admin'
import { reactive, ref, watch } from 'vue'

// 加载列表
const loadList = reactive({
  loading: false,
  finished: false
})
const list = ref<addAdminForm[]>()
async function onLoad() {
  list.value = await getAdminList()
  loadList.loading = false
  loadList.finished = true
}
// 弹窗
const showPopup = ref(false)
// 开关
const checked = ref(false)
// 表单信息
const form = reactive<addAdminForm>({
  IsSuperAdmin: 0,
  Note: '',
  StuNum: ''
})
watch(checked, () => {
  form.IsSuperAdmin = checked.value ? 1 : 0
})
// 清空表单
const resetForm = () => {
  form.Note = ''
  form.StuNum = ''
  checked.value = false
}
// 添加管理员
async function onSubmit() {
  if (await addAdmin(form)) {
    await onLoad()
    showPopup.value = false
    resetForm()
  }
}
// 删除管理员
async function delAdmin(index: number, item: addAdminForm) {
  if (await deleteAdmin(parseInt(item.StuNum))) {
    list.value!.splice(index, 1)
  }
}
</script>

<style lang="less" scoped>
#manageAdmin {
  padding-bottom: 100px;
  .van-list {
    .van-swipe-cell {
      margin-top: 3vw;
      box-shadow: 3px 3px 10px 2px rgb(223, 222, 222);
    }
  }
  #add {
    position: fixed;
    bottom: 15vh;
    right: 5vw;
    border-radius: 50%;
    box-sizing: border-box;
    width: 12vw;
    height: 12vw;
  }
  #popup {
    .title {
      padding: 5vw 0;
      text-align: center;
    }
    width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
