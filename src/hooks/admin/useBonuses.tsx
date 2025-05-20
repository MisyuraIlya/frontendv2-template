import useSWR from 'swr'
import services from '../../services'

const fetchData = async (): Promise<IBonus[]> => {
  return await services.Admin.AdminBonusesService.getBonuses()
}

const useBonuses = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<IBonus[]>(
    `api/bonuses`,
    () => fetchData()
  )

  const createBonus = async (data: any) => {
    await services.Admin.AdminBonusesService.createBonus(data)
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

export default useBonuses
