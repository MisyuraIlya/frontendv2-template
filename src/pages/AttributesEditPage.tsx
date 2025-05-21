import { Container } from '@mui/material'
import Attributes from '../components/Admin/attributes'

const AttributesEditPage = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
      <Attributes.List />
    </Container>
  )
}

export default AttributesEditPage
