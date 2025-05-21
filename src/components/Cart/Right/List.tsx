import { useCart } from '../../../store/cart.store'
import AddToCart from '../../common/AddToCart'
import { useModals } from '../../../provider/ModalProvider'
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
  IconButton,
  TextField,
} from '@mui/material'
import { themeColors } from '../../../styles/mui'
import DeleteIcon from '@mui/icons-material/Delete'
import { onAsk } from '../../../utils/MySweetAlert'
import { useAuth } from '../../../store/auth.store'
import useDirection from '../../../hooks/useDirection'
import { useTranslation } from 'react-i18next'
import logo from '../../../assets/images/logo.png'
import emptyCart from '../../../assets/images/emptyCart.svg'

const List = () => {
  const { cart, deleteFromCart, changePrice, changeDiscount, changeSum } =
    useCart()
  const { selectProduct } = useModals()
  const { isAgent } = useAuth()
  const direction = useDirection()
  const { t } = useTranslation()

  const handleDelete = async (item: ICart) => {
    const ask = await onAsk(
      t('cart.deleteConfirmTitle', 'Delete from cart'),
      t('cart.deleteConfirmMessage', { title: item.product.title }),
      direction
    )
    if (ask) {
      deleteFromCart(item.sku)
    }
  }

  return (
    <>
      <Container maxWidth="lg" />
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell>{t('cart.item', 'Item')}</TableCell>
              <TableCell>{t('cart.quantity', 'Quantity')}</TableCell>
              <TableCell>{t('cart.price', 'Price')}</TableCell>
              <TableCell>{t('cart.discount', 'Discount')}</TableCell>
              <TableCell>{t('cart.unitTotal', 'Unit Total')}</TableCell>
              <TableCell>{t('cart.orderTotal', 'Order Total')}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.map((element, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', gap: '10px', width: '350px' }}>
                    <IconButton
                      onClick={() => selectProduct(element?.product)}
                      sx={{ padding: 0, borderRadius: 0 }}
                      aria-label={t('cart.viewProduct', 'View product details')}
                    >
                      <img
                        width={120}
                        style={{ objectFit: 'contain', height: '70px' }}
                        src={
                          element?.product?.defaultImagePath
                            ? `${import.meta.env.VITE_MEDIA}/product/${element.product.defaultImagePath}`
                            : `${logo}`
                        }
                        alt={element?.product?.title}
                      />
                    </IconButton>

                    <Box
                      sx={{
                        textAlign: 'right',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ width: '100%', textAlign: 'right' }}>
                        <Typography
                          variant="body2"
                          sx={{ textAlign: 'left' }}
                          color={themeColors.primary}
                        >
                          #{element?.product?.sku}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ textAlign: 'left' }}
                          fontWeight={800}
                          color={themeColors.primary}
                        >
                          {direction === 'rtl'
                            ? element?.product?.title
                            : element?.product?.titleEnglish}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    position: 'sticky',
                    left: '0',
                    maxWidth: '250px',
                    zIndex: 1,
                  }}
                >
                  <Box sx={{ paddingRight: '35px', minWidth: '150px' }}>
                    {!element?.isBonus ? (
                      <AddToCart item={element?.product} />
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography>
                          {element?.quantity} {t('cart.bonus', 'Bonus')}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ minWidth: '100px' }}>
                  {isAgent ? (
                    <TextField
                      type="number"
                      inputProps={{ step: '0.1' }}
                      value={element?.product.finalPrice}
                      onFocus={(e) => (e.target as HTMLInputElement).select()}
                      onChange={(e) => changePrice(element, +e.target.value)}
                      sx={{
                        width: '50%',
                        '& input': {
                          textAlign: 'center',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          backgroundColor: '#f3f5f9',
                        },
                      }}
                    />
                  ) : (
                    <Typography variant="body1" color={themeColors.primary}>
                      {element?.product?.finalPrice} ₪
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={{ minWidth: '100px' }}>
                  {isAgent ? (
                    <TextField
                      type="number"
                      inputProps={{ step: '0.1' }}
                      value={element?.discount}
                      onFocus={(e) => (e.target as HTMLInputElement).select()}
                      onChange={(e) => changeDiscount(element, +e.target.value)}
                      sx={{
                        width: '50%',
                        '& input': {
                          textAlign: 'center',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          backgroundColor: '#f3f5f9',
                        },
                      }}
                    />
                  ) : (
                    <Typography variant="body1" color={themeColors.primary}>
                      {element?.discount} %
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={{ minWidth: '100px' }}>
                  {isAgent ? (
                    <TextField
                      type="number"
                      inputProps={{ step: '0.1' }}
                      value={element?.price}
                      onFocus={(e) => (e.target as HTMLInputElement).select()}
                      onChange={(e) => changeSum(element, +e.target.value)}
                      sx={{
                        width: '50%',
                        '& input': {
                          textAlign: 'center',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          backgroundColor: '#f3f5f9',
                        },
                      }}
                    />
                  ) : (
                    <Typography variant="body1" color={themeColors.primary}>
                      ₪{element?.price?.toFixed(2)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={{ minWidth: '100px' }}>
                  <Typography
                    variant="subtitle2"
                    color={themeColors.primary}
                    fontWeight={700}
                  >
                    ₪{element?.total?.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <IconButton onClick={() => handleDelete(element)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {cart?.length === 0 && (
        <Box style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Box sx={{ padding: '40px 0' }}>
            <img
              src={`${emptyCart}`}
              alt={t('cart.emptyAlt', 'Empty Cart')}
            />
          </Box>
        </Box>
      )}
    </>
  )
}

export default List
