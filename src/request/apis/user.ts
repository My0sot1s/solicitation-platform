import axios from '../config'

async function userLogin(wxCode: string): Promise<string> {
  const res = await axios.post('/user/login', { code: wxCode })
  const token = res.data.data.token
  if (res.data.code === 200 && token) {
    return token
  } else {
    return res.data.msg
  }
}

export { userLogin }
