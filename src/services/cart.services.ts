import apiInterceptor from '../api/api.interceptor'

const CartServices = {
  async CreateOrder(
    cart: ICart[],
    total: number,
    comment: string,
    user: IUser,
    documentType: IDocumentType,
    deliveryPrice: number,
    deliveryDate: string,
    address: string,
    city: string,
    discountUser?: number,
    agent?: IUser | null,
    isSendToErp?: boolean
  ): Promise<SendOrderResponse> {
    const obj = {
      cart,
      total,
      comment,
      user,
      documentType,
      deliveryPrice,
      agent,
      discountUser,
      isSendToErp,
      deliveryDate,
      address,
      city,
    }
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/history/sendOrder`,
      obj
    )
    return response.data
  },
  async CheckCart(user: IUser, cart: ICart[]): Promise<CartCheckResponse> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/document/cartCheck`,
      { user, cart }
    )
    return response.data
  },
}

export default CartServices
