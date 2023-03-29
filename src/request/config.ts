import _axios from 'axios'
import { wxLoginRedirect } from '@/utils/wxLogin'
import {
  showLoadingToast,
  showFailToast,
  closeToast,
  Dialog,
  showDialog
} from 'vant'

const withoutToken = ['user/going', 'user/finished']

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
    if (withoutToken.some((item) => config.url!.includes(item))) return config
    if (!document.location.hash.includes('admin')) {
      // 用户端请求
      const token = localStorage.getItem('collect_token')
      if (token) config.headers!.token = token
    } else if (document.location.hash.includes('admin')) {
      // 管理员请求
      const adminToken = localStorage.getItem('collect_adminToken')
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
      if (code !== 200) {
        if (msg === 'Unauthorized') {
          showFailToast('用户未登录！')
        } else {
          showFailToast(msg)
        }
        if (code === 401) {
          if (sessionStorage.getItem('tourist')) {
            showDialog({
              title: '提示',
              message: '当前为游客身份，请通过校内认证登录',
              confirmButtonText: '去登录',
              cancelButtonText: '知道了',
              showCancelButton: true,
              closeOnPopstate: false
            }).then(() => {
              wxLoginRedirect(location.hash)
            })
          } else {
            wxLoginRedirect(location.hash)
          }
        }
      }
    }
    return response
  },
  async (error) => {
    showFailToast('请求错误')
    console.dir(error)
  }
)

export default axios
