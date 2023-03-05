import _axios from 'axios'
import { wxLoginRedirect } from '@/utils/wxLogin'

const axios = _axios.create({
  baseURL: 'http://localhost:5173/api',
  timeout: 30000
})

// 请求拦截
axios.interceptors.request.use(
  function (config) {
    if (!document.location.hash.includes('admin')) {
      // 用户端请求
      const token = localStorage.getItem('token')
      if (token) config.headers.token = token
    } else if (document.location.hash.includes('admin')) {
      // 管理员请求
      const adminToken = localStorage.getItem('adminToken')
      if (adminToken) config.headers.token = adminToken
    }
    return config
  },
  async (error) => {
    console.dir(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  function (response) {
    if (response.data.code) {
      const code = response.data.code.toString()
      if (['401', '440', '441'].includes(code)) {
        wxLoginRedirect()
      }
    }
    return response
  },
  async (error) => {
    console.dir(error)
  }
)

export default axios
