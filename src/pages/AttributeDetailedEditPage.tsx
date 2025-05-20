import { Container } from '@mui/material'
import React from 'react'
import attributeDetailed from '../components/Admin/attributeDetailed'

const AttributeDetailedEditPage = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
      <attributeDetailed.List />
    </Container>
  )
}

export default AttributeDetailedEditPage
