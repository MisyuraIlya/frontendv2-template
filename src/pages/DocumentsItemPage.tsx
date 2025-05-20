import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { Box, Divider, Grid } from '@mui/material'
import Loader from '../utils/Loader'
import DocumentItem from '../components/DocumentItem'
import Utils from '../utils'
import hooks from '../hooks'
import { useTranslation } from 'react-i18next'

const DocumentsItemPage = () => {
  const { documentItemType, id } = useParams()
  const from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  const to = moment().format('YYYY-MM-DD')
  const { isLoading } = hooks.useDataDocumentsItem()
  const { t } = useTranslation()

  return (
    <>
      <Grid container sx={{ marginTop: '50px' }} spacing={0}>
        <Grid size={{ sm: 12, xs: 12, md: 8.5 }}>
          {isLoading && <Loader />}
          <Box sx={{ padding: '0 20px' }}>
            <Utils.BreadCrumbsUtil
              array={[
                {
                  title: t('breadCrumbs.documents'),
                  link: `/documentPage/${documentItemType}/${from}/${to}?page=1`,
                },
                { title: id || '', link: '' },
              ]}
            />
          </Box>
          <DocumentItem.Right.Filter />
          <DocumentItem.Right.List />
        </Grid>
        <Grid size={{ sm: 12, xs: 12, md: 3.5 }} sx={{ position: 'relative' }}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              position: 'fixed',
              height: '100vh',
              width: '2px',
              top: 0,
              zIndex: 9,
            }}
          />
          <Box sx={{ position: 'sticky', top: '150px' }}>
            <DocumentItem.Left.Summary />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default DocumentsItemPage
