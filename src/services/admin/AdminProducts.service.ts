import apiInterceptor from '../../api/api.interceptor'

export const AdminProductService = {
  async createNewImage(product: any): Promise<IImagePath> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/product-images`,
      product
    )

    return response.data
  },

  async updateProduct(product: any): Promise<IProduct> {
    const response = await apiInterceptor.put(
      `${import.meta.env.VITE_API}/product/${product.id}`,
      product
    )

    return response.data
  },

  async updateProductOrder(products: IProduct[]): Promise<IProduct[]> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/product/drag-and-drop`,
      products
    )

    return response.data
  },

  async deleteImage(imageId: number | string) {
    const response = await apiInterceptor.delete(
      `${import.meta.env.VITE_API}/product-images/${imageId}`
    )

    return response.data
  },

  async GetProducts(
    lvl1: number | string,
    lvl2: number | string,
    lvl3: number | string
  ): Promise<IProduct[]> {
    const url = `${import.meta.env.VITE_API}/product/adminProducts/${lvl1}/${lvl2}/${lvl3}`
    const response = await apiInterceptor.get(url)
    return response.data
  },
}
