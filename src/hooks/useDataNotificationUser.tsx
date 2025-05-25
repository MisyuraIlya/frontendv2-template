import useSWR from 'swr'
import { useAuth } from '../store/auth.store'
import services from '../services'

const fetchData = async (userId: number | string) => {
  return services.Notifications.getNotificationByUserId(userId)
}

const useDataNotificationUser = () => {
  const { user } = useAuth()
  const userId = user?.id

  const swrOptions = {
    revalidateOnMount: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    errorRetryCount: 0,
    dedupingInterval: 1000 * 60 * 5, 
  }

  const key = userId ? `api/notifications/${userId}` : null
  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => fetchData(userId as number | string),
    swrOptions
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
