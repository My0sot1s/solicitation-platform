import axios from '../config'

async function userLogin(wxCode: string): Promise<string> {
  const res = await axios.post('/user/login', { code: wxCode })
  if (res.data.code === 200) {
    return res.data.data.token
  } else {
    return res.data.msg
  }
}

export { userLogin }
