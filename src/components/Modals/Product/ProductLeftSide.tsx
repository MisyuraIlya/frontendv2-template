import { useSelectedProduct } from '../../../store/selecterdProduct.store'
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  Link,
  TextField,
  ButtonBase,
} from '@mui/material'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import { useCart } from '../../../store/cart.store'
import { useMobile } from '../../../provider/MobileProvider'
import { themeColors } from '../../../styles/mui'
import { useAuth } from '../../../store/auth.store'
import AddToCart from '../../common/AddToCart'
import { useModals } from '../../../provider/ModalProvider'
import { useTranslation } from 'react-i18next'
import useDirection from '../../../hooks/useDirection'

const ProductLeftSide = () => {
  const { user, isAgent } = useAuth()
  const { selectedProd } = useSelectedProduct()
  const { isMobile } = useMobile()
  const { selectProduct } = useModals()
  const direction = useDirection()
  const {
    getCartItem,
    selectedMode,
    changePrice,
    changeDiscount,
    changeSum,
    addToCart,
  } = useCart()
  const { t } = useTranslation()

  const inCart = getCartItem(selectedProd)

  const handleChangePrice = (value: number) => {
    if (!inCart) {
      addToCart(selectedProd)
    }
    const itemCart = getCartItem(selectedProd)
    changePrice(itemCart!, value)
  }

  const handleChangeDiscount = (value: number) => {
    if (!inCart) {
      addToCart(selectedProd)
    }
    const itemCart = getCartItem(selectedProd)
    changeDiscount(itemCart!, value)
  }

  const handleChangeSum = (value: number) => {
    if (!inCart) {
      addToCart(selectedProd)
    }
    const itemCart = getCartItem(selectedProd)
    changeSum(itemCart!, value)
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        {direction === 'rtl' ? selectedProd?.title : selectedProd?.titleEnglish}
      </Typography>

      {selectedProd?.stock <= 0 && (
        <Typography sx={{ color: themeColors.primary }} fontWeight={700}>
          {t('product.soldOut')}
        </Typography>
      )}

      {selectedProd?.sku && (
        <Grid container sx={{ marginTop: '20px' }}>
          <Grid size={{ xs: 4 }}>
            <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
              {t('product.skuLabel')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
              {selectedProd.sku}
            </Typography>
          </Grid>
        </Grid>
      )}

      {/* External Link */}
      {selectedProd?.link && (
        <Grid container sx={{ margin: '10px 0' }}>
          <Grid size={{ xs: 4 }}>
            <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
              {selectedProd.linkTitle || t('product.linkLabel')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Link
              href={selectedProd.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton>
                <InsertLinkOutlinedIcon />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      )}

      {/* Pack Quantity */}
      {selectedProd?.packQuantity && (
        <Grid container>
          <Grid size={{ xs: 4 }}>
            <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
              {t('product.packQuantityLabel')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
              {selectedProd.packQuantity}
            </Typography>
          </Grid>
        </Grid>
      )}

      {selectedProd?.productAttributes?.map((item, key) => (
        <Grid container key={key}>
          <Grid size={{ xs: 4 }}>
            <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
              {item.attributeSub.attribute.title}
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
              {item.attributeSub.title}
            </Typography>
          </Grid>
        </Grid>
      ))}

      {selectedProd?.bonuses?.length > 0 && (
        <>
          <Divider sx={{ margin: '24px 0' }} />
          <Typography sx={{ color: themeColors.asphalt, fontSize: '20px' }}>
            {t('product.bonusesLabel')}
          </Typography>
          {selectedProd.bonuses.map((bonus) =>
            bonus.bonusDetaileds.map((detail, idx) => (
              <Typography sx={{ color: themeColors.asphalt }} key={idx}>
                {t('product.bonus', {
                  min: detail.minimumQuantity,
                  bonus: detail.bonusQuantity,
                })}{' '}
                <ButtonBase
                  onClick={() => selectProduct(detail.bonusProduct)}
                  sx={{
                    textDecoration: 'underline',
                    padding: '0 2px',
                    cursor: 'pointer',
                  }}
                >
                  <Typography component="span">
                    {detail.bonusProduct.title}
                  </Typography>
                </ButtonBase>
              </Typography>
            ))
          )}
        </>
      )}

      {/* Pricing and Cart Controls */}
      {user && (
        <>
          {selectedMode.value !== 'quote' && (
            <>
              <Divider sx={{ margin: '24px 0' }} />
              <Grid container sx={{ margin: '10px 0' }}>
                <Grid size={{ xs: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: themeColors.asphalt }}
                  >
                    {t('product.cartPriceLabel')}
                  </Typography>
                </Grid>
                <Grid
                  size={{ xs: 8 }}
                  sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-end',
                  }}
                >
                  {isAgent ? (
                    <Box sx={{ mb: 1 }}>
                      <TextField
                        type="number"
                        inputProps={{ step: '0.1' }}
                        value={
                          inCart?.product.finalPrice ?? selectedProd.finalPrice
                        }
                        onChange={(e) => handleChangePrice(+e.target.value)}
                        placeholder={t('product.cartPriceLabel')}
                        sx={{
                          '& input': {
                            width: '70px',
                            textAlign: 'center',
                            p: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#f3f5f9',
                          },
                        }}
                      />
                    </Box>
                  ) : (
                    <Typography variant="h5" lineHeight="25px" fontSize="20px">
                      ₪{selectedProd.finalPrice}
                    </Typography>
                  )}

                  {!isAgent &&
                    selectedProd.finalPrice < selectedProd.basePrice && (
                      <Typography
                        variant="subtitle1"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ₪{selectedProd.basePrice}
                      </Typography>
                    )}
                </Grid>

                {/* Discount */}
                <Grid size={{ xs: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: themeColors.asphalt }}
                  >
                    {t('product.discountLabel')}
                  </Typography>
                </Grid>
                <Grid
                  size={{ xs: 8 }}
                  sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-end',
                  }}
                >
                  {isAgent ? (
                    <Box sx={{ mb: 1 }}>
                      <TextField
                        type="number"
                        inputProps={{ step: '0.1' }}
                        value={inCart?.discount ?? selectedProd.discount}
                        onChange={(e) => handleChangeDiscount(+e.target.value)}
                        sx={{
                          '& input': {
                            width: '70px',
                            textAlign: 'center',
                            p: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#f3f5f9',
                          },
                        }}
                      />
                    </Box>
                  ) : (
                    <Typography variant="h5" lineHeight="25px" fontSize="20px">
                      {inCart?.discount}
                    </Typography>
                  )}
                </Grid>

                {/* Total Price */}
                <Grid size={{ xs: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: themeColors.asphalt }}
                  >
                    {t('product.totalPriceLabel')}
                  </Typography>
                </Grid>
                <Grid
                  size={{ xs: 8 }}
                  sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-end',
                  }}
                >
                  {isAgent ? (
                    <Box sx={{ mb: 1 }}>
                      <TextField
                        type="number"
                        inputProps={{ step: '0.1' }}
                        value={inCart?.price ?? selectedProd.finalPrice}
                        onChange={(e) => handleChangeSum(+e.target.value)}
                        sx={{
                          '& input': {
                            width: '70px',
                            textAlign: 'center',
                            p: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#f3f5f9',
                          },
                        }}
                      />
                    </Box>
                  ) : (
                    <Typography variant="h5" lineHeight="25px" fontSize="20px">
                      ₪{inCart?.price}
                    </Typography>
                  )}
                </Grid>

                {/* Quantity */}
                <Grid size={{ xs: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: themeColors.asphalt }}
                  >
                    {t('product.orderCartLabel')}
                  </Typography>
                </Grid>
                <Grid
                  size={{ xs: 8 }}
                  sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-end',
                  }}
                >
                  <Typography variant="h5" lineHeight="25px" fontSize="20px">
                    {inCart?.quantity}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ margin: '24px 0' }} />
            </>
          )}

          <Box
            sx={{
              display: isMobile ? 'block' : 'flex',
              justifyContent: 'space-between',
              mt: selectedMode.value === 'quote' ? '250px' : '50px',
            }}
          >
            {selectedMode.value !== 'quote' && inCart?.total > 0 && (
              <Box sx={{ display: 'flex', gap: '100px', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ color: '#2196F3' }}>
                  {t('product.totalOrderLabel')}
                </Typography>
                <Typography variant="h5">
                  ₪{inCart?.total.toFixed(2)}
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                width: { sm: '50%', xs: '100%' },
                pt: { sm: 0, xs: '30px' },
              }}
            >
              {user && selectedMode && <AddToCart item={selectedProd} />}
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default ProductLeftSide
