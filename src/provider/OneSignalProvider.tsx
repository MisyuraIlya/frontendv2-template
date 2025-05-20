import React, {
  FC,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react'
import { OneSignalService } from '../services/oneSignal.service'
import { useAuth } from '../store/auth.store'

const OneSignalContext = createContext<object | null>(null)

export const useOneSignal = (): object => {
  const context = useContext(OneSignalContext)
  if (!context) {
    throw new Error('Can not run without "OneSignalProvider"')
  }
  return context
}

interface OneSignalProviderProps {
  children: ReactNode
}

export const OneSignalProvider: FC<OneSignalProviderProps> = ({ children }) => {
  const { user } = useAuth()

  const handleBrowser = useCallback(() => {
    const timeout = setTimeout(() => {
      try {
        const appIdKey = settings.oneSignalKey
        const requestNotificationPermission = async () => {
          try {
            if (window.OneSignal) {
              await window.OneSignal.registerForPushNotifications()
              const playerId = await window.OneSignal.getUserId()
              if (playerId) {
                localStorage.setItem('appId', playerId)
                console.log('playerId', playerId)
                if (user) {
                  OneSignalService.registerAppId(user, playerId)
                }
              }
            }
          } catch (_error) {
            console.error('Error requesting notification permission:', _error)
          }
        }
        window.OneSignal!.init({ appId: appIdKey })
        requestNotificationPermission()
      } catch (_e) {
        console.error('[OneSignal error]', _e)
      }
    }, 10000)

    return () => {
      clearTimeout(timeout)
      if (window.OneSignal) {
        window.OneSignal.clearEventHandlers()
      }
    }
  }, [user])

  useEffect(() => {
    const cleanup = handleBrowser()
    return () => cleanup && cleanup()
  }, [handleBrowser])

  return (
    <OneSignalContext.Provider value={{}}>{children}</OneSignalContext.Provider>
  )
}
