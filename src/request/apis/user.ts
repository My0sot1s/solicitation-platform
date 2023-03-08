import axios from '../config'
import type { ActivityList } from '../../types/activityList'
import type { userForm } from '@/types/form'

async function userLogin(wxCode: string): Promise<string> {
  const res = await axios.post('/user/login', { code: wxCode })
  if (res.data.code === 200) {
    return res.data.data.token
  } else {
    return res.data.msg
  }
}

async function userGoing(): Promise<ActivityList[]> {
  const { data } = await axios.get('/user/going')
  return data.data
}

async function userFinished(): Promise<ActivityList[]> {
  const { data } = await axios.get('/user/finished')
  return data.data
}

async function userNew(form: userForm): Promise<string> {
  const { data } = await axios.post('/user/new', form)
  return data.data
}

async function myArticle(): Promise<any> {
  const { data } = await axios.get('user/myArticle')
  return data.data
}
export { userLogin, userGoing, userFinished, userNew, myArticle }
