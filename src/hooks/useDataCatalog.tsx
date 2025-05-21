import useSWR from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import { useAuth } from '../store/auth.store'
import services from '../services'
import { useCart } from '../store/cart.store'
import { settings } from '../settings'

const fetchData = async (
  lvl1: string | number,
  lvl2: string | number,
  lvl3: string | number,
  searchParams: string,
  documentType: CatalogDocumentType,
  user: IUser,
  mode: IDocumentType
): Promise<GetCatalogResponse> => {
  const data = await services.CatalogService.GetCatalog(
    lvl1,
    lvl2,
    lvl3,
    searchParams,
    documentType,
    mode,
    user
  )
  return data
}

const useDataCatalog = (
  search: string = '',
  document: null | CatalogDocumentType = 'catalog'
) => {
  const { selectedMode } = useCart()
  const { lvl1, lvl2, lvl3, documentType, mode } = useParams()
  const location = useLocation()
  const { user } = useAuth()

  const shouldFetch =
    user &&
    (document ?? documentType) &&
    selectedMode?.value &&
    (user || settings?.isOpenWorld)

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<GetCatalogResponse>(
      shouldFetch
        ? `/api/catalog/${document ?? documentType}/${lvl1}/${lvl2}/${lvl3}${
            search ? search : location.search
          }&userId=${user!.id}&mode=${mode}`
        : null,
      () =>
        fetchData(
          lvl1 ?? '0',
          lvl2 ?? '0',
          lvl3 ?? '0',
          search ? `?search=${search}` : location.search,
          document ?? (documentType as CatalogDocumentType),
          user!,
          selectedMode.value
        )
    )

  return {
    data,
    isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataCatalog
