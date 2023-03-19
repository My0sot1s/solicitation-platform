import axios from '../config'
import type { Activity } from '@/types/activity'
import type { activityForm, addAdminForm } from '@/types/form'

async function adminLogin(wxCode: string): Promise<string> {
  const res = await axios.post('/admin/login', { code: wxCode })
  if (res.data.code === 200) {
    return res.data.data.token
  } else {
    return res.data.msg
  }
}

async function getAdminList() {
  const { data } = await axios.get('/admin/adminList')
  return data.data
}

async function addAdmin(form: addAdminForm) {
  const { data } = await axios.post('/admin/addAdmin', form)
  if (data.code === 200) return true
  else return false
}

async function deleteAdmin(StuNum: number) {
  const { data } = await axios.post('/admin/deleteAdmin', { StuNum })
  if (data.code === 200) return true
  else return false
}

async function adminGoing(): Promise<Activity[]> {
  const { data } = await axios.get('/admin/going')
  return data.data
}

async function adminFinished(): Promise<Activity[]> {
  const { data } = await axios.get('/admin/finished')
  return data.data
}

async function adminNotStarted(): Promise<Activity[]> {
  const { data } = await axios.get('/admin/notStarted')
  return data.data
}

async function getDetail(ID: number): Promise<Activity> {
  const { data } = await axios.post('/admin/articleDetail', { ID })
  return data.data[0]
}

async function uploadFile(file: File) {
  const { data } = await axios.put('/admin/upLoad', { file })
  return data
}

async function newActivity(form: activityForm) {
  const { data } = await axios.post('/admin/newActivity', { ...form })
  if (data.code === 200) return true
  else return false
}

async function updateActivity(ActivityID: number, form: activityForm) {
  const { data } = await axios.post('/admin/updateActivity', {
    ActivityID,
    ...form
  })
  if (data.code === 200) return true
  else return false
}

async function deleteActivity(ID: number) {
  const { data } = await axios.post('/admin/deleteActivity', { ID })
  if (data.code === 200) return true
  else return false
}

async function collection(ID: number) {
  const { data } = await axios.post('/admin/favorite', { ID })
  if (data.code === 200) return true
  else return false
}

async function skip(ID: number) {
  const { data } = await axios.post('/admin/noFavorite', { ID })
  if (data.code === 200) return true
  else return false
}

export {
  adminLogin,
  adminGoing,
  adminFinished,
  adminNotStarted,
  getDetail,
  uploadFile,
  newActivity,
  updateActivity,
  deleteActivity,
  collection,
  skip,
  getAdminList,
  addAdmin,
  deleteAdmin
}
