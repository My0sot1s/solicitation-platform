import axios from '../config'
import type { Activity } from '@/types/activity'
import type { adminForm } from '@/types/form'

async function adminLogin(wxCode: string): Promise<string> {
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

async function getDetail(ID: number): Promise<Activity> {
  const { data } = await axios.post('/admin/articleDetail', { ID })
  return data.data[0]
}

async function uploadFile(file: File) {
  const { data } = await axios.put('/admin/upLoad', { file })
  return data
}

async function newActivity(form: adminForm): Promise<boolean> {
  const { data } = await axios.post('/admin/newActivity', { ...form })
  if (data.code === 200) return true
  else return false
}

async function updateActivity(ID: number, form: adminForm): Promise<boolean> {
  const { data } = await axios.post('/admin/updateActivity', { ID, ...form })
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
  collection,
  skip
}
