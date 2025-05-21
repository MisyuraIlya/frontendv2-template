import { Box, List } from '@mui/material'
import hooks from '../../../hooks'
import Card from './Card'

const Categories = () => {
  const { data } = hooks.useDataCategories()

  return (
    <List
      sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {data?.map((lvl1) => (
        <Box key={lvl1.id}>
          <Card element={lvl1} pl={0} color="black" />
        </Box>
      ))}
    </List>
  )
}

export default Categories
