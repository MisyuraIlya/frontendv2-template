import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { AuthService } from '../services/auth.service'
import { onInfoAlert } from '../utils/MySweetAlert'

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,   
})

api.interceptors.request.use(
  config => {
    return config
  },
  err => Promise.reject(err)
)

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async error => {
    const originalReq = error.config as ExtendedAxiosRequestConfig

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true
      try {
        const userdata = localStorage.getItem('user-storage')
        if(userdata){
          const username = JSON.parse(userdata).state.agent.username ?? JSON.parse(userdata).state.user.username
          const password = JSON.parse(userdata).state.agent.password ?? JSON.parse(userdata).state.user.password
          const response = await AuthService.refresh(username,password)
          if (!response?.status) {
            await onInfoAlert('תם תוקף שימוש במערכת', 'אנא התחבר מחדש')
            setTimeout(() => {
                localStorage.clear()
                window.location.replace('/')
                window.location.href = '/'
                window.location.assign('/')
            }
            , 3000)
          }
        }
        return api(originalReq)
      } catch (refreshErr) {
        return Promise.reject(refreshErr)
      }
    }

    return Promise.reject(error)
  }
)

export default api
