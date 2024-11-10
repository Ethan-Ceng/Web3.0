import axios, { AxiosError, request } from 'axios'
import { hideLoading, showLoading } from '@/utils/loading'
import { message } from "antd-mobile"
import storage from '@/utils/storage.ts'
import { configs } from '@typescript-eslint/eslint-plugin'

export interface Result<T = any>{
  code:number
  data: T
  msg: string
}

const instance = axios.create({
  baseUrl: '/api',
  timeout: 8000,
  timeoutErrorMessage: 'Network Timeout.',
  withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.showLoading) showLoading()
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Token::' + token
    }
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截
instance.interceptors.response.use(response => {
  const data: Result = response.data
  hideLoading()
  if (data.code === 50001) {
    message.error(data.msg)
    storage.remove('token')
    location.href = '/login'
  } else if (data.code != 0) {
    if (response.config.showError === false) {
      return Promise.resolve(data)
    } else {
      message.error(data.msg)
      return Promise.reject(data)
    }
  }
  return data.data
}, error => {
  hideLoading()
  message.error(error.message)
  return Promise.reject(error.message)
})

interface IConfig {
  showLoading: boolean
  showError: boolean
}

export default {
  get<T>(url: string, params?: object, options?: IConfig): Promise<T> {
    return axios.get(url, { params, ...options })
  },
  post<T>(url: string, params?: object, options?: IConfig): Promise<T> {
    return axios.post(url, params, options)
  }
}
