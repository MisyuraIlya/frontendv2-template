import React from 'react'
import { useCart } from '../../../store/cart.store'
import { Box } from '@mui/material'
import MobileCartProductCard from './MobileCartProductCard'

const MobileList = () => {
  const { cart } = useCart()
  return (
    <Box sx={{ padding: '0 15px' }}>
      {cart?.map((product) => (
        <MobileCartProductCard cart={product} key={product.sku} />
      ))}
    </Box>
  )
}

export default MobileList
