import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import services from '../../services'

const fetchData = async (id: number | string): Promise<IBonus> => {
  return await services.Admin.AdminBonusesService.getBonus(+id)
}

const useBonuseItem = () => {
  const { id } = useParams()
  const { data, error, isLoading, isValidating, mutate } = useSWR<IBonus>(
    `bonus/${id}`,
    () => fetchData(id!)
  )

  const createBonus = async (data: any) => {
    await services.Admin.AdminBonusesService.createBonusDetailed(data)
    mutate()
  }

  return {
    data,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
    createBonus,
  }
}

export default useBonuseItem
