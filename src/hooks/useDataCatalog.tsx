import useSWR from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import { useAuth } from '../store/auth.store'
import services from '../services'
import { useCart } from '../store/cart.store'
import { useOffline } from '../provider/OfflineProvider'
import { ProductRepository } from '../db'

const fetchData = async (
  lvl1: string | number,
  lvl2: string | number,
  lvl3: string | number,
  searchParams: string,
  documentType: CatalogDocumentType,
  mode: IDocumentType,
  user?: IUser
): Promise<GetCatalogResponse> => {
  return services.CatalogService.GetCatalog(
    lvl1,
    lvl2,
    lvl3,
    searchParams,
    documentType,
    mode,
    user, 
  )
}

const useDataCatalog = (
  search: string = '',
  document: CatalogDocumentType | null = 'catalog'
) => {
  const { selectedMode } = useCart()
  const {
    lvl1 = '0',
    lvl2 = '0',
    lvl3 = '0',
    documentType: urlDocType,
  } = useParams<{
    lvl1?: string
    lvl2?: string
    lvl3?: string
    documentType?: CatalogDocumentType
    mode?: string
  }>()
  const location = useLocation()
  const { user } = useAuth()
  const { isOnline } = useOffline()

  const docType = document ?? urlDocType!
  const shouldFetch =
    !!docType &&
    !!selectedMode?.value

  const params = shouldFetch
    ? {
        lvl1,
        lvl2,
        lvl3,
        search: search || location.search,
        documentType: docType,
        mode: selectedMode.value,
        userId: user?.id,            
      }
    : null

  const key = params
    ? (['catalogApp', params, isOnline] as const)
    : null

  const fetcher = async (
    keyTuple: readonly [
      'catalogApp',
      {
        lvl1: string
        lvl2: string
        lvl3: string
        search: string
        documentType: CatalogDocumentType
        mode: IDocumentType
        userId?: number
      },
      boolean
    ]
  ): Promise<GetCatalogResponse> => {
    const [, p, online] = keyTuple
    const searchParamString = p.search.startsWith('?')
      ? p.search
      : `?search=${p.search}`

    if (online) {
      const currentUser = p.userId != null
        ? { ...user!, id: p.userId }
        : undefined

      return fetchData(
        p.lvl1,
        p.lvl2,
        p.lvl3,
        searchParamString,
        p.documentType,
        p.mode,
        currentUser,
      )
    } else {
      const offlineResult = await ProductRepository.getCatalog(
        p.lvl1,
        p.lvl2,
        p.lvl3,
        searchParamString
      )

      return {
        data: offlineResult.data,
        filters: offlineResult.filters,
        total: offlineResult.total,
        pageCount: offlineResult.pageCount,
        page: offlineResult.page,
        size: offlineResult.size,
      }
    }
  }

  const swrOptions = {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 0,
    dedupingInterval: 1000 * 60 * 5,
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    GetCatalogResponse,
    any,
    typeof key
  >(
    key,
    fetcher,
    swrOptions
  )

  return {
    data,
    isLoading,
    isError: !!error,
    isValidating,
    mutate,
  }
}

export default useDataCatalog
