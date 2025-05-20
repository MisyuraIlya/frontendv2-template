import { Box } from '@mui/material'
import React, { useState } from 'react'
import ProductList from '../../utils/SearchInput/components/ProductList'
import { useDebounce } from 'use-debounce'
import { useModals } from '../../provider/ModalProvider'
import Utils from '../../utils'
import useDataCatalog from '../../hooks/useDataCatalog'
import { useTranslation } from 'react-i18next'

const Center = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState<string>('')
  const [debouncedSearch] = useDebounce(search, 1000)
  const { data, isLoading } = useDataCatalog(debouncedSearch)
  const { selectProduct } = useModals()

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        zIndex: 10,
        paddingTop: '5px',
      }}
    >
      <Utils.SearchInput
        value={search}
        setValue={setSearch}
        placeholder={t('header.searchProduct')}
        microphone={true}
        ListComponent={
          <ProductList
            onClick={selectProduct}
            array={data?.data ?? []}
            loading={isLoading}
            totalFound={data?.total ?? 0}
            searchValue={search}
            setSearchValue={setSearch}
          />
        }
      />
    </Box>
  )
}
export default Center
