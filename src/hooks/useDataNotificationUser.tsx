import useSWR from 'swr'
import { useAuth } from '../store/auth.store'
import services from '../services'

const fetchData = async (userId: number | string) => {
  return services.Notifications.getNotificationByUserId(userId)
}

const useDataNotificationUser = () => {
  const { user } = useAuth()
  const userId = user?.id

  const key = userId ? `api/notifications/${userId}` : null
  const { data, error, isLoading, mutate } = useSWR(key, () =>
    fetchData(userId as number | string)
  )
  const updateNotificationUser = async (obj: {
    id: number
    isRead: boolean
  }) => {
    await services.Notifications.updateNotification(obj)
    mutate()
  }
  return {
    data,
    isLoading,
    isError: !!error,
    updateNotificationUser,
    mutate,
  }
}

export default useDataNotificationUser
