import React, { FC, createContext, ReactNode } from 'react'

const NotificationsContext = createContext<object | null>(null)

export const useNotifications = () => {
  const context = React.useContext(NotificationsContext)
  if (!context) {
    throw new Error('Can not run without "NotificationsProvider"')
  }
  return context
}

interface NotificationsProviderProps {
  children?: ReactNode
}

export const NotificationsProvider: FC<NotificationsProviderProps> = ({
  children,
}) => {
  const value: object = {}

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}
