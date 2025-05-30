import { FC, useEffect, useState } from 'react'
import { Box, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useCart } from '../../store/cart.store'
import { useTranslation } from 'react-i18next'

interface ProductPackageAddToCartProps {
  product: IProduct
}

const ProductPackageAddToCart: FC<ProductPackageAddToCartProps> = ({ product }) => {
  const { t } = useTranslation()
  const { addToCart, getCartItem } = useCart()

  const [selectedPackId, setSelectedPackId] = useState<string>('')
  const cartItem = getCartItem(product)

  const handleChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value
    setSelectedPackId(value)

    if (value !== '') {
      const pkgId = Number(value)
      const pkg = product.productPackages.find((p) => p.id === pkgId)
      if (pkg) {
        addToCart(product, pkg.quantity)
      } else {
        addToCart(product)
      }
    }
  }

  useEffect(() => {
    if(cartItem){
    }
  },[])

  if (!product.productPackages?.length) {
    return null
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Select
        fullWidth
        displayEmpty
        value={selectedPackId}
        onChange={handleChange}
        renderValue={(val) => {
          if (val === '') {
            return <span>{t('catalog.productCard.selectPackagePlaceholder')}</span>
          }
          const pkg = product.productPackages.find((p) => p.id === Number(val))
          return `${pkg?.quantity ?? 1} ${t('catalog.productCard.packageName')}`
        }}
      >
        <MenuItem value={1}>
          {1} {t('catalog.productCard.packageName')}
        </MenuItem>

        {product.productPackages.map((pkg) => (
          <MenuItem key={pkg.id} value={pkg.id.toString()}>
            {pkg.quantity} {t('catalog.productCard.packageName')}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default ProductPackageAddToCart
