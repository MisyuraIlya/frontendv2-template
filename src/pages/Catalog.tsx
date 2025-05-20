import React from 'react'
import { Grid, Container, Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { findCategoryTitleById } from '../helpers/handleBreadCrumbs'
import Utils from '../utils'
import CatalogComponent from '../components/Catalog'
import { themeColors } from '../styles/mui'
import hooks from '../hooks'
import { useMobile } from '../provider/MobileProvider'
import { useTranslation } from 'react-i18next'
import useDirection from '../hooks/useDirection'
import { useCart } from '../store/cart.store'

const Catalog = () => {
  const { lvl1, lvl2, lvl3, documentType } = useParams()
  const { data } = hooks.useDataCategories()
  const { isMobile } = useMobile()
  const { data: catalog } = hooks.useDataCatalog()
  const categoriesArray = data || []
  const dir = useDirection()
  const res1 = findCategoryTitleById(+lvl1!, categoriesArray, dir)
  const res2 = findCategoryTitleById(+lvl2!, categoriesArray, dir)
  const res3 = findCategoryTitleById(+lvl3!, categoriesArray, dir)
  const { t } = useTranslation()
  const { selectedMode } = useCart()

  const handleTitleTpye = () => {
    if (documentType === 'catalog') {
      return dir === 'rtl' ? 'קטלוג' : 'catalog'
    } else if (documentType === 'notBuy') {
      return dir === 'rtl' ? 'מוצרים שאני לא קונה' : 'product im not buying'
    } else if (documentType === 'imBuy') {
      return dir === 'rtl' ? 'מוצרים שאני קונה' : 'product im buying'
    } else if (documentType === 'search') {
      return dir === 'rtl' ? 'חיפוש' : 'search'
    } else if (documentType === 'special') {
      return dir === 'rtl' ? 'מיוחדים' : 'special'
    } else if (documentType === 'new') {
      return dir === 'rtl' ? 'חדש' : 'new'
    } else {
      return ''
    }
  }

  const handleTitle = () => {
    if (res3) {
      return res3
    } else if (res2) {
      return res2
    } else if (res3) {
      return res3
    } else {
      return ''
    }
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
      <Typography variant="h6" color={'primary'}>
        {handleTitleTpye()}
      </Typography>
      <Utils.BreadCrumbsUtil
        array={[
          {
            title: res1 ?? '',
            link:
              `/client/catalog/${selectedMode?.value}/${lvl1}/0/0?page=1` || '',
          },
          {
            title: res2 ?? '',
            link:
              `/client/catalog/${selectedMode?.value}/${lvl1}/${lvl2}/0?page=1` ||
              '',
          },
          {
            title: res3 ?? '',
            link:
              `/client/catalog/${selectedMode?.value}/${lvl1}/${lvl2}/${lvl3}?page=1` ||
              '',
          },
        ]}
      />

      <Grid container spacing={2}>
        <Grid size={{ md: 3, sm: 0, xs: 0 }}>
          {isMobile ? (
            <Utils.MyDrawer>
              <Box>
                <CatalogComponent.Right.Categories />
              </Box>
            </Utils.MyDrawer>
          ) : (
            <>
              <CatalogComponent.Right.Categories />
            </>
          )}
        </Grid>
        <Grid size={{ md: 9, sm: 12, xs: 12 }}>
          {isMobile ? (
            <CatalogComponent.Left.MobileFIlter />
          ) : (
            <Box>
              <CatalogComponent.Left.Filter />
              <CatalogComponent.Left.Attributes />
            </Box>
          )}
          <Box
            sx={{
              pt: '22px',
              pb: '10px',
              display: 'flex',
              gap: '10px',
              alignItems: 'end',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {handleTitle()}
            </Typography>
            <Typography variant="body1" color={themeColors.asphalt}>
              {t('catalog.filter.totalProducts')}: {catalog?.total ?? 0}
            </Typography>
          </Box>
          <CatalogComponent.Left.List />
          {catalog && <Utils.PaginationUtil pagination={catalog} />}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Catalog
