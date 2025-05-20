import { Container } from '@mui/material'
import React from 'react'
import Bonuses from '../components/Admin/bonuses'

const BonusesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
      <Bonuses.Filter />
      <Bonuses.List />
    </Container>
  )
}

export default BonusesPage
