import useSWR from 'swr'
import services from '../services'
import { useAuth } from '../store/auth.store'
import { settings } from '../settings'
import { CategoryRepository } from '../db'
import { useOffline } from '../provider/OfflineProvider'

const useDataCategories = () => {
  const { user } = useAuth()
  const { isOnline } = useOffline()
  const shouldFetch = Boolean(user || settings?.isOpenWorld)
  console.log('isOnline',isOnline)
  const { data, error, isValidating, mutate } = useSWR(
    shouldFetch ? ['categoriesApp', isOnline] : null,
    async ([, online]) => {
      if (online) {
        try {
          return await services.CatalogService.GetCategories()
        } catch (e) {
          console.error('CatalogService failed:', e)
          return [] as ICategory[]
        }
      } else {
        return await CategoryRepository.getCategories()
      }
    },
    {
      revalidateOnReconnect: true,
    }
  )
  console.log('data',data)
  return {
    data,
    isLoading: !data && !error,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataCategories
