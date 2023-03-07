import axios from '../config'
import type { activityList } from './types'

async function userLogin(wxCode: string): Promise<string> {
  const res = await axios.post('/user/login', { code: wxCode })
  if (res.data.code === 200) {
    return res.data.data.token
  } else {
    return res.data.msg
  }
}

async function userGoing(): Promise<activityList[]> {
  const { data } = await axios.get('/user/going')
  return data.data
}

async function userFinished(): Promise<activityList[]> {
  const { data } = await axios.get('/user/finished')
  return data.data
}
export { userLogin, userGoing, userFinished }
