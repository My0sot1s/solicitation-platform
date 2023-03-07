import { adminLogin } from '@/request/apis/admin'
import { userLogin } from '@/request/apis/user'

export function wxLoginRedirect(hash: string) {
  hash = hash.includes('admin') ? '#/admin' : '#/'
  window.location.href = `https://apps.hqu.edu.cn/wechat-hqu/wechatauth.html?proxyTo=authoauth&sendUrl=/connect/oauth2/authorize?appid=wxfe035b066fb1158b&redirect_uri=${encodeURIComponent(
    `${location.origin}/${hash}`
  )}&encode_flag=Y&response_type=code&scope=snsapi_userinfo#wechat_redirect`
}

async function checkCode() {
  if (document.location.hash.includes('?')) {
    const query = document.location.hash.match(/(?<=code=).+/)
    let wxCode = ''
    if (query) wxCode = query[0].split('&')[0]

    if (wxCode) {
      if (document.location.hash.includes('admin')) {
        localStorage.setItem('adminToken', await adminLogin(wxCode))
      } else {
        localStorage.setItem('token', await userLogin(wxCode))
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
    wxLoginRedirect(location.hash)
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
