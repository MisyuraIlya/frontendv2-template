import apiInterceptor from '../../api/api.interceptor'

interface MediaObjectResponse {
  id: number
  url: string
  createdAt: string
  source: string
}

export const MediaObjectService = {
  async uploadImage(file: File, source: string): Promise<MediaObjectResponse> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('source', source)
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/media-object`,
      formData
    )
    return response.data
  },
}
