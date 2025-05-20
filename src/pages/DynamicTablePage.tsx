import { Box, Container } from '@mui/material'
import React from 'react'
import Loader from '../utils/Loader'
import Documents from '../components/Documents'
import Utils from '../utils'
import { useTranslation } from 'react-i18next'
import useDataDynamicTable from '../hooks/useDataDynamicTable'

const DynamicTablePage = () => {
  const { data, isLoading } = useDataDynamicTable()
  const { t } = useTranslation()
  return (
    <Container maxWidth="xl">
      {isLoading && <Loader />}
      <Box sx={{ mt: '50px' }}>
        <Utils.BreadCrumbsUtil
          array={[
            {
              title: t('breadCrumbs.cartesset'),
              link: '',
            },
          ]}
        />
      </Box>
      <Documents.DynamicTable.DynamicFilter data={data} />
      <Documents.DynamicTable.DynamicTable data={data} isLoading={isLoading} />
    </Container>
  )
}

export default DynamicTablePage
