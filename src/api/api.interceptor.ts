import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,    // ← send & receive cookies
})

api.interceptors.request.use(
  config => {
    // nothing else to do—cookies go automatically
    return config
  },
  err => Promise.reject(err)
)

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async error => {
    const originalReq = error.config as ExtendedAxiosRequestConfig

    // on 401, try one refresh + retry
    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true
      try {
        // call your refresh endpoint; cookies are sent & set automatically
        await axios.post(
          `${import.meta.env.VITE_API}/auth/refresh`,
          {}, 
          { withCredentials: true }
        )
        // retry the original request, with fresh cookies
        return api(originalReq)
      } catch (refreshErr) {
        return Promise.reject(refreshErr)
      }
    }

    return Promise.reject(error)
  }
)

export default api
