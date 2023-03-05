import axios from '../config'

async function adminLogin(wxCode: string) {
  const res = await axios.post('/admin/login', { code: wxCode })
  if (res.data.code === 200) {
    return res.data.data.token
  } else {
    return res.data.msg
  }
}

export { adminLogin }
