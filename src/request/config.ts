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
      const code = response.data.code.toString()
      const { msg } = response.data
      if (code !== '200') showFailToast(msg)
      if (['401', '440', '441'].includes(code)) {
        wxLoginRedirect(location.hash)
      } else {
        showSuccessToast('')
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
