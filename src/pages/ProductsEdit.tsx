import { useParams } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import Loader from '../utils/Loader'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import { findCategoryTitleById } from '../helpers/handleBreadCrumbs'
import Admin from '../components/Admin'
import hooks from '../hooks'
import useDirection from '../hooks/useDirection'

const ProductsEdit = () => {
  const { lvl1, lvl2 } = useParams()
  const { isLoading } = hooks.admin.useDataProductsEdit()
  const { data } = hooks.useDataCategories()
  const categoriesArray = data || []
  const dir = useDirection()
  const res1 = findCategoryTitleById(+lvl1!, categoriesArray, dir)
  const res2 = findCategoryTitleById(+lvl2!, categoriesArray, dir)

  return (
    <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
      {isLoading && <Loader />}
      <BreadCrumbsUtil
        array={[
          {
            title: res1 ?? '',
            link: `/admin/category-edit/${lvl1}/0/0` || '',
          },
          {
            title: res2 ?? '',
            link: `/admin/category-edit/${lvl1}/${lvl2}/0` || '',
          },
        ]}
      />
      <Admin.Products.Filter />
      <Box sx={{ paddingTop: '16px' }}>
        <Admin.Products.List />
      </Box>
    </Container>
  )
}

export default ProductsEdit
