import axios from '../config'
import type { ActivityList } from '@/types/activityList'
import type { userForm } from '@/types/form'

async function adminLogin(wxCode: string) {
  const res = await axios.post('/admin/login', { code: wxCode })
  if (res.data.code === 200) {
    return res.data.data.token
  } else {
    return res.data.msg
  }
}

async function adminGoing(): Promise<ActivityList[]> {
  const { data } = await axios.get('/admin/going')
  return data.data
}

async function adminFinished(): Promise<ActivityList[]> {
  const { data } = await axios.get('/admin/finished')
  return data.data
}

async function adminNotStarted(): Promise<ActivityList[]> {
  const { data } = await axios.get('/admin/notStarted')
  return data.data
}

async function getDetail(ID: number): Promise<userForm[]> {
  const { data } = await axios.post('/admin/articleDetail', { ID })
  return data.data[0].Articles
}

export { adminLogin, adminGoing, adminFinished, adminNotStarted, getDetail }
