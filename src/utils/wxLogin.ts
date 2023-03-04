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
      localStorage.setItem('token', await userLogin(wxCode))
      window.location.replace('/')
    }
  }
}

function checkToken() {
  if (!localStorage.getItem('token')) {
    wxLoginRedirect()
  }
}

export default {
  async install() {
    if (!document.location.hash.includes('admin')) {
      try {
        await checkCode()
      } catch (error) {
        console.log(error)
      }
      checkToken()
    }
  }
}
