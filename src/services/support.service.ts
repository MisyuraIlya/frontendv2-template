import apiInterceptor from '../api/api.interceptor'

export const SupportService = {
  async sendSupport(obj: ISupportDto): Promise<ApiResponse> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/apiv2/support/send`,
      obj
    )
    return response.data
  },
}
