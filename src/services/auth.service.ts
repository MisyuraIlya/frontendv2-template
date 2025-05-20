import axios from 'axios'
import apiInterceptor from '../api/api.interceptor'
interface UserDocsResponse {
  status: 'success' | 'error'
  data: UserDocs[]
  message: string
}

interface UserCreateDocResponse {
  status: 'success' | 'error'
  data: any
  message: string
}

export const AuthService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/auth/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    )
    return response.data
  },
  async validation(
    userExId: string,
    phone: string
  ): Promise<ValidationResponse> {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/auth/validation`,
      {
        exId: userExId,
        phone,
      }
    )
    return response.data
  },
  async registration(
    extId: string,
    username: string,
    password: string,
    phone: string,
    token: string
  ): Promise<RegistrationResponse> {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/auth/registration`,
      {
        extId,
        username,
        password,
        phone,
        token,
      }
    )
    return response.data
  },
  async restorePasswordStepOne(
    username: string
  ): Promise<IResponse<{ username: string }>> {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/auth/restore-password/step-one`,
      {
        username,
      }
    )
    return response.data
  },
  async restorePasswordStepTwo(
    username: string,
    token: string,
    password: string
  ): Promise<IResponse<null>> {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/auth/restore-password/step-two`,
      {
        username,
        token,
        password,
      }
    )
    return response.data
  },
  async createNewCustomer(data: formNewB2bForm): Promise<IResponse<IUser>> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/auth/createUser`,
      data
    )
    return response.data
  },

  //FIX

  async getUserDocs(userExtId: string): Promise<UserDocsResponse> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/userDocs?userExtId=${userExtId}`
    )
    return response.data
  },

  async createUserDocs(
    userExtId: string,
    title: string,
    base64Pdf: string
  ): Promise<UserCreateDocResponse> {
    const response = await apiInterceptor.post(
      `${import.meta.env.VITE_API}/userDocs`,
      {
        userExtId,
        title,
        base64Pdf,
      }
    )
    return response.data
  },

  async getUseProfileData(userId: string | number): Promise<IDynamicTables> {
    const response = await apiInterceptor.get(
      `${import.meta.env.VITE_API}/user/userProfile/${userId}`
    )
    if (response?.data?.status === 'error') {
      throw new Error('cannot fetch money')
    }
    return response.data
  },

  async getAccessToken(refreshToken: string): Promise<IAuthResponse> {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/auth/refresh`,
      {
        refresh_token: refreshToken,
      }
    )
    return response.data
  },
}
