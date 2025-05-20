import useSWR from 'swr'
import { useLocation } from 'react-router-dom'
import services from '../../services'

const fetchData = async () => {
  return await services.Admin.AdminClinetsService.getUsers('ROLE_AGENT', 1, '')
}

const useDataAgents = () => {
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const page = urlSearchParams.get('page')
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/ROLE_AGENT?page=${page}`,
    () => fetchData()
  )

  return {
    data,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataAgents
