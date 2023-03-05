import { adminLogin } from '@/request/apis/admin'
import { userLogin } from '@/request/apis/user'

export function wxLoginRedirect() {
  window.location.href = `https://apps.hqu.edu.cn/wechat-hqu/wechatauth.html?proxyTo=authoauth&sendUrl=/connect/oauth2/authorize?appid=wxfe035b066fb1158b&redirect_uri=${encodeURIComponent(
    `${location.origin}`
  )}&encode_flag=Y&response_type=code&scope=snsapi_userinfo#wechat_redirect`
}

async function checkCode() {
  if (document.location.search) {
    const searchParams = new URLSearchParams(document.location.search)
    const wxCode = searchParams.get('code')
    if (wxCode) {
      if (document.location.hash.includes('admin')) {
        localStorage.setItem('adminToken', await adminLogin(wxCode))
        window.location.replace('/admin')
      } else {
        localStorage.setItem('token', await userLogin(wxCode))
        window.location.replace('/')
      }
    }
  }
}

function checkToken() {
  let token: string | null
  if (document.location.hash.includes('admin')) {
    token = localStorage.getItem('adminToken')
  } else {
    token = localStorage.getItem('token')
  }
  if (!token) {
    wxLoginRedirect()
  }
}

export default {
  async install() {
    try {
      await checkCode()
    } catch (error) {
      console.error('登陆错误', error)
    }
    checkToken()
  }
}
