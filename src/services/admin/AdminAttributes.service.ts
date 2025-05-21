import apiInterceptor from '../../api/api.interceptor'

export const AdminAttributesService = {
  async getAttributes(): Promise<IAttributeMain[]> {
    const response = await apiInterceptor.get<IAttributeMain[]>(
      `${import.meta.env.VITE_API}/attribute-main`
    )
    return response.data
  },

  async createAttributes(data: any) {
    await apiInterceptor.post(`${import.meta.env.VITE_API}/api/bonuses`, data)
  },

  async dragAndDropAttributes(
    attribute: IAttributeMain[]
  ): Promise<IAttributeMain[]> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/attribute-main/drag-and-drop`,
      attribute
    )

    return response.data
  },

  async updateAttributes(obj: any): Promise<IAttributeMain> {
    const response = await apiInterceptor.patch(
      `${import.meta.env.VITE_API}/attribute-main/${obj.id}`,
      obj
    )

    return response.data
  },

  async getAttributeDetailed(id: string): Promise<IAttributeMain> {
    const response = await apiInterceptor.get<IAttributeMain>(
      `${import.meta.env.VITE_API}/attribute-main/${id}`
    )
    return response.data
  },

  async updateAttributeDetailed(obj: any): Promise<IAttributeMain> {
    const response = await apiInterceptor.patch(
      `${import.meta.env.VITE_API}/attribute-sub/${obj.id}`,
      obj
    )

    return response.data
  },

  async dragAndDropAttributeDetailed(
    attribute: ISubAttributes[]
  ): Promise<ISubAttributes[]> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/attribute-sub/drag-and-drop`,
      attribute
    )

    return response.data
  },
}
