import Loader from '../utils/Loader'
import { useParams } from 'react-router-dom'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import { Box, Container } from '@mui/material'
import { findCategoryTitleById } from '../helpers/handleBreadCrumbs'
import Admin from '../components/Admin'
import hooks from '../hooks'
import useDirection from '../hooks/useDirection'

const CategoryEdit = () => {
  const { isLoading } = hooks.admin.useDataCategoryEdit()
  const { lvl1, lvl2 } = useParams()
  const { data } = hooks.useDataCategories()
  const categoriesArray = data || []
  const dir = useDirection()
  const res1 = findCategoryTitleById(+lvl1!, categoriesArray, dir)
  const res2 = findCategoryTitleById(+lvl2!, categoriesArray, dir)

  return (
    <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
      <BreadCrumbsUtil
        array={[
          {
            title: res1 ?? '',
            link: `/admin/category-edit/${lvl1}/0` || '',
          },
          {
            title: res2 ?? '',
            link: `/admin/category-edit/${lvl1}/${lvl2}` || '',
          },
        ]}
      />
      {isLoading && <Loader />}
      <Admin.Categories.Filter />
      <Box sx={{ paddingTop: '16px' }}>
        <Admin.Categories.List />
      </Box>
    </Container>
  )
}

export default CategoryEdit
