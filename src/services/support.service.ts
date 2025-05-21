import apiInterceptor from '../api/api.interceptor'

export const SupportService = {
  async sendSupport(obj: ISupportDto): Promise<IResponse<{}>> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/support/call`,
      obj
    )
    return response.data
  },
}
