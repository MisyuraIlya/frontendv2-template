import { create } from 'zustand'
import { settings } from '../settings'

interface OneSignalStoreState {
  loading: boolean
  oneSignalNotificationsLength: number
  apiClientName: string
  isOpenModalNotification: boolean
  isUserRegistered: boolean
  setIsOpenModalNotification: (value: boolean) => void
}

export const useOneSignalStore = create<OneSignalStoreState>((set) => ({
  loading: false,
  oneSignalNotifications: [],
  oneSignalNotificationsLength: 0,
  apiClientName: settings.title,
  isOpenModalNotification: false,
  isUserRegistered: false,
  setIsOpenModalNotification: (bool: boolean) =>
    set({ isOpenModalNotification: bool }),
}))
