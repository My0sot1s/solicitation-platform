import _axios from 'axios'
import { wxLoginRedirect } from '@/utils/wxLogin'
import {
  showLoadingToast,
  showSuccessToast,
  showFailToast,
  closeToast
} from 'vant'

const axios = _axios.create({
  baseURL: '/api',
  timeout: 30000
})
// put请求用于上传文件
axios.defaults.headers.put['Content-Type'] = 'multipart/form-data'

// 请求拦截
axios.interceptors.request.use(
  function (config) {
    showLoadingToast({
      message: '加载中...',
      forbidClick: true
    })
    if (!document.location.hash.includes('admin')) {
      // 用户端请求
      const token = localStorage.getItem('token')
      if (token) config.headers!.token = token
    } else if (document.location.hash.includes('admin')) {
      // 管理员请求
      const adminToken = localStorage.getItem('adminToken')
      if (adminToken) config.headers!.token = adminToken
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
    closeToast()
    if (response.data.code) {
      const { code, msg } = response.data
      if (code === 200) {
        showSuccessToast(msg)
      } else {
        showFailToast(msg)
        if (code === 401) {
          wxLoginRedirect(location.hash)
        }
      }
    }
    return response
  },
  async (error) => {
    showFailToast(error)
    console.dir(error)
  }
)

export default axios
