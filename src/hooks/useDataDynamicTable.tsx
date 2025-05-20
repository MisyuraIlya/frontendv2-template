import { useParams } from 'react-router-dom'
import { useAuth } from '../store/auth.store'
import moment from 'moment'
import useSWR from 'swr'
import { DocumentsService } from '../services/document.service'

type RouteParams = {
  dateFrom: string
  dateTo: string
  type: 'debit' | 'cartesset'
}

const fetchData = async (
  fromDate: Date,
  toDate: Date,
  type: 'debit' | 'cartesset',
  user: IUser
): Promise<IDynamicTables> => {
  console.log('type')
  if (type === 'cartesset') {
    return await DocumentsService.GetCartesset(user, fromDate, toDate)
  }
  return await DocumentsService.GetDebit(user, fromDate, toDate)
}

const useDataDynamicTable = () => {
  const { dateFrom, dateTo, type } = useParams<RouteParams>()
  const { user } = useAuth()
  const fromConverted = moment(dateFrom).format('YYYY-MM-DD')
  const toDateConverted = moment(dateTo).format('YYYY-MM-DD')
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<IDynamicTables>(
      `/api/${type}/${fromConverted}/${toDateConverted}?userId=${user?.id}`,
      () =>
        fetchData(
          new Date(fromConverted!),
          new Date(toDateConverted!),
          type!,
          user!
        )
    )

  return {
    data,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataDynamicTable
