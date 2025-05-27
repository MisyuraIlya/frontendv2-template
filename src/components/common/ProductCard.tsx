import React, { FC, useState } from 'react'
import {
  Box,
  Card,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material'
import { useModals } from '../../provider/ModalProvider'
import { themeColors } from '../../styles/mui'
import { useCart } from '../../store/cart.store'
import AddToCart from './AddToCart'
import { useMobile } from '../../provider/MobileProvider'
import { useAuth } from '../../store/auth.store'
import useDirection from '../../hooks/useDirection'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/images/logo.png'
import ProductPackageAddToCart from './ProductPacakgeAddToCart'

interface ProductCardProps {
  product: IProduct
  listView?: boolean
}

const ProductCard: FC<ProductCardProps> = ({ product, listView = false }) => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const { isMobile } = useMobile()
  const { getCartItem, selectedMode } = useCart()
  const { selectProduct } = useModals()
  const inCart = getCartItem(product)
  const { user } = useAuth()
  const direction = useDirection()

  const handleImageLoad = () => {
    setLoading(false)
  }

  return (
    <Card
      elevation={0}
      sx={{
        border: inCart
          ? `1px solid ${themeColors.primary}`
          : `1px solid #E1E0E4`,
        position: 'relative',
        boxShadow: 'none',
      }}
    >
      <Grid container>
        <Grid size={{ xs: listView ? (isMobile ? 12 : 4) : 12 }}>
          {product?.discount ? (
            <Chip
              label={`${t('catalog.productCard.promotion')} ${product?.discount}%`}
              color="info"
              sx={{
                position: 'absolute',
                right: '12px',
                top: '12px',
                zIndex: 10,
              }}
            />
          ) : null}
          {product?.stock <= 0 ? (
            <Chip
              label={t('catalog.productCard.outOfStock')}
              color="primary"
              sx={{
                fontWeight: 700,
                position: 'absolute',
                right: '12px',
                top: '12px',
                zIndex: 10,
              }}
            />
          ) : null}
          {product?.bonuses?.length > 0 ? (
            <Tooltip
              title={
                <>
                  {product?.bonuses?.map((item) =>
                    item?.bonusDetaileds?.map((item2) => (
                      <React.Fragment key={item2.id}>
                        <CardMedia
                          onClick={() => selectProduct(item2?.bonusProduct)}
                          component="img"
                          height={!loading ? 150 : 0}
                          sx={{
                            display: loading ? 'hidden' : 'block',
                            cursor: 'pointer',
                          }}
                          image={
                            product.defaultImagePath
                              ? `${import.meta.env.VITE_MEDIA}${item2?.bonusProduct?.defaultImagePath}`
                              : `${logo}`
                          }
                          alt={product.title}
                          onLoad={handleImageLoad}
                        />
                        <Typography>
                          קנה {item2?.minimumQuantity} קבל{' '}
                          {item2?.bonusQuantity} {item2?.bonusProduct?.title}
                        </Typography>
                      </React.Fragment>
                    ))
                  )}
                </>
              }
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    border: '1px solid #ddd',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            >
              <Chip
                label={t('catalog.productCard.bonus')}
                color="primary"
                sx={{
                  fontWeight: 700,
                  position: 'absolute',
                  cursor: 'pointer',
                  right: '12px',
                  top: '12px',
                  zIndex: 10,
                }}
              />
            </Tooltip>
          ) : null}
          {loading && (
            <Skeleton variant="rectangular" width="100%" height={150} />
          )}
          <CardMedia
            onClick={() => selectProduct(product)}
            component="img"
            height={!loading ? 150 : 0}
            sx={{
              display: loading ? 'hidden' : 'block',
              cursor: 'pointer',
              objectFit: 'contain',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
            image={
              product.defaultImagePath
                ? `${import.meta.env.VITE_MEDIA}${product.defaultImagePath}`
                : `${logo}`
            }
            alt={product.title}
            onLoad={handleImageLoad}
          />
        </Grid>
        <Grid
          size={{ xs: listView ? (isMobile ? 12 : 4) : 12 }}
          sx={{ padding: listView ? '16px' : '0 16px', minHeight: '120px' }}
        >
          <Typography
            variant="subtitle2"
            color={themeColors.primary}
            fontWeight={600}
            lineHeight={'20px'}
            fontStyle={'normal'}
            sx={{ minHeight: '45px', paddingTop: '10px' }}
          >
            {direction === 'rtl' ? product?.title : product?.titleEnglish}
          </Typography>
          <Grid spacing={0} container sx={{ paddingTop: '10px' }}>
            <Grid size={{ xs: isMobile ? 3.5 : 2.5 }}>
              <Typography variant="caption" color={themeColors.asphalt}>
                {t('catalog.productCard.sku')}:
              </Typography>
            </Grid>
            <Grid size={{ xs: isMobile ? 8.5 : 9.5 }}>
              <Typography variant="caption" color={themeColors.asphalt}>
                {product?.sku}
              </Typography>
            </Grid>
            {product?.barcode && (
              <>
                <Grid size={{ xs: isMobile ? 3.5 : 2.5 }}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    {t('catalog.productCard.barcode')}:
                  </Typography>
                </Grid>
                <Grid size={{ xs: isMobile ? 3.5 : 9.5 }}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    {product.barcode}
                  </Typography>
                </Grid>
              </>
            )}

            {/* {product?.productAttributes?.map((item, index) => (
              <React.Fragment key={item.attributeSub.id || index}>
                <Grid size={{ xs: isMobile ? 3.5 : 2.5 }}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    {item.attributeSub.attribute.title}
                  </Typography>
                </Grid>
                <Grid size={{ xs: isMobile ? 3.5 : 9.5 }}>
                  <Typography variant="caption" color={themeColors.asphalt}>
                    {item.attributeSub.title}
                  </Typography>
                </Grid>
              </React.Fragment>
            ))} */}
          </Grid>
        </Grid>

        <Grid
          size={{ xs: listView ? (isMobile ? 12 : 4) : 12 }}
          sx={{
            alignItems: 'end',
            display: 'flex',
            padding: listView ? '16px' : '0',
          }}
        >
          {user && (
            <Box
              sx={{
                display: 'flex',
                gap: '12px',
                alignItems: 'end',
                width: '100%',
              }}
            >
              <Box sx={{ width: '100%' }}>
                {selectedMode.value !== 'quote' && (
                  <>
                    <Box sx={{ padding: listView ? '0' : '16px' }}>
                      {!listView && <Divider sx={{ margin: '10px 0' }} />}
                      <Box
                        sx={{ display: 'flex', gap: '12px', alignItems: 'end' }}
                      >
                        <Typography
                          variant="body1"
                          color={themeColors.primary}
                          fontWeight={500}
                          lineHeight={'21px'}
                        >
                          {product?.finalPrice} ₪
                        </Typography>
                        {product?.finalPrice < product?.basePrice &&
                          product?.finalPrice !== 0 && (
                            <Typography
                              variant="body1"
                              color={themeColors.primary}
                              fontSize={'12px'}
                              fontWeight={500}
                              lineHeight={'18px'}
                              sx={{ textDecoration: 'line-through' }}
                            >
                              {product?.basePrice} ₪
                            </Typography>
                          )}
                      </Box>
                      <Typography variant="caption" color={themeColors.asphalt}>
                        {t('catalog.productCard.packageName')}
                      </Typography>
                      <Divider sx={{ margin: '10px 0' }} />
                      <Box
                        sx={{
                          display: listView ? 'flex' : 'block',
                          gap: '20px',
                          alignItems: 'end',
                          paddingBottom: '10px',
                        }}
                      >
                        <Typography
                          variant="body1"
                          color={themeColors.primary}
                          fontWeight={500}
                          lineHeight={'22px'}
                        >
                          {inCart?.total?.toFixed(2) ?? 0} ₪
                        </Typography>
                        <Typography
                          variant="caption"
                          color={
                            inCart ? themeColors.info : themeColors.asphalt
                          }
                          lineHeight={'18px'}
                          fontWeight={500}
                        >
                          {t('catalog.productCard.totalPricePackageName')}
                          {inCart?.quantity}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
                {product.productPackages?.length > 0 ? (
                  <Box sx={{ padding: 2 }}>
                      <ProductPackageAddToCart product={product}/>
                  </Box>
                ) : null}
                <AddToCart item={product} />
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProductCard
