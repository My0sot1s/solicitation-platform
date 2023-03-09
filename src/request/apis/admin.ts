import axios from '../config'
import type { Activity } from '@/types/activity'
import type { adminForm, userForm } from '@/types/form'

async function adminLogin(wxCode: string) {
  const res = await axios.post('/admin/login', { code: wxCode })
  if (res.data.code === 200) {
    return res.data.data.token
  } else {
    return res.data.msg
  }
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

async function getDetail(ID: number): Promise<userForm[]> {
  const { data } = await axios.post('/admin/articleDetail', { ID })
  return data.data[0].Articles
}

async function newActivity(form: adminForm) {
  const res = await axios.post('/admin/newActivity', { ...form })
  return res
}

async function updateActivity(form: adminForm) {
  const res = await axios.post('/admin/updateActivity', { ...form })
  return res
}

async function collection(ID: number) {
  const res = await axios.post('/admin/favorite', { ID })
  return res
}

async function skip(ID: number) {
  const res = await axios.post('/admin/noFavorite', { ID })
  return res
}

export {
  adminLogin,
  adminGoing,
  adminFinished,
  adminNotStarted,
  getDetail,
  newActivity,
  updateActivity,
  collection,
  skip
}
