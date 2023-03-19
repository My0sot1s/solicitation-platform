import axios from '../config'
import type { Activity } from '../../types/activity'
import type { userForm } from '@/types/form'

async function userLogin(wxCode: string): Promise<string> {
  const res = await axios.post('/user/login', { code: wxCode })
  if (res.data.code === 200) {
    return res.data.data.token
  } else {
    return res.data.msg
  }
}

async function userGoing(): Promise<Activity[]> {
  const { data } = await axios.get('/user/going')
  return data.data
}

async function userFinished(): Promise<Activity[]> {
  const { data } = await axios.get('/user/finished')
  return data.data
}

async function userNew(form: userForm): Promise<string> {
  const { data } = await axios.post('/user/new', form)
  return data.data
}

async function myArticle(): Promise<userForm[]> {
  const { data } = await axios.get('user/myArticle')
  console.log(data)
  return data.data
}

async function userDetail(ID: number): Promise<userForm> {
  const { data } = await axios.post('user/detail', { ID })
  return data.data
}

async function userDelete(ID: number): Promise<string> {
  const { data } = await axios.post('user/delete', { ID })
  return data.data
}

async function userUpdate(form: userForm): Promise<string> {
  const { data } = await axios.post('/user/update', form)
  return data.data
}

async function upLoadPhoto(file: File) {
  const { data } = await axios.put('/user/upLoad', { file })
  return data
}
export {
  userLogin,
  userGoing,
  userFinished,
  userNew,
  myArticle,
  userDetail,
  userDelete,
  userUpdate,
  upLoadPhoto
}
