import apiInterceptor from '../api/api.interceptor'

interface GetProductPopUpData {
  status: string
  data: ProductPopUp
  message: string
}

export const CatalogServices = {
  async GetCatalog(
    lvl1: string | number,
    lvl2: string | number,
    lvl3: string | number,
    searchParams: string,
    documentType: CatalogDocumentType,
    mode: IDocumentType,
    user?: IUser
  ): Promise<GetCatalogResponse> {
    let url = `${import.meta.env.VITE_API}/product/${documentType}/${mode}/${lvl1}/${lvl2}/${lvl3}${searchParams}`

    if (user) {
      const sep = searchParams ? '&' : '?'
      url += `${sep}userId=${user.id}`
    }

    const response = await apiInterceptor.get(url)
    return response.data
  },

  async GetCategories(userExId?: string | null): Promise<ICategory[]> {
    let apiUrl = `${import.meta.env.VITE_API}/category/categoriesApp`

    if (userExId) {
      apiUrl += `?userExId=${userExId}`
    }

    const response = await apiInterceptor.get(apiUrl)
    return response.data
  },

  async GetCategoriesFilter(
    userExId: string,
    searchValue: string
  ): Promise<ICategory[]> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/api/categoriesApp?userExtId=${userExId}&search=${searchValue}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )
    return response.data
  },

  async GetDynamicCategories(
    lvl1: string,
    lvl2: string,
    lvl3: string
  ): Promise<ICategory[]> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/api/categoriesAppDynamic/${lvl1}/${lvl2}/${lvl3}`
    )
    return response.data
  },

  async GetPurchaseHistory(
    userId: number,
    productId: number
  ): Promise<PurchaseHistoryItem[]> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/product/purchaseHistory/${userId}/${productId}`
    )
    return response.data
  },

  async GetProductPopUpData(sku: string): Promise<GetProductPopUpData> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/apiv2/productPopUp?sku=${sku}`
    )
    return response.data
  },
}
