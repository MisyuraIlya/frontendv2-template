import apiInterceptor from '../api/api.interceptor'

export const PaymentService = {
  async generateYadUrl(
    orderId: number | string | null,
    userId: number,
    total: number
  ) {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/apiv2/payment/generateIframe`,
      {
        orderId,
        userId,
        total,
      }
    )
    return response.data
  },
}
