import React, { useState, useEffect } from 'react'
import useDataCatalog from '../../../hooks/useDataCatalog'
import { Box, Button } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import CustomMultiSelectBox from '../../../utils/CustomMultiSelectBox'
import { useTranslation } from 'react-i18next'

interface IAttributeMain {
  id: number
  title: string
  SubAttributes?: {
    id: number
    title: string
    productCount: number
  }[]
}

const Attributes: React.FC = () => {
  const { data } = useDataCatalog()
  const [searchParams, setSearchParams] = useSearchParams()
  const [localSelectedValues, setLocalSelectedValues] = useState<
    Record<number, string[]>
  >({})
  const [filters, setFilters] = useState<IAttributeMain[]>([])
  const { t } = useTranslation()

  // 1) Whenever the incoming data.filters changes, reset filters
  useEffect(() => {
    if (data?.filters) {
      setFilters(data.filters)
    }
  }, [data?.filters])

  // 2) Whenever filters change, prune localSelectedValues to only keep keys still present
  useEffect(() => {
    setLocalSelectedValues((prev) => {
      const preserved: Record<number, string[]> = {}
      filters.forEach((filter) => {
        if (prev[filter.id]?.length) {
          preserved[filter.id] = prev[filter.id]
        }
      })
      return preserved
    })
  }, [filters])

  // 3) Initialize from URL params once filters are set
  useEffect(() => {
    const initialValues: Record<number, string[]> = {}
    filters.forEach((item) => {
      const values = searchParams.getAll(`filter[${item.id}]`)
      if (values.length > 0) {
        initialValues[item.id] = values
      }
    })
    setLocalSelectedValues(initialValues)
  }, [filters, searchParams])

  const handleChange = (id: number, values: string[]) => {
    setLocalSelectedValues((prev) => ({
      ...prev,
      [id]: values,
    }))

    const updatedParams = new URLSearchParams(searchParams.toString())
    updatedParams.delete(`filter[${id}]`)
    values.forEach((value) => updatedParams.append(`filter[${id}]`, value))
    setSearchParams(updatedParams)
  }

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams())
    setLocalSelectedValues({})
  }

  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        padding: '10px',
        gap: '10px',
        alignItems: 'center',
      }}
    >
      {filters.length > 0 && (
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          sx={{ minWidth: '150px', height: '44px' }}
        >
          {t('catalog.filter.clearAttributes')}
        </Button>
      )}

      {filters.map((item) => (
        <Box key={item.id} sx={{ padding: '10px' }}>
          <CustomMultiSelectBox
            label={item.title}
            values={localSelectedValues[item.id] || []}
            onChange={(values) => handleChange(item.id, values)}
            options={
              item.SubAttributes?.map((sub) => ({
                value: sub.id.toString(),
                label: sub.title,
                count: sub.productCount,
              })) || []
            }
          />
        </Box>
      ))}
    </Box>
  )
}

export default Attributes
