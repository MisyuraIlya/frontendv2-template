import { create } from 'zustand'
import { AuthService } from '../services/auth.service'
import {
  getRefreshToken,
  removeFromStorage,
  updateAccessToken,
} from '../helpers/auth.helper'
import { onErrorAlert, onSuccessAlert } from '../utils/MySweetAlert'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'
import { isAxiosError } from 'axios'

interface AuthState {
  loading: boolean
  isAdmin: boolean
  isAgent: boolean
  isSuperAgent: boolean
  user: IUser | null
  setUser: (user: IUser | null) => void
  agent: IUser | null
  setAgent: (user: IUser | null) => void
  coreUser: IUser | null
  setCoreUser: (user: IUser | null) => void

  // ========== STATES FOR AUTH MODAL ==========
  action: ActionType
  setAction: (value: ActionType) => void
  userExtId: string
  phone: string
  username: string
  setUsername: (value: string) => void
  setUserExtId: (value: string) => void
  setPhone: (value: string) => void
  // ========== STATES FOR AUTH MODAL ==========

  //==========  METHODS ==========
  login: (username: string, password: string) => void
  registration: (
    userExId: string,
    username: string,
    password: string,
    phone: string,
    token: string
  ) => void
  validation: (userExId: string, phone: string) => void
  getAccessToken: () => void
  restorePasswordStepOne: (email: string) => void
  restorePasswordStepTwo: (
    username: string,
    token: string,
    password: string
  ) => void
  logOut: () => void
  registerClient: (data: formNewB2bForm) => void
  //==========  METHODS ==========
}

type ActionType =
  | 'login'
  | 'register'
  | 'validation'
  | 'forgotPassordStepOne'
  | 'forgotPassordStepTwo'
  | 'registerNewClient'

export const useAuth = create(
  persist(
    (set, get) => ({
      loading: false,
      isAdmin: false,
      isAgent: false,
      isSuperAgent: false,
      user: null,
      setUser: (user) => set({ user }),

      agent: null,
      setAgent: (agent) => set({ agent }),
      coreUser: null,
      setCoreUser: (coreUser) => set({ coreUser }),

      // ========== STATES FOR AUTH MODAL ==========
      action: 'login' as ActionType,
      setAction: (value) => set({ action: value }),
      userExtId: '',
      setUserExtId: (value) => set({ userExtId: value }),
      phone: '',
      setPhone: (value) => set({ phone: value }),
      username: '',
      setUsername: (value) => set({ username: value }),
      // ========== STATES FOR AUTH MODAL ==========

      //==========  METHODS ==========
      login: async (username, password) => {
        try {
          set({ loading: true })
          const response = await AuthService.login(username, password)
          console.log('response',response)

          if (response?.status) {
            set({ user: response.data, coreUser: response.data })
            if (
              response.data.role === 'ROLE_AGENT' ||
              response.data.role === 'ROLE_SUPER_AGENT'
            ) {
              set({ isAgent: true, agent: response.data })
              if (response.data.role === 'ROLE_SUPER_AGENT') {
                set({ isSuperAgent: true })
              }
            } else if (response.data.role === 'ROLE_ADMIN') {
              set({ isAdmin: true, agent: response.data })
            }
            onSuccessAlert('ברוכים הבאים', '')
            setTimeout(() => {
              location.reload()
            }, 1500)
          } else {
            onErrorAlert('שגיאה', response?.message)
          }
        } catch (e) {
          console.error('[ERROR AUTH SERVICE]', e)
        } finally {
          set({ loading: false })
        }
      },

      registration: async (userExtId, username, password, phone, token) => {
        try {
          set({ loading: true })
          const response = await AuthService.registration(
            userExtId,
            username,
            password,
            phone,
            token
          )
          if (response.status) {
            get().login(username, password)
          } else {
            onErrorAlert('שגיאה', response.message)
          }
        } catch (e) {
          console.error('[ERROR AUTH SERVICE]', e)
        } finally {
          set({ loading: false })
        }
      },

      validation: async (userExtId, phone) => {
        try {
          set({ loading: true })
          const response = await AuthService.validation(userExtId, phone)
          if (response?.status) {
            get().setUserExtId(response.data.exId)
            get().setPhone(phone)
            get().setAction('register')
          } else {
            onErrorAlert('שגיאה', response.message)
            return false
          }
        } catch (e) {
          if (isAxiosError(e)) {
            const msg = e.response?.data?.message ?? 'Unknown server error'
            onErrorAlert('שגיאה', msg)
          } else {
            onErrorAlert('שגיאה', 'Unexpected error')
          }
        } finally {
          set({ loading: false })
        }
      },

      getAccessToken: async () => {
        try {
          set({ loading: true })
          const refreshToken = getRefreshToken()
          if (refreshToken) {
            const response = await AuthService.getAccessToken(refreshToken)
            if (response.status) {
              updateAccessToken(response)
            } else {
              get().logOut()
            }
          }
        } catch (e) {
          console.error('[ERROR AUTH SERVICE]', e)
        } finally {
          set({ loading: false })
        }
      },

      restorePasswordStepOne: async (username) => {
        try {
          set({ loading: true })
          const response = await AuthService.restorePasswordStepOne(username)
          if (response.status) {
            onSuccessAlert(response.message, '')
            get().setUsername(response.data.username)
            get().setAction('forgotPassordStepTwo')
          } else {
            onErrorAlert('שגיאה', response.message)
          }
        } catch (e) {
          if (isAxiosError(e)) {
            const msg = e.response?.data?.message ?? 'Unknown server error'
            onErrorAlert('שגיאה', msg)
          } else {
            onErrorAlert('שגיאה', 'Unexpected error')
          }
        } finally {
          set({ loading: false })
        }
      },

      restorePasswordStepTwo: async (username, token, password) => {
        try {
          set({ loading: true })
          const response = await AuthService.restorePasswordStepTwo(
            username,
            token,
            password
          )
          if (response.status) {
            onSuccessAlert(response.message, '')
            get().setAction('login')
          } else {
            onErrorAlert('שגיאה', response.message)
          }
        } catch (e) {
          if (isAxiosError(e)) {
            const msg = e.response?.data?.message ?? 'Unknown server error'
            onErrorAlert('שגיאה', msg)
          } else {
            onErrorAlert('שגיאה', 'Unexpected error')
          }
        } finally {
          set({ loading: false })
        }
      },

      logOut: () => {
        set({
          isAdmin: false,
          isAgent: false,
          isSuperAgent: false,
          user: null,
          agent: null,
        })
        localStorage.clear()
        removeFromStorage()
        window.location.href = '/'
      },

      registerClient: async (data) => {
        try {
          set({ loading: true })
          await AuthService.createNewCustomer(data)
        } catch (e) {
          console.error('[ERROR AUTH SERVICE]', e)
        } finally {
          set({ loading: false })
        }
      },

      //==========  METHODS ==========
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<AuthState, AuthState>
  )
)
