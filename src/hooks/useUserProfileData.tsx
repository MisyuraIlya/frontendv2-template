import useSWR from 'swr'
import { useAuth } from '../store/auth.store'
import { AuthService } from '../services/auth.service'

const fetchData = async (userId: string | number): Promise<IDynamicTables> => {
  try {
    const res = await AuthService.getUseProfileData(userId)
    return res
  } catch (error) {
    console.error('Error fetching money data:', error)
    return { columns: [], columnsEnglish: [], lines: [] }
  }
}

const useUserProfileData = () => {
  const { user } = useAuth()
  const userId = user?.id
  const key = userId ? `/apiv2/userProfile/${userId}` : null

  const { data, error, isLoading, mutate } = useSWR<IDynamicTables>(key, () =>
    fetchData(userId as string | number)
  )

  return {
    data,
    isLoading,
    isError: !!error,
    mutate,
  }
}

export default useUserProfileData
