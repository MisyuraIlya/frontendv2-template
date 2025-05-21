import { Container } from '@mui/material'
import BonusItem from '../components/Admin/bonusItem'

const BonusItemPage = () => {
  return (
    <Container maxWidth="xl" sx={{ marginTop: '20px' }}>
      <BonusItem.Filter />
      <BonusItem.List />
    </Container>
  )
}

export default BonusItemPage
