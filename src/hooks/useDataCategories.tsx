import useSWR from 'swr'
import services from '../services'
import { useAuth } from '../store/auth.store'
import { settings } from '../settings'

const fetchData = async (): Promise<ICategory[]> => {
  try {
    const response = await services.CatalogService.GetCategories()
    return response
  } catch (error) {
    console.log('[errorr]', error)
    return []
  }
}

const useDataCategories = () => {
  const { user } = useAuth()
  const shouldFetch = user || settings?.isOpenWorld
  const { data, error, isValidating, mutate } = useSWR(
    shouldFetch ? `/categoriesApp` : null,
    fetchData
  )
  return {
    data,
    isLoading: !data && !error,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataCategories
